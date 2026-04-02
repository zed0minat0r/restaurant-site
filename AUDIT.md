# Ember & Oak -- Mobile-First Audit (Round 6)

**Auditor:** Nigel -- Senior Digital Auditor
**Date:** 2026-04-01
**Perspective:** Mobile-primary (375px baseline)
**Context:** Template site for a web design business. Placeholder images, mock contact details, and simulated booking forms are expected and not penalised.
**Scoring note:** STRICT calibration. 5.0 = average template you can buy today. 6.0 = generic but competent. 7.0 = better than most commercially available templates. 8.0 = a client would choose this over competitors without hesitation. 9.0 = award-worthy. If it reads as "nice template," Design stays capped at 6.5.

---

## Scores

```json
{
  "design": 6.9,
  "content": 6.7,
  "ux": 7.5,
  "technical": 7.0,
  "conversion": 7.3,
  "simplicity": 7.2,
  "total": 42.6,
  "max_possible": 60,
  "percentage": "71.0%",
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
    }
  ]
}
```

---

## Design -- 6.9/10 (was 6.4, +0.5)

The gallery redesign is the most visible change. Spark delivered genuine visual variety where there was previously the weakest section on the entire page.

**What improved:**
- Gallery is no longer five identical rectangles. Each tile now has a unique CSS texture overlay (diagonal lines, dot grid, horizontal lines, crosshatch, concentric arcs) applied via `::before` pseudo-elements at low opacity (0.08) with `mix-blend-mode: overlay`. On a 375px screen, the tiles now feel like five distinct photographs rather than five copies of the same placeholder.
- Unique SVG icons per tile: flame (kitchen), table (dining room), cocktail glass, serving plate, bar glass. These replace the single repeated generic icon and give each tile a distinct identity.
- Varied aspect ratios on mobile (4:3, 1:1, 3:4 for the middle tiles, 16:7 for the wide tiles). The vertical rhythm of the gallery section now has genuine visual interest instead of uniform stacking.
- Staggered animation delays (0-0.32s) give tiles an organic cascade rather than a simultaneous pop-in.
- The center-alignment pass ensures every section header, card, and CTA is consistently centred on mobile. No more left-drifting headers or off-centre cards. This is a polish detail that elevates the overall feel.
- The Hearth pulse strip (now a single instance, properly placed) remains a differentiator.

**What still holds it back from 7.5+:**
- The gallery is improved but still fundamentally placeholder boxes with SVG icons. When real photography goes in, this section could jump significantly. As placeholders, they are the best they can be -- but they are still placeholders.
- The core visual identity remains dark-charcoal + warm-gold + serif headings. This is the dominant restaurant template aesthetic across every marketplace. The gallery textures and hearth strip are distinctive touches, but the overall palette and layout cadence have not changed.
- Section rhythm is still predominantly centred-header-into-card-grid. Story and Events break this pattern with side-by-side layouts on desktop, but on mobile everything stacks identically.
- Light mode is still "dark mode, lighter." 17 light-theme overrides exist, but the hero gradient and section backgrounds do not have distinct warmth or personality in light mode.
- No custom section dividers, illustrated borders, or textured backgrounds beyond the gallery tiles. The 80px gold line remains the only visual punctuation between sections.

**What would push it to 7.5+:**
A considered light mode palette (not just variable swaps). A textured or photographic background on the Story section. Custom section dividers that are not just gold lines. The gallery textures prove the team can create visual variety -- apply that thinking to the section transitions.

---

## Content -- 6.7/10 (was 6.6, +0.1)

No major copy changes this round. The specials CTA copy is new and well-written. Content score holds steady with a minor bump.

**What works:**
- Section headers remain strong: "What Marcus Is Cooking," "Born from Flame," "Don't Take Our Word for It," "Your Night, Our Fire," "Save Your Seat."
- The Story copy is still the standout paragraph on the entire site. Sensory, specific, human.
- The specials CTA -- "These won't last -- reserve your table" -- is concise, urgent, and correctly placed. Good conversion copy.
- The Monday reservation blocking error message ("We're closed Mondays. Please choose another day.") is clear and direct.
- Happy Hour callout, testimonials aggregate proof, and events copy with named people (Elena, Marcus) all carry from Round 5.

**What still holds it back from 7+:**
- Specials descriptions remain ingredient lists without story. Why did Marcus pick the wagyu this week? Where do the truffles come from? One sentence of provenance per dish would push specials from "menu card" to "editorial content."
- Gallery tiles have labels ("Open Kitchen & Live Fire," "Main Dining Room") but no supporting copy. A single evocative line per tile -- "Where the magic happens at 800 degrees" -- would add personality.
- Menu item descriptions are still standard ingredient lists. Signature dishes deserve a line of preparation narrative.
- No new copy in the newsletter success state. It remains a single line ("You're in. Watch your inbox.") with no expectation-setting.

---

## UX -- 7.5/10 (was 7.2, +0.3)

Three specific Round 5 bugs have been fixed: hours text clipping, missing nav scrim, and unscoped hover effects. Plus the Monday reservation blocking adds real form intelligence.

