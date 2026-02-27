import { ParticleButton } from "@/components/ui/particle-button"

function ParticleButtonDemo() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <ParticleButton successDuration={1000} variant="default">
        Click me!
      </ParticleButton>
      
      <ParticleButton successDuration={1000} variant="secondary">
        Secondary Style
      </ParticleButton>
      
      <ParticleButton successDuration={1000} variant="outline">
        Outline Style
      </ParticleButton>
    </div>
  )
}

export { ParticleButtonDemo }
