import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onNavigate: (id: string) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Membership', id: 'membership' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('hero')}
          className="font-display text-2xl tracking-wider text-[#F4F4F4] hover:text-[#FF4500] transition-colors"
        >
          FORGE FITNESS
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="font-body text-sm tracking-wide text-[#F4F4F4]/80 hover:text-[#FF4500] transition-colors uppercase"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('bmi')}
            className="bg-[#FF4500] text-white px-5 py-2 font-display text-sm tracking-widest uppercase hover:bg-[#D4FF00] hover:text-[#0D0D0D] transition-all"
          >
            BMI Calculator
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#F4F4F4]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D]/95 backdrop-blur-lg px-6 pb-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id)
                setMenuOpen(false)
              }}
              className="block w-full text-left py-3 font-body text-sm tracking-wide text-[#F4F4F4]/80 hover:text-[#FF4500] transition-colors uppercase border-b border-[#5C5C5C]/30"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('bmi')
              setMenuOpen(false)
            }}
            className="mt-4 w-full bg-[#FF4500] text-white px-5 py-3 font-display text-sm tracking-widest uppercase hover:bg-[#D4FF00] hover:text-[#0D0D0D] transition-all"
          >
            BMI Calculator
          </button>
        </div>
      )}
    </nav>
  )
}
