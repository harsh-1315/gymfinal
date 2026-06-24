import { useEffect, useState } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        onComplete()
      },
    })

    tl.to('.preloader-text', {
      opacity: 1,
      duration: 0.2,
      stagger: 0.1,
    })
    tl.to('.preloader-text', {
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      delay: 0.3,
    })
    tl.to('.preloader-bg', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
    })
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="preloader-bg fixed inset-0 z-[100] bg-[#0D0D0D] flex items-center justify-center">
      <div className="flex gap-2">
        {'FORGE'.split('').map((char, i) => (
          <span
            key={i}
            className="preloader-text font-display text-5xl md:text-7xl text-[#FF4500] opacity-0 tracking-wider"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
