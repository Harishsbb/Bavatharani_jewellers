import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

export default function Hero() {
  const heroBgImage = '/hero_bg.png'
  const sectionRef = useRef()
  const headlineRef = useRef()
  const subRef = useRef()
  const ctaRef = useRef()
  const canvasWrapRef = useRef()
  const taglineRef = useRef()
  const scrollIndicatorRef = useRef()
  const glowRef = useRef()

  const necklaceRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5

      if (necklaceRef.current) {
        gsap.to(necklaceRef.current, {
          x: -x * 45,
          y: -y * 45,
          scale: 1.06,
          duration: 0.8,
          ease: 'power2.out',
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      canvasWrapRef.current,
      { opacity: 0, scale: 0.85, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power3.out' },
      0.2
    )

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, letterSpacing: '0.8em', y: -10 },
      { opacity: 1, letterSpacing: '0.4em', y: 0, duration: 1.2, ease: 'power3.out' },
      0.5
    )
    tl.fromTo(
      headlineRef.current.querySelectorAll('.line'),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power4.out' },
      '-=0.6'
    )
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    tl.fromTo(
      ctaRef.current.querySelectorAll('a, button'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    )

    // Scroll parallax & fade
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress
        if (canvasWrapRef.current) {
          gsap.set(canvasWrapRef.current, {
            y: p * 110,
            opacity: Math.max(0, 1 - p * 1.3),
          })
        }
        if (glowRef.current) {
          gsap.set(glowRef.current, {
            scale: 1 + p * 0.4,
            opacity: Math.max(0, 1 - p * 1.5),
          })
        }
        if (headlineRef.current) {
          gsap.set(headlineRef.current, { x: -p * 80, opacity: 1 - p })
        }
        if (subRef.current) {
          gsap.set(subRef.current, { x: p * 50, opacity: 1 - p * 2 })
        }
      },
    })

    return () => {
      tl.kill()
      st.kill()
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <section
        ref={sectionRef}
        id="hero"
        style={{ minHeight: '100vh', background: '#FAF6EE', position: 'relative' }}
        className="flex flex-col justify-between overflow-hidden"
      >
      {/* Absolute Background Image (Desktop only) */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{ opacity: 0 }}
      >
        <img
          ref={necklaceRef}
          src={heroBgImage}
          alt="Handcrafted Gold Necklace Set Showcase"
          className="w-full h-full object-cover object-right"
          style={{
            willChange: 'transform',
            transform: 'scale(1.06)',
          }}
        />
      </div>

      {/* Main Grid Content - unified background */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-stretch justify-between grow">

        {/* Left column */}
        <div
          className="w-full md:w-[42%] flex flex-col justify-start md:justify-center items-center text-center md:items-start md:text-left pl-6 pr-6 md:pr-12 md:pl-20 lg:pl-28 xl:pl-36 pt-32 pb-8 md:py-16 relative z-10"
        >
          <p
            ref={taglineRef}
            className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3 md:mb-5 text-center md:text-left w-full"
            style={{ color: '#C9A84C', opacity: 0 }}
          >
            Handcrafted Gold Jewellery
          </p>

          <div ref={headlineRef} style={{ overflow: 'hidden' }} className="w-full mb-4 md:mb-6">
            <div className="line" style={{ overflow: 'hidden' }}>
              <h1
                className="font-display gold-text text-center md:text-left font-normal uppercase"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)', lineHeight: 1.1, letterSpacing: '0.04em' }}
              >
                Timeless
              </h1>
            </div>
            <div className="line" style={{ overflow: 'hidden' }}>
              <h1
                className="font-display text-center md:text-left font-normal uppercase"
                style={{
                  fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.04em',
                  color: '#0B131E',
                }}
              >
                Beauty.
              </h1>
            </div>
          </div>

          <p
            ref={subRef}
            className="font-sans text-xs md:text-sm text-center md:text-left max-w-xs md:max-w-sm leading-relaxed mb-6 md:mb-16"
            style={{ color: 'rgba(11, 19, 30, 0.65)', opacity: 0 }}
          >
            Discover the elegance of handcrafted gold jewellery, designed with passion, precision and perfection.
          </p>

          <div ref={ctaRef} className="flex flex-row flex-wrap gap-4 md:gap-8 items-center justify-center md:justify-start w-full">
            <a
              href="#collection"
              className="uiverse-gold-btn"
              style={{
                opacity: 0,
              }}
            >
              Explore Collection <span>→</span>
            </a>
            <a
              href="#story"
              className="uiverse-gold-btn-secondary"
              style={{
                opacity: 0,
              }}
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Right column: showcase of the gold necklace set (Mobile only) */}
        <div
          className="w-full md:hidden h-[340px] sm:h-[420px] relative z-0 flex items-center justify-center grow"
        >
          <img
            src={heroBgImage}
            alt="Handcrafted Gold Necklace Set"
            className="w-full h-full object-cover object-right"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#collection"
        ref={scrollIndicatorRef}
        className="absolute left-6 md:left-24 bottom-14 z-20 flex flex-col items-start gap-1 select-none hover:opacity-80 transition-opacity"
        style={{ textDecoration: 'none', opacity: 0 }}
      >
        <span className="font-sans text-[8.5px] md:text-[9.5px] tracking-[0.3em] uppercase text-[rgba(11, 19, 30, 0.45)]">
          Scroll Down
        </span>
        <svg
          className="w-3.5 h-3.5 text-[#C9A84C] animate-bounce mt-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          style={{ marginLeft: '10px' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>

    </section>

    {/* Floating Stats Bar pill overlapping bottom edge */}
    <div 
      className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[92%] max-w-5xl bg-white/90 backdrop-blur-md border border-[rgba(201,168,76,0.18)] rounded-2xl shadow-[0_25px_50px_rgba(201,168,76,0.08)] z-30 transition-all duration-300 hover:shadow-[0_30px_60px_rgba(201,168,76,0.12)]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 py-5 md:py-6">

        {/* 30+ Years of Trust */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 justify-center lg:justify-start pb-4 lg:pb-0 border-b border-r border-[rgba(201,168,76,0.15)] lg:border-b-0 lg:border-r-0">
          <div className="w-11 h-11 rounded-full border border-[rgba(201,168,76,0.25)] bg-[#FAF8F5]/60 text-[#C9A84C] flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3L9 9l3 12 3-12-2-6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
            </svg>
          </div>
          <div>
            <p className="font-serif italic text-lg md:text-xl font-bold text-[#0B131E] leading-none">30+</p>
            <p className="font-sans text-[8.5px] md:text-[9.5px] tracking-[0.2em] uppercase text-gray-500 mt-1.5 font-semibold">Years of Trust</p>
          </div>
        </div>

        {/* 100% Handcrafted */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 justify-center lg:justify-start pb-4 lg:pb-0 border-b border-[rgba(201,168,76,0.15)] lg:border-b-0 lg:border-l">
          <div className="w-11 h-11 rounded-full border border-[rgba(201,168,76,0.25)] bg-[#FAF8F5]/60 text-[#C9A84C] flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.904 14.187M9.813 15.904l-3.09-3.09M18.25 15.75L19.5 17.5M15.75 18.25L17.5 19.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904l6.09-6.09M21 3h-6v6h6V3z" />
            </svg>
          </div>
          <div>
            <p className="font-serif italic text-lg md:text-xl font-bold text-[#0B131E] leading-none">100%</p>
            <p className="font-sans text-[8.5px] md:text-[9.5px] tracking-[0.2em] uppercase text-gray-500 mt-1.5 font-semibold">Handcrafted</p>
          </div>
        </div>

        {/* 916 Pure Gold */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 justify-center lg:justify-start pt-4 lg:pt-0 border-r border-[rgba(201,168,76,0.15)] lg:border-r-0 lg:border-l">
          <div className="w-11 h-11 rounded-full border border-[rgba(201,168,76,0.25)] bg-[#FAF8F5]/60 text-[#C9A84C] flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div>
            <p className="font-serif italic text-lg md:text-xl font-bold text-[#0B131E] leading-none">916</p>
            <p className="font-sans text-[8.5px] md:text-[9.5px] tracking-[0.2em] uppercase text-gray-500 mt-1.5 font-semibold">Pure Gold</p>
          </div>
        </div>

        {/* 5000+ Happy Customers */}
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 justify-center lg:justify-start pt-4 lg:pt-0 lg:border-l border-[rgba(201,168,76,0.15)]">
          <div className="w-11 h-11 rounded-full border border-[rgba(201,168,76,0.25)] bg-[#FAF8F5]/60 text-[#C9A84C] flex items-center justify-center shrink-0 shadow-sm">
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div>
            <p className="font-serif italic text-lg md:text-xl font-bold text-[#0B131E] leading-none">5000+</p>
            <p className="font-sans text-[8.5px] md:text-[9.5px] tracking-[0.2em] uppercase text-gray-500 mt-1.5 font-semibold">Happy Customers</p>
          </div>
        </div>

      </div>
    </div>
  </div>
  )
}
