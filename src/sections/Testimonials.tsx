import { useRef, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Priya B.',
    text: 'Came here for a free trial, ended up taking the annual membership! Worth every rupee. The trainers here genuinely care about your progress.',
    rating: 5,
  },
  {
    name: 'Rohit S.',
    text: 'I never thought workouts could be this much fun. The group classes are my favorite! The energy in this gym is absolutely unmatched.',
    rating: 5,
  },
  {
    name: 'Amit K.',
    text: 'Lost 8 kilos in 4 months! Trainers here are super motivating and the vibe is amazing. Best decision I ever made for my health.',
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0D0D0D] py-24 md:py-40 px-6 lg:px-12"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gallery-5.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-[8vw] md:text-[5vw] tracking-tighter-custom text-[#F4F4F4] uppercase">
            Member Stories
          </h2>
          <p className="mt-4 text-lg text-[#F4F4F4]/60 font-body">
            Real results. Real people. Real transformations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card relative bg-[#1E1E1E]/80 border border-[#5C5C5C]/30 p-8 backdrop-blur-sm"
            >
              <Quote size={32} className="text-[#FF4500]/30 mb-4" />

              <p className="text-base text-[#F4F4F4]/80 font-body leading-relaxed mb-6">
                {t.text}
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#D4FF00] fill-[#D4FF00]" />
                ))}
              </div>

              <div className="font-display text-lg tracking-wide text-[#F4F4F4]">
                {t.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
