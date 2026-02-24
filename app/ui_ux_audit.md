UI/UX Audit Guidelines for Next.js + Tailwind CSS

This document outlines common UI/UX issues in Next.js/Tailwind projects and provides detailed design guidelines and checklists for prevention and correction. It covers spacing, grid layout, cards, typography, color contrast, responsiveness, and animations, with actionable best practices. An evaluation framework guides automated agents (LLMs) to detect and fix issues and enforce consistency. Finally, a glossary of key terms and a sample Tailwind design-system template are included.

1. Common UI/UX Errors

Visual/Layout Errors: Cluttered or overcrowded interfaces, misaligned elements, inconsistent spacing, or misused grids. For example, cluttered layouts (too many elements/colors at once) overwhelm users. Inconsistent styling (varying font sizes or colors without hierarchy) makes the UI feel unprofessional. These issues confuse users and reduce trust.

UX/Interaction Errors: Poor navigation structure, lack of feedback, or overly complex forms. E.g., confusing navigation causes users to abandon flows; overly complicated forms deter sign-ups. Missing affordances (like no hover/focus states) leave users uncertain of interactive elements. These errors hurt engagement and conversions.

Accessibility Errors: Violations of WCAG guidelines such as low color contrast, missing alt text, or no keyboard support. For instance, insufficient text-background contrast fails the 4.5:1 WCAG minimum. Small touch targets or missing labels exclude users with disabilities. Ignoring accessibility “leaves out users with disabilities” and often violates legal requirements.

Responsiveness Errors: Layouts that break on mobile or tablets. Common mistakes are fixed-width containers, no breakpoint styles, or hidden content on small screens. Ignoring mobile (desktop-only design) is critical: over half of web traffic is mobile. A non-responsive site frustrates users and harms SEO.

Each error type directly impacts usability and accessibility. For example, a card with poor contrast or tiny text may look clean but will exclude low-vision users. A non-responsive grid may display fine on desktop but overflow or hide content on mobile. Identifying these issues is the first step toward correction.

2. Design Guidelines

Spacing (Tailwind Scale): Use Tailwind’s spacing tokens consistently (Tailwind uses a 4px base unit). For example, p-1 = 4px, p-2 = 8px, p-4 = 16px, p-8 = 32px. Establish a spacing rhythm: e.g., 8px or 16px for padding, 32px for section gaps. Avoid arbitrary pixel values; rely on the scale to maintain harmony. Remember margin (outside space) vs padding (inside space) vs gap (between flex/grid children) as separate utilities. Checklist: Ensure related elements share consistent spacing (e.g. all buttons have the same vertical padding); use gap-x-*/gap-y-* for equal spacing in grids/flex.

Grid & Layout: Leverage Tailwind’s Flexbox and CSS Grid utilities. Use flex or grid containers to create responsive layouts. (Flex is ideal for one-dimensional layouts; CSS Grid for multi-row/column structures.) For example, a 3-column grid can use <div class="grid grid-cols-3 gap-4">…</div>. Align and justify with classes like justify-between, items-center, or place-items-center. Always nest grid/flex where needed for complex layouts. Container centering: Use container mx-auto or mx-auto with max-width classes (max-w-screen-lg, etc.) to center content. Checklist: Test layouts at all breakpoints: at each screen size, ensure no unintended wrapping or overflow. Use Tailwind’s w-full, flex-wrap, and responsive classes to adapt.

Card Components: Design cards with clear boundaries and consistent padding. Cards often include rounded corners and shadows to separate them from the background. Example pattern:

<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-semibold mb-2">Title</h3>
  <p class="text-gray-700">Card content...</p>
  <button class="mt-4 btn-primary">Action</button>
</div>

Key points: use a subtle shadow (shadow-md), consistent border-radius (rounded-lg), and uniform padding (p-6). Maintain contrast between the card and background (e.g. white card on gray page). Checklist: Verify all cards use the same padding and border-radius. Make sure text within cards has enough space and visible hierarchy (headings vs body text).

Typography: Use semantic headings (<h1>…<h6>) and Tailwind text utilities for scalable text. Define a typographic scale (e.g. text-base for body, text-lg/text-xl for headings). Ensure body text ≥16px for readability (Tailwind’s text-base = 16px by default). Use font-weight utilities (font-medium, font-bold) for hierarchy. Responsive typography: Apply breakpoint classes for resizing (e.g. text-lg md:text-xl lg:text-2xl makes an <h1> grow on larger screens). Consistency matters: avoid too many font sizes and family changes. Checklist: Check that headings decrease consistently in size (e.g. H1 > H2 > H3) and that body text is legible. Verify font choices are loaded (e.g. via Google Fonts) and applied via font- classes as needed.

