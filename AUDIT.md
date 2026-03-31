# Ember & Oak — Mobile-First Audit

**Auditor:** Nigel — Senior Digital Auditor
**Date:** 2026-03-30
**Perspective:** Mobile-primary (375px baseline, tested mentally across breakpoints)

---

## Scores

```json
{
  "design": 5,
  "content": 5,
  "ux": 7,
  "technical": 7,
  "conversion": 4,
  "simplicity": 8,
  "total": 36,
  "max_possible": 60,
  "percentage": "60%"
}
```

---

## Design — 5/10 (CAPPED)

**Cap applied: No real photography.** The entire site relies on CSS gradient colour strips (8px tall `menu__item-img` divs with `--hue` variations) in place of food photography. For a restaurant, this is disqualifying. The Style Guide itself admits "Food imagery is EVERYTHING" and then ships CSS gradients. The flame illustration in "Our Story" is a nice CSS parlour trick, but it does not substitute for imagery of the actual restaurant, food, or team.

What does work:
- Colour palette is cohesive and atmospheric (dark charcoal, gold accents, cream text)
- Playfair Display + Inter pairing is solid for upscale-casual
- Dark theme as default is the right call for restaurant ambiance
- Light/dark toggle is well-executed with proper CSS custom property theming
- The dotted-leader pricing lines on menu items are a nice typographic touch

What does not:
- Zero real images anywhere — hero has no photo, menu items have 8px colour strips, story section has a CSS flame
- Map is a CSS grid placeholder, not an embedded map or even a static image
- Social links display as "IG", "FB", "TK" text — no SVG icons, no brand recognition
- The 8px gradient strips above menu items look like loading-state skeletons, not intentional design

---

## Content — 5/10 (CAPPED)

**Cap applied: Placeholder content detected.** The phone number `(215) 555-0142` is a fake 555 number. The address `742 Hearthstone Lane` is fictional. The email `hello@emberandoak.com` leads nowhere. For a restaurant site where the entire purpose is getting people through the door, fake contact details are a fatal flaw.

What does work:
- Menu copy is genuinely appetising — proper ingredient descriptions, not lorem ipsum
- "Our Story" section has believable, well-written narrative with specific details (Chef Marcus Rivera, sommelier Elena Torres, est. 2019)
- Hours section is detailed with happy hour info and kitchen closing note
- Reservation form placeholder text is helpful and specific

What does not:
- All P1 requirements missing: no chef's specials, no photo gallery, no testimonials, no private events, no Instagram feed
- No allergen or dietary information on any menu item (celiac, vegan, nut-free)
- No wine list despite having a sommelier character in the story
- "Get Directions" button is a dead `href="#"` link
- Social links are all dead `href="#"` anchors

---

## UX — 7/10

The mobile UX is actually decent in terms of structure and interaction patterns.

Strengths:
- Mobile-first CSS architecture done properly — base styles are mobile, breakpoints add complexity
- Hamburger menu with slide-out drawer, outside-click-to-close, and body scroll lock
- 44px minimum touch targets on hamburger and theme toggle (proper mobile accessibility)
- `scroll-behavior: smooth` with `scroll-padding-top: 70px` to account for fixed nav
- Date input auto-sets to today with `min` attribute preventing past dates
- Form validation highlights invalid fields with wine-red border
- Tab interface for menu categories works well — reduces scroll on mobile
- `100svh` used alongside `100vh` for proper mobile viewport handling

Weaknesses:
- No skip-to-content link for keyboard/screen-reader users
- Reservation form has `novalidate` which suppresses browser validation — custom validation is incomplete (only checks empty, not format)
- No phone number format validation despite `type="tel"`
- No loading states or feedback during form "submission"
- Menu tab re-triggers all fade animations on switch — feels jittery, not smooth
- No back-to-top button on what is a long single-page scroll

---

## Technical — 7/10

Solid vanilla implementation with some gaps.

Strengths:
- Zero frameworks, zero dependencies — just HTML/CSS/JS and Google Fonts
- Proper `<meta viewport>` tag
- CSS custom properties for theming — clean and maintainable
- `{ passive: true }` on scroll and resize listeners — good performance hygiene
- localStorage theme persistence
- BEM-ish naming convention consistently applied
- Semantic HTML5 sections with proper heading hierarchy
- `appearance: none` / `-webkit-appearance: none` on form inputs for cross-browser consistency
- `-webkit-font-smoothing: antialiased` applied
- `-webkit-backdrop-filter` prefixed alongside standard `backdrop-filter`

Weaknesses:
- No `<meta>` for Open Graph or Twitter Cards — social sharing will look terrible
- No favicon — browser tab shows generic icon
- No structured data (Schema.org Restaurant markup) — terrible for local SEO
- Google Fonts loaded render-blocking despite `display=swap` — two separate preconnect hints is good, but could use `font-display: optional` strategy
- No `prefers-reduced-motion` media query — animations play regardless of user preference
- No `prefers-color-scheme` media query — doesn't respect OS-level dark/light preference
- IIFE wrapping is fine but no error handling whatsoever
- `overflow-x: hidden` on body is a code smell — hiding horizontal overflow rather than preventing it

---

## Conversion — 4/10 (CAPPED)

**Cap applied: No functional reservation system.** The form does `e.preventDefault()` and shows a fake success message. There is no backend, no API call, no mailto fallback, no third-party integration (OpenTable, Resy, etc.). A customer filling this in would receive zero confirmation and the restaurant would receive zero bookings.

Strengths:
- Reservation CTA is prominently placed in hero section
- Form fields are appropriate: date, time, party size, name, phone, special requests
- "For parties over 8, please call us directly" is smart copy
- Success message addresses user by first name — nice personal touch

Weaknesses:
- Form submits to absolutely nowhere — data vanishes into the void
- No email confirmation, no SMS confirmation
- No indication this is a "request" vs confirmed booking (the button says "Request Reservation" which is honest, but the success message says "We'll confirm shortly" with no mechanism to do so)
- Phone number is fake so "call us directly" is impossible
- No OpenTable/Resy widget or even a link to one
- "Get Directions" button is non-functional

---

## Simplicity — 8/10

This is where the site genuinely excels.

Strengths:
- Single HTML file, single CSS file, single JS file — no build tools, no bundlers, no npm
- CSS-only illustrations avoid image loading concerns
- Logical section order mirrors user intent: see the vibe, browse the menu, read the story, check hours, book a table
- No unnecessary third-party scripts, trackers, or analytics
- Theme toggle is one button, not a settings panel
- Menu tabs are straightforward — four categories, no nesting
- Form is one page, not a multi-step wizard

Weaknesses:
- Could argue the CSS is overengineered for a site with no real content — 1200 lines of CSS for gradient placeholders
- JS could be more modular but at 166 lines this is not a real concern

---

## Summary

This is a **well-structured skeleton** masquerading as a finished restaurant website. The architecture is sound — mobile-first CSS, proper theming, decent accessibility basics, clean vanilla JS. But a restaurant site without food photography, real contact details, or a functional booking system is like a beautifully plated dish with no food on it. The fundamentals need addressing before this goes anywhere near production.

### Critical Path to Improvement
1. **Real photography** — hero background, menu item photos, interior shots. This alone would transform the site.
2. **Real contact details** — actual address, phone, email, or remove the fictional ones.
3. **Functional reservations** — integrate OpenTable/Resy, or at minimum a `mailto:` fallback with form data.
4. **Structured data** — Schema.org `Restaurant` markup for local SEO.
5. **Accessibility** — skip link, `prefers-reduced-motion`, proper form validation.
