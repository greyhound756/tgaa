// Downloads the temporary stock photos into the project, so the site no longer
// depends on the Unsplash CDN at runtime.
//
//   npm run photos
//
// For every slot in lib/media.ts it tries the listed images in order, saves two
// sizes to public/photos/ (<slot>-1080.jpg and <slot>-2400.jpg) and records them
// in lib/local-photos.json. Re-run any time; existing files are skipped unless
// you pass --force.

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "photos");
const manifestPath = path.join(root, "lib", "local-photos.json");
const force = process.argv.includes("--force");

// Read the slot → ids table straight from lib/media.ts (single source of truth)
const mediaSrc = await readFile(path.join(root, "lib", "media.ts"), "utf8");
const block = mediaSrc.slice(mediaSrc.indexOf("export const media = {"), mediaSrc.indexOf("} satisfies"));
const slots = [...block.matchAll(/^\s{2}(\w+):\s*\{[\s\S]*?ids:\s*\[([^\]]+)\]/gm)].map((m) => ({
  key: m[1],
  ids: [...m[2].matchAll(/"([^"]+)"/g)].map((x) => x[1]),
}));

const sizes = [1080, 2400];
const base = process.env.PHOTO_BASE || "https://images.unsplash.com";
const url = (id, w) => `${base}/${id}?auto=format&fm=jpg&fit=crop&w=${w}&q=80`;
const exists = (p) => access(p).then(() => true, () => false);

await mkdir(outDir, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {}

let ok = 0;
const failed = [];
for (const { key, ids } of slots) {
  const files = sizes.map((w) => path.join(outDir, `${key}-${w}.jpg`));
  if (!force && manifest[key] && (await Promise.all(files.map(exists))).every(Boolean)) {
    console.log(`  = ${key} (already downloaded)`);
    ok++;
    continue;
  }
  let saved = false;
  for (const id of ids) {
    try {
      for (const [i, w] of sizes.entries()) {
        const res = await fetch(url(id, w));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const type = res.headers.get("content-type") || "";
        if (!type.startsWith("image/")) throw new Error(`not an image (${type})`);
        await writeFile(files[i], Buffer.from(await res.arrayBuffer()));
      }
      manifest[key] = {
        src: `/photos/${key}-2400.jpg`,
        srcSet: sizes.map((w) => `/photos/${key}-${w}.jpg ${w}w`).join(", "),
        source: `https://images.unsplash.com/${id}`,
      };
      console.log(`  ✓ ${key}  ←  ${id}`);
      saved = true;
      ok++;
      break;
    } catch (e) {
      console.log(`  · ${key}: ${id} failed (${e.message}), trying next`);
    }
  }
  if (!saved) failed.push(key);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${ok}/${slots.length} photos saved to public/photos/.`);
if (failed.length) {
  console.log(`Could not download: ${failed.join(", ")} — these keep loading from the Unsplash CDN.`);
  console.log("If every download failed, Unsplash may be unreachable from your network; try again with a VPN.");
}
console.log("Restart `npm run dev` (or rebuild) to use them.");
