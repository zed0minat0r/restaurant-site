# Ember & Oak -- Mobile-First Audit (Round 7)

**Auditor:** Nigel -- Senior Digital Auditor
**Date:** 2026-04-01
**Perspective:** Mobile-primary (375px baseline)
**Context:** Template site for a web design business. Placeholder images, mock contact details, and simulated booking forms are expected and not penalised.
**Scoring note:** STRICT calibration. 5.0 = average template you can buy today. 6.0 = generic but competent. 7.0 = better than most commercially available templates. 8.0 = a client would choose this over competitors without hesitation. 9.0 = award-worthy. If it reads as "nice template," Design stays capped at 6.5.

---

## Scores

```json
{
  "design": 7.3,
  "content": 7.0,
  "ux": 7.6,
  "technical": 7.1,
  "conversion": 7.6,
  "simplicity": 7.1,
  "total": 43.7,
  "max_possible": 60,
  "percentage": "72.8%",
  "score_history": [
    {
      "date": "2026-03-30",
      "round": 1,
      "scores": { "design": 5, "content": 5, "ux": 7, "technical": 7, "conversion": 4, "simplicity": 8 },
      "total": 36,
      "percentage": "60%"
    },
    {
      "date": "2026-03-30",
      "round": 2,
      "scores": { "design": 7, "content": 7, "ux": 8, "technical": 7, "conversion": 7, "simplicity": 8 },
      "total": 44,
      "percentage": "73%"
    },
    {
      "date": "2026-03-30",
      "round": 3,
      "scores": { "design": 8, "content": 7, "ux": 8, "technical": 8, "conversion": 8, "simplicity": 8 },
      "total": 47,
      "percentage": "78%"
    },
    {
      "date": "2026-03-30",
      "round": 4,
      "auditor_note": "Strict recalibration. Previous rounds inflated scores by treating incremental improvements as category-level jumps.",
      "scores": { "design": 6.3, "content": 6.0, "ux": 6.8, "technical": 6.5, "conversion": 6.5, "simplicity": 7.5 },
      "total": 39.6,
      "percentage": "66%"
    },
    {
      "date": "2026-03-30",
      "round": 5,
      "auditor_note": "Re-audit against latest source and screenshots. New bugs (duplicate hearth element, duplicate IDs) offset gains in Content, UX, Conversion.",
      "scores": { "design": 6.4, "content": 6.6, "ux": 7.2, "technical": 6.2, "conversion": 7.0, "simplicity": 7.3 },
      "total": 40.7,
      "percentage": "67.8%"
    },
    {
      "date": "2026-04-01",
      "round": 6,
      "auditor_note": "Significant fixes landed: duplicate hearth element removed, font sizes all >= 0.875rem, schedule extracted to shared JS object, hours clipping fixed, nav scrim added, hover effects scoped, gallery redesigned with varied textures/icons/aspect-ratios, specials CTA added, Monday reservation blocking added, full center-alignment pass completed. Technical jumps the most (+0.8). Design moves up on gallery visual variety alone.",
      "scores": { "design": 6.9, "content": 6.7, "ux": 7.5, "technical": 7.0, "conversion": 7.3, "simplicity": 7.2 },
      "total": 42.6,
      "percentage": "71.0%"
    },
    {
      "date": "2026-04-01",
      "round": 7,
      "auditor_note": "Multi-agent sprint: Builder added newsletter rich success state, Spark replaced section dividers with ember diamond motif, Refiner shipped CSS cleanup (-108 lines) + gallery CTA + story rhythm break, Pixel did menu stacking/specials border/footer alignment/form fixes, QA ran full Playwright suite (11/12 passed). Design benefits most from diamond dividers + story textured background. Conversion benefits from newsletter success state upgrade + gallery CTA.",
      "scores": { "design": 7.3, "content": 7.0, "ux": 7.6, "technical": 7.1, "conversion": 7.6, "simplicity": 7.1 },
      "total": 43.7,
      "percentage": "72.8%"
    }
  ]
}
```

---

## Design -- 7.3/10 (was 6.9, +0.4)

The ember diamond dividers and story section rhythm break are the two changes that move the needle here. Combined, they address the biggest Round 6 callout: "the only visual punctuation between sections is an 80px gold line."

