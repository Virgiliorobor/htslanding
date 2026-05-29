# Handoff: AduanIA — Explainer / Landing Page

## Overview
A single, long-scrolling explainer page for **AduanIA**, an AI system that performs U.S. HTS
(Harmonized Tariff Schedule) customs classification. The page tells a story in six acts:
a cinematic cold open → what the Harmonized System is → why it's hard → an interactive
"guess the classification" game (the centerpiece) → how a real classification opinion is built →
how AduanIA automates the whole chain. It ends in two CTAs.

The page is a **marketing/explainer surface**, deliberately set in a *warm architectural white*
world so it reads as editorial and confident — distinct from, but coherent with, the AduanIA
**app** itself (a dark charcoal-green "instrument console"). Coherence between the two is achieved
by (a) sharing the app's exact typefaces, (b) a muted/tactical accent palette, and (c) rendering
the **live/answer moments** (the research pipeline, a CBP ruling) as dark charcoal-green
*instrument windows* with acid-lime — literal "views into the real tool."

## About the Design Files
The files in this bundle (`AduanIA Landing.html` + `landing/*.css` + `landing/landing.js`) are
**design references created in plain HTML/CSS/JS with GSAP** — a working prototype showing the
intended look, motion, and behavior. They are **not** meant to be shipped verbatim. The task is to
**recreate these designs in your target environment** (e.g. React/Next + your CSS solution), using
your established component patterns, animation library, and conventions. If no front-end
environment exists yet, pick the most appropriate one and implement the designs there.

GSAP + ScrollTrigger drives the scroll animations here. You may keep GSAP or substitute your
stack's equivalent (Framer Motion, CSS scroll-driven animations, IntersectionObserver) as long as
the choreography described below is preserved.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, motion, and copy are all intended as
shown. Recreate pixel-faithfully. The only "placeholder" elements are the **CSS line-drawing
diagrams** (avocado, smartwatch, VR headset, cargo ship) — these are intentional thin-line
"technical instrument" illustrations, not stand-ins for photography. Keep them as vector/CSS line
art (or re-draw as SVG in the same style); do **not** swap in emoji or stock images.

---

## Run it

It's a self-contained static page — no build step, no backend.

```bash
# any static server works; for example:
python3 -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser. Requires internet access for the two Google Fonts
(Newsreader, JetBrains Mono) and GSAP + ScrollTrigger (CDN); if those are blocked the page still
renders all content (animations are skipped).

## Files
- `index.html` — full page markup (all six sections + footer). *(In this bundle the prototype HTML
  is served as `index.html`; the design handoff also refers to it as "AduanIA Landing.html".)*
- `landing/landing.css` — design tokens, typography, base layout, buttons, the `.console`
  instrument-window component, reveal/diagram primitives.
- `landing/sections.css` — per-section component styles (cold open, builder, problem grid, game,
  ruling, timeline, metrics, pipeline) + responsive rules.
- `landing/landing.js` — GSAP wiring: cold-open timeline, orbit chip placement, scroll reveals,
  builder, game state machine + ruling print, scrubbed timeline, count-up counters, pipeline runner.

---

## Design Tokens

### Color — warm-white page (light surfaces)
| Token | Hex | Use |
|---|---|---|
| `--base` | `#F8F6F1` | page background (warm white, never pure white) |
| `--base-panel` | `#FFFFFF` | contrast white — the game section background |
| `--base-strip` | `#F0EDE5` | light gray product strip (game product hero) |
| `--ink` | `#1A1A18` | near-black primary text |
| `--ink-light` | `#5A5A52` | secondary text |
| `--ink-faint` | `#8C887C` | tertiary text / captions / corner ticks |
| `--rule` | `#D8D4C8` | dividers & borders |
| `--rule-soft` | `#E6E2D8` | faint track (e.g. confidence bar base on light) |
| `--teal` | `#1D7D70` | **confirmed / verified / cited** (muted, tactical) |
| `--teal-soft` | `rgba(29,125,112,.08)` | teal fill wash |
| `--coral` | `#C0593C` | **attention / US-specific** (muted brick, NOT a hot pop) |
| `--coral-soft` | `rgba(192,89,60,.07)` | coral fill wash |
| `--green` | `#6C7E2B` | olive — light-bg echo of the tool's lime (rarely used) |

