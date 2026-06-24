import { useRef, useEffect, useState } from 'react'
import EnergeticReveal from '@/components/EnergeticReveal'

export default function ForgeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0D0D0D] overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gallery-4.jpg"
          alt="The Forge"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-[#0D0D0D]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-32">
        <EnergeticReveal
          text="THE FORGE"
          className="font-display text-[14vw] md:text-[10vw] tracking-tighter-custom text-[#F4F4F4] uppercase justify-center"
          trigger={inView}
        />

        <div className="mt-12 max-w-3xl text-center">
          <p className="text-lg md:text-xl text-[#F4F4F4]/80 font-body leading-relaxed">
            Welcome to <strong className="text-[#FF4500]">Forge Fitness</strong>, where fitness meets
            community. Designed for those who want more than just a workout, we offer advanced gym
            equipment, energetic group exercise classes, and expert guidance — all under one roof.
            Whether you&apos;re a beginner or a pro, this is your space to get stronger, stay
            consistent, and connect with others who share your goals.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border border-[#5C5C5C]/40 p-6">
              <div className="font-display text-4xl text-[#FF4500]">15K+</div>
              <div className="mt-2 text-sm text-[#F4F4F4]/60 font-body uppercase tracking-wider">
                Sq. Ft. Space
              </div>
            </div>
            <div className="border border-[#5C5C5C]/40 p-6">
              <div className="font-display text-4xl text-[#D4FF00]">50+</div>
              <div className="mt-2 text-sm text-[#F4F4F4]/60 font-body uppercase tracking-wider">
                Expert Trainers
              </div>
            </div>
            <div className="border border-[#5C5C5C]/40 p-6">
              <div className="font-display text-4xl text-[#FF4500]">10K+</div>
              <div className="mt-2 text-sm text-[#F4F4F4]/60 font-body uppercase tracking-wider">
                Members Strong
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
