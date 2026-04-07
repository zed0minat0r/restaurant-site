# Ember & Oak -- Round 10 Audit

**Auditor:** Nigel (strict British auditor)
**Date:** 2026-04-06
**Device perspective:** Real diner on a phone (375px iPhone, first visit)
**Scoring anchor:** 5.0 = average restaurant template, 7.0 = better than most restaurant sites

---

## Score History

| Round | Date       | Score   | %     | Delta  |
|-------|------------|---------|-------|--------|
| R7    | 2026-04-01 | 43.7/60 | 72.8% | --     |
| R8    | 2026-04-06 | 45.0/60 | 75.0% | +1.3   |
| R9    | 2026-04-06 | 48.5/60 | 80.8% | +3.5   |
| R10   | 2026-04-06 | 49.5/60 | 82.5% | +1.0   |

---

## Changes Since Last Audit (R9)

- Gallery section removed entirely (-282 CSS lines) -- good decision, those placeholder rectangles added scroll without value
- Google Maps iframe embed added to Hours section -- addresses R9's #3 priority directly
- Hearth message rotation optimised with IntersectionObserver -- addresses R9's recommendation #4
- Unverifiable "500+ reviews" claim removed -- honest, good
- CSS consolidated further (-48 more lines), now 2536 total
- Campfire illustration rebuilt as animated SVG with SMIL path-morphing flames (user-requested feature)

---

## Category Scores

### 1. DESIGN -- 8.0/10 (was 8.0)

**What works:**
- Colour system remains best-in-class. Gold/dark/cream palette is cohesive and warm.
- Typography hierarchy (Playfair + Inter) is excellent.
- Light/dark theme both look polished.
- Hero gradient layering is sophisticated without being heavy.
- The new campfire SVG illustration is genuinely attractive. The three-layer flame with gradient fills (outer red-gold, mid orange-gold, inner bright core) looks premium. The spark particles are a nice touch. This fits the brand perfectly -- it looks like a restaurant logo illustration, not a code demo.

**What holds it back:**
- Still zero real photography anywhere. The coloured gradient strips on menu items are a smart placeholder but they are still placeholders. A real diner scrolling through wants to see what the food looks like. This is the single biggest design gap.
- Events section has a grey "Your event photo here" placeholder. That reads as unfinished.
- The campfire animation uses SMIL `<animate>` elements with `repeatCount="indefinite"` -- three flame shapes morphing plus three spark particles. That is 9 perpetual animations in one SVG. Per the AGENT-RULES, simplicity is king and animations should be penalised. However, the user explicitly requested this animated campfire, so I will not deduct for its existence. I will note: the animation is smooth, on-brand, and uses `prefers-reduced-motion: reduce` to disable it. Well implemented.

**No change from R9.** The gallery removal is a net positive (removed empty visual weight) but the Maps embed and campfire SVG are lateral -- they replace what was there rather than adding photography.

### 2. CONTENT -- 8.5/10 (was 8.5)

**What works:**
- All copy remains tight, specific, and voice-consistent.
- Chef Marcus and Elena feel like real people with backstory.
- Menu descriptions are appetising and concise.
- Testimonials cite specific dishes and have named sources with platforms.
- Removing the "500+ reviews" claim was the right call. The testimonials now stand on their own without an unverifiable aggregate stat.
- Hearth messages are well-written, context-aware (open/closed/Monday/pre-service), and rotate on a sensible 6-second interval.

**What holds it back:**
- "Confirmation: EO-XXXXXX" on form submit gives a mock confirmation number. This could confuse a real diner into thinking the reservation is confirmed when it is a static page.
- The urgency bar ("Only X tables left tonight") uses a seeded random number. It is not real inventory data. On a static GitHub Pages site this is inherently fabricated scarcity. It is softened by context-aware messaging (different on Mondays, when closed, etc.) but it remains a borderline trust issue.
- Footer hours say "Tue-Sun: 5 PM-10 PM" which is inaccurate -- Friday/Saturday close at 11 PM, Sunday opens at 4 PM. This is a factual error that has persisted across multiple rounds.

**No change from R9.** Footer hours discrepancy should be fixed.

### 3. UX -- 8.5/10 (was 8.5)