**What improved:**
- Hours text clipping fixed. The `white-space: nowrap` on `.hours__day span:last-child` has been replaced with `min-width: 0`, allowing time text to shrink within the flex container. Closing times are now fully visible on 375px screens.
- Nav overlay/scrim added. `div.nav__overlay` with `rgba(0,0,0,0.55)` background, `backdrop-filter: blur(2px)`, covers the full viewport when the mobile nav is open. This provides clear visual separation between the drawer and the page content. The `.active` class toggles display. Properly implemented.
- Monday reservation blocking prevents users from submitting reservations for closed days. Inline error on date change AND on form submit. Accessible with `role="alert"` and `aria-invalid`. The date input validates immediately on change, not just on submit.
- Hover effects are now properly scoped. The six main hover rules (links, buttons, menu tabs, footer links, social icons) are wrapped in `@media (hover: hover)`. Desktop-breakpoint hovers (nav links, menu items, section CTAs) are inside `@media (min-width: 1024px)` which prevents them from firing on mobile.
- Gallery staggered animations create a smooth cascade on scroll rather than all tiles appearing simultaneously.
- Center-alignment is consistent across all sections at 375px. No drifting headers or off-centre elements.

**What still holds it back from 8+:**
- The desktop-breakpoint hovers (lines 1630, 1644) are inside `@media (min-width: 1024px)` but not `@media (hover: hover)`. On desktop touch devices (Surface Pro, iPad with keyboard), these would trigger sticky hover states. A minor edge case, but not technically correct.
- Newsletter form remains buried deep in the footer on mobile. A visitor scrolling past Reservations into the footer is unlikely to be looking for a signup form. No separate discovery mechanism (e.g., a slide-up after X seconds, or a CTA elsewhere on the page).
- The gallery has no swipe gesture or carousel behaviour on mobile. Five tiles stacking vertically is fine, but a horizontal swipe between tiles (like the menu tabs) would improve the experience for a section designed to showcase atmosphere.
- No visible loading/skeleton states for images when real photography is added. The placeholder textures are nice, but they do not demonstrate how the page will behave during image load.

---

## Technical -- 7.0/10 (was 6.2, +0.8)

The largest category jump. Multiple Round 5 bugs have been fixed, and the codebase is structurally cleaner.

**What improved:**
- Duplicate Hearth element removed. Only one `id="hearthPulse"` and one `id="hearthMessage"` exist in the HTML. No duplicate IDs anywhere in the document (verified via grep).
- All font sizes are now >= 0.875rem (14px). The sub-14px violations flagged in Round 5 (0.7rem hearth label, 0.75rem specials badge, 0.7rem happy hour badge, 0.7rem menu tag) have all been corrected. The accessibility floor is respected throughout.
- Schedule extracted to shared `EMBER_SCHEDULE` object at line 8 of main.js. All three IIFEs (open/closed status, urgency messaging, hearth pulse) now reference this single object. A client changing hours updates one place.
- Hover effects scoped behind `@media (hover: hover)` for the six primary interactive elements.
- Nav overlay element in HTML with proper JS toggling and CSS transitions.
- Monday validation logic is well-structured: checks on date `change` event, checks on form `submit`, prevents submission, provides accessible error feedback.

**What still holds it back from 7.5+:**
- CSS is now 2,881 lines. Dead CSS remains: `.specials__accent` is defined at lines 2139-2149 (with full styling and light-mode variant), then overridden at line 2624 with `display: none`. The full definition is dead weight. Duplicate `.success__icon` definitions at lines 1222 and 2293, and duplicate `.success__conf` definitions at lines 1231 and 2298. These are likely from separate rounds of work that were not consolidated.
- `overflow-x: hidden` on `body` (line 70) still masks horizontal overflow rather than fixing root causes.
- The center-alignment pass added ~100 lines at the bottom of style.css (lines 2740-2881) as a separate audit block rather than merging rules into their original selectors. This is an accretion pattern -- each round adds rules at the end rather than editing in place. The CSS is becoming a geological record of audit rounds.
- The gallery texture CSS (lines 2652-2738) is well-written but adds significant specificity weight with `:nth-child()` selectors on each tile. When real images replace placeholders, all of this CSS becomes dead.
- No CSS minification or critical CSS extraction. 2,881 lines of CSS loads synchronously.

---

## Conversion -- 7.3/10 (was 7.0, +0.3)

The specials CTA and Monday blocking close two specific Round 5 gaps.

**What improved:**
- Specials CTA added: "These won't last -- reserve your table" with a down-arrow SVG, linking to `#reservations`. Positioned immediately below the specials grid. This captures intent at the moment of desire -- a user seeing three limited dishes with scarcity tags now has a one-tap path to booking. This was the top conversion recommendation in Round 5.
- Monday reservation blocking prevents wasted conversions. A user cannot submit a reservation for a day the restaurant is closed. The error is immediate (on date change), clear, and accessible. No silent failures.

