# AduanIA — Explainer Page

A single scrolling explainer page for **AduanIA / CBP Classification Engine**,
built for the competition submission. It explains what HTS classification is,
why it's hard, lets the visitor play a guessing game that pays off with a real
CBP ruling, then shows the 8-agent reasoning chain that automates the work.

Built to the spec in `ADUANIA_PAGE_BLUEPRINT.md`.

## Run it

It's a self-contained static page — no build step, no backend.

```bash
# any static server works; for example:
python3 -m http.server 8000
# then open http://localhost:8000
```

Or just open `index.html` directly in a browser.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure & copy — all six sections + footer |
| `styles.css` | Design system (color, type, layout) and all component styles |
| `script.js`  | GSAP timelines, scroll triggers, the guessing game, sticky timeline, pipeline |

## Tech

- **Plain HTML/CSS/JS** — no framework, no UI libraries ("custom everything").
- **GSAP + ScrollTrigger** via CDN for all scroll-driven animation.
- **Fonts** (Google Fonts): Playfair Display (serif) · IBM Plex Mono (mono) · Lato (body).

If the GSAP CDN is unreachable, the page degrades gracefully — all content
stays visible and the guessing game still works (animations are skipped).
`prefers-reduced-motion` is also honored.

## Design system (from the blueprint)

```
Base #F8F6F1 · Ink #1A1A18 · Ink-light #5A5A52 · Rule #D8D4C8
Green #00C853 (now) · Coral #FF4F38 (attention) · Teal #00897B (done/verified)
```

Accents are semantic, never decorative. Flat surfaces, thin 0.5px rules, no
shadows, no gradients. 860px centered column.

## Notes

- Duty rates in **Section 2 (The Problem)** are illustrative (labeled as such on
  the page) — they exist to make the "different bucket, different rate" point,
  not as authoritative figures.
- The VR headset ruling (HQ H288838 → 9004.90.00) and the Sony SmartEyeglass
  ruling (N260535 → 9031.80) come straight from the blueprint copy.
- Section 4 (The Research Process) uses the Spade-style sticky-scroll pattern:
  the section pins and the timeline activates step by step as you scroll.

---

*For informational purposes only · does not constitute legal advice · © 2026 AduanIA*
