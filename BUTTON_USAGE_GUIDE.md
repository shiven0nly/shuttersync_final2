# Interactive Button Usage Guide

## Quick Reference

### Filled Variant (Primary Actions)
Use for main CTAs and primary actions:

```tsx
<InteractiveHoverButton 
  text="Join Community" 
  variant="filled"
  className="min-w-[200px]"
/>
```

**Appearance:**
- Default: Black background, white text
- Hover: White background, black text
- Arrow slides in from right

**Use Cases:**
- Sign up / Join buttons
- Submit forms
- Primary navigation actions
- Call-to-action buttons

---

### Outline Variant (Secondary Actions)
Use for secondary actions and alternatives:

```tsx
<InteractiveHoverButton 
  text="Learn More" 
  variant="outline"
  className="min-w-[200px]"
/>
```

**Appearance:**
- Default: White background, thin black border
- Hover: Black background, white text
- Arrow slides in from right

**Use Cases:**
- Secondary navigation
- Alternative actions
- "Learn more" links
- Optional actions

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | "Button" | Button label text |
| `variant` | 'filled' \| 'outline' | 'outline' | Visual style variant |
| `className` | string | - | Additional Tailwind classes |
| `onClick` | function | - | Click handler |
| `disabled` | boolean | false | Disabled state |
| `type` | 'button' \| 'submit' \| 'reset' | 'button' | Button type |

---

## Examples

### Basic Usage
```tsx
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Filled button
<InteractiveHoverButton text="Get Started" variant="filled" />

// Outline button
<InteractiveHoverButton text="Learn More" variant="outline" />
```

### With Link
```tsx
import Link from "next/link";

<Link href="/signup">
  <InteractiveHoverButton text="Sign Up" variant="filled" />
</Link>
```

### With Click Handler
```tsx
<InteractiveHoverButton 
  text="Submit" 
  variant="filled"
  onClick={handleSubmit}
  type="submit"
/>
```

### Custom Width
```tsx
<InteractiveHoverButton 
  text="Continue" 
  variant="filled"
  className="min-w-[250px]"
/>
```

### Disabled State
```tsx
<InteractiveHoverButton 
  text="Processing..." 
  variant="filled"
  disabled={isLoading}
  className="disabled:opacity-50 disabled:cursor-not-allowed"
/>
```

---

## Animation Behavior

### Hover Animation (500ms)
1. **Text Movement**: Slides right by 8px
2. **Arrow Appearance**: Fades in from right side
3. **Background Fill**: Fills from left to right
4. **Color Transition**: Smooth color inversion

### Timing
- Duration: 500ms
- Easing: ease-out
- Smooth, professional feel
- No jarring movements

---

## Styling Guidelines

### Minimum Width
Always set a minimum width for consistency:
```tsx
className="min-w-[200px]"  // Standard
className="min-w-[180px]"  // Compact
className="min-w-[250px]"  // Wide
```

### Text Styling
Buttons automatically include:
- Uppercase text
- Letter spacing (tracking)
- Semibold font weight
- Centered alignment

### Responsive
```tsx
// Full width on mobile, fixed on desktop
className="w-full md:w-[200px]"
```

---

## Accessibility

### Built-in Features
- ✅ Keyboard accessible (Tab, Enter, Space)
- ✅ Focus visible
- ✅ Proper button semantics
- ✅ Screen reader friendly
- ✅ WCAG color contrast compliant

### Best Practices
```tsx
// Good: Descriptive text
<InteractiveHoverButton text="Join Community" variant="filled" />

// Bad: Generic text
<InteractiveHoverButton text="Click Here" variant="filled" />

// Good: With aria-label for context
<InteractiveHoverButton 
  text="Submit" 
  variant="filled"
  aria-label="Submit registration form"
/>
```

---

## Common Patterns

### Hero Section CTAs
```tsx
<div className="flex flex-wrap items-center justify-center gap-4">
  <Link href="/signup">
    <InteractiveHoverButton 
      text="Join Community" 
      variant="filled"
      className="min-w-[200px]"
    />
  </Link>
  <InteractiveHoverButton
    text="Learn More"
    variant="outline"
    onClick={handleLearnMore}
    className="min-w-[200px]"
  />
</div>
```

### Form Actions
```tsx
<div className="flex items-center justify-between gap-4">
  <button 
    type="button" 
    onClick={handleBack}
    className="text-sm text-foreground/50 hover:text-foreground"
  >
    Back
  </button>
  <InteractiveHoverButton
    text="Next Step"
    variant="filled"
    type="submit"
    className="min-w-[180px]"
  />
</div>
```

### Loading State
```tsx
<InteractiveHoverButton
  text={isLoading ? "Processing..." : "Submit"}
  variant="filled"
  disabled={isLoading}
  className="min-w-[200px] disabled:opacity-50"
/>
```

---

## Do's and Don'ts

### ✅ Do
- Use filled variant for primary actions
- Use outline variant for secondary actions
- Set consistent minimum widths
- Provide descriptive text
- Use with forms and CTAs
- Combine with proper link components

### ❌ Don't
- Don't use both variants for equal-priority actions
- Don't make text too long (keep under 3 words)
- Don't override the animation timing
- Don't use for navigation menus
- Don't remove the arrow icon
- Don't use without proper contrast

---

## Performance

### Optimized For
- ✅ Only animates transform and opacity
- ✅ GPU-accelerated animations
- ✅ No layout shifts
- ✅ Efficient CSS transitions
- ✅ No JavaScript animation overhead

### Best Practices
- Animations respect `prefers-reduced-motion`
- No will-change applied unnecessarily
- Smooth 60fps animations
- Minimal repaints

---

## Troubleshooting

### Button not showing arrow on hover?
- Check that lucide-react is installed
- Verify the button has enough width

### Animation feels slow?
- This is intentional (500ms for smooth feel)
- Follows UI best practices
- Do not reduce below 300ms

### Colors not inverting?
- Check that foreground/background CSS variables are set
- Verify Tailwind config includes these colors

### Button too narrow?
- Add `min-w-[200px]` or similar
- Use `w-full` for mobile responsiveness

---

## Migration from Old Buttons

### Before (Old Style)
```tsx
<button className="bg-foreground text-background px-8 py-4 rounded-full">
  Join Now
</button>
```

### After (New Style)
```tsx
<InteractiveHoverButton 
  text="Join Now" 
  variant="filled"
  className="min-w-[200px]"
/>
```

### Benefits
- ✅ Consistent styling
- ✅ Built-in hover animations
- ✅ Better accessibility
- ✅ Cleaner code
- ✅ Responsive by default

---

## Support

For issues or questions:
1. Check this guide first
2. Review `FIXES_APPLIED.md` for recent changes
3. Check component source code
4. Test in different browsers

Happy coding! 🚀
