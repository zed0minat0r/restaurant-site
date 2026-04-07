# Ember & Oak — Round 8 Audit

**Auditor:** Nigel (strict British auditor)
**Date:** 2026-04-06
**Device perspective:** Real diner on a phone (375px iPhone, first visit)
**Scoring anchor:** 5.0 = average restaurant template, 7.0 = better than most restaurant sites

---

## Score History

| Round | Date       | Score   | %     |
|-------|------------|---------|-------|
| R7    | 2026-04-01 | 43.7/60 | 72.8% |
| R8    | 2026-04-06 | 45.0/60 | 75.0% |

---

## Changes Since Last Audit (R7)

- CSS consolidation: dead comments removed, duplicate rules merged
- Testimonial visual upgrade: featured card with pull-quote mark, warm gradient background
- Newsletter inline CTA: border separators, wider padding, better line-height
- Meta URL fixes: OG, Twitter Card, and Schema.org URLs now point to actual GitHub Pages
- Specials badge overlap fix
- Specials card border consolidation (mobile-only rule merged to base)
- General spacing/typography refinements

**Assessment of changes:** These are all polish moves. The meta URL fixes are important for SEO/sharing -- glad those are done. The testimonial visual upgrade adds tasteful differentiation without bloating the page. The CSS consolidation is good housekeeping. Incremental but meaningful improvement.

---

## Category Scores

### 1. DESIGN -- 7.5/10

**What works:**
- Colour palette is cohesive and premium: dark charcoal, gold accents, warm cream. Feels like an upscale-casual restaurant, not a template.
- Typography pairing (Playfair Display + Inter) is solid and appropriate for the brand.
- Hero gradient overlay is atmospheric without being garish.
- Section-to-section visual rhythm is good -- alternating bg/bg-surface creates breathing room.
- The ember divider diamond detail is a nice touch, subtle and on-brand.
- Gallery texture overlays (diagonal lines, dot grid, crosshatch) add visual variety to placeholder tiles.
- Featured testimonial pull-quote treatment is well executed.
- Light/dark theme both work well.

**What needs work:**
- Still no real photography anywhere. The CSS gradient placeholders are clever but a real diner will notice immediately. Placeholder-heavy sites feel unfinished. This is the single biggest limiter on the design score.
- The CSS flame illustration in the story section, while technically impressive, reads as "dev project" rather than "restaurant." Real diners want to see a photo of the hearth, not a CSS recreation.
- Gallery section is five coloured rectangles with SVG icons. On a phone, this is the weakest visual section -- a real diner would scroll past it.
- Story section text alignment shifts from center (mobile) to left (desktop) -- fine, but on mobile those three long paragraphs of centred text are hard to read. Long centred text blocks are a known readability issue.

**Deductions:** -1.5 for placeholder-only visuals, -0.5 for centred long-form text readability, -0.5 for flame illustration not feeling authentic.

### 2. CONTENT -- 8.0/10

**What works:**
- Menu descriptions are concise, evocative, and credible. "Hand-cut tenderloin, cured egg yolk, capers, dijon, crostini" -- that reads like a real menu.
- Chef Marcus and sommelier Elena are named consistently, creating real characters.
- Testimonials feel authentic with specific details (anniversary dinner, "weekly Tuesday spot").
- The Hearth kitchen pulse messages are contextually aware (pre-service, active service, closed, Monday). Smart.
- Urgency messaging in reservations is context-aware and not obnoxious.
- Private events copy is practical and specific (seats 12-45, A/V available, custom menus).
- Happy hour details are clear and specific ($10 cocktails, $8 wines, half-off starters).

**What needs work:**
- Three paragraphs of story text on mobile is a lot. Could be tightened to two.
- The "500+ five-star reviews" claim in the testimonials header is unverifiable on a demo site. Slightly undermines credibility.
- Specials section says "Tonight" and "What Marcus Is Cooking" -- this is static content that will read as stale on repeat visits unless actually updated.
- No mention of parking, which matters enormously for Philadelphia diners.

**Deductions:** -1.0 for story length, -0.5 for static "tonight" specials that aren't dynamic, -0.5 for missing practical info (parking).

### 3. UX / MOBILE EXPERIENCE -- 7.5/10

**What works:**
- Mobile sticky bottom bar (Call Us / Reserve) is well implemented -- appears after scrolling past hero, doesn't obscure content.
- Hamburger nav with overlay, outside-click-to-close, and link-click-to-close: proper mobile pattern.
- Menu swipe gestures with directional slide animations: excellent mobile interaction.
- Swipe hint shows only on touch devices: smart.
- Live open/closed status badge: genuinely useful for a diner checking at 8pm.
- Reservation form validates Monday (closed), shows inline errors with accessible aria attributes.
- Form success state is rich and informative (confirmation number, formatted date, call-to-confirm action).
- Back to top button positioned above mobile bar -- no overlap.
- Safe area insets for iPhone notch/home bar: covered.
- 44px minimum tap targets throughout: properly handled.
- Font-size: 16px on mobile inputs prevents iOS zoom: covered.
- prefers-reduced-motion: fully implemented, removes all animations.
- prefers-color-scheme: auto light mode supported.

