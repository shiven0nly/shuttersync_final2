import { Component as KineticNavigation } from "@/components/sterling-gate-kinetic-navigation";

export default function KineticNavigationDemo() {
  return (
    <div className="min-h-screen">
      <KineticNavigation />
      
      {/* Demo Content */}
      <div className="pt-32 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif italic mb-6">Kinetic Navigation Demo</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Click the menu button in the top right to see the kinetic navigation in action.
        </p>
        
        <div className="space-y-4 text-foreground/60">
          <h2 className="text-2xl font-semibold text-foreground">Features:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Smooth GSAP-powered animations</li>
            <li>Interactive background shapes that respond to hover</li>
            <li>Staggered panel reveals</li>
            <li>Custom easing curves</li>
            <li>Keyboard accessible (ESC to close)</li>
            <li>Integrated with Clerk authentication</li>
            <li>Active route highlighting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