Color Contrast: Follow WCAG contrast ratios. Normal text needs at least 4.5:1 contrast against its background. Tailwind’s default palette is broad, but always verify combos. Use tools (like the Tailwind Contrast Checker or WCAG guidelines) to confirm contrast. For example, text-gray-700 on bg-white (ratio ~7:1) is safe, whereas text-gray-400 on white (ratio ~2.5:1) would fail. Aim for WCAG AA (4.5:1) or AAA (7:1) depending on text size. Also ensure enough contrast for UI elements (buttons, icons) against backgrounds. Checklist: Review all text/background color pairs and adjust classes as needed (e.g. change text-gray-500 to text-gray-700 or increase weight if failing).

Responsive Design (Tailwind Breakpoints): Tailwind is mobile-first. Write default (unprefixed) classes for the smallest size, then add sm:, md:, lg:, etc. for larger screens. Tailwind’s default breakpoints are sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px. E.g., <div class="flex flex-col md:flex-row"> stacks columns on mobile and switches to row on medium screens. Checklist: For each layout component, ensure it stacks vertically (full-width) on mobile and only splits columns at the intended breakpoint. Test text resizing (text-base → md:text-lg), image scaling (w-full → md:w-1/2), and hiding/showing elements with utilities like hidden md:block.

Animations & Transitions: Use Tailwind’s built-in transition and animation utilities judiciously. For example, use transition, duration-150, and ease-in-out classes for hover effects (e.g. button hover) and animate-pulse or animate-spin for loading indicators. Always provide a motion-safe: or respect prefers-reduced-motion: for example, motion-safe:animate-spin ensures the animation only runs for users who allow motion. Keep animations subtle and purposeful: small fades, slides, or scale-ups that indicate state changes. Nielsen Norman advises that when UI animations are subtle, unobtrusive, and brief, they improve the experience, but if overused they distract. Checklist: Avoid excessive parallax or auto-play. Ensure all UI feedback (e.g. button press, modal open) has a smooth animation without stutter. Use will-change, hardware-accelerated properties (transform, opacity) if manually animating.

Best Practices & Patterns:

Clean Layout: Embrace minimalist design. Remove unnecessary elements or text that compete for attention. Use ample whitespace – Tailwind’s spacing scale helps maintain clean grouping.

Consistency: Maintain a style guide (colors, fonts, components). Consistency is critical: “Users should not have to wonder whether different words… mean the same thing.”. Reuse UI components (cards, buttons) and Tailwind @apply or component classes to enforce uniform look.

Accessibility: Always add alt text to images, use semantic HTML (<button>, <nav>, <header>), and ensure focus outlines (e.g. focus:outline-none focus:ring) for keyboard users. Test with a screen reader.

Performance: Optimize images (<Image> in Next.js), avoid huge CSS/JS bundles. A fast-loading UI is part of good UX.

Feedback & States: Include loading/skeleton states for asynchronous content. Provide immediate visual feedback for user actions (button pressed, form submission, errors).

3. Checklists
Design Phase

Define branding tokens (color palette, typography scale, spacing units) in a design spec.

Create wireframes/prototypes for mobile and desktop. Plan a mobile-first layout.

Establish a component library (buttons, forms, cards) with consistent styles.

Ensure WCAG compliance from the start: choose accessible color pairs and test with contrast tools.

Document responsive breakpoints and grid structure for pages.

Plan animations (transitions) only where they enhance UX (feedback, state changes).

Collect user research/feedback to guide element importance and hierarchy.

Development Phase

Use semantic HTML (e.g. <nav>, <main>, <button>) and ARIA attributes as needed.

Apply Tailwind classes according to design tokens; avoid arbitrary custom CSS unless necessary. Leverage @apply for repeated patterns.

Implement responsive design using Tailwind’s mobile-first classes (sm:, md:, etc.).

Configure tailwind.config.js with project tokens (colors, fonts, spacing) so classes map to the design system.

Integrate dark mode if needed (darkMode: 'class' or media) and provide color variants.

Ensure images use Next.js <Image> for optimization and have descriptive alt.

Include focus and hover states for interactive elements (hover:bg-blue-700, focus:ring-2, etc.).

