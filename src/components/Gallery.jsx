import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

// Masonry items with placeholder backgrounds
const galleryItems = [
  { id: 1, span: 'tall', label: 'Bridal Set 2024', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/royal_necklace.png' },
  { id: 3, span: 'normal', label: 'Temple Necklace', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/bavatharani_necklace.png' },
  { id: 4, span: 'normal', label: 'Gold Chain', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/heritage_chain.png' },
  { id: 5, span: 'tall', label: 'Kundan Earrings', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/star_earrings.png' },
  { id: 6, span: 'wide', label: 'Goddess Bangle', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/goddess_bangle.png' },
  { id: 8, span: 'normal', label: 'Layered Set', bg: 'linear-gradient(135deg, #FAF8F5, #F5F2EA)', image: '/royal_necklace.png' },
]

export default function Gallery() {
  const sectionRef = useRef()
  const headingRef = useRef()
  const itemsRef = useRef([])

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

    itemsRef.current.filter(Boolean).forEach((el, i) => {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1,
          delay: i * 0.06,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      )
    })

    ScrollTrigger.refresh()
  }, [])

  const sizeMap = {
    normal: { gridRow: 'span 1', gridColumn: 'span 1' },
    tall: { gridRow: 'span 2', gridColumn: 'span 1' },
    wide: { gridRow: 'span 1', gridColumn: 'span 2' },
  }

  return (
    <section ref={sectionRef} id="gallery" style={{ background: '#FFFFFF' }} className="w-full flex flex-col items-center pt-16 pb-28 md:pt-32 md:pb-48">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 flex flex-col items-center w-full" style={{ opacity: 0 }}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9A84C' }}>
            — Portfolio —
          </p>
          <h2
            className="font-display text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0B131E', letterSpacing: '0.05em' }}
          >
            Moments Made{' '}
            <span className="gold-text font-serif italic" style={{ fontWeight: 300 }}>
              Golden
            </span>
          </h2>
          <div style={{ width: '80px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', marginTop: '1.5rem' }} />
        </div>

        {/* Parent wrapper for gallery alignment */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* Gallery Grid Group */}
          <div 
            style={{
              maxWidth: '1100px',
              width: '100%',
            }}
          >
            {/* Masonry grid */}
            <div className="gallery-masonry-grid">
              {galleryItems.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className={`gallery-item-${item.span}`}
                  style={{
                    background: item.bg,
                    border: '1px solid rgba(201,168,76,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    opacity: 0,
                    clipPath: 'inset(100% 0 0 0)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.03, duration: 0.4, ease: 'power2.out' })
                    gsap.to(e.currentTarget.querySelector('.gallery-overlay'), {
                      opacity: 1,
                      duration: 0.3,
                    })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'power2.out' })
                    gsap.to(e.currentTarget.querySelector('.gallery-overlay'), {
                      opacity: 0,
                      duration: 0.3,
                    })
                  }}
                >
                  {/* Product Image Showcase */}
                  <div
                    className="p-6 sm:p-10"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-[85%] h-[85%] object-contain"
                      style={{
                        filter: 'drop-shadow(0 6px 12px rgba(201, 168, 76, 0.15))',
                      }}
                    />
                  </div>

                  {/* Gold shimmer */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.05) 60%, transparent 80%)',
                    }}
                  />

                  {/* Hover overlay */}
                  <div
                    className="gallery-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(247, 244, 235, 0.94)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '1.5rem',
                      opacity: 0,
                    }}
                  >
                    <p className="font-sans text-xs tracking-[0.2em] uppercase" style={{ color: '#0B131E', fontWeight: 600 }}>
                      {item.label}
                    </p>
                    <div
                      style={{
                        width: '30px',
                        height: '1px',
                        background: '#C9A84C',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                      }}
                    />
                    <p className="font-sans text-xs" style={{ color: 'rgba(11, 19, 30, 0.65)' }}>
                      View Details →
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', opacity: 0.4 }}>
                    <div style={{ width: '20px', height: '1px', background: '#C9A84C', marginLeft: 'auto' }} />
                    <div style={{ width: '1px', height: '20px', background: '#C9A84C', marginLeft: 'auto' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button
            className="uiverse-gold-btn-secondary"
          >
            View Full Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}