**What works:**
- Mobile-first structure is solid. Nav slide-in, overlay, outside-tap-to-close all work.
- Menu tabs with swipe gestures, ARIA tablist, keyboard arrow navigation -- excellent.
- Swipe hint shows only on touch devices and auto-dismisses on first swipe.
- Live open/closed status badge with green dot is genuinely useful for a diner.
- Monday reservation blocking with inline error is a smart UX guard.
- Google Maps embed is a real improvement. A diner can now see the location and tap "Get Directions" -- this is the #1 thing people check on a restaurant site after the menu.
- IntersectionObserver on hearth rotation prevents unnecessary work when scrolled away. Good for battery life on mobile.
- Back-to-top button, smooth scroll with nav offset, safe-area-inset-bottom -- all correct.
- Scroll animations use a 2-second CSS fallback to force-reveal if JS fails. Smart defensive pattern.

**What holds it back:**
- The Maps iframe uses approximate coordinates (`39.9526, -75.165`) and an encoded `0x0:0x0` place ID. On the live site this will show a generic pin in Centre City Philadelphia rather than the actual restaurant. A real Google Maps embed with a proper place ID would be more useful.
- No "scroll to top" after form submission -- on mobile, the success state replaces the form but the user's viewport might still be mid-form. A scroll into view would polish this.
- 10 sections + hearth bar + newsletter CTA + footer = a lot of scroll on mobile. The gallery removal helped, but the page is still long.

**No change from R9.** The Maps embed addresses a prior gap but the generic coordinates limit its value.

### 4. TECHNICAL -- 8.5/10 (was 8.0, +0.5)

**What works:**
- HTML is semantic, well-structured, valid.
- Schema.org Restaurant structured data is complete and correct.
- Open Graph + Twitter Card meta tags present with proper content.
- Font loading uses `rel="preload"` with `onload` swap and `<noscript>` fallback -- best practice.
- CSS is now 2536 lines (down from 3011 two rounds ago). That is meaningful trimming.
- JS is well-organised, uses IIFE isolation, defensive null checks throughout.
- All form inputs have labels, ARIA attributes, and `role="alert"` on errors.
- `prefers-reduced-motion` and `prefers-color-scheme` media queries both handled.
- SVG campfire uses `prefers-reduced-motion` to suppress animation. Correct.
- IntersectionObserver for hearth messages + visibility change listener to pause in background tabs. Proper resource management.
- Maps iframe uses `loading="lazy"` and `referrerpolicy="no-referrer-when-downgrade"`. Good.
- Tap targets are all 44px minimum. Form inputs use `font-size: max(16px, 1rem)` to prevent iOS zoom.

**What improved:**
- CSS reduction from gallery removal and further consolidation. 2536 lines for a site of this complexity is reasonable.
- IntersectionObserver replaces always-on setInterval for hearth. Direct response to R9 recommendation.

**What holds it back:**
- SMIL animations (`<animate>` in SVG) have inconsistent browser support historically, though modern browsers handle them. A CSS animation fallback would be more robust, but this is minor.
- `scroll-behavior: smooth` in CSS plus JS `scrollTo({ behavior: 'smooth' })` is redundant -- the JS smooth scroll handles the nav offset, so the CSS version could cause double-smoothing. Very minor.
- No service worker, no manifest.json -- not a PWA. Not required but would be nice for a restaurant site (offline menu access).

**+0.5 from R9** for the IntersectionObserver improvement and continued CSS diet.

### 5. CONVERSION -- 8.0/10 (was 7.5, +0.5)

**What works:**
- Clear CTA hierarchy: hero -> specials -> menu -> hours -> testimonials -> events -> reservations. The funnel makes sense.
- Mobile sticky bottom bar with "Call Us" and "Reserve" is the most important conversion element on the page. Appears after hero scroll, uses proper touch targets.
- Micro-CTAs between sections ("These won't last -- reserve your table", "Plan your visit") gently guide without being pushy.
- Happy Hour callout in the Hours section is a genuine draw for a casual visitor.
- Newsletter capture in footer with honest "one email per menu change" promise.
- Google Maps embed adds trust. A diner who can see where the restaurant is physically located is more likely to book.
- Reservation form is comprehensive but not overwhelming: date, time, party, name, email, phone, special requests.

**What improved:**
- Maps embed directly supports "is this real / where is it" conversion questions. This was R9's #3 priority and it has been addressed.

**What holds it back:**
- No phone number visible in the hero or above the fold (it is in the sticky bar, but only after scrolling past the hero). A diner who lands and wants to call immediately has to scroll or find it in the footer.
- Events section CTA ("Email About Events") opens a mailto link. Many mobile users do not have a default mail client configured. A contact form or at minimum a phone number as primary CTA would convert better.
- Still no real photos. For a restaurant, appetising photography is the #1 conversion lever. A diner deciding between two restaurants will pick the one where they can see the food.

**+0.5 from R9** for the Maps embed adding location trust.

### 6. SIMPLICITY -- 8.0/10 (was 8.0)