Use linters/formatters (Prettier, Stylelint, ESLint with jsx-a11y) to catch code issues.

QA Phase

Visual Review: Compare UI against mockups; check spacing, alignment, and consistency of components.

Responsive Testing: Test on multiple devices (mobile, tablet, desktop). Verify layouts do not break (no horizontal scroll, no overflow).

Accessibility Testing: Use tools like Lighthouse or axe to scan for issues (color contrast, missing labels, tab order). Manually test keyboard navigation and screen reader output. Ensure contrast ratios meet WCAG AA.

Cross-Browser Testing: Confirm UI works in all target browsers and OS (Safari, Chrome, Firefox, Edge).

Performance Testing: Check page speed (images optimized, CSS/JS minimized). Ensure no layout shifts.

Interaction Checks: Verify form validation, error messages, and loading states. Ensure links and buttons are operable and triggers (hover, focus) are visible.

4. Automated Evaluation Framework

To enable an LLM-based audit, we provide a structured approach:

Spacing & Layout Consistency:

Detection: Scan component code for spacing utility classes (p-, m-, gap-). Identify values not on the design scale (e.g., p-3 vs p-4 if only multiples of 4 are allowed). Detect missing gap utilities in flex/grid containers.

Correction: Replace inconsistent classes with nearest token (p-4, m-4, etc.) as defined in the spacing system. Enforce use of container, mx-auto, flex, grid, and gap- classes for uniform layout. For example, change class="p-3" to p-4 or p-2 depending on context.

Consistency Enforcement: Define base spacing tokens in a shared config (e.g. theme.spacing) and ensure all components derive from them. Flag any hardcoded margins/padding outside Tailwind classes for review.

Typography Consistency:

Detection: Check for use of Tailwind text-size classes (text-sm, text-lg, etc.). Identify outlier font sizes or families. Ensure headings (<h1>–<h6>) use progressively smaller classes.

Correction: Use the project’s typographic scale. For example, ensure body text uses text-base (16px) or larger. Replace inline <span style="font-size: ..."> with Tailwind classes. Apply uniform font- classes for headings (font-heading) and body (font-sans).

Consistency Enforcement: Base all typography on defined tokens (e.g. in tailwind.config.js under fontSize and fontFamily). LLM can suggest rewriting elements to use these tokens and semantic tags.

Color & Contrast Compliance:

Detection: Extract all color classes (text-*, bg-*, border-*). Compute contrast ratios (using WCAG formula or look-up) for each text/background pair. Flag pairs below 4.5:1 for normal text (3:1 for large text). Also detect missing hover/active color changes and missing focus outlines.

Correction: Swap to more accessible colors. For example, change text-gray-500 on white (low contrast) to text-gray-700 or text-black (higher contrast). Ensure focus:outline-none focus:ring utilities are present. Provide alternative classes from the Tailwind palette that meet WCAG levels.

Consistency Enforcement: Use a limited color palette defined in theme tokens. LLM can enforce use of theme.colors.primary, theme.colors.gray[700], etc., rather than arbitrary hex or multiple grays.

Responsiveness:

Detection: Look for components without breakpoint prefixes (e.g. only w-64 with no md: or sm:). Identify layouts that rely on fixed widths/heights (e.g. w-screen, h-96 with no sm:, md: adjustments). Detect absence of responsive classes on key elements.

Correction: Add appropriate breakpoints. For instance, change <div class="flex-row"> to <div class="flex flex-col lg:flex-row"> to stack on mobile and row on large screens. Use sm:, md: etc. to adjust padding/text. For example, <p class="text-base md:text-lg">.

Consistency Enforcement: Verify every structural component has a mobile (default) style and at least one larger-screen override. If a component is only styled for desktop, instruct adding mobile-first classes.

Accessibility Checks:

Detection: Ensure every interactive element (<button>, <a>) has discernible focus state (Tailwind’s focus-ring classes). Check images have alt attributes. Flag any non-semantic <div> used as a button or link (should use <button> or <a> for semantics). Detect missing aria-* where needed.

Correction: Rewrite non-semantic containers to appropriate elements. Add alt="" or descriptive alt text. Add focus:ring classes. Convert <div role="button"> to <button>.

Consistency Enforcement: Enforce ARIA and HTML best practices from WCAG and NN heuristics. For example, apply a rule that all <img> must have alt.

General Consistency:

Detection: Compare class usage across components. If two similar components have different class combinations (e.g. one button uses py-2 px-4 and another uses py-1 px-3), flag inconsistency.

