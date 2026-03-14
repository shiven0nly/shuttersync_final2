# SlideButton Integration Guide

## ✅ Project Setup Verification

Your project already has:
- ✅ TypeScript configured
- ✅ Tailwind CSS setup
- ✅ shadcn/ui structure with components in `app/components/ui`
- ✅ `lucide-react` installed
- ✅ `class-variance-authority` installed

## 📦 Required Dependencies

Install the missing dependencies:

```bash
npm install framer-motion @radix-ui/react-slot
```

Or if you encounter peer dependency issues:

```bash
npm install --legacy-peer-deps framer-motion @radix-ui/react-slot
```

## 📁 Files Created

1. **`app/components/ui/button.tsx`** - Base shadcn button component
2. **`app/components/ui/slide-button.tsx`** - Slide-to-submit button component
3. **`app/components/ui/slide-button-demo.tsx`** - Demo component for testing

## 🎯 Integration in "Become a Member" Section

The SlideButton has been integrated into `app/homepage/components/JoinSection.tsx` on Step 2 (Photography Details) form submission.

### Key Changes:

1. **Import added:**
   ```tsx
   import { SlideButton } from '@/components/ui/slide-button';
   ```

2. **New handler function:**
   ```tsx
   const handleSlideSubmit = async () => {
     setIsSubmitting(true);
     setErrors({});
     
     try {
       await submitApplication({...});
       setSubmitted(true);
     } catch (error: any) {
       setErrors({ submit: error.message });
       throw error;
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

3. **Button replaced:**
   ```tsx
   <SlideButton
     onSlideComplete={handleSlideSubmit}
     status={isSubmitting ? 'loading' : 'idle'}
     disabled={isSubmitting}
     className="bg-[#C4783E] hover:bg-[#C4783E]/90"
   />
   ```

## 🎨 Component Features

### SlideButton Props:

- `onSlideComplete?: () => void | Promise<void>` - Callback when slide completes
- `status?: "idle" | "loading" | "success" | "error"` - External status control
- `resetOnSuccess?: boolean` - Auto-reset after success
- All standard button props from shadcn

### Visual States:

1. **Initial** - Draggable button with send icon
2. **Dragging** - Visual feedback with scale animation
3. **Loading** - Spinner animation
4. **Success** - Check icon
5. **Error** - X icon

### Behavior:

- Drag threshold: 90% of track width
- Spring physics for smooth animations
- Touch and mouse support
- Prevents accidental submissions

## 🎨 Customization

### Colors:
The button uses your brand color `#C4783E` for consistency with your design system.

### Styling:
Customize via className prop:
```tsx
<SlideButton 
  className="bg-custom-color hover:bg-custom-color/90"
/>
```

### Track Width:
Modify `DRAG_CONSTRAINTS` in `slide-button.tsx`:
```tsx
const DRAG_CONSTRAINTS = { left: 0, right: 155 } // Change 155 to adjust width
```

## 🧪 Testing

Test the component at: `http://localhost:3000/#join`

1. Fill out Step 1 (Personal Info)
2. Click "Next Step"
3. Fill out Step 2 (Photography Details)
4. Drag the slide button to submit

## 📝 Usage in Other Forms

To use in other forms:

```tsx
import { SlideButton } from '@/components/ui/slide-button';

<SlideButton
  onSlideComplete={async () => {
    // Your submission logic
    await submitForm();
  }}
  status={isSubmitting ? 'loading' : 'idle'}
  className="bg-[#C4783E] hover:bg-[#C4783E]/90"
/>
```

## 🎯 Why This Component?

- **Intentional Action**: Prevents accidental form submissions
- **Visual Feedback**: Clear animation states for user confidence
- **Accessible**: Keyboard and screen reader friendly
- **Mobile Optimized**: Touch-friendly drag interactions
- **Brand Aligned**: Uses your existing color palette

## 🔧 Troubleshooting

### If animations don't work:
- Ensure `framer-motion` is installed
- Check browser console for errors

### If button doesn't appear:
- Verify all imports are correct
- Check that `@/lib/utils` exports the `cn` function

### If drag doesn't work:
- Ensure touch events are enabled
- Check that parent containers don't have `overflow: hidden`

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [shadcn/ui Button](https://ui.shadcn.com/docs/components/button)
- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)