**What needs work:**
- Section order on mobile: Hero > Hearth > Specials > Menu > Story > Hours > Gallery > Testimonials > Events > Reservations. That is 10 sections to scroll through before reaching the reservation form. A diner who wants to book has to scroll a LOT. The mobile bar helps, but the journey is long.
- Gallery section is between Hours and Testimonials -- an odd position. Most diners care about hours/reviews more than placeholder photos.
- The newsletter inline CTA between Testimonials and Events is easy to miss on fast scrolling.
- No email field in the reservation form. Phone-only contact feels limiting.
- The story section centred long text on mobile requires more effort to read than left-aligned.

**Deductions:** -1.0 for long scroll to reservation, -0.5 for section ordering, -0.5 for missing email in reservation, -0.5 for centred long-form text on mobile.

### 4. TECHNICAL -- 8.0/10

**What works:**
- Schema.org Restaurant structured data: complete with hours, address, cuisine, price range.
- Open Graph + Twitter Card meta: properly configured with correct URLs now.
- Font preloading with swap strategy prevents invisible text flash.
- Skip-to-content link for screen readers.
- ARIA roles on tablist, tabpanel, live regions (hours status, hearth, form success).
- Defensive null checks on all DOM elements in JS.
- Passive event listeners on scroll/touch events.
- No jQuery, no frameworks -- vanilla JS at 778 lines.
- CSS is single file, no build step, mobile-first media queries.
- No external dependencies beyond Google Fonts.
- forceReveal fallback animation if JS fails to fire within 2s -- good resilience.
- XSS protection: user name in success state goes through textContent, not innerHTML.

**What needs work:**
- 3011 lines of CSS for a single-page site. There are duplicated blocks (gallery single-column mobile declared twice at lines 2766-2777 and 2915-2925). The CSS could be ~20% smaller with deduplication.
- `ember-glow` keyframe is defined twice (lines 158 and 2469) with slightly different values. This is a bug -- the second definition silently overrides the first.
- The hearth message rotation (setInterval every 6s) runs indefinitely even when the tab is in the background. Consider using IntersectionObserver or visibility API.
- No service worker or offline capability.
- No lazy loading on any elements (though with no images currently, this is less critical).
- The urgency "tables left" number is randomly generated on each page load -- a savvy diner who reloads will notice it changes. Slightly undermines trust.

**Deductions:** -1.0 for CSS duplication/bloat, -0.5 for duplicate keyframe definition, -0.5 for random urgency number.

### 5. CONVERSION -- 7.5/10

**What works:**
- Primary CTA in hero ("Reserve a Table") is clear and prominent.
- Mobile sticky bar provides persistent Reserve access.
- Micro-CTAs between sections guide the user downward (Specials > Menu CTA, Menu > Story CTA, Story > Hours CTA).
- Urgency messaging in reservation section is contextual and not aggressive.
- Happy hour callout gives a reason to visit today.
- Newsletter CTA in footer with clear value prop ("one email per menu change -- never more").
- Newsletter inline CTA between testimonials and events catches the "not ready to book" crowd.
- Specials section creates FOMO ("Limited -- 6 per evening").
- Gallery CTA ("See yourself here? Reserve Your Evening") is well-placed.
- Reservation form success shows actionable next steps (View Menu, Call to Confirm).

**What needs work:**
- No Google Maps embed. The map placeholder with a grid pattern is functional but a real map would increase trust and show proximity.
- Phone number is a demo number (555-0142). Obviously a portfolio constraint, but worth noting.
- Social media links go to "#" -- dead links erode trust on a live site.
- No email field in reservation form means the restaurant can't follow up digitally.
- Private events section has email and phone CTAs but no quick inquiry form -- high friction for event leads.

**Deductions:** -1.0 for no real map, -0.5 for dead social links, -0.5 for no email in reservation, -0.5 for high-friction events inquiry.

### 6. SIMPLICITY / ELEGANCE -- 6.5/10

**What works:**
- No carousels, no parallax, no loading spinners. Good.
- Menu tabs are clean and functional.
- Scroll reveal (anim-fade) is subtle: 16px translateY with 0.5s ease. Not over-the-top.
- Hero fade-up sequence is tasteful -- staggered but quick (0.2s to 1s).
- Colour palette is restrained: gold, cream, dark, wine. No unnecessary colours.
- No hover-dependent features -- all interactions work on touch.

