import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const isHoveringRef = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      })
      gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const onEnterInteractive = () => {
      isHoveringRef.current = true
      gsap.to(dot, { scale: 0, duration: 0.2 })
      gsap.to(outline, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
      })
    }

    const onLeaveInteractive = () => {
      isHoveringRef.current = false
      gsap.to(dot, { scale: 1, duration: 0.2 })
      gsap.to(outline, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
      })
    }

    window.addEventListener('mousemove', onMove)

    // Observe interactive elements
    const observer = new MutationObserver(() => {
      attachListeners()
    })

    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        'button, a, input, textarea, [role="button"]'
      )
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    attachListeners()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-[#FF4500] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#FF4500] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
