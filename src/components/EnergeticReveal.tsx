import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

interface EnergeticRevealProps {
  text: string
  className?: string
  trigger?: boolean
}

interface LineData {
  id: string
  chars: string[]
  spacers: string[]
}

export default function EnergeticReveal({ text, className, trigger }: EnergeticRevealProps) {
  const [isClient, setIsClient] = useState(false)
  const [lines, setLines] = useState<LineData[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const words = text.split(' ')
    const newLines = words.map((word, i) => ({
      id: `w-${i}`,
      chars: word.split(''),
      spacers: Array.from({ length: word.length - 1 }, () => `s-${i}`),
    }))
    setLines(newLines)
  }, [text])

  useEffect(() => {
    if (!isClient || !trigger || !containerRef.current) return

    const container = containerRef.current
    const chars = Array.from(container.querySelectorAll('.char'))

    chars.forEach((char, index) => {
      const tl = gsap.timeline()
      tl.fromTo(
        char,
        {
          y: index % 2 === 0 ? '-1000%' : '1000%',
          rotation: index % 2 === 0 ? -45 : 45,
          scale: 2.5,
        },
        {
          y: '0%',
          rotation: 0,
          scale: 1,
          duration: 1.2,
          delay: index * 0.02,
          ease: 'elastic.out(1.2, 0.5)',
        }
      )
    })
  }, [trigger, isClient, lines])

  if (!isClient) return null

  return (
    <div ref={containerRef} className={`reveal-container ${className || ''}`}>
      {lines.map((line, i) => (
        <div key={line.id} className="line">
          {line.chars.map((char, j) => (
            <span key={`c-${i}-${j}`} className="char">
              {char}
            </span>
          ))}
          {i < lines.length - 1 && (
            <span className="spacer">&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  )
}
