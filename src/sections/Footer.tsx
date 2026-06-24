import { MapPin, Phone, Mail, Instagram, Youtube, Twitter, Dumbbell } from 'lucide-react'

interface FooterProps {
  onNavigate: (id: string) => void
  onWhatsApp: () => void
}

export default function Footer({ onNavigate, onWhatsApp }: FooterProps) {
  const quickLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About Us', id: 'about' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Membership', id: 'membership' },
    { label: 'Contact', id: 'contact' },
    { label: 'BMI Calculator', id: 'bmi' },
  ]

  return (
    <footer id="contact" className="relative w-full bg-[#0D0D0D] pt-24 pb-8 px-6 lg:px-12">
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="relative bg-[#1E1E1E] border border-[#5C5C5C]/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h3 className="font-display text-3xl md:text-4xl tracking-tight text-[#F4F4F4] uppercase">
              Your Fitness, Our Commitment!
            </h3>
            <p className="mt-2 text-base text-[#F4F4F4]/60 font-body">
              Join Forge Fitness — Where Strength Meets Discipline.
            </p>
          </div>

          <button
            onClick={onWhatsApp}
            className="relative z-10 btn-molten flex items-center gap-3 flex-shrink-0"
          >
            <Dumbbell size={18} />
            <span>Start 7-Day Trial</span>
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-[#F4F4F4] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-[#F4F4F4]/60 font-body hover:text-[#FF4500] transition-colors uppercase tracking-wider"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-[#F4F4F4] uppercase mb-6">
              About Forge
            </h4>
            <p className="text-sm text-[#F4F4F4]/60 font-body leading-relaxed mb-6">
              <strong className="text-[#F4F4F4]">Forge Fitness</strong> is your ultimate destination
              for strength, stamina, and transformation. Join us for expert guidance, modern
              equipment, and a motivating atmosphere.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#5C5C5C]/40 text-[#F4F4F4]/60 hover:text-[#FF4500] hover:border-[#FF4500] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#5C5C5C]/40 text-[#F4F4F4]/60 hover:text-[#FF4500] hover:border-[#FF4500] transition-all"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-[#5C5C5C]/40 text-[#F4F4F4]/60 hover:text-[#FF4500] hover:border-[#FF4500] transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg tracking-widest text-[#F4F4F4] uppercase mb-6">
              How to Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#FF4500] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#F4F4F4]/60 font-body">
                  TF 05, Third Floor, Sector 78, Noida
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#FF4500] flex-shrink-0" />
                <a
                  href="https://wa.me/919220371767"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#F4F4F4]/60 font-body hover:text-[#FF4500] transition-colors"
                >
                  +91 922 037 17 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#FF4500] flex-shrink-0" />
                <a
                  href="mailto:info@forgefitness.in"
                  className="text-sm text-[#F4F4F4]/60 font-body hover:text-[#FF4500] transition-colors"
                >
                  info@forgefitness.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#5C5C5C]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5C5C5C] font-body">
            Copyright © 2026 forgefitness.in | Powered by Forge Fitness
          </p>
          <p className="text-xs text-[#5C5C5C] font-body">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
