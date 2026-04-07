# Ember & Oak -- Round 9 Audit

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

---

## Changes Since Last Audit (R8)

- All flame flicker animations killed (7 infinite reduced to 1)
- Story/events text left-aligned on mobile
- CSS flame replaced with static SVG
- Duplicate CSS blocks removed
- Email field added to reservation form
- Dead social links in footer replaced with Hours summary
- 117+ lines of dead CSS removed (3011 -> 2890)
- Story condensed to 2 paragraphs
- Parking info added to Hours section

**Assessment of changes:** This is the most impactful single round of changes I have seen. Every item directly addressed a specific deduction from R8. The animation purge alone fixes the biggest simplicity blocker. The story text left-alignment, email field, and social link cleanup each recover points across multiple categories. This is disciplined, targeted work.

---

## Category Scores

### 1. DESIGN -- 7.5/10

**What works:**
- Colour palette remains cohesive and premium: dark charcoal, gold accents, warm cream.
- Typography pairing (Playfair Display + Inter) is solid.
- Hero gradient overlay is atmospheric.
- Section-to-section visual rhythm with alternating backgrounds creates breathing room.
- The ember divider diamond is a nice on-brand detail.
- Gallery texture overlays (diagonal lines, dot grid, crosshatch) add variety to placeholder tiles.
- Featured testimonial pull-quote treatment is well executed.
- Light/dark theme both work well.
- Static SVG flame in the story section is cleaner than the animated CSS version -- feels intentional rather than showing off.

**What still needs work:**
- Still no real photography anywhere. This remains the single biggest limiter. A diner sees coloured rectangles, not a restaurant. This cap will hold design at 7.5 until real images exist.
- Gallery section is five textured rectangles with SVG icons -- weakest visual section on mobile.
- CSS flame illustration, even as a static SVG, still reads as "dev project" to a civilian. A photo of the hearth would be better.

**Deductions:** -1.5 for placeholder-only visuals, -0.5 for gallery lacking visual payoff, -0.5 for SVG flame vs. real photo.

**Delta from R8:** 0 (no change -- the improvements here were about animation removal, not visual assets)

### 2. CONTENT -- 8.5/10

**What works:**
- Menu descriptions are concise, evocative, and credible throughout.
- Chef Marcus and sommelier Elena create consistent, believable characters.
- Testimonials have specific, authentic-feeling details.
- Hearth kitchen pulse messages are contextually aware across all time slots.
- Urgency messaging is contextual and not obnoxious.
- Private events copy is practical and specific.
- Happy hour details are clear and actionable.
- Story condensed to 2 paragraphs -- much tighter, every sentence earns its place.
- Parking info now present ("Street parking available, Garage at 8th & Market") -- this matters for real diners in Philadelphia.

**What still needs work:**
- The "500+ five-star reviews" claim in the testimonials header is unverifiable on a demo site.
- Specials section says "Tonight" with static content that will read stale on repeat visits.

**Deductions:** -0.5 for static "tonight" specials, -0.5 for unverifiable review claims, -0.5 for general portfolio-vs-real limitations.

**Delta from R8:** +0.5 (story tightened, parking info added)

### 3. UX / MOBILE EXPERIENCE -- 8.0/10

**What works:**
- Mobile sticky bottom bar (Call Us / Reserve) appears after hero, provides persistent access.
- Hamburger nav with overlay, outside-click-to-close, link-click-to-close: proper mobile pattern.
- Menu swipe gestures with directional slide animations: excellent mobile interaction.
- Swipe hint shows only on touch devices.
- Live open/closed status badge is genuinely useful.
- Reservation form validates Monday closures, shows inline errors with ARIA attributes.
- Email field now present in reservation form -- the restaurant can follow up digitally.
- Form success state is rich (confirmation number, formatted date, call-to-confirm action).
- Back to top button positioned above mobile bar.
- Safe area insets for iPhone notch/home bar: covered.
- 44px minimum tap targets throughout.
- Font-size: 16px on mobile inputs prevents iOS zoom.
- prefers-reduced-motion: fully implemented.
- Story text is now left-aligned on mobile -- significantly easier to read.
- Events text is left-aligned on mobile -- same improvement.