### Color — dark instrument window (the "console", lifted from the app)
| Token | Hex | Use |
|---|---|---|
| `--c-bg` | `#161B13` | console base (deep charcoal-green) |
| `--c-panel` | `#1E2519` | elevated console surface |
| `--c-fg` | `#EDF0E4` | console primary text |
| `--c-soft` | `#D2D7C5` | console body text |
| `--c-muted` | `#A4AB90` | console labels / secondary |
| `--c-faint` | `#7B8169` | console de-emphasis |
| `--c-lime` | `#D9F37A` | **THE LIVE SIGNAL** — happening now / the answer |
| `--c-cyan` | `#8FD4D8` | citations / results / sources |
| `--c-rust` | `#C9624A` | eliminated / contradiction |
| `--c-clay` | `#E0995F` | caution |
| `--c-line` | `rgba(233,237,224,.13)` | console hairline borders |

### Accent semantics (enforce these — they are not decorative)
- **teal** = confirmed & verified. **coral/rust** = needs attention / US-specific.
- **acid-lime** appears *only inside the dark instrument windows* and marks exactly one thing:
  what's live now, or the answer. Never put lime on a warm-white surface.

### Typography (shared 1:1 with the AduanIA app)
- **Serif — `Newsreader`** (Google). Weights 400/500/600 + italic. Used for: headlines, the
  resolved HTS code on light surfaces, italic "kicker" lines, prose/body, verdicts. *Authority &
  human judgment.*
- **Mono — `JetBrains Mono`** (Google). Weights 400/500/600/700. Used for: all HTS codes, ruling
  numbers, labels, section eyebrows, console output, captions, buttons. *The machine & its data.*
- **Law:** if text is a conclusion or argument → serif. If it's a value the machine produced →
  mono. No third typeface (the earlier draft used Lato; it was dropped for coherence).

Type scale (clamps are `min, vw, max`):
- Section headline `.headline`: `clamp(30px, 4.4vw, 46px)`, weight 400, line-height 1.16,
  letter-spacing -0.015em. **Headlines are never bold — size carries weight.**
- Cold-open headline: `clamp(22px, 3.3vw, 34px)`, line-height 1.32, max-width 21ch.
- Kicker (serif italic): `clamp(22px, 2.8vw, 30px)`.
- Lead paragraph: `clamp(19px, 2vw, 23px)`, weight 400, line-height 1.6.
- Body base: 18px / line-height 1.7, serif.
- Section label / eyebrow `.label`: mono 11px, weight 500, letter-spacing 0.28em, uppercase,
  color `--teal`.
- HTS codes (big): mono 500. Cold-open code `clamp(38px,7.5vw,66px)` teal; final/console code
  `clamp(30px,5.5vw,50px)` lime.

### Spacing & layout
- Content column max-width `--maxw: 860px`, centered. Wide variant 1180px.
- Horizontal padding `--pad: 40px` (→ 24px under 760px).
- Section vertical padding `clamp(72px, 10vw, 110px)`, with a `0.5px solid var(--rule)` top border
  between sections.
- No drop shadows on light surfaces; flat fills only. No gradients (except the console's faint grid
  mask and the lime glow on the final code).
- Easing: entries `cubic-bezier(0.16,0.84,0.30,1)` ("ease-out"); exits
  `cubic-bezier(0.55,0,0.78,0.30)` ("ease-in"). Durations 0.4–0.85s. Nothing bounces.

### Recurring motifs
- **Corner ticks / brackets**: small L-shaped corner marks (9–11px) on diagrams, answer cards, and
  console windows — the "technical instrument" signature. Light surfaces use `--ink-faint`; console
  windows use `--c-lime`.
- **Console window** (`.console`): `--c-bg` panel, 1px `--c-line` border, faint blueprint grid
  (`::after`, two 1px linear-gradients at 38px, radial-masked from top), lime corner brackets, an
  optional header bar (`.console-bar`: pulsing lime `live-dot` + mono caps label + right-aligned
  `.bar-status` in lime), and a `.console-body`.

---

## Screens / Views (sections, top to bottom)

