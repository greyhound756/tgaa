import type { Metadata } from "next";
import { Button } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="on-dark flex min-h-[80svh] items-end bg-graphite text-paper">
      <div className="shell pt-40 pb-20">
        <p className="eyebrow text-red">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,9vw,9rem)]">Off the drawing.</h1>
        <p className="lede mt-6 max-w-xl text-paper/70">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/contact/" variant="ghost-light">
            Contact VECHTEL
          </Button>
        </div>
      </div>
    </section>
  );
}