**What works:**
- Gallery removal was the right call. Removing those 282 CSS lines and the HTML section tightened the page meaningfully.
- 48 more CSS lines consolidated. The site is leaner than it has ever been.
- Section count is now manageable: Hero, Hearth, Specials, Menu, Story, Hours, Testimonials, Newsletter CTA, Events, Reservations, Footer. That is ~10 sections, within the 10-12 cap.
- No gratuitous animations (scroll reveal fade-in is the only JS-driven animation aside from menu tab transitions).
- The campfire SVG animation is the one exception -- 9 SMIL animate elements with indefinite repeat. On its own this is over-animation per the rules. However, the user explicitly requested it, it respects `prefers-reduced-motion`, and it is a single contained illustration rather than page-wide visual noise. I will not penalise, but I note it pushes the boundary.

**What holds it back:**
- 2536 lines of CSS for a single-page site is still substantial. Some duplication remains (e.g., `.story__layout` is defined twice in the 768px breakpoint with identical `gap: 4rem`; `.story__illustration` is also defined twice in the 768px breakpoint).
- The JS hearth message system with 4 message pools, seeded shuffle, IntersectionObserver, and visibility change listeners is a lot of complexity for a ticker. It works well, but it is engineering beyond what a restaurant site needs.
- The reservation form success state dynamically builds DOM with 15+ elements. A hidden HTML block toggled visible would be simpler and more maintainable.

**No change from R9.** Gallery removal is good, but the campfire SVG animation and hearth system complexity balance it out.

---

## FINAL SCORES -- ROUND 10

| Category    | R9   | R10  | Delta |
|-------------|------|------|-------|
| Design      | 8.0  | 8.0  | --    |
| Content     | 8.5  | 8.5  | --    |
| UX          | 8.5  | 8.5  | --    |
| Technical   | 8.0  | 8.5  | +0.5  |
| Conversion  | 7.5  | 8.0  | +0.5  |
| Simplicity  | 8.0  | 8.0  | --    |
| **TOTAL**   | **48.5/60** | **49.5/60** | **+1.0** |
| **%**       | **80.8%** | **82.5%** | **+1.7pp** |

**Delta from R9:** +1.0 points (48.5 -> 49.5). New high score.

---

## Top 3 Priorities for Next Round

### 1. ADD REAL PHOTOGRAPHY (Design +1.5, Conversion +1.0)
This has been the #1 recommendation for three consecutive rounds because it remains the single highest-impact change. Replace even 2-3 items with real food photos (stock or original). Replace the events placeholder with a real dining room photo. Use `loading="lazy"`, WebP with JPEG fallback, proper `alt` text, and `srcset` for responsive sizes. Photography is what separates a polished template from a restaurant site that makes you hungry.

### 2. FIX FOOTER HOURS DISCREPANCY (Content +0.25)
The footer states "Tue-Sun: 5 PM-10 PM" but the actual hours are: Tue-Thu 5-10, Fri-Sat 5-11, Sun 4-9. This is a factual error on a live site. A diner who checks the footer and shows up at 10:30 on a Friday expecting to be turned away, or arrives at 4:30 on a Sunday expecting to wait, gets the wrong information. Quick fix, high trust impact.

### 3. TRIM REMAINING CSS DUPLICATION (Simplicity +0.25, Technical +0.25)
The 768px media query defines `.story__layout` twice (both with `gap: 4rem`) and `.story__illustration` twice (both with identical sizing). These are easy deduplication wins. A careful pass could likely trim another 30-50 lines without any visual change.

---

## Additional Recommendations (in priority order)

4. **Use a real Google Maps place ID** -- The current embed uses generic coordinates. A proper place embed with a real place ID would show the restaurant name, reviews, and directions natively.
5. **Add phone number above the fold** -- Either in the nav or hero subtitle. Many diners want to call immediately.
6. **Simplify reservation success state** -- Move the success HTML into the document as a hidden block rather than building 15+ DOM elements in JS.
7. **Consider reducing hearth message system complexity** -- The 4 message pools, seeded shuffle, IntersectionObserver, and visibility change API are well-engineered but over-built for a ticker. A simpler rotation would be easier to maintain.

---

*The changes this round were mostly about consolidation and fulfilling R9 recommendations: gallery removal, Maps embed, IntersectionObserver. All good moves. The campfire SVG is well-crafted and on-brand -- it pushes the animation boundary but the user wanted it and it is implemented responsibly (reduced-motion respected, contained to one element). The site is now at 82.5%, its highest score. The remaining ceiling is photographic. Real food and dining room photos would push Design and Conversion into the 9s. Without them, scores plateau here.*

-- Nigel
