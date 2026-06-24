import { useRef, useEffect, useState } from 'react'
import { Check, Crown, Shield, Award } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'IRON',
    subtitle: 'Basic',
    price: '19,990',
    period: '6 months',
    icon: Shield,
    features: [
      'Full gym access',
      'Locker room facilities',
      'Basic fitness assessment',
      'Access to group classes',
      'Mobile app tracking',
    ],
    highlight: false,
  },
  {
    name: 'STEEL',
    subtitle: 'Pro',
    price: '29,990',
    period: '12 months',
    icon: Award,
    features: [
      'Everything in IRON',
      '4 Personal training sessions',
      'Nutrition consultation',
      'Priority class booking',
      'Recovery zone access',
      'Monthly body composition scan',
    ],
    highlight: true,
  },
  {
    name: 'TITANIUM',
    subtitle: 'Elite',
    price: '44,990',
    period: '24 months',
    icon: Crown,
    features: [
      'Everything in STEEL',
      'Unlimited personal training',
      'Custom meal plans',
      '24/7 gym access',
      'VIP locker & towel service',
      'Quarterly progress reports',
      'Guest passes (2/month)',
    ],
    highlight: false,
  },
]

export default function Membership() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.plan-card')
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
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
      id="membership"
      ref={sectionRef}
      className="relative w-full bg-[#0D0D0D] py-24 md:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-[8vw] md:text-[5vw] tracking-tighter-custom text-[#F4F4F4] uppercase">
            Membership Plans
          </h2>
          <p className="mt-4 text-lg text-[#F4F4F4]/60 font-body max-w-2xl mx-auto">
            Our <strong className="text-[#FF4500]">flexible membership options</strong> are designed
            to suit every fitness goal and schedule. Choose the plan that fits your ambition.
          </p>
          <p className="mt-2 text-xs text-[#5C5C5C] font-body">
            *Terms and Conditions apply. Prices inclusive of GST.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const isHovered = hoveredIndex === i

            return (
              <div
                key={plan.name}
                className={`plan-card relative border border-[#5C5C5C]/40 p-8 md:p-10 transition-all duration-500 cursor-default ${
                  plan.highlight
                    ? 'bg-[#FF4500]/5 border-[#FF4500]/50'
                    : 'bg-[#1E1E1E]/50'
                } ${isHovered ? 'md:scale-[1.02] z-10' : ''}`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  boxShadow: isHovered
                    ? plan.highlight
                      ? '0 0 40px rgba(255,69,0,0.2)'
                      : '0 0 40px rgba(212,255,0,0.15)'
                    : 'none',
                }}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-[#FF4500]" />
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-[#FF4500] border-[#FF4500]'
                        : 'bg-transparent border-[#5C5C5C]/50'
                    }`}
                  >
                    <Icon
                      size={22}
                      className={plan.highlight ? 'text-white' : 'text-[#5C5C5C]'}
                    />
                  </div>
                  <div>
                    <div className="font-display text-3xl tracking-wide text-[#F4F4F4]">
                      {plan.name}
                    </div>
                    <div className="text-xs text-[#5C5C5C] font-body uppercase tracking-widest">
                      {plan.subtitle}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-[#5C5C5C] font-body">₹</span>
                    <span className="font-display text-5xl text-[#F4F4F4]">{plan.price}</span>
                  </div>
                  <div className="text-sm text-[#5C5C5C] font-body mt-1">
                    / {plan.period}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlight ? 'text-[#D4FF00]' : 'text-[#FF4500]'
                        }`}
                      />
                      <span className="text-sm text-[#F4F4F4]/70 font-body">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`text-center py-3 font-display text-sm tracking-widest uppercase border transition-all duration-300 ${
                    plan.highlight
                      ? 'bg-[#FF4500] border-[#FF4500] text-white'
                      : 'border-[#5C5C5C]/50 text-[#F4F4F4]/60'
                  }`}
                >
                  {plan.highlight ? 'MOST POPULAR' : 'SECURE MEMBERSHIP'}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#5C5C5C] font-body">
            Membership fees may differ based on current promotions or the package you select.
            Please visit our club for personalized fitness assessment.
          </p>
        </div>
      </div>
    </section>
  )
}