Correction: Refactor to a single component style. Use Tailwind’s @apply to create reusable classes (.btn { @apply py-2 px-4 rounded; }). LLM can propose merging styles into a shared class or component.

Enforcement: Encourage a “DRY” (don’t repeat yourself) approach: replace repetitive inline classes with design tokens or component utilities.

Each of the above detection/correction steps can be codified into rules an LLM follows when analyzing UI code. For example, a rule might say: “If a <div> with class grid has no gap-*, suggest adding a gap for visual breathing room.” Or “If text color and background color ratio <4.5, suggest darker text- class or lighter bg- class.”

5. Glossary

Utility-First CSS: A development approach where single-purpose classes (like p-4, text-red-500) are used directly in markup to style elements, as in Tailwind.

Tailwind Spacing Scale: A predefined scale (default base = 4px) where numeric tokens map to rem values (e.g. 1=0.25rem=4px, 4=1rem=16px).

CSS Grid vs Flexbox: Two layout methods. Flexbox is one-dimensional (rows or columns); Grid is two-dimensional (rows and columns). Tailwind provides utilities for both.

Breakpoint (Screen Size): A minimum screen width at which certain styles apply. Tailwind’s defaults (sm:640px, md:768px, etc.) allow mobile-first design.

WCAG Contrast Ratio: A measure of text/background readability. WCAG 2.1 requires ≥4.5:1 for normal text (Level AA) and 3:1 for large text.

A11y (Accessibility): Practice of making UIs usable by people with disabilities. Involves ARIA roles, keyboard navigation, alt text, etc.

Semantic HTML: Using elements according to meaning (<button> for buttons, <nav> for navigation) rather than generic <div>. This improves accessibility and SEO.

Motion (Animation) Safety: Recognizing user preferences (prefers-reduced-motion) and using Tailwind’s motion-safe:/motion-reduce: variants to respect them.

Design Token: A named value (color, font, spacing, etc.) in a design system. For example, defining primary: '#4F46E5' as a color token in Tailwind’s config makes it reusable.

Mobile-First: Designing for the smallest screens first and progressively enhancing for larger screens. Tailwind is inherently mobile-first: unprefixed classes apply to all sizes, prefixed classes (md:, lg:) target larger screens.

6. Quick-Start Tailwind Design System Template

A minimal tailwind.config.js snippet illustrating design tokens (colors, spacing, fonts, screens):

# ai_ui_ux_hallucination_guardrails.md

# AI UI/UX Hallucination & Assumption Prevention Guide  
### For Next.js + Tailwind CSS Projects  
**Purpose:** Prevent AI-generated interfaces from looking cheap, generic, over-styled, or unrealistic.  
**Goal:** Ensure human-level, professional, production-grade UI decisions.

---

# 1. Core Principle

AI must NOT design for visual excitement.  
AI must design for usability, hierarchy, clarity, and consistency.

A professional UI is:
- Systematic
- Minimal
- Accessible
- Predictable
- Brand-aligned
- Consistent across pages

---

# 2. Common AI UI/UX Hallucinations

## 2.1 Overuse of Gradients

### Hallucination
AI assumes:
- Buttons must have purple/blue/pink gradients.
- Every hero section needs glowing backgrounds.
- Gradient = modern.

### Why It’s Wrong
- Overused gradients reduce trust.
- Fintech, SaaS, enterprise apps rarely use flashy gradients.
- Gradients can reduce contrast and accessibility.

### Correction Rule
- Default to solid brand color buttons.
- Only use subtle gradients if brand defines it.
- No neon purple-blue gradients unless explicitly required.

---

## 2.2 Over-Decorative UI

### Hallucination
AI adds:
- Glassmorphism everywhere
- Heavy blur effects
- 3D cards
- Floating animations
- Drop shadows on every element

### Why It’s Wrong
Professional design uses depth sparingly.

### Correction Rule
- Use shadow only for elevation meaning.
- Avoid blur unless required.
- Use one consistent elevation system:
  - shadow-sm (minor)
  - shadow-md (cards)
  - shadow-lg (modal only)

---

## 2.3 Random Spacing

### Hallucination
AI uses:
- p-3, p-5, p-7 randomly
- Inconsistent margins
- Mixed spacing logic

### Why It’s Wrong
Breaks visual rhythm.

### Correction Rule
Use strict spacing system:
- 4px base system
- Prefer: 2, 4, 6, 8
- Standard card padding: p-6
- Section spacing: py-16