**What improved:**
- Ember diamond section dividers replace the plain gold gradient bar. The `section-header__line` now uses `::before` for a fading gold line and `::after` for a rotated 5px diamond with a subtle `ember-glow` keyframe animation (opacity + box-shadow breathing at 3s). This is a genuinely distinctive motif -- it is not a standard template flourish. It reads as intentional brand identity, not decoration.
- Story section has a textured background: dual radial gradients (gold-tinted, 3-4% opacity) create subtle warmth behind the copy. Top and bottom `::before`/`::after` pseudo-elements add 1px gold gradient lines with 0.2 opacity. This breaks the uniform dark-background cadence at exactly the right moment -- after three data-heavy sections (Specials, Menu, Micro-CTA), the Story section now feels like a pause, not just the next card.
- Gallery CTA is visually clean -- "See yourself here?" in heading font followed by an outline button. Completes the gallery section visually rather than leaving it as a dead-end.
- Specials cards on mobile now use a top gold border instead of left border, which is correct for center-aligned stacked cards at 375px. Small detail, but it shows consistency.

**What still holds it back from 8.0:**
- The palette remains dark-charcoal + warm-gold + serif headings. The diamond dividers and story background add brand personality, but the fundamental colour story has not evolved. A client comparing this to five other restaurant templates on ThemeForest would still see a familiar structure.
- Light mode is still a variable-swap of dark mode. The hero gradient, story background, and section warmth do not have distinct light-mode personality. `[data-theme="light"]` overrides exist (~20) but they are mostly colour flips, not mood shifts.
- The testimonials section on mobile is three stacked cards of identical structure -- no visual variety, no pull-quote treatment, no photographic element. It is the least visually interesting section on the page now that gallery and story have been upgraded.
- No photographic or illustrative backgrounds anywhere. The site is entirely CSS-generated visuals. This is appropriate for a template, but it means the design is doing all its work with typography, colour, and subtle gradients -- a high ceiling, but one that is approaching its limit.

---

## Content -- 7.0/10 (was 6.7, +0.3)

The newsletter success state copy is the big content win this round. It crosses the 7.0 threshold because the copy now has genuine voice and sets expectations at every conversion touchpoint.

**What improved:**
- Newsletter success state now has real copy: "You're in. Welcome to the inner circle." followed by "We send one email per menu change -- never more." This directly addresses the Round 6 callout ("single gold line with no expectation-setting"). The expectation-setting line is excellent -- it pre-empts the unsubscribe instinct and feels like a promise, not a disclaimer.
- The secondary CTA "Browse the Menu" after newsletter signup is smart content strategy -- it keeps the user engaged rather than leaving them at a dead-end confirmation.
- Gallery CTA copy "See yourself here? / Reserve Your Evening" is evocative and action-oriented. It works because it speaks to aspiration, not transaction.

**What carries from previous rounds:**
- Section headers remain strong and distinctive.
- Story copy is still the best paragraph on the site.
- Specials CTA urgency copy is well-placed.
- Happy Hour callout, testimonials with sources, events copy with named people.

**What still holds it back from 7.5:**
- Specials descriptions are still ingredient lists. The Dry-Aged Tomahawk description is 25 words of preparation narrative, which is better than a simple list, but the Spring Pea Risotto and Wagyu Tataki read more like menu line items. One sentence of provenance per dish -- where the wagyu is sourced, why Marcus picked peas this week -- would elevate these from menu to editorial.
- Menu item descriptions across all four tabs remain standard ingredient lists with no narrative. For a template, this is acceptable, but signature dishes deserve a line of personality.
- Gallery tile labels are single descriptive phrases with no supporting copy. "Open Kitchen & Live Fire" tells you what it is but not what it feels like. One evocative line per tile would match the voice established in Story.

---

## UX -- 7.6/10 (was 7.5, +0.1)

Small bump. The Pixel fixes (menu stacking, specials border swap, footer alignment, form centering) are all polish corrections that prevent minor friction. QA passing 11/12 Playwright tests confirms the interactive elements are functionally sound.

**What improved:**
- Menu items on narrow mobile (sub-480px) now properly stack and center: name, price, description, and tags are all centered with `flex-wrap: wrap` and `justify-content: center`. The dot-leader between name and price is hidden on narrow screens (correct -- it only works with horizontal layout).
- Specials cards switch from left-border to top-border on mobile, matching the center-aligned layout.
- Form inputs and selects have `font-size: 16px` to prevent iOS zoom on focus -- a critical mobile UX detail.
- Footer newsletter form collapses to column layout below 400px.
- Newsletter success state has `role="status"` and `aria-live="polite"` for screen reader announcement.
- 11/12 Playwright tests passing means the core interactive flows (nav, menu tabs, reservation form, theme toggle, scroll animations) are working.

