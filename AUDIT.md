# Ember & Oak -- Mobile-First Audit (Round 4)

**Auditor:** Nigel -- Senior Digital Auditor
**Date:** 2026-03-30
**Perspective:** Mobile-primary (375px baseline, tested mentally across breakpoints)
**Context:** Template site for a web design business. Placeholder images, mock contact details, and simulated booking forms are expected and not penalised.
**Scoring note:** Recalibrated to strict baseline. 5 = average template. 7+ requires standing out from what is commercially available. If it still reads as "nice template," it stays in the 6s.

---

## Scores

```json
{
  "design": 6.3,
  "content": 6.0,
  "ux": 6.8,
  "technical": 6.5,
  "conversion": 6.5,
  "simplicity": 7.5,
  "total": 39.6,
  "max_possible": 60,
  "percentage": "66%",
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
      "auditor_note": "Strict recalibration. Previous rounds inflated scores by treating incremental improvements as category-level jumps. This round applies the baseline honestly: 5 = average template, 7+ = noticeably better than most templates on the market.",
      "scores": { "design": 6.3, "content": 6.0, "ux": 6.8, "technical": 6.5, "conversion": 6.5, "simplicity": 7.5 },
      "total": 39.6,
      "percentage": "66%"
    }
  ]
}
```

---

## Design -- 6.3/10

I need to be honest: this site is a well-executed dark restaurant template. It is not a standout. Here is why.

**What works:**
- The dark charcoal + warm gold palette is tasteful. It avoids the "black and neon" trap that cheap templates fall into. The muted wine accent is used sparingly. The custom properties are well-organised.
- The hero layered radial gradients with SVG noise grain create genuine atmosphere. This is the most premium-feeling section of the entire site.
- SVG icons (social, favicon, gallery placeholders) are consistent in stroke weight and style. The favicon reads at small sizes. Details like this matter.
- The mobile sticky bar has real visual polish -- glassmorphic backdrop-filter, safe-area support, clear button hierarchy (outlined Call vs filled Reserve).
- Typography pairing (Playfair Display + Inter) is the right call for the brand. Section headers with label/title/line/subtitle pattern are clean.

**What holds it back from 7+:**
- The colour palette and layout patterns are indistinguishable from dozens of dark restaurant templates available on ThemeForest, Squarespace, or Framer. Gold-on-dark with serif headings is the single most common restaurant template aesthetic. Nothing here says "you cannot get this elsewhere."
- Every section follows the same visual rhythm: centred header (label, title, line, subtitle) into a grid of cards. Specials, Menu, Gallery, Testimonials, Events -- same pattern five times. There is no visual surprise, no break in cadence.
- The gallery section is five identical placeholder boxes with the same SVG icon repeated. On a real template marketplace, this would look unfinished. The placeholder design (hsl gradients with image icons) is functional but does not demonstrate any visual ambition.
- Light mode hero is flat. The dark hero has multiple layered gradients creating depth; the light hero is a barely-visible warm gradient over cream. This asymmetry suggests the light mode was an afterthought.
- No visual texture, illustration, or decorative element beyond the CSS flame in the story section. Premium templates differentiate with custom dividers, textured backgrounds, illustrated borders, or unique section transitions. This site uses a 48px gold line repeatedly.
- The specials cards have a 5px coloured accent strip at the top that reads as arbitrary. The hue values (12, 28, 5) do not correspond to anything meaningful -- they are decoration for decoration's sake.

**Verdict:** Competent and clean, but generic. A client browsing templates would not stop scrolling for this one. It needs a visual identity beyond "dark and gold."

---

## Content -- 6.0/10

The copy quality is above average for a template. The content architecture is not.

**What works:**
- Menu item descriptions are specific and appetising: "Heirloom tomatoes, aged balsamic, basil oil, grilled sourdough." These read like a real menu, not Lorem Ipsum with food words. A client can see their own dishes in these slots.
- The Story section has a genuine narrative voice. "What started as a backyard obsession" is the kind of founder story that gives a template personality. Chef Marcus and sommelier Elena feel like real people.
- Testimonials reference specific menu items (oak-grilled ribeye, smoked chocolate torte, Ember Old Fashioned). This cross-referencing is smart -- it validates the menu from the customer's perspective.
- Dietary tags (V, VG, GF) with a legend are practical and modern. A real gap in most templates.