**What still needs work:**
- 10 sections to scroll before the reservation form. The mobile bar mitigates this, but the journey is still long.
- Gallery section between Hours and Testimonials is still an odd position for placeholder-only content.
- Newsletter inline CTA between Testimonials and Events is easy to miss during fast scrolling.

**Deductions:** -1.0 for long scroll to reservation, -0.5 for section ordering, -0.5 for gallery placeholder section adding length without visual reward.

**Delta from R8:** +0.5 (left-aligned text on mobile, email field added)

### 4. TECHNICAL -- 8.0/10

**What works:**
- Schema.org Restaurant structured data: complete with hours, address, cuisine, price range.
- Open Graph + Twitter Card meta: properly configured.
- Font preloading with swap strategy.
- Skip-to-content link for screen readers.
- ARIA roles on tablist, tabpanel, live regions throughout.
- Defensive null checks on all DOM elements in JS.
- Passive event listeners on scroll/touch events.
- Vanilla JS, no frameworks, no external dependencies beyond Google Fonts.
- forceReveal fallback if JS fails within 2s.
- XSS protection on user input in success state.
- CSS reduced from ~3011 to 2890 lines -- dead code removed.
- Duplicate CSS blocks cleaned up.
- Email validation added with proper regex and error messaging.

**What still needs work:**
- 2890 lines of CSS for a single-page site is still hefty. Could be further trimmed.
- Hearth message rotation (setInterval every 6s) runs indefinitely even when tab is in background.
- No service worker or offline capability.
- Urgency "tables left" number is randomly generated per page load -- a reload reveals the trick.

**Deductions:** -1.0 for CSS size still being large, -0.5 for background setInterval, -0.5 for random urgency number.

**Delta from R8:** 0 (CSS cleanup was good but offset by same lingering issues)

### 5. CONVERSION -- 8.0/10

**What works:**
- Primary CTA in hero ("Reserve a Table") is clear and prominent.
- Mobile sticky bar provides persistent Reserve access.
- Micro-CTAs between sections guide the user downward.
- Urgency messaging in reservation section is contextual.
- Happy hour callout gives a reason to visit today.
- Newsletter CTA in footer with clear value prop.
- Specials section creates FOMO ("Limited -- 6 per evening").
- Gallery CTA ("See yourself here?") is well-placed.
- Email field now in reservation form -- restaurant can confirm digitally and build a contact list.
- Dead social links replaced with useful Hours info -- no more trust-eroding broken links.

**What still needs work:**
- No Google Maps embed -- the grid-pattern placeholder is functional but a real map increases trust.
- Phone number is demo (555-0142) -- portfolio constraint.
- Private events section has email and phone CTAs but no quick inquiry form.

**Deductions:** -1.0 for no real map, -0.5 for high-friction events inquiry, -0.5 for portfolio-level limitations.

**Delta from R8:** +0.5 (email field added, dead social links fixed)

### 6. SIMPLICITY / ELEGANCE -- 8.5/10

**What works:**
- No carousels, no parallax, no loading spinners.
- Menu tabs are clean and functional.
- Scroll reveal (anim-fade) is subtle: 16px translateY with 0.5s ease.
- Hero fade-up sequence is tasteful and quick.
- Colour palette is restrained: gold, cream, dark, wine.
- No hover-dependent features.

**The big improvement -- animation inventory:**

Previous R8 had 7 infinite animations running simultaneously. Now:
1. `scrollBounce` on hero scroll hint -- infinite, standard pattern. ACCEPTABLE.
2. `fadeUp` x6 on hero elements -- one-time entry. ACCEPTABLE.
3. `menuFadeIn` / `menuSlideFromRight` / `menuSlideFromLeft` -- tab transition. ACCEPTABLE per rules.
4. `forceReveal` -- safety fallback. Fine.
5. Hearth message text fades via JS (opacity transition, not keyframe animation). ACCEPTABLE.
6. Gallery staggered fade-in delays on scroll reveal -- one-time, not infinite. ACCEPTABLE.

