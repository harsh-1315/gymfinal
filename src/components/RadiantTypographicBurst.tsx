import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface RadiantTypographicBurstProps {
  children: string
  className?: string
}

export default function RadiantTypographicBurst({ children, className }: RadiantTypographicBurstProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const chars = containerRef.current?.querySelectorAll('.burst-char')
    if (!chars) return

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    chars.forEach((char, index) => {
      const rect = char.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) - cx
      const y = (rect.top + rect.height / 2) - cy
      const angle = Math.atan2(y, x)
      const dist = 1500 + Math.random() * 1500
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist
      const rot = (Math.random() - 0.5) * 720

      gsap.fromTo(
        char,
        {
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
        },
        {
          x: tx,
          y: ty,
          scale: 1,
          rotation: rot,
          opacity: 1,
          duration: 1.5,
          delay: index * 0.02,
          ease: 'expo.out',
          onComplete: () => {
            gsap.to(char, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 1.0,
              ease: 'expo.inOut',
            })
          },
        }
      )
    })
  }, [])

  const chars = children.split('')

  return (
    <div ref={containerRef} className={`inline-block whitespace-nowrap ${className || ''}`}>
      {chars.map((char, i) => (
        <span key={i} className="burst-char">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}