**What holds it back from 7+:**
- The section headers collectively read like a template copywriting checklist: "Tonight's Features," "Crafted with Fire & Care," "What People Are Saying," "Gather Around the Fire," "Book a Table." These are competent filler headlines. Not a single one would make someone pause.
- "Seasonal ingredients, open flame, unforgettable evenings" -- the hero subtitle is three comma-separated buzzwords. This is the restaurant equivalent of "innovative, scalable, disruptive" in tech. It says nothing specific.
- The events section copy is functional but generic: "From intimate rehearsal dinners to corporate gatherings..." This could be on any restaurant's events page. Where is the personality? What makes an event at Ember & Oak different from the steakhouse next door?
- No personality differentiators in the copy. What kind of music plays? What does the space smell like? Is there an open kitchen you can watch? (The gallery labels mention it, but the copy never brings it to life.) Good restaurant copy makes you feel the experience before you arrive. This copy describes features.
- Happy hour is mentioned exactly once, as a note under the hours section. For many restaurants, happy hour is their second-highest conversion driver after dinner. It deserves more than a footnote.

**Verdict:** The copy is correct and professional. It is not memorable. Template copy done well is still template copy.

---

## UX -- 6.8/10

The mobile UX has genuinely thoughtful moments. It also has persistent gaps that an actual user would hit.

**What works well:**
- Mobile sticky bar is the strongest UX feature. Appears at the right scroll point (60% of hero), two clear actions (Call + Reserve), 48px touch targets, safe-area-inset support, hidden on desktop. This is correctly implemented.
- Menu swipe gestures with directional slide animations. The horizontal swipe detection checks that horizontal movement dominates vertical (`Math.abs(diffY) > Math.abs(diffX) * 0.7`), which prevents accidental tab switches while scrolling. Good.
- ARIA tablist on menu tabs with arrow key navigation, Home/End support, and roving tabindex. This is real accessibility work, not checkbox compliance.
- Live open/closed status badge calculates from actual schedule data and shows contextual messages ("Open now -- until 10 PM" vs "Closed -- opens Tuesday at 5 PM"). Actually useful for mobile users.
- Hours today-highlight via JS auto-detecting the current day. Reduces cognitive load when scanning the schedule.
- Smooth scroll with nav height offset. Anchor links account for the fixed navigation height, so content does not hide behind the nav bar. Basic, but many templates get this wrong.

**What holds it back from 7+:**
- No back-to-top button. The page is now 9 sections deep. On mobile, a user who scrolled to the footer and wants to return to the menu has to thumb-scroll through the entire page. This is a standard UX pattern missing from the site.
- Phone input has `type="tel"` but no pattern validation. I can type "asdfgh" and submit the form. The validation only checks `!field.value.trim()`, so any non-empty string passes. For a template demonstrating form UX, this is a gap.
- No loading/submitting state on the reservation button. When the form submits, the button does not change to "Submitting..." or show a spinner. The success state appears instantly, which on a real backend would feel broken if there was any network latency. The template should demonstrate the full state machine: idle -> submitting -> success/error.
- Menu tab switch re-triggers `anim-fade` animations on every switch by removing and re-adding the `visible` class with a forced reflow (`void el.offsetWidth`). This causes a flash-of-invisible on every tab change. The items blink out and fade back in. On repeated switching, it feels jittery.
- The skip-link goes to `#menu`, not `#main` or the first content section. A screen reader user hitting the skip link lands on the second section (menu), skipping the hero, specials, and the chef's specials section entirely. Skip links should target the main content landmark.
- Swipe hint text ("Swipe to browse categories") is always visible. It should appear once and dismiss, or only appear on touch devices. On desktop, it is confusing.

**Verdict:** Better than the average template's UX. The sticky bar and swipe gestures show real mobile thinking. But the gaps (no back-to-top, weak form validation, tab switch jitter) keep it from being something a client would point to as "better than what I have now."

---

## Technical -- 6.5/10

Solid fundamentals with some real wins, but persistent issues that a technical reviewer would flag.

**What works:**
- Schema.org JSON-LD structured data is correctly formatted with proper opening hours specifications per day-of-week. Google can parse this on deploy.
- Open Graph and Twitter Card meta tags with sensible placeholder values. Social share previews will work out of the box.
- SVG favicon via data URI -- zero HTTP requests, scales perfectly, works everywhere.
- `prefers-reduced-motion` media query with comprehensive coverage: universal selector for animation/transition duration, plus specific resets for hero elements and scroll animations.
- `prefers-color-scheme` media query with correct cascade: saved preference > OS preference > dark default. The JS and CSS work together correctly.
- Passive event listeners on scroll and touch events. Correct.
- Touch target sizes are consistently 44px+ minimum. Form elements, buttons, nav items all meet the target.

