import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

function InteractiveHoverButtonDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-8 p-8">
      <h2 className="text-2xl font-serif">Interactive Hover Button Variants</h2>
      
      {/* Filled variant */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-foreground/60">Filled Variant</p>
        <InteractiveHoverButton text="Join Community" variant="filled" />
      </div>
      
      {/* Outline variant */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-foreground/60">Outline Variant</p>
        <InteractiveHoverButton text="Learn More" variant="outline" />
      </div>
      
      {/* Custom styling */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-foreground/60">Custom Width</p>
        <InteractiveHoverButton 
          text="Get Started" 
          variant="filled"
          className="min-w-[250px]"
        />
      </div>
      
      {/* With onClick */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-foreground/60">With Click Handler</p>
        <InteractiveHoverButton 
          text="Click Me" 
          variant="outline"
          onClick={() => alert('Button clicked!')}
        />
      </div>
    </div>
  );
}

export { InteractiveHoverButtonDemo };