**What still holds it back from 8.0:**
- The 1 failing Playwright test needs investigation. If it is a real regression, it is a real UX issue.
- Gallery still has no swipe/carousel behavior on mobile. Five vertically stacked tiles with varied aspect ratios are better than five identical rectangles, but a horizontal swipe would match user expectations for an image gallery on a phone.
- Newsletter form is still only discoverable in the footer. A user who scrolls past reservations is unlikely to be newsletter-hunting. The rich success state is great -- but only if the user finds the form.
- Desktop-breakpoint hovers (inside `@media (min-width: 1024px)` blocks) are still not wrapped in `@media (hover: hover)`. On desktop touch devices, these could produce sticky hover states. Minor edge case.

---

## Technical -- 7.1/10 (was 7.0, +0.1)

Refiner's CSS cleanup removed ~108 lines, which partially addresses the accretion problem. But new CSS was added (newsletter success, diamond dividers, story background, Pixel mobile fixes), so net CSS went from 2,881 to 2,866 -- only a 15-line net reduction. The accretion pattern continues.

**What improved:**
- Duplicate `.success__icon` and `.success__conf` definitions from Round 6 have been resolved -- only one instance of each remains (lines 1255, 1264).
- The dead `.specials__accent` full definition (previously lines 2139-2149) has been replaced with a comment noting removal (`/* .specials__accent -- removed */` at line 2222). However, `display: none` on `.specials__accent` still exists at line 2680. The HTML still has `.specials__accent` elements (lines 132, 144, 156) with inline `--hue` styles. So the element exists in HTML, is hidden by CSS, and the full styling is commented out. This is half-cleaned -- the HTML elements should be removed too.
- Ember diamond divider CSS is well-structured: 40 lines of clean, purposeful CSS with a single keyframe animation. No specificity issues.
- Story rhythm break CSS is clean: 30 lines using pseudo-elements for textured background and gold border lines.
- Newsletter success state CSS is properly scoped under `.newsletter-success` with BEM naming.

**What still holds it back from 7.5:**
- CSS is still 2,866 lines. The mobile center-alignment audit block (lines 2799-2867) remains appended at the end of the file rather than merged into original selectors. This block alone is ~70 lines of rules that duplicate selector patterns from earlier in the file.
- `overflow-x: hidden` on `body` (line 70) is still masking horizontal overflow rather than fixing root causes.
- `.specials__accent` elements remain in HTML (3 instances) with inline styles, hidden by `display: none` at line 2680. Dead HTML + dead CSS.
- Gallery texture CSS (lines ~2720-2793) is ~70 lines of placeholder-specific styles with `:nth-child()` selectors. All of this becomes dead when real images replace placeholders.
- No CSS minification. 2,866 lines load synchronously. For a template demo this is acceptable, but for production it would need a build step.
- Open Graph URLs still point to `https://your-domain.com` (lines 13-14 of index.html). Template placeholder, but noted.

---

## Conversion -- 7.6/10 (was 7.3, +0.3)

Three improvements compound here: newsletter rich success state, gallery CTA, and the Pixel mobile form fixes. The conversion funnel is now complete from hero to footer with no dead-end sections.

**What improved:**
- Newsletter success state is now a genuine conversion moment: heading ("You're in. Welcome to the inner circle."), expectation-setting ("We send one email per menu change -- never more."), and a secondary CTA ("Browse the Menu") that keeps the user in the funnel. This was the #1 conversion recommendation in Round 6, and it has been properly executed.
- Gallery CTA ("See yourself here? / Reserve Your Evening") closes the gallery as a conversion dead-end. Every section on the page now either has a CTA or leads naturally into the next section.
- Mobile form inputs at 16px prevent iOS zoom, which is a conversion micro-fix -- any form friction on mobile costs conversions.
- Specials top-border on mobile keeps the card hierarchy visually clear when center-aligned.

**What carries from previous rounds:**
- Specials CTA with urgency copy.
- Monday reservation blocking with accessible error.
- Mobile sticky bar with Call + Reserve.
- Happy Hour callout and contextual urgency messaging.
- Rich post-booking success state with confirmation details.
- Micro-CTAs between sections guiding toward reservations.
- Testimonials aggregate proof as social validation.

**What still holds it back from 8.0:**
- Newsletter form has no discovery mechanism outside the footer. A slide-up after 30 seconds of scrolling, or a "Stay in the loop" CTA in the testimonials section, would capture users not ready to book. The success state is excellent -- the form just needs more eyeballs.
- No click-to-call tracking or event attribution on the mobile sticky bar. The "Call Us" button is the highest-intent conversion action on mobile, but there is no way to measure it.
- Events section dual CTAs (email + call) are correct, but there is no form or calendar for event inquiries. A simple "Tell us about your event" form would capture leads more effectively than an email link.
- The 1 failing Playwright test could indicate a broken conversion flow -- needs investigation.

