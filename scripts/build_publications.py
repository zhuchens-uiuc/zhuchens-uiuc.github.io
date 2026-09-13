#!/usr/bin/env python3
"""Render the site's research and publication blocks using only the standard library."""

import argparse
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARROW = '<svg class="link-arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 12 12 4M4 4h8v8"/></svg>'


def links_html(publication, class_name):
    labels = {"pdf": "Paper", "code": "Code", "project": "Project page"}
    links = [
        f'<a href="{escape(url, quote=True)}">{labels[key]} {ARROW}</a>'
        for key, url in publication.get("links", {}).items()
        if key in labels and url
    ]
    return f'<div class="{class_name}">{"".join(links)}</div>' if links else ""


def render_featured(feature, publication):
    status_class = "status" if publication["venue"] in {"Under review", "In preparation"} else "status published"
    links = links_html(publication, "research-links")
    illustration = (ROOT / feature['image']).read_text().strip()
    illustration = illustration.replace('<svg ', f'<svg role="img" aria-label="{escape(feature["alt"])}" focusable="false" ', 1)
    return f'''<article class="research-item" id="{escape(publication['id'])}" aria-labelledby="heading-{escape(publication['id'])}">
          <figure class="research-image">{illustration}</figure>
          <div class="research-copy">
            <div class="research-topline"><span class="research-topic">{escape(feature['topic'])}</span><span class="{status_class}">{escape(publication['venue'])}</span></div>
            <h3 id="heading-{escape(publication['id'])}">{escape(feature['name'])}</h3>
            <p>{escape(feature['summary'])}</p>
            <p class="research-result">{escape(feature['result'])}</p>
            {links}
          </div>
        </article>'''


def render_publication(publication):
    authors = ", ".join(
        f"<strong>{escape(author)}</strong>" if "Zhuchen Shao" in author else escape(author)
        for author in publication["authors"]
    )
    return f'''<li id="pub-{escape(publication['id'])}" data-category="{escape(publication['category'])}">
                <h3>{escape(publication['title'])}</h3>
                <p class="pub-authors">{authors}</p>
                <p class="pub-venue">{escape(publication['venue'])}</p>
                {links_html(publication, 'pub-links')}
              </li>'''


def replace_block(html, name, content):
    content = "\n".join(line.rstrip() for line in content.splitlines())
    start = f"<!-- BEGIN GENERATED {name} -->"
    end = f"<!-- END GENERATED {name} -->"
    if html.count(start) != 1 or html.count(end) != 1:
        raise ValueError(f"Expected one pair of {name} markers in index.html")
    before, rest = html.split(start, 1)
    _, after = rest.split(end, 1)
    return f"{before}{start}\n{content}\n        {end}{after}"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Fail if the generated HTML is stale")
    args = parser.parse_args()
    data = json.loads((ROOT / "publications.json").read_text())
    publications = data["publications"]
    by_id = {publication["id"]: publication for publication in publications}
    if len(by_id) != len(publications):
        raise ValueError("Publication IDs must be unique")
    for publication in publications:
        if publication["category"] not in {"multimodal", "medical"}:
            raise ValueError(f"Unknown category: {publication['category']}")
    for feature in data["featured"]:
        if not (ROOT / feature["image"]).is_file():
            raise ValueError(f"Missing research image: {feature['image']}")
    path = ROOT / "index.html"
    original = path.read_text()
    html = replace_block(original, "FEATURED", "\n".join(
        render_featured(feature, by_id[feature["publication"]]) for feature in data["featured"]
    ))
    html = replace_block(html, "PUBLICATIONS", "\n".join(map(render_publication, publications)))
    html = re.sub(r'(<p class="publication-count"[^>]*>).*?(</p>)',
                  rf'\g<1>{len(publications)} papers and manuscripts · * Equal contribution\g<2>', html)
    if args.check:
        if html != original:
            raise SystemExit("Generated content is stale. Run python scripts/build_publications.py")
        print(f"Generated HTML is current: {len(publications)} publications, {len(data['featured'])} featured projects.")
    else:
        path.write_text(html)
        print(f"Rendered {len(publications)} publications and {len(data['featured'])} featured projects.")


if __name__ == "__main__":
    main()