### 0 — Cold Open  *(full viewport, `data-screen-label="00 — Cold Open"`)*
- **Purpose:** cinematic hook; introduce the core idea (one product, many names, one number).
- **Layout:** single centered column (`.cold-inner`, absolutely centered in a 100vh / min 660px
  stage; children `flex: none` so none compress). Stack: orbit → headline → bridge → code → label.
  A `.scroll-hint` ("SCROLL" + a 1px vertical line) sits at the bottom. A cargo-ship line drawing
  glides across the very bottom (`.ship-track` / `#ship`).
- **Components:**
  - **Avocado** (`.avocado`, SVG, ~108×142): thin-line cross-section — pinched-neck pear
    silhouette (`--ink` 1.6px stroke, `--base` fill), inner flesh ring (`--rule` 1.2px), and a pit
    circle (`--teal` 1.6px stroke, `--teal-soft` fill), plus a small stem.
  - **Orbiting language chips** (`.chip-orbit`, injected by JS): 8 flag-emoji + word pairs placed
    on a circle (radius 42% of a `min(264px,52vw)` orbit box). Mono 12px, `--ink-light`.
    Pairs: 🇺🇸 avocado · 🇨🇳 鳄梨 · 🇹🇷 avokado · 🇩🇪 Avocado · 🇯🇵 アボカド · 🇧🇷 abacate · 🇫🇷 avocat · 🇮🇳 मक्खनफल.
  - **Headline** (serif, the long avocado question — see copy below).
  - **Bridge** (serif italic, `--ink-light`): "Because someone had a very good idea."
  - **Code** (`.cold-code`, mono `--teal`): `0804.40`, assembled digit-by-digit; each digit is a
    `<span class="d">`. Label below (`.cold-code-label`, mono caps `--ink-faint`):
    "Every avocado · Every country · One number".
  - **Cargo ship** (`#ship`): tiny line-drawing — trapezoid hull, deck line, 4 container boxes of
    varying heights, a bridge block; `--ink` 1.2–1.5px strokes, `--base` fills, opacity 0.5.

### 1 — The System  *(`01 — The System`)*
- **Purpose:** explain the Harmonized System.
- **Components:** eyebrow `01 — THE SYSTEM`; headline "In 1988, the World Customs Organization did
  something kind of insane."; two lead paragraphs; an **HTS code builder**; a legend; a closing
  lead paragraph; a serif-italic kicker "Simple enough, right? Here's where it gets interesting."
- **HTS code builder** (`.builder`): one big mono row of 5 segments `08 04 .40 .20 00`. Each segment
  (`.code-seg`, `clamp(28px,5vw,52px)`) has a 3px underline drawn via `::after` `scaleX(0→1)`.
  Underline colors: first three `--teal` (universal, all countries), `.20` `--coral` (US tariff
  line), `00` `--ink-faint` (statistical suffix). A caption + a legend with three swatches explains
  the colors.

### 2 — The Problem  *(`02 — The Problem`)*
- **Purpose:** the rulebook is from 1988; modern products don't fit.
- **Layout:** intro leads, then a 2-col grid (`.prob-grid`, `1fr 1.1fr`; stacks under 760px,
  diagram first).
- **Components:** **smartwatch diagram** (`.smartwatch`, CSS line art: rounded case + screen, two
  band stubs, a crown, a teal "?" centered) inside a corner-tick `.diagram`; a right column with a
  kicker question and four **heading cards** (`.heading-card`) — `9102 / 8517 / 9029 / 8471`, each
  with a mono code, a title, and a `--coral` "duty rate" badge. Closing kicker "That someone is a
  trade attorney…".

### 3 — Your Turn (the Guessing Game) — **CENTERPIECE**  *(`03 — Your Turn`)*
- **Purpose:** the emotional core. Let the visitor guess a real classification, get it "wrong,"
  then reveal the surprising correct answer with the actual CBP ruling.
- **Surface:** this whole section sits on `--base-panel` (pure white) with hairline top/bottom rules
  to set it apart.