**What holds it back from 7+:**
- Google Fonts loaded render-blocking. Two external CSS requests (`fonts.googleapis.com`) load in the critical path before first paint. There is a `<link rel="preconnect">` for the domain, but the actual font stylesheet is not preloaded or deferred. `font-display: swap` is set via the API URL, which helps, but the CSS file itself still blocks. For a template selling performance-consciousness, `<link rel="preload" as="style">` with an `onload` handler would be the correct pattern.
- `overflow-x: hidden` on body (line 70) and `.menu` section (line 501). The body one is masking a horizontal overflow issue rather than fixing it. If something causes horizontal overflow, this hides the symptom instead of addressing the root cause.
- Zero error handling in the JS. Every `document.getElementById` and `querySelector` call assumes the element exists. If a client removes or renames one section, the entire script crashes. A defensive `if (!el) return` at the top of each IIFE would cost nothing and prevent cascading failures.
- CSS is 2,242 lines with duplicate selectors. `.mobile-bar` is defined at line 1590, then a second `.mobile-bar { justify-content: center; }` appears at line 1673. The footer centering has overlapping media query blocks. This is not unwieldy yet, but it is trending that direction and suggests no consolidation pass has been done.
- Font-size violations below 14px accessibility minimum: `.specials__badge` at 0.7rem (11.2px, line 2037), `.menu__legend` items at 0.75rem (12px, line 744), `.success__conf` at 0.8rem (12.8px, line 2208), `.specials__tag` at 0.8rem (12.8px, line 2104). Previous audits flagged font sizes below 14px; new code reintroduced the same issue.
- Desktop nav links are 0.9rem (14.4px, line 1551). This passes the 14px floor but only barely. Previous audit flagged 0.85rem; it was bumped to 0.9rem. Acceptable but tight.
- No `<main>` landmark element. The page goes from `<nav>` to `<section>` elements with no wrapping `<main>`. Screen readers rely on landmarks for page structure. The skip link points to `#menu` rather than a main content area.

**Verdict:** The structured data and accessibility queries are genuine technical wins that many templates lack. But the font-size violations, missing error handling, and render-blocking fonts are the kinds of issues a technical reviewer would circle in red.

---

## Conversion -- 6.5/10

The conversion architecture has the right instincts but executes them at template-baseline level.

**What works:**
- Mobile sticky bar with Call + Reserve is the strongest conversion element. Persistent, clear, appropriately prominent. This alone puts it above templates that bury the CTA at the bottom.
- Reservation urgency messaging ("Only X tables left tonight") is contextual and time-aware. It adapts to open/closed status and weekend timing. Smart.
- "Get Directions" now links to Google Maps with the full address. This was a dead `href="#"` link before. Fixed.
- Post-booking success state includes confirmation number, date/time summary, calendar mention, and dual CTAs (View Menu / Call to Confirm). This demonstrates a real booking flow, not just a form.
- Micro-CTAs between sections ("Discover our story," "Plan your visit," "Ready to dine?") guide the scroll path toward the reservation form.
- Testimonials placed before the reservation section provide social proof at the right moment in the conversion funnel.

**What holds it back from 7+:**
- The reservation form is the only conversion mechanism for online visitors. There is no email capture, no newsletter signup, no "Get notified about specials" input in the footer. A first-time visitor who is not ready to book tonight has zero ways to stay in the funnel. Every premium restaurant template includes a secondary capture mechanism.
- Events section CTA is a mailto link. On mobile, this opens the default mail app, which for many users means a half-configured Mail.app they never use. A simple contact form or even a "Call to discuss your event" button alongside the email link would improve mobile conversion for this high-value segment.
- The urgency messaging uses a pseudo-random number seeded by date. A client deploying this template will see "Only 4 tables left tonight" on a Monday when the restaurant is closed. The urgency display should be hidden when the restaurant is closed, or change to a non-urgency message ("Planning ahead? Reserve your table for this week").
- No social proof numbers. "500+ 5-star reviews" or "Rated #3 in Philadelphia" in the hero or near the reservation form would strengthen the trust signal. Three testimonial cards are good; aggregate proof is better.
- Happy hour gets a one-line mention. For a template trying to demonstrate conversion awareness, a "Happy Hour" badge or callout somewhere above the fold would capture a different user intent (casual drink vs. dinner reservation).

