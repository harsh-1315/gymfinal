import { useRef, useEffect } from 'react'
import { Flame, Heart, Zap, Dumbbell, User } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const facilities = [
  {
    icon: Flame,
    title: 'Powerstation',
    description:
      'Your ultimate strength zone — built for serious lifters and everyday athletes alike. Equipped with premium deadlift platforms, squat racks, and strength-focused machines.',
  },
  {
    icon: Heart,
    title: 'Cardio Zone',
    description:
      'Designed to get your heart pumping and endurance rising. With treadmills, cross-trainers, and more, it\'s built to boost stamina, burn fat, and strengthen your cardio game.',
  },
  {
    icon: Zap,
    title: 'Functional Training',
    description:
      'Where strength meets agility. From rigs to sledge, monkey bars to boxing bags, train your body to perform, endure, and excel in every move.',
  },
  {
    icon: Dumbbell,
    title: 'Weight Training',
    description:
      'Your power hub — packed with free weights and machines designed to build muscle, strength, and confidence.',
  },
  {
    icon: User,
    title: 'Personal Training',
    description:
      'One-on-one training with our certified trainers, focusing on your specific fitness target and designed to help you get faster results.',
  },
]

export default function Facilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
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
      id="facilities"
      ref={sectionRef}
      className="relative w-full bg-[#1E1E1E] py-24 md:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-[8vw] md:text-[5vw] tracking-tighter-custom text-[#F4F4F4] uppercase mb-4">
          Facilities at Forge
        </h2>
        <p className="text-lg text-[#F4F4F4]/60 font-body max-w-2xl mb-16">
          Every zone is engineered for maximum performance. From raw power to precision training,
          find your edge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, i) => {
            const Icon = facility.icon
            return (
              <div
                key={facility.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative bg-[#0D0D0D] border border-[#5C5C5C]/30 p-8 transition-all duration-500 hover:border-[#FF4500] hover:shadow-[0_0_30px_rgba(255,69,0,0.15)]"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#FF4500]/10 border border-[#FF4500]/30 mb-6 transition-all duration-300 group-hover:bg-[#FF4500] group-hover:border-[#FF4500]">
                  <Icon
                    size={28}
                    className="text-[#FF4500] transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="font-display text-2xl tracking-wide text-[#F4F4F4] uppercase mb-4">
                  {facility.title}
                </h3>

                <p className="text-sm text-[#F4F4F4]/60 font-body leading-relaxed">
                  {facility.description}
                </p>

                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF4500] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
