# Website content, typography, and layout review

Content rechecked on October 15, 2026. The typography and browser layout review
below was performed locally on September 13, 2026.

## Content consistency

| Item | Result |
| --- | --- |
| Research identity | Heading, biography, page title, and sharing metadata use Grounded Interactive Agents. |
| Ongoing research | Described broadly as grounded collaboration in embodied multi-agent systems; no detailed proposed method is presented. |
| Internship availability | Summer 2027 throughout. |
| Industry experience | Amazon Alexa AI, Applied Scientist Intern, May–August 2026; the news uses completed-tense wording. |
| Education date | September 2024 start, explicitly confirmed by the user against the latest CV. |
| Publication metadata | All 11 titles and ordered author lists match the CV after normalizing typography and whitespace. Equal-contribution markers match. |
| Publication status | Tab Zero: In preparation. StreamClarify: WACV, 2027 (accepted). Both agree between the featured items and full list. |
| Project resources | Neither project has a Paper, Code, Project, or placeholder Publication details link. |
| Acceptance news | October 2026: StreamClarify accepted to WACV 2027, followed by "See you in Orlando!" as requested by the user. |
| CV download | Both page links point to the updated `Zhuchen_Shao.pdf`. |
| Results | Tab Zero retains up to 8.0 percentage points in zero-shot task success rate over uniform sampling on the filtered Ego2Web subset. StreamClarify retains 1,837 QA pairs, 355 videos, three VLM backbones, and up to 8.2 percentage points in macro accuracy. |
| Attribution cleanup | No template credit appears in the webpage or README; unused template images are removed. The existing repository LICENSE is retained. |

Reported experimental numbers were checked for consistency with the supplied CV,
not independently reproduced. Earlier news and reviewing service come from the
existing user-authored website; the research positioning follows the user's
approved thesis wording. Published paper titles retain their bibliographic casing.

CV SHA-256: `93184289b74a01fb3d9487e27d689e8d254c552c31bed06dc041333bec128060`.

The October update was checked for generated-content consistency, local file and
fragment references, both CV links, acceptance news, and whitespace errors.
The browser layout checks below describe the September review.

## Typography corrections

- The original system-font stacks actually rendered as Nimbus Roman and DejaVu
  Sans in the review environment. The site now serves Source Serif 4 for headings
  and Source Sans 3 for body text, controls, metadata, and diagram labels.
- Chromium's rendered-font inspection confirms the local web fonts are used at
  every tested width. Regular, medium, semibold, and bold weights use the font's
  weight axis; synthetic bold/italic is disabled.
- All text characters currently visible on the page are covered by the bundled
  Latin font. Link arrows and favicon initials use vector paths.
- A second typography pass consolidates sizes into shared CSS roles: body text
  is 16 px throughout, supporting descriptions and dates are 14 px, and compact
  labels are 12 px. Mobile body text retains the desktop size.
- All seven section headings use 24 px on desktop and 22 px on mobile. Featured
  project titles use 22 / 20 px. The desktop name is reduced from 64 to 50 px,
  with 44 px on tablets and a 28–38 px mobile range. Introductory and role
  headings use 18 px. Font weights and spacing preserve the hierarchy.
- Diagram labels now render at approximately 12.0–15.1 px across tested widths.
  Mobile illustrations have a 280 px width cap to keep their labels proportional
  to surrounding text. Source SVG label sizes and generated HTML agree.
- Small labels and click areas are enlarged; name sizing, heading links, and the
  tablet image column account for the actual font metrics.
- Fonts are bundled with their original licenses. Source URLs and hashes are in
  `fonts/sources.json`; combined WOFF2 size is 79,564 bytes. No external font
  request is made by the page.

## Layout and interaction verification

Tested Chromium viewport widths: **320, 360, 375, 390, 414, 640, 641, 768, 900,
901, 1024, 1440, and 1920 px**, including both sides of the responsive breakpoints.

All tested widths passed:

- No horizontal overflow or elements outside the viewport.
- No overlap between the rendered name text and the portrait.
- No diagram text outside its SVG bounds.
- No visible text below the 12 px check threshold; diagram sizes were measured
  after scaling, not just from the SVG's internal font size.
- Navigation, profile links, resource links, buttons, and disclosures have
  measured boxes of at least 24 × 24 px.
- Topic filtering returns 11 total, 2 multimodal, and 9 medical-imaging entries.
- Keyboard activation opens/closes the archive; direct publication URLs reveal
  the requested entry.
- No JavaScript errors or failed local asset requests in the normal-loading runs.

Automated axe-core checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA reported **zero
violations** at 320, 390, 768, and 1440 px with the archive both open and closed.
These results describe automated Chromium checks, not manual testing on physical
phones or other browser engines.

With JavaScript disabled, all 11 entries remain readable through the native
disclosure. With font downloads blocked, text remains visible and the 320 px
layout has no horizontal overflow. The CV served by the local preview matches
the current PDF byte for byte.

The earlier external-link check returned HTTP 200 for ten current links. The two
IEEE Xplore destinations returned 202 and 418, so those destinations remain
incompletely verified by the automated client; they were not replaced with
guessed URLs.

## Review artifacts

Content-review and earlier typography reports are in
`/tmp/website-consistency-audit/`. The latest typography measurements and browser
screenshots are in `/tmp/website-type-refinement/`: `final-checks.json`,
`final-1440.png`, `final-390.png`, and section-level previews. These temporary
artifacts record this local review; they are not site assets.

Generated HTML was rebuilt from its JSON and SVG sources. The generator's
`--check`, local-reference checks, and `git diff --check` pass.
