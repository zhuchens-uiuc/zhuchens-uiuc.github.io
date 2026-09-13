# Zhuchen Shao — personal research website

A static GitHub Pages website focused on grounded interactive agents and
Summer 2027 research internship opportunities. Built with HTML, CSS, and a small
JavaScript enhancement for publication filtering. Fonts are served locally;
no frontend framework, third-party font requests, analytics, or browser-side
content fetching are required.

## Preview

From this repository:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open http://localhost:8000. For a remote workspace, forward port 8000 in your editor.
Use the local HTTP preview for the intended typography. Page content and the
publication disclosure remain available without JavaScript.

## Update content

- `index.html`: biography, internship availability, experience, education, news,
  honors, service, and sharing metadata.
- `publications.json`: canonical paper titles, authors, venues, links, and the
  three featured research summaries. `featured` controls their display order.
- `CV_Zhuchen_Shao.pdf`: the downloadable CV; retain this filename when replacing it.
- `styles.css`: desktop, tablet, phone, reduced-motion, and print styles.
- `scripts.js`: accessible topic filters and publication archive navigation.
- `images/research/*.svg`: editable conceptual illustrations for the featured
  research, embedded inline by the generator so their text uses the site font.
  These are website summaries, not paper figures or experimental plots.
- `images/profile.jpg`: the original portrait.
- `fonts/`: locally served Source Sans 3 and Source Serif 4, with original font
  licenses, upstream URLs, and checksums.

After editing `publications.json` or `images/research/*.svg`, regenerate the two
marked HTML blocks:

```bash
python scripts/build_publications.py
python scripts/build_publications.py --check
```

The generator uses only the Python standard library. Commit both the JSON and
updated `index.html`; GitHub Pages serves the HTML directly and needs no build job.
Edit page content outside the `BEGIN GENERATED` / `END GENERATED` markers.

The complete publication list uses a native disclosure. All papers are embedded
in the HTML and remain available without JavaScript. With JavaScript enabled,
readers can filter by research area and link directly to a paper via `#pub-<id>`.

## Content provenance

The September 2026 update follows the user's latest two-page CV for research,
industry experience, education, and publication metadata. Earlier site content
supplies qualifying-exam news, presentations, and reviewing service. The user
explicitly requested the Summer 2027 internship notice.
The research positioning follows the September 2026 thesis discussion and the
user-approved wording: grounded interactive agents, with ongoing work described
at the level of grounded collaboration in embodied multi-agent systems.
The PhD start date is September 2024, explicitly confirmed by the user to match
the updated CV.

- StreamClarify is **Under review**; Tab Zero is **In preparation**.
- Embodied multi-agent planning is **Ongoing**.
- Reported improvements retain the CV's units and comparison scope: Tab Zero is
  up to 8.0 percentage points over uniform sampling on the **filtered Ego2Web
  subset**; StreamClarify is up to 8.2 percentage points in macro accuracy over
  existing streaming video QA methods. These are CV-sourced claims, not new
  experimental validations performed for the website.
- Featured projects show resource links only when supplied in `publications.json`.
  Tab Zero and StreamClarify currently have no resource links; their manuscript
  statuses remain visible. No placeholder publication-detail links are displayed.

## Validation

See [SITE_REVIEW.md](SITE_REVIEW.md) for the full content, font, and layout audit.
Thirteen Chromium viewport widths from 320 to 1920 px passed the final layout,
font-loading, SVG text-boundary, publication-filter, keyboard, and direct-link
checks. Automated axe-core checks reported no violations in the tested states.
JavaScript-disabled reading, a blocked-font fallback, and the served CV were
also checked. Two existing IEEE Xplore links remain incompletely verified by
the automated external-link client; their original destinations are retained.

Push updates to `master` to trigger the repository's existing GitHub Pages
publishing workflow. Check its deployment result before verifying the live site.

## License

MIT. See [LICENSE](LICENSE).