**Total infinite animations: 1** (scrollBounce). Down from 7. This is exactly what "simplicity is king" looks like. The page is calm. Nothing is flickering, pulsing, glowing, or shimmering. The one remaining infinite animation is the scroll hint chevron, which is a universally accepted UX pattern and disappears once you start scrolling.

- Static SVG flame replaces 3 infinite flicker animations -- massive win.
- No ember-glow on the divider diamond -- it is now a static gold dot with a subtle box-shadow. Better.
- No statusPulse on the hours dot. It just sits there, coloured green or grey. Better.

**What still needs work:**
- 10 sections + hearth bar + footer + mobile bar = a lot of page. Not cluttered, but dense.
- Gallery section adds length without photographic payoff -- removing it would make the site simpler.

**Deductions:** -0.5 for page density, -0.5 for gallery placeholders adding length, -0.5 for hearth pulse text rotation (subtle but still movement).

**Delta from R8:** +2.0 (animation purge from 7 infinite to 1 is the biggest single-round improvement in any category)

---

## TOTAL SCORE: 48.5 / 60 (80.8%)

| Category    | Score  | R8    | Delta |
|-------------|--------|-------|-------|
| Design      | 7.5/10 | 7.5   | 0     |
| Content     | 8.5/10 | 8.0   | +0.5  |
| UX/Mobile   | 8.0/10 | 7.5   | +0.5  |
| Technical   | 8.0/10 | 8.0   | 0     |
| Conversion  | 8.0/10 | 7.5   | +0.5  |
| Simplicity  | 8.5/10 | 6.5   | +2.0  |
| **TOTAL**   | **48.5/60** | 45.0 | **+3.5** |

**Delta from R8:** +3.5 points (45.0 -> 48.5). First time above 80%.

---

## Top 3 Priorities for Next Round

### 1. ADD REAL PHOTOGRAPHY (Design +1.5, Conversion +0.5)
This remains the single most impactful change available. Replace even 3-4 gallery placeholders with actual photographs (stock or original). Replace the SVG flame illustration with a real hearth photo. The site looks like a polished dev project; photographs would make it look like a restaurant. Use `loading="lazy"`, WebP format with JPEG fallback, and proper `alt` text.

### 2. CONSIDER REMOVING OR CONDENSING GALLERY SECTION (Simplicity +0.5, UX +0.5)
Without real photos, the gallery section is five textured rectangles that add scroll length without value. Either: (a) replace with real photos to justify its existence, (b) merge it into a smaller visual strip, or (c) remove it entirely until photos exist. Removing it would cut scroll length and tighten the experience.

### 3. ADD A GOOGLE MAPS EMBED OR SCREENSHOT (Conversion +0.5, UX +0.5)
The map placeholder with its CSS grid pattern is clever but a real map (even a static screenshot with a link to Google Maps) would increase trust and help diners find the restaurant. This is especially important on mobile where "Get Directions" into a real map is a natural flow.

---

## Additional Recommendations (in priority order)

4. **Use IntersectionObserver for hearth messages** -- Stop the setInterval when the hearth bar is not visible. Saves battery on mobile and is better practice.
5. **Consider section reordering** -- Move Gallery below Events or remove it. Move Hours + Testimonials closer to the top, as these are the sections a diner checks first on mobile.
6. **Trim CSS further** -- 2890 lines can likely be reduced to ~2400 with careful consolidation of mobile media queries and removal of redundant property declarations.
7. **Make urgency "tables left" deterministic** -- Use the current date to seed the number so it does not change on reload. The current seed uses `getDate() + getMonth() * 31`, which is already stable per day -- good, but confirm it does not change if the diner reloads within the same visit.

---

*Audit complete. This is the strongest single-round improvement since I started tracking. The animation purge was surgical -- 7 infinite animations down to 1, exactly as recommended. The story text changes, email field, social link cleanup, and CSS trimming each directly addressed specific deductions. The site has crossed 80% for the first time. The remaining ceiling is photographic: real images would push this into 85%+ territory. Without them, the scores plateau here.*

-- Nigel