---

## Simplicity -- 7.1/10 (was 7.2, -0.1)

Another slight dip. Refiner's cleanup removed duplication, but new features (diamond dividers, newsletter success, story background, Pixel mobile block) added CSS. The accretion pattern -- each round appending rules at the end -- continues to erode maintainability.

**What earns the score:**
- Single HTML file, single CSS file, single JS file. No build tooling.
- BEM-ish naming is consistent throughout, including new additions (`.newsletter-success__heading`, `.gallery__cta-text`).
- CSS custom properties make re-theming straightforward.
- JS IIFEs are clearly labelled and self-contained. Newsletter success handler is clean (17 lines).
- Shared `EMBER_SCHEDULE` object remains a single source of truth.
- 9 sections, well within the 10-12 cap.
- Ember diamond CSS is clean and self-contained (~40 lines).

**What docks points:**
- CSS at 2,866 lines with the tail-end audit block (lines 2799-2867) still appended rather than merged. Selectors like `.events__text`, `.story__text`, `.testimonials__card` have `text-align` set both in their original definitions and in this block.
- `.specials__accent` is a three-layer mess: HTML elements exist (3 divs with inline `--hue` styles), the full CSS definition was removed (replaced with a comment at line 2222), but `display: none` remains at line 2680. Either remove the HTML elements or remove the CSS entirely.
- Gallery placeholder CSS (~70 lines of `:nth-child()` texture selectors) is inherently temporary and will be replaced wholesale when real images go in. This is not a simplicity problem per se, but it is code that has a known expiration date.
- 50 instances of `text-align: center` across the CSS. Some of these are genuinely needed (section headers, mobile stacking), but the count suggests over-specification. A few inherited `text-align: center` rules at the section level would replace many per-element declarations.

---

## Summary

**Round 6 to Round 7 delta: +1.1 points overall (42.6 -> 43.7). Gains in Design (+0.4), Content (+0.3), UX (+0.1), Technical (+0.1), Conversion (+0.3). Simplicity dips (-0.1).**

This was a productive multi-agent sprint. The team addressed three of the top four Round 6 recommendations:

| Recommendation from Round 6 | Status |
|---|---|
| Clean up dead and duplicate CSS | Partially done. Duplicate `.success__icon`/`.success__conf` fixed. `.specials__accent` half-cleaned (CSS commented out, but HTML elements + `display: none` remain). Audit block not merged. Net CSS reduction only 15 lines. |
| Gallery section conversion path | Done. Gallery CTA with "See yourself here? / Reserve Your Evening" added. Gallery is no longer a dead-end. |
| Break the section rhythm | Done. Ember diamond dividers replace plain gold lines. Story section has textured background with gold border lines. Two distinct visual breaks now exist in the page flow. |
| Newsletter success state (from earlier rounds) | Done. Rich success with heading, expectation-setting, and secondary CTA. |

### Top 3 Priority Recommendations

**1. Finish the CSS cleanup (Technical + Simplicity impact, est. +0.3 each)**
Three specific tasks: (a) Remove the 3 `.specials__accent` div elements from index.html and the `display: none` rule at line 2680 of style.css. (b) Merge the mobile center-alignment audit block (lines 2799-2867) into original selectors and delete the block. (c) Audit `text-align: center` instances -- many per-element declarations could be replaced by inherited section-level rules. Target: CSS under 2,700 lines.

**2. Upgrade the testimonials section visually (Design + Content impact, est. +0.3 Design)**
Testimonials is now the weakest visual section. Three identical stacked cards with no variety. Options: (a) Make the middle card a pull-quote with larger type and gold accent border. (b) Add a subtle background treatment (similar to story section). (c) Add one line of context per quote ("Sarah has been a regular since 2020"). The gallery and story upgrades prove the team can break visual monotony -- apply the same thinking here.

**3. Newsletter form discovery (Conversion impact, est. +0.2)**
The newsletter success state is excellent, but the form is buried in the footer. Add a secondary entry point: a "Stay in the loop" inline CTA after the testimonials section, or a subtle slide-up after 20s of scrolling. The form only converts if people find it.

### Would this impress a potential client?

Getting closer, and the progress is visible. A restaurant owner scrolling on their phone would see: distinctive diamond dividers (not generic), a warm story section with visual presence, a smart booking flow, and a page that feels intentionally center-aligned at every point. The score has reached 72.8% under strict calibration -- the highest since the recalibration. The gap between "very good template" and "this is what I want" is narrowing. The next big jump requires either (a) visual variety in the testimonials and events sections, or (b) real photography replacing placeholders, which would unlock multiple categories simultaneously.