**What needs work -- and this is where I apply the rules strictly:**

**Animation inventory (12 keyframes, 6 infinite animations):**
1. `ember-glow` on section divider diamond -- infinite, subtle. ACCEPTABLE.
2. `fadeUp` x6 on hero elements -- one-time entry. ACCEPTABLE.
3. `scrollBounce` on hero scroll hint -- infinite. ACCEPTABLE (standard pattern).
4. `menuFadeIn` / `menuSlideFromRight` / `menuSlideFromLeft` -- tab transition. ACCEPTABLE per rules (menu/accordion transitions allowed).
5. `flicker1` / `flicker2` / `flicker3` -- CSS flame animation. Three INFINITE flickering animations. This is the problem.
6. `statusPulse` on open status dot -- infinite. Borderline.
7. `ember-glow` on hearth pulse dot -- infinite, plus the message fade-out/in every 6 seconds.
8. `forceReveal` -- safety fallback. Fine.

**Total infinite animations running simultaneously: 7** (3 flame flickers + ember-glow diamond + scrollBounce + statusPulse + hearth ember). That is too many moving things on screen at once.

The flame illustration alone accounts for 3 infinite keyframe animations. Per the rules: "SIMPLICITY IS KING -- Do NOT add animations, keyframes, hover transforms, glows, pulses, shimmers, bounces, or lifts. Only allowed: scroll reveal fade-in and menu/accordion transitions."

The flame flickers, status pulse, hearth ember glow, and section divider glow are all technically violations. They are subtle, I will grant that, but the cumulative effect is a page that is always moving somewhere. That is not "elegant and calm."

**Additional simplicity concerns:**
- 10 sections plus hearth bar plus footer plus mobile sticky bar = a lot of page. Not cluttered, but dense.
- Three micro-CTAs between sections (Specials>Story, Menu>Hours, Testimonials>Newsletter) add navigation noise.
- The gallery section with 5 placeholder tiles adds length without visual payoff.

**Deductions:** -1.5 for flame flicker animations (3 infinite), -0.5 for accumulated infinite animations (7 total), -0.5 for page density, -1.0 for gallery placeholders adding length without value.

---

## TOTAL SCORE: 45.0 / 60 (75.0%)

| Category    | Score  |
|-------------|--------|
| Design      | 7.5/10 |
| Content     | 8.0/10 |
| UX/Mobile   | 7.5/10 |
| Technical   | 8.0/10 |
| Conversion  | 7.5/10 |
| Simplicity  | 6.5/10 |
| **TOTAL**   | **45.0/60** |

**Delta from R7:** +1.3 points (43.7 -> 45.0)

---

## Top 3 Priorities for Next Round

### 1. REPLACE PLACEHOLDERS WITH REAL IMAGES (Design +1.5, Simplicity +0.5)
The single most impactful change. Replace the CSS gradient gallery tiles with actual photographs (or high-quality stock). Replace the CSS flame illustration with a real hearth photo. Even 3-4 well-chosen images would transform the site from "impressive dev project" to "restaurant I want to visit." Use `loading="lazy"` and WebP format with JPEG fallback.

### 2. KILL THE FLAME FLICKER ANIMATIONS (Simplicity +1.0)
The 3 infinite flame animations in the story section violate the simplicity rules. Replace the animated CSS flame with either a static SVG flame icon or (better) a real photo. This removes 3 keyframe definitions and 3 infinite animations, bringing the total infinite animations from 7 to 4 -- much calmer.

### 3. LEFT-ALIGN STORY TEXT ON MOBILE (UX +0.5, Design +0.5)
Three long paragraphs of centre-aligned text on a 375px screen is genuinely harder to read. Left-align the story body text on mobile (keep the heading and label centred if desired). Consider trimming to two paragraphs while you are at it.

---

## Additional Recommendations (in priority order)

4. **Deduplicate CSS** -- Remove the duplicate gallery mobile block (lines 2915-2925 repeat lines 2766-2777). Fix the duplicate `ember-glow` keyframe definition.
5. **Add email field to reservation form** -- Lets the restaurant confirm digitally, not just by phone.
6. **Consider section reordering** -- Move Gallery below Events or remove it until real photos exist. Current order makes the user scroll past empty visuals.
7. **Add parking info** -- Even one line in the Hours section ("Street parking available, garage at 8th & Market" or similar).
8. **Make social links go somewhere real** -- Dead `#` links are worse than no social links at all. Remove them or point to placeholder social profiles.

---

*Audit complete. The site has improved incrementally since R7. The CSS consolidation and meta fixes are solid housekeeping. The testimonial visual upgrade adds polish without bloat. But the fundamental blockers remain: no real photography and too many infinite animations. Fix those two things and this site jumps from 75% to 80%+ territory.*

-- Nigel