**What carries from Round 5:**
- Newsletter capture in footer with appropriate copy.
- Happy Hour callout with badge and details.
- Contextual urgency messaging (Monday/weekend/weekday variants).
- Events section dual CTAs (email + call).
- Mobile sticky bar with Call + Reserve.
- Testimonials aggregate proof as section subhead.
- Rich post-booking success state with confirmation details.
- Micro-CTAs between sections guiding toward reservations.

**What still holds it back from 8+:**
- Newsletter success state remains a single gold line. No expectation-setting ("We send one email per menu change -- never more"), no secondary CTA ("Browse the menu while you wait"), no visual treatment matching the rich post-booking success state.
- Gallery section remains a conversion dead-end. Five atmosphere tiles with no CTA, no "Book a table" link, no "Follow us on Instagram" hook. A user inspired by the atmosphere imagery has no next action.
- The newsletter form has no discovery mechanism outside the footer. A persistent or timed prompt elsewhere on the page would capture more signups from users not ready to book.
- No phone number click-to-call tracking or event attribution. On mobile, tapping "Call" in the sticky bar is the highest-intent conversion action, but there is no way to measure it.

---

## Simplicity -- 7.2/10 (was 7.3, -0.1)

Slight dip. The codebase improvements (shared schedule, no duplicate elements) are offset by growing CSS with accretion patterns.

**What earns the score:**
- Single HTML file, single CSS file, single JS file. No build tooling.
- BEM-ish naming is consistent. A developer can navigate by convention.
- CSS custom properties make re-theming straightforward.
- JS IIFEs are clearly labelled and self-contained.
- The shared `EMBER_SCHEDULE` object is a genuine simplification -- one source of truth for hours.
- 9 sections, well within the 10-12 cap.

**What docks points:**
- CSS at 2,881 lines with dead rules (`.specials__accent` defined then hidden, duplicate `.success__icon` and `.success__conf`). The mobile center-alignment audit block (lines 2740-2881) adds rules at the end of the file rather than merging into original selectors, creating a layered accretion pattern.
- Gallery texture CSS (lines 2652-2738) is well-crafted but inherently temporary -- it will all be replaced when real images go in. ~90 lines of placeholder-specific CSS.
- The center-alignment block repeats selector patterns that already exist earlier in the file. For example, `.events__text` has `text-align` set both in its original definition and in the alignment audit block.

---

## Summary

**Round 5 to Round 6 delta: +1.9 points overall (40.7 -> 42.6). Gains across all categories except Simplicity (-0.1).**

This is the most productive round since the strict recalibration. The team addressed the top bugs and recommendations from Round 5 systematically:

| Issue from Round 5 | Status |
|---|---|
| Duplicate Hearth element + duplicate IDs | Fixed |
| Hours text clipping on 375px | Fixed |
| Font sizes below 14px | Fixed (all >= 0.875rem) |
| Schedule duplicated across 3 IIFEs | Fixed (shared EMBER_SCHEDULE) |
| Hover effects on mobile (sticky hover) | Fixed (@media hover:hover) |
| Nav missing scrim/overlay | Fixed |
| Gallery visual monotony | Fixed (textures, icons, aspect ratios) |
| No CTA in Specials section | Fixed |
| Monday reservation allowed on closed day | Fixed (validation on change + submit) |
| Center-alignment inconsistencies | Fixed (full audit pass) |

Technical had the biggest jump (+0.8) because it was dragged down in Round 5 by specific bugs that have now been resolved. Design gained +0.5 almost entirely from the gallery redesign. UX gained +0.3 from the hours fix, nav scrim, and Monday blocking. Conversion gained +0.3 from the specials CTA and Monday blocking.

### Top 3 Priority Recommendations

**1. Clean up dead and duplicate CSS (Technical + Simplicity impact)**
Remove the dead `.specials__accent` full definition (lines 2139-2149), merge duplicate `.success__icon` and `.success__conf` selectors, and fold the center-alignment audit block (lines 2740-2881) into the original selectors. This consolidation could cut 150+ lines and improve maintainability. The CSS is approaching 3,000 lines and the accretion pattern will only get worse with each round.

**2. Gallery section conversion path (Conversion + Content impact)**
Add a CTA at the bottom of the Gallery section -- "See yourself here? Reserve your evening." or a "Follow us on Instagram" link. Add one evocative line of copy per tile label. The gallery was visually transformed this round; now give it purpose in the conversion funnel. This section is currently the longest dead-end on the page.

**3. Design: break the section rhythm (Design impact)**
The gallery textures prove the team can create visual variety. Apply that thinking to section transitions. A textured background on the Story section, a custom divider element between Specials and Menu, or an asymmetric layout for Testimonials would break the centred-header-into-card-grid pattern that still dominates. One non-grid section layout would push Design past 7.0.

### Would this impress a potential client?

Getting closer. A restaurant owner scrolling on their phone would now see a page that feels intentional at every point. The gallery has personality. The booking flow is smart (blocks closed days, shows urgency). The copy has a real voice. The sticky bar makes it effortless to act. The score has crossed 70% for the first time under strict calibration. The gap is narrowing between "this is a very good template" and "this is the one I want."
