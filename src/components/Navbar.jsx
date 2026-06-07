import { useEffect, useRef, useState } from 'react'
import { gsap } from '../animations/gsap'

export default function Navbar() {
  const navRef = useRef()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuHovered, setMenuHovered] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
    )

    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Spy on sections to highlight active link
      const sections = ['hero', 'collection', 'story', 'process', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 250

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === 'hero' ? 'home' : section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          background: scrolled ? 'rgba(247, 244, 235, 0.96)' : 'rgba(247, 244, 235, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201, 168, 76, 0.12)',
        }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-20 transition-all duration-500 flex items-center justify-between ${
          scrolled ? 'py-4 md:py-6' : 'py-5.5 md:py-9'
        }`}
      >
        {/* Custom BJ Monogram Logo */}
        <a href="#hero" className="flex items-center gap-4.5 select-none" style={{ textDecoration: 'none' }}>
          <div
            className="flex items-center justify-center rounded-full border border-[#C9A84C]"
            style={{
              width: '54px',
              height: '54px',
              borderWidth: '0.75px',
              borderColor: '#C9A84C',
              boxShadow: '0 0 18px rgba(201, 168, 76, 0.18)',
              flexShrink: 0,
              background: '#FAF8F5',
            }}
          >
            <img
              src="/bj_logo.png"
              alt="Bavatharani Jewellers"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="font-display text-[#0B131E] text-sm md:text-[17px] tracking-[0.2em] font-bold">
              BAVATHARANI
            </span>
            <span className="font-display text-[9px] md:text-[10px] tracking-[0.34em] text-[#A87C11] font-bold">
              JEWELLERS
            </span>
          </div>
        </a>

        {/* Links (Desktop only) */}
        <ul className="hidden md:flex gap-13 list-none items-center m-0 p-0">
          {['Home', 'Collection', 'Story', 'Process', 'Gallery', 'Contact'].map((link) => {
            const isLinkActive = activeSection === link.toLowerCase()
            return (
              <li key={link} className="relative py-2 flex flex-col items-center">
                <a
                  href={`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`}
                  className="magnetic font-display text-[12px] md:text-[14px] tracking-[0.28em] uppercase font-normal"
                  style={{
                    color: isLinkActive ? '#C9A84C' : 'rgba(11, 19, 30, 0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLinkActive) {
                      e.target.style.color = 'rgba(11, 19, 30, 0.95)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLinkActive) {
                      e.target.style.color = 'rgba(11, 19, 30, 0.6)'
                    }
                  }}
                >
                  {link}
                </a>
                {isLinkActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
                      width: '18px',
                      height: '1px',
                      background: '#C9A84C',
                      boxShadow: '0 0 6px rgba(201, 168, 76, 0.4)',
                    }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA and Hamburger Row */}
        <div className="flex items-center gap-8">
          <a
            href="#contact"
            className="uiverse-gold-btn hidden md:inline-flex"
          >
            Book Appointment
          </a>

          {/* Hamburger button (always visible as designer menu button) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
            className="flex flex-col gap-2 justify-center items-end p-2 transition-all duration-300 hover:scale-105 mr-[-6px]"
            style={{
              background: 'transparent',
              border: 'none',
            }}
          >
            <div style={{ width: '32px', height: '1.25px', background: '#0B131E', transition: 'all 0.3s' }} />
            <div style={{ width: menuHovered ? '32px' : '20px', height: '1.25px', background: '#0B131E', transition: 'all 0.3s' }} />
            <div style={{ width: '32px', height: '1.25px', background: '#0B131E', transition: 'all 0.3s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile/Full-screen Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-999 flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: 'rgba(247, 244, 235, 0.98)',
            backdropFilter: 'blur(20px)',
            transition: 'opacity 0.3s ease',
            zIndex: 99999,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-8 text-2xl font-sans"
            style={{ background: 'transparent', border: 'none', color: '#C9A84C' }}
          >
            ✕
          </button>

          {/* Links List */}
          <ul className="flex flex-col gap-8 text-center list-none p-0 m-0">
            {['Home', 'Collection', 'Story', 'Process', 'Gallery', 'Contact'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-xl tracking-[0.25em] uppercase transition-colors"
                  style={{
                    color: activeSection === link.toLowerCase() ? '#C9A84C' : 'rgba(11, 19, 30, 0.75)',
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="mt-6 flex justify-center">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="uiverse-gold-btn"
                style={{
                  maxWidth: '220px',
                }}
              >
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}