- **Components:**
  - **Product hero** (`.product-hero`, on `--base-strip`): a **VR headset diagram** (`.vr`, CSS line
    art — rounded visor, two teal lens circles, nose cutout, a head-strap arc), product name
    "VRSE · VIRTUAL REALITY HEADSET KIT" (mono caps teal) + description.
  - Headline "Okay. What is this?" (centered serif).
  - **Answer grid** (`.answer-grid`, 2×2; 1-col under 760px). Four `.answer-card` buttons, each with
    corner ticks, a mono teal chapter label, a serif name, and a mono rationale:
    - `Chapter 95 — Video Game Console — "You use it to play games. Makes sense."`
    - `Chapter 85 — Smartphone Accessory — "It literally needs a phone to function."`
    - `Chapter 90 — Goggles — "Like ski goggles? Seriously?"`  ← **correct** (`data-correct="true"`)
    - `Chapter 84 — Computer Peripheral — "It runs software and processes data."`
  - **Game hint** (`.game-hint`, serif italic) appears under the grid on a wrong guess.
  - **Ruling print-out** (`.ruling.console`) — a **dark instrument window** that lives inside the
    correct card and prints row-by-row when solved. Header bar "● CBP BINDING RULING … VERIFIED".
    Rows (mono key/value; the code `9004.90.00` and the word "is" are lime `.em`): Ruling
    `HQ H288838`, Date `January 19, 2021`, Product, Classification `9004.90.00 — Spectacles, goggles
    and the like — other`, Duty Rate `2.5%`, Reasoning.
  - **Reveal block** (`.reveal-block`, hidden until solved): verdict "Goggles. 9004.90.00." (serif,
    `--teal`), three explanatory paragraphs, and a **Sony footnote card** (`.sony-card`, left
    `--coral` border) about ruling `N260535` (`9031.80`).

### 4 — The Research  *(`04 — The Research`)*
- **Purpose:** show the rigorous 6-step method, then the economic punchline.
- **Components:** eyebrow + headline "So how do you actually figure this out?"; a lead; a
  **vertical timeline** (`.timeline`) of 6 steps. The spine (`.spine`) is a `--rule` line; a
  `.spine-fill` (`--teal`) grows top→down tied to scroll progress; each `.step` has a numbered
  `.dot` that fills teal when the fill passes it. Then a **metric callout** (`.metrics`, 3-col:
  metric / serif-italic "vs" / metric): `$2,000 – $5,000 · Attorney opinion · Days of work`
  **vs** `~$15 · AduanIA · Minutes`. Numbers count up on entry.

### 5 — The Solution  *(`05 — The Solution`)*
- **Purpose:** AduanIA runs the whole chain automatically.
- **Components:** eyebrow + headline "We built a system that runs the whole chain automatically.";
  two leads; then the **pipeline instrument window** (`.solution-console.console`) — the marquee
  dark window, echoing the app's "Sequence Analysis" screen. Header bar "● SEQUENCE ANALYSIS · TRUE
  WIRELESS EARBUDS … RUNNING" (flips to "RESOLVED"). Eight `.pipe-row`s, each a dot + mono step +
  mono cyan result. Dots cycle pending (faint ring) → active (lime, pulsing) → done (lime, glow).
  Results print as each completes:
  `→ classification sheet / 4 candidates / 1 excluded / narrowed to 2 / Ch. 84, 85 / 3 matched / complete`.
  Below: a **confidence bar** (`.conf`, lime fill to 92%, % counts up) and the **final code**
  (`.final-code`, lime with a soft glow) `9004.90.00` + meta "confidence HIGH · supporting rulings:
  3 · contradicting: 0". CTAs (`.cta-row`, outside the window): `[ See how it works → ]` (teal
  outline) and `[ View a sample memo → ]` (coral outline).

### Footer
Serif-italic wordmark "AduanIA"; mono caps "CBP CLASSIFICATION ENGINE"; a short rule; mono caps
disclaimer "FOR INFORMATIONAL PURPOSES ONLY · THIS ANALYSIS DOES NOT CONSTITUTE LEGAL ADVICE ·
© 2026 ADUANIA".

---

## Interactions & Behavior

### Cold open (autoplays once on load, GSAP timeline)
1. Avocado scales/fades in (0.8s). 2. Language chips fade in, staggered (~0.7s). 3. Hold ~1s.
4. Headline rises + stays (0.85s). 5. Bridge rises + stays (after 0.5s). 6. Hold ~0.7s.
7. Chips dissolve. 8. Code digits print in, staggered (0.32s each). 9. Label rises.
Nothing is destroyed except the chips — the avocado, question, and code all remain on screen at
rest. A safety timeout (`forceShow`) reveals the full resolved composition if the timeline never
runs (e.g. backgrounded tab stalling `requestAnimationFrame`). The cargo ship glides left→right on
a slow 26s repeating loop.

