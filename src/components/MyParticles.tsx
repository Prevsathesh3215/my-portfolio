// MyParticles.tsx
import { Particles } from "./ui/shadcn-io/particles";

export default function MyParticles() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Particles
        className="absolute inset-0 max-w-screen"
        quantity={500}
        ease={80}
        staticity={80}
        color="#ffffff"
        size={0.8}
      />
    </div>
  );
}
