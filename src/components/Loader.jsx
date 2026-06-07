import { useEffect, useRef } from 'react'
import { gsap } from '../animations/gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef()
  const logoRef = useRef()
  const sinceRef = useRef()
  const welcomeRef = useRef()
  const particlesRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete,
        })
      },
    })

    // Particles float in
    tl.fromTo(
      particlesRef.current,
      { y: 40, opacity: 0, scale: 0 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.08, ease: 'power3.out' },
      0
    )

    // Logo reveal
    tl.fromTo(
      logoRef.current,
      { y: 60, opacity: 0, letterSpacing: '0.5em' },
      { y: 0, opacity: 1, letterSpacing: '0.15em', duration: 1.4, ease: 'power4.out' },
      0.4
    )

    // Since text
    tl.fromTo(
      sinceRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.2
    )

    // Welcome text
    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.8
    )

    // Hold, then exit
    tl.to({}, { duration: 0.8 })

    // Particles scatter
    tl.to(
      particlesRef.current,
      { y: -60, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'power2.in' },
      '-=0.4'
    )
  }, [])

  const particles = Array.from({ length: 18 })

  return (
    <div
      ref={loaderRef}
      style={{ background: '#F7F4EB', zIndex: 9990 }}
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((_, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            style={{
              position: 'absolute',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              borderRadius: '50%',
              background: `rgba(201,168,76,${0.3 + Math.random() * 0.7})`,
              boxShadow: '0 0 6px rgba(201,168,76,0.8)',
            }}
          />
        ))}
      </div>

      {/* Divider line top */}
      <div
        style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6))' }}
        className="mb-8"
      />

      {/* Logo */}
      <h1
        ref={logoRef}
        className="font-display gold-text text-3xl md:text-5xl text-center"
        style={{ letterSpacing: '0.15em' }}
      >
        BAVATHARANI JEWELLERS
      </h1>

      {/* Since */}
      <p
        ref={sinceRef}
        className="font-sans text-xs tracking-[0.4em] mt-3 opacity-60 text-center"
        style={{ color: '#C9A84C' }}
      >
        — SINCE 2002 —
      </p>

      {/* Divider line */}
      <div className="section-divider my-6" style={{ width: '80px' }} />

      {/* Welcome */}
      <p
        ref={welcomeRef}
        className="font-serif text-xl md:text-2xl italic text-center"
        style={{ color: 'rgba(11, 19, 30, 0.75)' }}
      >
        Welcome to crafted luxury
      </p>

      {/* Divider line bottom */}
      <div
        style={{ width: '1px', height: '60px', background: 'linear-gradient(to top, transparent, rgba(201,168,76,0.6))' }}
        className="mt-8"
      />
    </div>
  )
}
