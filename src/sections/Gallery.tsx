import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: '/images/gallery-1.jpg', alt: 'Gym Interior', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery-2.jpg', alt: 'Barbell Grip', span: 'col-span-1 row-span-2' },
  { src: '/images/gallery-3.jpg', alt: 'Box Jump', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-4.jpg', alt: 'Deadlift', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-5.jpg', alt: 'Cardio Zone', span: 'col-span-2 row-span-1' },
  { src: '/images/gallery-6.jpg', alt: 'Battle Ropes', span: 'col-span-1 row-span-1' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.gallery-item')
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
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
      id="gallery"
      ref={sectionRef}
      className="relative w-full bg-[#1E1E1E] py-24 md:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-[8vw] md:text-[5vw] tracking-tighter-custom text-[#F4F4F4] uppercase">
            Our Fitness in Action
          </h2>
          <p className="mt-4 text-lg text-[#F4F4F4]/60 font-body max-w-2xl mx-auto">
            A glimpse into the energy, dedication, and transformation happening every day at
            Forge Fitness.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`gallery-item group relative overflow-hidden ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="font-display text-xs tracking-widest text-[#D4FF00] uppercase">
                  {String(i + 1).padStart(3, '0')}
                </span>
                <p className="font-body text-sm text-[#F4F4F4] mt-1">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