**Verdict:** The bones are right. Sticky bar, urgency, social proof, micro-CTAs -- these are the correct conversion patterns. But the execution stays at template-standard level. A truly conversion-optimised template would have the secondary capture, the conditional urgency, and the multi-path funnel.

---

## Simplicity -- 7.5/10

This is still the strongest dimension. The site is three files. No build step, no framework, no dependencies beyond Google Fonts. Drag and deploy.

**What earns the score:**
- Single HTML file, single CSS file, single JS file. A client or developer can open this in any text editor and understand the structure immediately.
- No JavaScript framework, no bundler, no package.json. The site loads two external resources (Google Fonts) and everything else is self-contained.
- BEM-ish naming conventions are consistent throughout. `.menu__item-header`, `.testimonials__card`, `.mobile-bar__btn--reserve`. A developer inheriting this code can navigate by convention.
- CSS custom properties for theming mean a client can change the colour palette by editing 10 lines at the top of the stylesheet. This is the correct abstraction for a template.
- The JS is organised into clearly labelled IIFEs: Mobile Nav, Sticky Nav, Theme Toggle, Menu Tabs, Swipe Gestures, Scroll Animations, Reservation Form, Open/Closed Status, Mobile Bar, Urgency Messaging, Today Highlight. Each is self-contained.

**What docks the remaining points:**
- CSS at 2,242 lines is getting long for a single file. Not unmanageable yet, but some sections could be consolidated. The duplicate `.mobile-bar` selector and the scattered footer centering media queries suggest it has been appended to rather than refactored.
- Nine sections plus footer plus mobile bar is getting close to the 10-12 cap. Any further additions will require removing something or risk bloat.
- The JS contains two separate copies of the restaurant schedule (one in the open/closed status IIFE, one in the urgency IIFE). This is a maintenance risk -- if a client changes hours, they need to update two places.

**Verdict:** The simplicity is genuine and valuable. A 7.5 reflects that this is noticeably simpler than most templates on the market (which typically require Node, npm install, and a build step). The duplicated schedule and growing CSS file are the only concerns.

---

## Summary

**Round 3 to Round 4 delta: Recalibrated. The site has not changed; the scoring has.**

Previous rounds inflated scores by grading improvements relative to the prior version rather than against the competitive landscape. An 8 in Design means "a client would choose this over competitors without hesitation." That is not true here. A client would see a polished, competent dark restaurant template -- one of many available.

The site is genuinely good at the template level. The code is clean. The mobile UX is thoughtful. The conversion flow makes sense. The content is above-average filler. But "good template" is a 6-6.5 on this scale, and that is where this site sits.

### What would push specific scores to 7+

**Design to 7+ (needs to not feel generic):**
1. Visual identity beyond "dark + gold + serif." A custom illustrated divider, a unique section transition, a textured background that is not just radial gradients. Something a client screenshots and shares.
2. Break the visual monotony. Not every section needs the centred header + card grid pattern. The story section already does this with its side-by-side layout -- more of that variety.
3. Light mode needs equal attention. Currently it feels like dark mode with the saturation turned down.

**Content to 7+ (needs to not read like filler):**
1. Section headlines that have personality. "Crafted with Fire & Care" is placeholder energy. Something like "The Menu" is actually better -- honest and confident.
2. Sensory copy. What does the space feel like? Sound like? Smell like? The Story section hints at this ("warm woods, soft lighting, an open kitchen") but never commits to it.
3. Happy hour deserves real estate. It is a major conversion driver and gets a single footnote.

**UX to 7+:**
1. Back-to-top button.
2. Form validation that actually validates (phone pattern, loading state).
3. Fix the menu tab switch animation jitter.
4. Conditional swipe hint (touch devices only, dismiss after first swipe).

**Technical to 7+:**
1. Fix all font-size violations below 14px.
2. Add a `<main>` landmark and fix the skip link target.
3. Defer or preload Google Fonts.
4. Add defensive null checks in JS.
5. Consolidate duplicate CSS selectors.

### Would this impress a potential client?

**It would not turn them away.** A restaurant owner looking at this on their phone would think "this looks professional." They would not think "this is special." The difference between those reactions is the difference between a 6 and an 8. This site needs to earn the 8.