### Scroll reveals (everywhere)
Elements with `.reveal` fade up (opacity 0→1, y 12→0, 0.65s, staggered) when they enter the
viewport (ScrollTrigger.batch at "top 86%"). Provide a reduced-motion path that simply shows them.

### Section 1 builder
On entering (`top 72%`), the 5 code segments reveal sequentially (~420ms apart), each drawing its
colored underline.

### Section 3 game (state machine)
- State: `solved` (bool), `wrongCount` (int). All cards become `disabled` once solved.
- **Wrong guess:** card flashes a brick-coral inset border, a `.game-hint` line fades in (cycles
  "Good instinct — but not quite." → "Reasonable guess. Still not it." → "You'd think so. Customs
  disagrees."), then the card folds out left (`translateX(-110%)`, opacity 0, 0.55s) and is removed
  from layout.
- **Correct guess (Goggles):** the other three cards fold out and collapse from the grid; the
  correct card expands full-width (`grid-column: 1 / -1`), its name turns teal, and a teal border
  draws clockwise around it (four edges animate in sequence, ~0.3s each). ~0.7s later the ruling
  window prints row-by-row (~220ms per row). After it finishes, the reveal block fades up and the
  Sony card slides in from the right. (All reveal/print end-states have a safety fallback so they
  can't get stuck if `rAF` stalls.)

### Section 4 timeline
Scroll-scrubbed: `.spine-fill` height = scroll progress through the timeline (trigger top 64% →
bottom 72%); each step's dot activates when the fill passes ~`(i+0.6)/6`. Metric numbers count up
once (1.6s, ease-out) on entry. `$2,000 – $5,000` is rendered via a prefix string + a counting
upper bound; `~$15` counts to 15.

### Section 5 pipeline
On entry (`top 68%`, once): rows run sequentially — each goes active (~620ms, lime pulse) then done
(lime, prints its cyan result), advancing to the next. After the last, the confidence bar fills to
92% (1.5s) with the % counting up, the header status flips to "Resolved", and the final lime code +
meta fade in (held hidden until then).

### Global
- `html { scroll-behavior: smooth }`; CTA "See how it works →" links to `#top`.
- "View a sample memo →" currently points at `ADUANIA.html` (the app) — repoint to the real
  memo/app route in production.
- Full reduced-motion support: `prefers-reduced-motion: reduce` disables smooth scroll and shows all
  `.reveal` content immediately; the cold open and all sequences fall back to final states.

## State Management
Minimal, all local/ephemeral:
- **Game:** `solved`, `wrongCount`, and per-card `dismissed/disabled` flags.
- **Pipeline / timeline / counters / cold open:** purely view animation state driven by scroll
  position or a one-shot timeline; no data fetching. The page is fully self-contained — no backend,
  no API calls. (In the real app, the pipeline/ruling windows would be fed by the live classification
  data, but on this page they are scripted to a fixed demo: VR headset → `9004.90.00`, and the
  pipeline narrates a "true wireless earbuds" run.)

## Responsive behavior
- `--pad` drops to 24px under 760px.
- `.prob-grid` and `.answer-grid` collapse to one column under 760px (diagram first in the problem
  grid; correct answer card spans the single column).
- `.metrics` stacks to one column; the ruling key/value rows stack.
- Cold open clamps keep the composition within ~660px tall; very short viewports clip gracefully.
- All type uses `clamp()` so it scales fluidly.

## Assets
**None external.** All imagery is CSS/SVG line art drawn inline (avocado, smartwatch, VR headset,
cargo ship, all icons/dots/ticks). The only external dependencies are the two Google Fonts
(Newsreader, JetBrains Mono) and GSAP + ScrollTrigger (CDN). Flag glyphs are Unicode emoji.

> Coherence note: the dark "console" tokens, the corner-bracket frame, the blueprint grid, the
> live-dot pulse, and the Newsreader + JetBrains Mono pairing are all taken directly from the
> AduanIA app's existing design system — reuse the app's real tokens/components for these in the
> codebase rather than re-deriving them.
