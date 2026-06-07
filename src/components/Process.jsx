import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

const steps = [
  {
    step: '01',
    title: 'Gold Bar',
    subtitle: 'The Raw Material',
    desc: 'Pure 22-karat gold sourced from certified refineries. Every gram is tested for purity before a single tool touches it.',
    emoji: '🪨',
    color: '#8B6D3B',
    bgGlow: 'rgba(139,109,59,0.1)',
  },
  {
    step: '02',
    title: 'Melting',
    subtitle: 'The Transformation',
    desc: 'Gold is melted at 1064°C in a hand-held crucible. The craftsman reads the flow to know exactly when to pour.',
    emoji: '🔥',
    color: '#D1521F',
    bgGlow: 'rgba(209,82,31,0.1)',
  },
  {
    step: '03',
    title: 'Design',
    subtitle: 'The Shaping',
    desc: 'Using centuries-old hand tools — files, mandrels, hammers — the liquid gold is shaped into raw form by feel, not machine.',
    emoji: '⚒️',
    color: '#9C7F31',
    bgGlow: 'rgba(156,127,49,0.1)',
  },
  {
    step: '04',
    title: 'Setting',
    subtitle: 'The Detail',
    desc: 'Stones are placed by eye. Prongs are bent by hand. No magnifying machine — just 30 years of practiced precision.',
    emoji: '💎',
    color: '#1F8EA3',
    bgGlow: 'rgba(31,142,163,0.1)',
  },
  {
    step: '05',
    title: 'Final Jewel',
    subtitle: 'The Masterpiece',
    desc: 'Polished, hallmarked, and passed through 12 quality checks before it leaves the workshop — ready to become part of your story.',
    emoji: '✨',
    color: '#A37E30',
    bgGlow: 'rgba(163,126,48,0.1)',
  },
]

export default function Process() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const containerRef = useRef()
  const stepsRef = useRef([])
  const progressRef = useRef()
  useEffect(() => {
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

    // Create a single timeline to animate the steps and progress bar in sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${(steps.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: 0.5, // Smooth scrubbing
      },
    })

    // Animate transition between each step
    steps.forEach((_, i) => {
      if (i === 0) return // Step 0 starts active/visible
      
      const label = `step-${i}`
      
      // 1. Fade out the previous step
      tl.to(
        stepsRef.current[i - 1],
        {
          opacity: 0,
          y: -60,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        label
      )
      
      // 2. Fade in the current step
      tl.fromTo(
        stepsRef.current[i],
        { opacity: 0, y: 60, scale: 1.02 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        label
      )
      
      // 3. Animate the progress bar width
      if (progressRef.current) {
        tl.to(
          progressRef.current,
          {
            width: `${((i + 1) / steps.length) * 100}%`,
            duration: 0.8,
            ease: 'none',
          },
          label
        )
      }
    })

    ScrollTrigger.refresh()

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === containerRef.current || t.vars.trigger === sectionRef.current) {
          t.kill()
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="process" style={{ background: '#F7F4EB' }}>
      {/* Heading */}
      <div ref={headingRef} className="text-center pt-16 md:pt-28 pb-10 md:pb-16 px-6" style={{ opacity: 0 }}>
        <p className="font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9A84C' }}>
          — How It's Made —
        </p>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0B131E', letterSpacing: '0.05em' }}
        >
          From{' '}
          <span className="font-serif italic gold-text" style={{ fontWeight: 300 }}>
            Earth
          </span>{' '}
          to Eternity
        </h2>
        <div className="section-divider mt-6" />
      </div>

      {/* Pinned scroll container */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow that changes */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.02), transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '1px',
            background: 'rgba(201,168,76,0.2)',
          }}
        >
          <div
            ref={progressRef}
            style={{
              height: '100%',
              width: '20%',
              background: 'linear-gradient(90deg, #C9A84C, #E8C97A)',
              transition: 'width 0.5s ease',
            }}
          />
        </div>

        {/* Step counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(201,168,76,0.4)',
              }}
            />
          ))}
        </div>

        {/* Steps (stacked using CSS grid, shown one at a time) */}
        <div style={{ display: 'grid', width: '100%', maxWidth: '900px', padding: '0 2rem' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => (stepsRef.current[i] = el)}
              style={{
                gridArea: '1 / 1 / 2 / 2',
                opacity: i === 0 ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1.5rem',
                width: '100%',
                position: 'relative',
              }}
            >
              {/* Step number */}
              <span
                className="font-display"
                style={{
                  fontSize: 'clamp(5rem, 15vw, 12rem)',
                  color: `rgba(201,168,76,0.12)`,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -60%)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  zIndex: 0,
                  lineHeight: 1,
                }}
              >
                {step.step}
              </span>

              {/* Emoji */}
              <div
                style={{
                  fontSize: '5rem',
                  filter: `drop-shadow(0 6px 12px rgba(0,0,0,0.08))`,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.emoji}
              </div>

              {/* Subtitle */}
              <p
                className="font-sans text-xs tracking-[0.3em] uppercase"
                style={{ color: step.color, zIndex: 1 }}
              >
                {step.subtitle}
              </p>

              {/* Title */}
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  color: '#0B131E',
                  letterSpacing: '0.08em',
                  position: 'relative',
                  zIndex: 1,
                  margin: 0,
                }}
              >
                {step.title}
              </h2>

              {/* Description */}
              <p
                className="font-sans text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg px-2 md:px-0"
                style={{ color: 'rgba(11, 19, 30, 0.65)', position: 'relative', zIndex: 1 }}
              >
                {step.desc}
              </p>

              {/* Arrow down (not last) */}
              {i < steps.length - 1 && (
                <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '1.5rem', zIndex: 1 }}>↓</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