Never invent arbitrary spacing.

---

## 2.4 Everything Centered

### Hallucination
AI centers:
- All text
- All buttons
- All cards

### Why It’s Wrong
Center alignment reduces readability in content-heavy interfaces.

### Correction Rule
- Center only hero sections.
- Left-align body text.
- Use proper layout grid.

---

## 2.5 Too Many Colors

### Hallucination
AI creates:
- 5–8 bright colors
- Inconsistent button colors
- Random accent highlights

### Why It’s Wrong
Professional UI uses:
- 1 Primary
- 1 Secondary
- Neutral grayscale
- Optional accent

### Correction Rule
Limit palette to 3–4 colors max.

---

## 2.6 Over-Animation

### Hallucination
AI adds:
- Bounce animations
- Infinite float effects
- Delayed stagger everywhere
- Heavy motion on scroll

### Why It’s Wrong
Professional interfaces use subtle motion.

### Correction Rule
- Duration: 150–300ms
- Use ease-in-out
- No bounce for enterprise UI
- Respect prefers-reduced-motion

---

## 2.7 Fake Professional Look

### Hallucination
AI adds:
- Lorem ipsum production content
- Generic stock statistics
- Fake testimonials
- Decorative icons without meaning

### Why It’s Wrong
Destroys credibility.

### Correction Rule
- Use realistic placeholder content
- No fake data
- No generic “10k+ users” unless provided

---

## 2.8 Poor Hierarchy

### Hallucination
AI uses:
- Same font size for headings and text
- Weak contrast between sections
- No clear CTA priority

### Correction Rule
Typography scale example:
- H1: text-4xl font-bold
- H2: text-2xl font-semibold
- Body: text-base
- Small: text-sm

Primary CTA must visually dominate.

---

## 2.9 Accessibility Ignorance

### Hallucination
AI uses:
- text-gray-400 on white
- No focus states
- Small buttons
- Hover-only interactions

### Correction Rule
- Contrast ≥ 4.5:1
- Focus ring mandatory
- Button min height: h-10
- No color-only communication

---

# 3. Professional Design Guardrails

---

## 3.1 Layout Rules

- Max container width: max-w-7xl
- Use mx-auto
- Mobile-first design
- Consistent gap spacing
- No horizontal overflow

---

## 3.2 Button Rules

Primary Button:
- Solid color
- Rounded-md or rounded-lg
- px-6 py-3
- font-medium
- Subtle hover darken

No:
- Gradient explosion
- Neon glow
- Heavy drop shadow

---

## 3.3 Card Rules

- bg-white
- rounded-lg
- shadow-sm or shadow-md
- p-6
- Clean spacing between elements

No:
- Random glass blur
- Thick borders unless intentional

---

## 3.4 Typography Rules

- One font family
- Clear scale
- No ultra-light fonts
- Line height 1.5+

---

## 3.5 Color System Rules

Structure:
- Primary
- Secondary
- Gray scale
- Error/Success states

Never:
- Use random Tailwind colors in each section
- Mix cool and warm tones inconsistently

---

# 4. AI Self-Check Framework

Before finalizing UI, AI must ask:

1. Is this visually systematic?
2. Does spacing follow consistent scale?
3. Is hierarchy clear?
4. Is animation necessary?
5. Is this something a senior designer would approve?
6. Would this work for fintech / SaaS / enterprise?
7. Is contrast accessible?
8. Is this design trend-driven or usability-driven?

---

# 5. Rewrite Enforcement Rules

When reviewing code:

If:
- Inconsistent spacing → Normalize.
- Too many colors → Reduce palette.
- Gradient misuse → Replace with solid.
- Over-animation → Simplify.
- Center alignment misuse → Re-align.
- Weak CTA → Strengthen hierarchy.
- Low contrast → Increase readability.
- Decorative clutter → Remove.

Always:
- Prefer minimal.
- Prefer structured layout.
- Prefer accessibility.
- Prefer readability.

---

# 6. Human-Level Professional Indicators

Professional UI feels:

- Calm
- Balanced
- Intentional
- Structured
- Clean
- Predictable
- Accessible
- Not trying too hard

Cheap AI UI feels:

- Flashy
- Over-designed
- Inconsistent
- Decorative without purpose
- Gradient-heavy
- Animation-heavy

---

# 7. Final Rule

AI must prioritize:

Function > Clarity > Consistency > Accessibility > Subtle Aesthetics

Never:

Aesthetics > Everything else

---

# End of Guardrails