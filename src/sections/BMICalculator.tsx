import { useRef, useEffect, useState, useCallback } from 'react'
import { Calculator, Activity, TrendingUp, AlertCircle } from 'lucide-react'
import RadiantTypographicBurst from '@/components/RadiantTypographicBurst'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BMIResult {
  bmi: number
  category: string
  color: string
}

export default function BMICalculator() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<BMIResult | null>(null)
  const [displayBMI, setDisplayBMI] = useState('0.0')
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bmi-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const calculateBMI = useCallback(() => {
    const w = parseFloat(weight)
    const h = parseFloat(height)

    if (!w || !h || w <= 0 || h <= 0) return

    setIsCalculating(true)
    const heightInMeters = h / 100
    const bmiValue = w / (heightInMeters * heightInMeters)

    let category = ''
    let color = ''

    if (bmiValue < 18.5) {
      category = 'Underweight'
      color = '#3B82F6'
    } else if (bmiValue < 25) {
      category = 'Healthy'
      color = '#D4FF00'
    } else if (bmiValue < 30) {
      category = 'Overweight'
      color = '#FF4500'
    } else {
      category = 'Obese'
      color = '#EF4444'
    }

    // Slot machine effect
    let counter = 0
    const targetBMI = bmiValue.toFixed(1)
    const shuffleInterval = setInterval(() => {
      setDisplayBMI((Math.random() * 40).toFixed(1))
      counter++
      if (counter > 20) {
        clearInterval(shuffleInterval)
        setDisplayBMI(targetBMI)
        setResult({ bmi: bmiValue, category, color })
        setIsCalculating(false)

        if (resultRef.current) {
          gsap.fromTo(
            resultRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
          )
        }
      }
    }, 50)
  }, [weight, height])

  const getGuidance = () => {
    if (!result) return null
    const bmi = result.bmi

    if (bmi < 18.5) {
      return 'Focus on strength training and a calorie-rich diet. Consult our fitness experts for a personalized plan.'
    } else if (bmi < 25) {
      return 'Maintain with balanced workouts and healthy eating. You are in the optimal range — keep it up!'
    } else if (bmi < 30) {
      return 'Add more cardio and track your calorie intake. Our trainers can help you create a structured plan.'
    } else {
      return 'Work with a trainer for a structured weight loss program. We are here to support your journey.'
    }
  }

  return (
    <section
      id="bmi"
      ref={sectionRef}
      className="relative w-full bg-[#1E1E1E] py-24 md:py-40 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gallery-2.jpg"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E] via-[#1E1E1E]/90 to-[#1E1E1E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto bmi-content">
        <div className="text-center mb-16">
          <RadiantTypographicBurst className="font-display text-[8vw] md:text-[5vw] tracking-tighter-custom text-[#F4F4F4] uppercase">
            TACTICAL ASSESSMENT
          </RadiantTypographicBurst>
          <p className="mt-4 text-lg text-[#F4F4F4]/60 font-body max-w-2xl mx-auto">
            BMI (Body Mass Index) uses your height and weight to estimate if you&apos;re underweight,
            healthy, overweight, or obese. It&apos;s a quick health indicator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Activity size={24} className="text-[#FF4500]" />
              <h3 className="font-display text-xl tracking-wide text-[#F4F4F4] uppercase">
                Know Your BMI
              </h3>
            </div>

            <p className="text-base text-[#F4F4F4]/70 font-body leading-relaxed mb-8">
              BMI is a quick health indicator — but just the starting point. For a complete picture,
              factors like muscle mass, lifestyle, and diet matter too. Consult our fitness experts
              for a personalized plan.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3B82F6] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#F4F4F4]/70 font-body">
                  If your BMI is <strong className="text-[#3B82F6]">below 18.5</strong> → Focus on
                  strength training and a calorie-rich diet.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#D4FF00] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#F4F4F4]/70 font-body">
                  If your BMI is <strong className="text-[#D4FF00]">18.5 – 24.9</strong> → Maintain
                  with balanced workouts and healthy eating.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FF4500] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#F4F4F4]/70 font-body">
                  If your BMI is <strong className="text-[#FF4500]">25 – 29.9</strong> → Add more
                  cardio and track your calorie intake.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#EF4444] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#F4F4F4]/70 font-body">
                  If your BMI is <strong className="text-[#EF4444]">30 or above</strong> → Work with
                  a trainer for a structured weight loss program.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#5C5C5C] font-body">
              <AlertCircle size={16} />
              <span>Consult with our fitness experts to get a personalized plan.</span>
            </div>
          </div>

          {/* Right - Calculator */}
          <div className="bg-[#0D0D0D]/80 border border-[#5C5C5C]/30 p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <Calculator size={24} className="text-[#FF4500]" />
              <h3 className="font-display text-2xl tracking-wide text-[#F4F4F4] uppercase">
                BMI Calculator
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[#F4F4F4]/60 font-body mb-2 uppercase tracking-wider">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter your weight"
                  className="w-full bg-[#1E1E1E] border border-[#5C5C5C]/40 px-4 py-3 text-[#F4F4F4] font-body text-base placeholder:text-[#5C5C5C]/50 focus:border-[#FF4500] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#F4F4F4]/60 font-body mb-2 uppercase tracking-wider">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter your height"
                  className="w-full bg-[#1E1E1E] border border-[#5C5C5C]/40 px-4 py-3 text-[#F4F4F4] font-body text-base placeholder:text-[#5C5C5C]/50 focus:border-[#FF4500] focus:outline-none transition-colors"
                />
              </div>

              <button
                onClick={calculateBMI}
                disabled={isCalculating || !weight || !height}
                className="w-full btn-molten disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <TrendingUp size={18} />
                <span>{isCalculating ? 'Calculating...' : 'Calculate BMI'}</span>
              </button>
            </div>

            {/* Result */}
            {(result || isCalculating) && (
              <div ref={resultRef} className="mt-8 pt-8 border-t border-[#5C5C5C]/30">
                <div className="text-center">
                  <div
                    className="font-display text-[80px] md:text-[100px] leading-none tracking-tighter"
                    style={{ color: result?.color || '#FF4500' }}
                  >
                    {displayBMI}
                  </div>
                  {result && (
                    <>
                      <div
                        className="mt-2 font-display text-xl tracking-widest uppercase"
                        style={{ color: result.color }}
                      >
                        {result.category}
                      </div>
                      <p className="mt-4 text-sm text-[#F4F4F4]/60 font-body">
                        {getGuidance()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
