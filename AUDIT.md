# Ember & Oak — Mobile-First Audit (Round 2)

**Auditor:** Nigel — Senior Digital Auditor
**Date:** 2026-03-30
**Perspective:** Mobile-primary (375px baseline, tested mentally across breakpoints)
**Context:** Template site for a web design business. Placeholder images, mock contact details, and simulated booking forms are expected and not penalised.

---

## Scores

```json
{
  "design": 7,
  "content": 7,
  "ux": 8,
  "technical": 7,
  "conversion": 7,
  "simplicity": 8,
  "total": 44,
  "max_possible": 60,
  "percentage": "73%",
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
    }
  ]
}
```

---

## Design — 7/10 (+2)

Right. Last time I capped this at 5 because there were no real images. I was wrong to do so in the context of a **template site**. Placeholder imagery, fake addresses, stock-photo-free zones — that is the entire point of a template. The client fills in the real assets later. Evaluated properly as a template:

**What works well:**
- Colour palette is genuinely premium. The refined darks (#161414), warm muted gold (#C9A34E), and cream (#F2EBE0) create proper upscale-casual atmosphere. This palette would sell the template.
- Playfair Display + Inter pairing is excellent. The heading/body weight contrast reads as confident without being fussy.
- Dark theme default is the correct call for restaurant ambiance, and the light mode is well-executed — not an afterthought.
- Gold accents used with restraint: CTA buttons, dotted leaders, tab highlights, divider lines. Consistent without being garish.
- CSS flame illustration in "Our Story" is a charming touch that shows craft. For a template demo, it conveys the aesthetic without relying on stock photography.
- The hero gradient overlay is moody and atmospheric — multiple radial gradients layer warmth without looking flat.
- Visual polish pass (Task 2) landed well: thinner borders, softer dividers, subtle gold glow on buttons, press states. These are the details that signal premium to a prospective client.
- Menu card accent bars (4px gradient strips) are subtle enough now to read as intentional design detail rather than broken images.

**What still needs work:**
- Social links still display as "IG", "FB", "TK" text — this is fine for a template but inline SVG icons would elevate the footer significantly. Two minutes of work.
- Map placeholder is functional as a template placeholder (grid pattern + pin) but feels slightly under-designed compared to the rest. A subtle illustration or labelled "Your Google Map here" would communicate template intent better.
- No hero background variation for light mode — the gradient is fine but a subtle texture or pattern would differentiate it from simply "dark gradient but lighter."

---

## Content — 7/10 (+2)

Previously capped at 5 for fake contact details. In the template context, placeholder details are expected and appropriate.

**What works well:**
- Menu copy is genuinely appetising and specific. "Hand-cut tenderloin, cured egg yolk, capers, dijon, crostini" — this reads like a real restaurant, not lorem ipsum. A prospective client can immediately imagine their own dishes in these slots.
- "Our Story" narrative is specific and believable: Chef Marcus Rivera, sommelier Elena Torres, est. 2019, "within 50 miles" sourcing. This is template copy done right — it tells the client *what their story section could sound like*.
- Hours section is detailed with happy hour info and kitchen closing note. Smart inclusion.
- "For parties over 8, please call us directly" — excellent conversion copy that a client would actually use.
- Live open/closed status badge is a lovely detail. Shows the template has intelligence, not just static markup.
- Reservation form placeholder text is helpful: "Allergies, celebrations, seating preferences..."
- Section flow is logical: Hero (atmosphere) -> Menu (what you eat) -> Story (who we are) -> Hours (when/where) -> Reservations (book now) -> Footer (contact). This mirrors actual dining-decision psychology.

**What still needs work:**
- All P1 requirements still missing: no chef's specials, no photo gallery placeholder, no testimonials, no private events, no Instagram feed placeholder. For a template trying to impress a prospective client, these omissions make the site feel thin. A client comparing this template to one with a testimonials carousel and a gallery lightbox will pick the other one.
- No allergen or dietary indicators on menu items (V, VG, GF icons). Easy template addition that signals attention to modern dining requirements.
- No wine/drinks subheadings within the Drinks tab — everything from cocktails to "Sommelier's Pick" lives flat in one list.
- The story mentions a sommelier but there's no wine list section anywhere. Missed opportunity for template depth.

---

## UX — 8/10 (+1)

The QA pass and swipe gesture additions moved this up. This is now genuinely good mobile UX.

**Strengths:**
- Mobile-first CSS architecture done properly — base styles are mobile, breakpoints add complexity upward. Not a shrunken desktop site.
- Hamburger menu with slide-out drawer, outside-click-to-close, body scroll lock, and proper aria-expanded state. Complete implementation.
- 44px minimum touch targets on hamburger, theme toggle, social icons, menu tabs, and small buttons. Properly audited and fixed.
- Skip-to-content link for keyboard/screen-reader users — addresses previous audit finding.
- Swipeable menu tabs with directional slide animations. The 50px threshold and vertical-override logic (0.7 ratio) prevent accidental triggers. Well-tuned.
- "Swipe to browse categories" hint visible only on mobile — teaches the gesture without cluttering desktop.
- ARIA tablist/tab/tabpanel roles with aria-selected sync. Menu tabs are now screen-reader navigable.
- Date input auto-sets to today with `min` attribute preventing past dates. Smart default.
- Accessible form validation with aria-invalid and role="alert" error messages. XSS vulnerability fixed (textContent instead of innerHTML).
- Smooth scroll respects fixed nav height — custom offset calculation instead of relying on CSS scroll-padding alone.
- `100svh` alongside `100vh` for proper mobile viewport handling on iOS Safari.

**Weaknesses:**
- Still no `prefers-reduced-motion` media query. All animations (hero fadeUp, scroll fade-ins, flame flicker, swipe transitions, status pulse) play regardless of user preference. This is an accessibility requirement, not a nice-to-have.
- No back-to-top button on what is a long single-page scroll. On mobile, scrolling back to the hero from the footer is tedious.
- Form validation still only checks empty fields, not format. `type="tel"` input accepts any string. `type="date"` is fine because the browser enforces it, but phone needs pattern validation.
- No loading/submitting state on the reservation button — no spinner, no "Submitting..." text, no disabled state during the mock submission delay.
- Menu tab re-triggers all `anim-fade` animations on switch (force reflow trick). This is intentional but the flash of opacity-0-to-1 on every tab change feels jittery rather than smooth. Consider only animating on first reveal.

---

## Technical — 7/10 (unchanged)

Solid vanilla implementation. The same gaps from Round 1 persist.

**Strengths:**
- Zero frameworks, zero dependencies — HTML/CSS/JS + Google Fonts. Clean, fast, maintainable.
- Proper `<meta viewport>` and description tags.
- CSS custom properties for theming — clean architecture with dark/light variable sets.
- `{ passive: true }` on scroll, resize, and touch listeners. Good performance hygiene.
- localStorage theme persistence.
- BEM-ish naming convention applied consistently throughout.
- Semantic HTML5 sections with proper heading hierarchy (h1 -> h2 -> h3 -> h4).
- `-webkit-appearance: none` and `-webkit-backdrop-filter` prefixes applied.
- XSS vulnerability in form submission fixed (DOM API with textContent).
- Touch swipe gesture implementation is clean: touchstart/touchend with directional threshold logic. No library needed.
- Live status badge calculates from real schedule data — not hardcoded.

**Weaknesses (all unchanged from Round 1):**
- No Open Graph or Twitter Card meta tags. A restaurant shared on social media will show a blank preview. For a template, these should be present with placeholder values.
- No favicon. Browser tab shows generic icon. A simple SVG flame favicon would cost 5 minutes and add polish.
- No Schema.org Restaurant structured data. Local SEO is critical for restaurants. Template should include commented-out or placeholder JSON-LD.
- No `prefers-reduced-motion` media query (also a UX concern).
- No `prefers-color-scheme` media query — doesn't respect OS dark/light preference as initial state.
- Google Fonts loaded render-blocking. Two external requests before first paint.
- `overflow-x: hidden` on body is still present — masking rather than preventing overflow.
- No error handling in the IIFE. A single null querySelector would silently break everything downstream.
- Duplicate animation keyframes: `menuSlideFromRight`/`slideInFromRight` and `menuSlideFromLeft`/`slideInFromLeft` define identical animations. Dead code.

---

## Conversion — 7/10 (+3)

Previously capped at 4 for no functional reservation system. In the template context, the conversion *flow* is what matters, not a working backend.

**Strengths:**
- Reservation CTA is prominently placed in the hero section — first interactive element a visitor encounters.
- Form fields are appropriate and well-ordered: date, time, party size (row 1), name, phone (row 2), special requests (full width). Logical grouping.
- "For parties over 8, please call us directly" is smart conversion copy that would work in production.
- "Request Reservation" button text is honest — it's a request, not a confirmation. Sets correct expectation.
- Success state addresses user by first name and offers a "View Our Menu" CTA. Good post-conversion flow.
- Section flow is a natural conversion funnel: browse the menu -> learn the story -> check hours -> book a table. Each section builds intent toward the CTA.
- Live open/closed badge in Hours section adds urgency context before the user reaches the reservation form.
- Date picker defaults to today with past dates blocked. Time slots are specific (every 30 minutes, 5 PM to 9:30 PM). Party size capped at 8 with large-party fallback copy. These are production-ready form details.

**Weaknesses:**
- No visual indication of what happens next after form submission. "We'll confirm shortly via phone" but there's no mock email/SMS confirmation step. For a template demo, showing a more elaborate success state (confirmation number, calendar-add link placeholder) would better demonstrate the conversion flow.
- "Get Directions" button is still a dead `href="#"` link. Even for a template, this should link to a Google Maps search with the placeholder address, or display a "Google Maps integration here" note.
- No secondary CTAs throughout the page. The hero has one CTA; the rest of the page has zero until you reach the reservation section. A floating "Reserve" button or sticky CTA bar on mobile would demonstrate conversion-consciousness.
- Social links are dead `href="#"` anchors — fine for a template, but the "IG/FB/TK" text labels look unfinished rather than intentionally placeholder.

---

## Simplicity — 8/10 (unchanged)

Still the strongest dimension. This site knows what it is and doesn't try to be more.

**Strengths:**
- Single HTML file, single CSS file, single JS file. No build tools, no bundlers, no npm, no node_modules. A client can open this in any editor and understand the structure immediately.
- Logical section order mirrors user intent. No unnecessary detours.
- No third-party scripts, trackers, analytics, or cookie banners.
- Theme toggle is one button. Menu is four tabs. Form is one page. No unnecessary complexity anywhere.
- CSS-only illustrations avoid image loading entirely.
- The template is self-contained — drag the folder onto a hosting service and it works.

**Weaknesses:**
- CSS has grown to ~1400 lines with some redundancy (duplicate slide keyframes, both `menuSlideFrom*` and `slideInFrom*` variants). A cleanup pass would trim 50+ lines.
- Some CSS specificity is higher than necessary — e.g. `[data-theme="dark"] .form-error` when a simple variable swap would suffice.

---

## Summary

**Round 1 to Round 2 delta: +8 points (36 -> 44, 60% -> 73%)**

Significant improvements between rounds, though most of the gain comes from *me* correcting my scoring context. This is a template — and evaluated as a template, it's genuinely good work. The QA pass fixed real accessibility issues (XSS, ARIA roles, touch targets, font sizes). The visual polish pass added the micro-interactions and restraint that separate "developer-built" from "designer-considered." The live open/closed badge and swipeable menu tabs add interactive sophistication that would impress a prospective client.

The core architecture remains sound: mobile-first, vanilla, fast, accessible, well-structured. A prospective restaurant owner looking at this template would see their restaurant's potential in it.

### What would push this to 50+/60

1. **P1 content sections** — Testimonials carousel, photo gallery placeholder, private events section. These aren't just features; they're sales arguments for the template. "Look at everything you get."
2. **`prefers-reduced-motion` + `prefers-color-scheme`** — Two CSS media queries that signal professional-grade accessibility awareness. 10 minutes of work.
3. **Open Graph + favicon + Schema.org placeholder** — SEO/social meta that shows the template is production-ready, not just visually ready.
4. **Sticky mobile CTA** — A floating "Reserve" button or slim bar that follows the user as they scroll. Demonstrates conversion thinking.
5. **SVG social icons** — Replace "IG/FB/TK" text with proper brand icons. Tiny effort, outsized polish impact.

### Would this impress a potential client?

**Yes, with caveats.** The design taste is there. The code quality is there. The mobile UX is genuinely thoughtful. But the template feels *minimal* rather than *comprehensive* — a client comparing it to a template with testimonials, a gallery, and social proof sections will see gaps. The path from "impressive demo" to "I want to hire you" needs those P1 sections filled in.
