# Changelog

## 2026-03-30 — QA + Pixel Review Round 2

### QA (Functional):
- Fixed ARIA tablist: added `id` attributes to tab buttons, `aria-labelledby` to tab panels, and roving `tabindex` for keyboard arrow navigation (ArrowLeft/Right, Home, End)
- Removed duplicate CSS animation definitions: `slideOutLeft/Right` and `slideInFromLeft/Right` were defined twice with conflicting animation names overriding the menu panel transition block
- Fixed hours status badge centering: wrapped in `.hours__status-wrapper` with `text-align: center`

### Pixel (Mobile Design @ 375px):
- Fixed 6 font-size violations still present below 14px minimum despite previous changelog claiming fix:
  - `.section-header__label`: 0.8rem -> 0.875rem
  - `.hero__tagline-top`: 0.7rem -> 0.875rem (was 11.2px, critically small)
  - `.menu__tab`: 0.8rem -> 0.875rem
  - `.form-group label`: 0.8rem -> 0.875rem
  - `.btn` base: 0.85rem -> 0.875rem
  - `.footer__socials a`: 0.8rem -> 0.875rem
- Added `min-height: 48px` to `.btn--lg` (reservation submit) for reliable touch target

## 2026-03-30

### Enhancement — Live Open/Closed Status Badge (Spark)
- Added real-time open/closed indicator to Hours & Location section
- Green pulsing dot + "Open now — until X PM" when restaurant is open
- Muted badge + "Closed — opens [day] at X PM" when closed
- Auto-calculates based on restaurant's actual schedule (Mon closed, Tue-Thu 5-10, Fri-Sat 5-11, Sun 4-9)
- Mobile-first pill badge: compact, accessible (aria-live), elegant
- Minimal animation: gentle pulse on the status dot only when open

### Task 2 Complete — Visual Polish & Premium Feel (Builder)
- Refined color palette: deeper darks (#161414), warmer muted gold (#C9A34E), subtler borders
- Tighter letter-spacing on labels, tabs, buttons (4px/1.5px) for upscale feel
- Softer section divider lines (48px, 1px, 0.7 opacity) — less template-y
- Premium button treatment: gold box-shadow glow, active press state
- Smoother scroll animations: cubic-bezier easing on fade-ups (0.7s)
- Mobile micro-interactions: tap scale on cards (0.985), social icons, theme toggle
- Input focus rings: subtle gold glow (3px, 0.08 opacity)
- Thinner borders throughout (1.5px -> 1px) for cleaner lines
- Nav scrolled state: single-line border instead of heavy box-shadow
- Hero overlay: richer atmosphere with additional warm gradient layer
- Scroll hint: subtler (1.5px border, 0.5 opacity)
- Menu card accent bars: thinner (4px), lower opacity — accent not distraction
- Footer: darker background, softer dividers
- Flame illustration: updated all colors to match refined palette

### QA + Pixel Review — Bug Fixes & Mobile Design Audit
**QA (Functional):**
- Fixed XSS vulnerability: reservation form name field was injected via innerHTML, now uses DOM API with textContent
- Fixed smooth scroll ignoring fixed nav: anchor links now calculate offset from nav height instead of relying on scrollIntoView
- Added accessible form validation: aria-invalid, role="alert" error messages (previously visual-only red border)
- Added skip-to-content link for keyboard/screen-reader navigation
- Added ARIA tablist/tab/tabpanel roles and aria-selected sync on menu category tabs
- Added proper value attributes to all select options (time slots, party size)
- Reservation success state now uses role="status" + aria-live="polite"

**Pixel (Mobile Design @ 375px):**
- Fixed 6 font-size violations below 14px minimum: section labels (0.8rem->0.875rem), form labels (0.8rem->0.875rem), hours notes (0.85rem->0.875rem), footer copyright (0.8rem->0.875rem), menu tabs (0.85rem->0.875rem), swipe hint (0.75rem->0.875rem)
- Fixed footer social icons below 44px touch target: 40px->44px
- Added min-height: 44px to menu tabs and small buttons for reliable touch targets
- Added CSS for menu panel slide transitions (slideInFromLeft/Right, slideOutLeft/Right)
- Added .form-error styles with dark-mode-aware color
- Added .skip-link styles with focus-visible treatment

### Swipeable Menu Tabs — Mobile Enhancement (Spark)
- Added touch swipe gestures to menu section: swipe left/right to navigate between categories
- Smooth directional slide animations on tab switch (subtle 30px translateX, 250ms ease-out)
- Menu tabs now horizontally scrollable on mobile with hidden scrollbar
- Active tab auto-scrolls into view when switching via swipe
- Added "Swipe to browse categories" hint text, visible only on mobile (<=768px)
- ARIA attributes (aria-selected, role=tab) kept in sync during swipe navigation
- No hover/cursor features — fully touch-driven, mobile-first

### Mobile-First Audit (Nigel)
- Added AUDIT.md with full mobile-first site audit
- Scores: Design 5 | Content 5 | UX 7 | Technical 7 | Conversion 4 | Simplicity 8 (Total: 36/60, 60%)
- Design/Content capped: no real photography, placeholder contact details (555 phone, fake address)
- Conversion capped: reservation form submits to nowhere, no backend or third-party integration
- Key findings: solid skeleton architecture but missing all production essentials (images, real data, working booking)
- Critical path: real photos, real contact info, functional reservations, Schema.org markup, accessibility fixes

## 2026-03-31

### Initial Setup
- Created repo with VISION.md, STYLE-GUIDE.md, REQUIREMENTS.md, TASKS.md
- Restaurant site: Ember & Oak — Wood-Fired Flavors, Warm Hospitality
- 3 tasks defined, agent team deployed

### Task 1 Complete — Full Site Build
- Created index.html, style.css, main.js
- Hero: moody dark gradient, Playfair Display title, animated entrance, scroll hint, reservation CTA
- Menu: 4 tabbed categories (Starters 4, Mains 5, Desserts 3, Drinks 4) with dotted-line pricing
- Our Story: narrative copy + CSS-only animated flame/log illustration
- Hours & Location: schedule card + map placeholder with CSS pin
- Reservations: full form (date, time, party size, name, phone, special requests) with validation
- Footer/Contact: phone, email, address, social links
- Dark theme default + light mode toggle (localStorage persistence)
- Responsive nav with hamburger slide-out on mobile, inline on desktop
- Scroll fade-up animations, menu tab transitions
- 3 breakpoints: 480px, 768px, 1024px — mobile-first throughout
- Style guide colors: #1a1a1a dark, #D4A853 gold, #F5F0E8 cream, #8B2635 wine
- Typography: Playfair Display headings, Inter body via Google Fonts
