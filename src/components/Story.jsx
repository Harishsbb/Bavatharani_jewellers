import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

const milestones = [
  {
    year: '1992',
    title: 'The Beginning',
    text: "A passionate goldsmith began his journey by learning and crafting jewellery in his father's shop. With dedication, patience, and love for the art, he built the foundation of his craftsmanship."
  },
  {
    year: '2002',
    title: 'The Dream Shop',
    text: 'After years of experience and hard work, he started his own journey by opening a rented jewellery workshop, turning his dream into reality.'
  },
  {
    year: 'Today',
    title: 'The Legacy Continues',
    text: 'With decades of expertise, we continue creating handcrafted jewellery with trust, quality, and perfection. Every piece we make carries tradition, emotion, and timeless beauty.'
  }
]

export default function Story() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const quoteRef = useRef()
  const timelineRef = useRef()
  const beforeRef = useRef()
  const afterRef = useRef()
  const arrowRef = useRef()
  const itemsRef = useRef([])

  useEffect(() => {
    // Pin and reveal heading
    gsap.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )
    gsap.fromTo(
      quoteRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    )

    // Transformation visual parallax
    gsap.fromTo(
      beforeRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    )
    gsap.fromTo(
      arrowRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
        transformOrigin: 'left',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    )
    gsap.fromTo(
      afterRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      }
    )

    // Timeline items stagger
    itemsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    ScrollTrigger.refresh()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      style={{ background: '#FFFFFF' }}
      className="w-full flex flex-col items-center justify-center py-16 md:py-32"
    >
      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 flex flex-col items-center">

        {/* Heading */}
        <div ref={headingRef} className="flex flex-col items-center text-center mb-10 md:mb-20 w-full" style={{ opacity: 0 }}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9A84C', marginRight: '-0.4em' }}>
            — Our Heritage —
          </p>
          <h2
            className="font-serif italic"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#0B131E', fontWeight: 300, lineHeight: 1.2 }}
          >
            Not just jewellery,
          </h2>
          <h2
            className="font-display gold-text"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '0.05em' }}
          >
            We Create Emotions
          </h2>
          <div className="section-divider mt-8" />
        </div>

        {/* Transformation visual */}
        <div ref={timelineRef} className="flex items-start justify-center gap-8 md:gap-16 mb-12 md:mb-24 flex-wrap w-full">
          {/* Before */}
          <div ref={beforeRef} className="text-center" style={{ opacity: 0 }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #FAF6EE, #E6DED0)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201, 168, 76, 0.25)',
              }}
            >
              <span style={{ fontSize: '3rem' }}>🪨</span>
            </div>
            <p className="font-sans text-xs tracking-[0.2em] mt-3 uppercase" style={{ color: 'rgba(11, 19, 30, 0.55)' }}>
              Raw Gold
            </p>
          </div>

          {/* Arrow */}
          <div ref={arrowRef} className="hidden md:flex flex-col items-center" style={{ opacity: 0 }}>
            <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '20px',
                      height: '1px',
                      background: `rgba(201,168,76,${0.3 + i * 0.2})`,
                    }}
                  />
                ))}
                <div style={{ color: '#C9A84C', fontSize: '1.2rem', lineHeight: 1 }}>→</div>
              </div>
            </div>
            <p className="font-sans text-xs tracking-[0.2em] text-center mt-3 uppercase" style={{ color: 'rgba(11, 19, 30, 0.55)', whiteSpace: 'nowrap' }}>
              30 years of craft
            </p>
          </div>

          {/* After */}
          <div ref={afterRef} className="text-center" style={{ opacity: 0 }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(201,168,76,0.15), rgba(201,168,76,0.02))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201,168,76,0.4)',
                boxShadow: '0 0 30px rgba(201,168,76,0.12)',
              }}
            >
              <span style={{ fontSize: '3rem' }}>✨</span>
            </div>
            <p className="font-sans text-xs tracking-[0.2em] mt-3 uppercase" style={{ color: '#C9A84C' }}>
              Masterpiece
            </p>
          </div>
        </div>

        {/* Quote */}
        <div
          ref={quoteRef}
          className="mb-12 md:mb-24 max-w-2xl mx-auto w-full"
          style={{ opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
        >
          <p
            className="font-serif italic text-2xl md:text-3xl"
            style={{ color: 'rgba(11, 19, 30, 0.75)', lineHeight: 1.6, fontWeight: 300, textAlign: 'center' }}
          >
            "Every piece I make carries the weight of my father's lessons and the dreams of the family who will wear it."
          </p>
          <p className="font-sans text-xs tracking-[0.3em] mt-6 uppercase" style={{ color: 'rgba(201,168,76,0.8)', textAlign: 'center' }}>
            — The Master Goldsmith
          </p>
        </div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)',
              transform: 'translateX(-50%)',
            }}
            className="hidden md:block"
          />

          <div className="flex flex-col gap-16">
            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => (itemsRef.current[i] = el)}
                className="flex items-start w-full"
                style={{ opacity: 0 }}
              >
                {/* Left half */}
                <div
                  className="hidden md:block md:w-5/12 shrink-0"
                  style={{
                    textAlign: 'right',
                    paddingRight: '3rem',
                    visibility: i % 2 === 0 ? 'visible' : 'hidden',
                    pointerEvents: i % 2 === 0 ? 'auto' : 'none',
                  }}
                >
                  <span className="font-display gold-text text-4xl font-bold">{m.year}</span>
                  <h3 className="font-serif text-xl mt-1 mb-2" style={{ color: '#0B131E' }}>{m.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(11, 19, 30, 0.6)' }}>{m.text}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex md:w-2/12 justify-center shrink-0" style={{ paddingTop: '12px' }}>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      background: '#C9A84C',
                      borderRadius: '50%',
                      boxShadow: '0 0 10px rgba(201,168,76,0.3)',
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* Right half */}
                <div
                  className="hidden md:block md:w-5/12 shrink-0"
                  style={{
                    textAlign: 'left',
                    paddingLeft: '3rem',
                    visibility: i % 2 === 1 ? 'visible' : 'hidden',
                    pointerEvents: i % 2 === 1 ? 'auto' : 'none',
                  }}
                >
                  <span className="font-display gold-text text-4xl font-bold">{m.year}</span>
                  <h3 className="font-serif text-xl mt-1 mb-2" style={{ color: '#0B131E' }}>{m.title}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(11, 19, 30, 0.6)' }}>{m.text}</p>
                </div>

                {/* Mobile: single column */}
                <div className="md:hidden w-full">
                  <div className="flex items-start gap-4">
                    <div style={{ width: '8px', height: '8px', background: '#C9A84C', borderRadius: '50%', flexShrink: 0, marginTop: '8px' }} />
                    <div>
                      <span className="font-display gold-text text-3xl font-bold">{m.year}</span>
                      <h3 className="font-serif text-lg mt-1 mb-2" style={{ color: '#0B131E' }}>{m.title}</h3>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(11, 19, 30, 0.6)' }}>{m.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
