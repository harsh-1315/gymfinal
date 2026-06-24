import { Suspense, lazy } from 'react'
import { Dumbbell } from 'lucide-react'

const HeroFluid = lazy(() => import('@/components/HeroFluid'))

interface HeroProps {
  onWhatsApp: () => void
}

export default function Hero({ onWhatsApp }: HeroProps) {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#0D0D0D]">
      {/* Fluid Background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/20 via-[#0D0D0D] to-[#D4FF00]/10" />
        }
      >
        <HeroFluid />
      </Suspense>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 hero-scanline z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <h1
          className="font-display text-[10vw] md:text-[12vw] leading-tight-custom tracking-tighter-custom text-[#F4F4F4] uppercase"
          style={{ textShadow: '0 0 60px rgba(255,69,0,0.3)' }}
        >
          Forge Your
          <br />
          Legacy
        </h1>

        <p className="mt-6 max-w-xl text-base md:text-lg text-[#F4F4F4]/70 font-body leading-relaxed">
          State-of-the-art equipment, expert trainers, and a relentless community.
          Join Forge Fitness — Where Strength Meets Discipline.
        </p>

        <button
          onClick={onWhatsApp}
          className="mt-10 btn-molten flex items-center gap-3"
        >
          <Dumbbell size={18} />
          <span>Start 7-Day Trial</span>
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
    </section>
  )
}
