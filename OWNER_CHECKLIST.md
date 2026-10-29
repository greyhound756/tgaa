# VECHTEL website — information needed from the owner

The public site contains only confirmed facts. These items were left out and need confirmation before they can be added.

## Contact and legal
- [ ] Form handler: the service that should receive contact-form messages (set `NEXT_PUBLIC_CONTACT_ENDPOINT`). **Until it is set, the form does not send anything and says so.**
- [ ] Which inbox or person receives Project, Careers and General inquiries.
- [ ] Public email, phone and office street address (none are shown now).
- [ ] Privacy policy text. It is required once the form collects personal data. Also any terms, cookie or accessibility statements. Footer links will be added only once real texts exist.
- [ ] Legal entity name, if different from "VECHTEL Engineering & Construction".
- [ ] Production domain (set `NEXT_PUBLIC_SITE_URL` for canonical URLs, the sitemap and robots.txt).

## Company facts
Published on the owner's confirmation (28 Oct 2026): a young company founded in 2020 by Chris Vectol; in 2021 it helped on the Ford Rouge Electric Vehicle Center (Dearborn, Michigan). Shown on the home page ("Since 2020") and on Company ("Our story").
- [ ] Confirm the founder's name spelling in English: "Chris Vectol" (one line in `lib/content.ts` → `company.founder`).
- [ ] Describe VECHTEL's exact role on the Ford Rouge EV Center (e.g. scope, discipline, as a subcontractor to whom). The site currently says only "helped on".
- [ ] Confirm VECHTEL may name Ford and the project publicly (some contracts restrict it). Ford's logo is not used, and the site carries a trademark / no-endorsement note.
- [ ] Not published, not invented: company size, leadership beyond the founder.
- [ ] Licenses, certifications, safety record, insurance and bonding.
- [ ] Other clients, partners, completed projects, testimonials, awards. These need written permission where other companies are named.
- [ ] Geographic service area beyond the confirmed Chicago, Illinois base.

## Photography
- [ ] All 16 photo slots use temporary architecture photos stored in the project (`public/photos/`): free Unsplash images from the ServiceStack/images collection on GitHub, labelled "Illustrative image". Sources are listed in `lib/local-photos.json`.
- [ ] Send VECHTEL's own photos (construction sites, plants, warehouses) to replace them. A slot without a stored photo is hidden automatically, so no grey boxes appear.

## Intro animation
- [ ] The original brief asked for no loading screen. The logo intro was added on request: about 3 s, home page only, once per session, skippable. Confirm you want it on the live site.

## Validation & Testing Engineer posting
- [ ] Required and preferred qualifications (education, years of experience, standards or industries). None are listed now.
- [ ] Salary range. It may be legally required in Illinois job postings for employers with 15+ employees (Illinois Equal Pay Act amendment, in effect from 2025). Please confirm with counsel.
- [ ] Benefits. Do not publish until confirmed.
- [ ] Visa sponsorship position. Do not publish until confirmed.
- [ ] How applications are received (a form, an applicant tracking system, or an email address) and a posting date. Then structured `JobPosting` data can be added for Google Jobs.
- [ ] Equal Opportunity Employer statement, if the company uses one.
