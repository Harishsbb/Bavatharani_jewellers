import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsap'

const categories = [
  {
    id: 1,
    name: 'Necklaces',
    image: '/hero_necklace.png',
    designs: '120+ Designs',
    icon: (
      <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8a6 6 0 0012 0M8.5 13.5a3.5 3.5 0 007 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5v2.5M12 17.5a1 1 0 100-2 1 1 0 000 2z" />
        <circle cx="6" cy="8" r="1" fill="currentColor" />
        <circle cx="18" cy="8" r="1" fill="currentColor" />
      </svg>
    ),
    details: {
      title: 'Royal Heritage Necklaces',
      subtitle: 'Pure 22-Karat Gold Masterpieces',
      desc: 'Our necklace collections showcase centuries of Dindigul goldsmithing heritage. Perfect for brides who desire an authentic traditional presence. Features hand-wrought patterns, custom gemstone settings, and exquisite craftsmanship in every link.',
      specs: [
        { label: 'Gold Purity', value: '22K Gold (916 Hallmarked)' },
        { label: 'Weight Range', value: '45g – 180g+' },
        { label: 'Stone Options', value: 'Precious Rubies, Emeralds, Uncut Diamonds' },
        { label: 'Crafting Time', value: '14 to 28 Days (Custom Orders)' }
      ]
    }
  },
  {
    id: 2,
    name: 'Bangles',
    image: '/goddess_bangle.png',
    designs: '85+ Designs',
    icon: (
      <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <ellipse cx="11" cy="13" rx="7" ry="3.5" transform="rotate(-15 11 13)" strokeLinecap="round" />
        <ellipse cx="13" cy="10" rx="7" ry="3.5" transform="rotate(-15 13 10)" strokeLinecap="round" />
      </svg>
    ),
    details: {
      title: 'Antique Kada Bangles',
      subtitle: 'Intricate Temple Architecture Motifs',
      desc: 'Sculpted by master artisans, these kada and temple design bangles celebrate femininity and marital bliss with deep relief work. Featuring beautiful hand-engraved motifs of divinity and nature.',
      specs: [
        { label: 'Gold Purity', value: '22K Gold (916 Hallmarked)' },
        { label: 'Weight Range', value: '24g – 80g per pair' },
        { label: 'Closure Style', value: 'Traditional Hinged / Screw type' },
        { label: 'Finish', value: 'Antique Matte Gold / Polish finish' }
      ]
    }
  },
  {
    id: 3,
    name: 'Chains',
    image: '/heritage_chain.png',
    designs: '95+ Designs',
    icon: (
      <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    details: {
      title: 'Heritage Rope & Mugappu',
      subtitle: 'Traditional Heavy Twisted Chains',
      desc: 'A staple of South Indian heritage. The rope twisting is done entirely by hand to ensure durability and a rich texture that captures the light. Adorned with custom designer side-pendants (Mugappu) in ruby and gold configurations.',
      specs: [
        { label: 'Gold Purity', value: '22K Gold (916 Hallmarked)' },
        { label: 'Weight Range', value: '16g – 90g+' },
        { label: 'Lengths Available', value: '18 inches – 30 inches' },
        { label: 'Mugappu Options', value: 'Peacock, Floral, and Geometric designs' }
      ]
    }
  },
  {
    id: 4,
    name: 'Earrings',
    image: '/star_earrings.png',
    designs: '100+ Designs',
    icon: (
      <svg className="w-7 h-7 text-[#C9A84C] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5c0 3 1 5 1 7.5M8 12.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 5c0 3 1 5 1 7.5M16 12.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        <circle cx="8" cy="5" r="1" fill="currentColor" />
        <circle cx="16" cy="5" r="1" fill="currentColor" />
      </svg>
    ),
    details: {
      title: 'Jhumkas & Chandbalis',
      subtitle: 'Traditional Domes & Moon Silhouettes',
      desc: 'Delight in the gentle swing of handcrafted gold domes. Embellished with pearls, ruby beads, and micro-filigree details, our earrings are designed to sit comfortably while offering premium shine and movement.',
      specs: [
        { label: 'Gold Purity', value: '22K Gold (916 Hallmarked)' },
        { label: 'Weight Range', value: '8g – 40g per pair' },
        { label: 'Backing Type', value: 'South Indian Screw Back / Push Back' },
        { label: 'Embellishments', value: 'Basra Pearls, Ruby beads, Gold droplets' }
      ]
    }
  },
]

export default function Collection() {
  const sectionRef = useRef()
  const leftColRef = useRef()
  const rightColRef = useRef()
  const cardsRef = useRef([])

  const [selectedCategory, setSelectedCategory] = useState(null)
  const modalRef = useRef()
  const backdropRef = useRef()

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden'
      
      // Animate modal in
      gsap.fromTo(backdropRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 30 }, 
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.15)' }
      )
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCategory])

  useEffect(() => {
    // Fade in left column
    gsap.fromTo(
      leftColRef.current.querySelectorAll('.fade-up'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )

    // Stagger reveal cards
    gsap.fromTo(
      cardsRef.current.filter(Boolean),
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    )

    // Force scroll trigger refresh to make sure offsets are calculated correctly
    ScrollTrigger.refresh()
  }, [])

  const onCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -10,
      borderColor: 'rgba(201, 168, 76, 0.45)',
      boxShadow: '0 25px 50px rgba(201, 168, 76, 0.12)',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(e.currentTarget.querySelector('img'), {
      scale: 1.05,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(e.currentTarget.querySelector('.arrow-circle'), {
      backgroundColor: '#8B6914',
      scale: 1.05,
      duration: 0.3,
    })
  }

  const onCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      borderColor: 'rgba(201, 168, 76, 0.14)',
      boxShadow: '0 8px 30px rgba(201, 168, 76, 0.02)',
      duration: 0.4,
      ease: 'power2.out',
    })
    gsap.to(e.currentTarget.querySelector('img'), {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
    gsap.to(e.currentTarget.querySelector('.arrow-circle'), {
      backgroundColor: '#C9A84C',
      scale: 1,
      duration: 0.3,
    })
  }

  return (
    <section
      ref={sectionRef}
      id="collection"
      style={{ background: '#FAF6EE', position: 'relative', overflow: 'hidden' }}
      className="w-full flex items-center justify-center py-16 md:py-32 border-b border-[rgba(201,168,76,0.12)]"
    >
      {/* Background Decorative Gold Arc */}
      <div className="absolute left-0 top-0 bottom-0 pointer-events-none hidden lg:block overflow-hidden w-[400px]">
        <svg className="w-full h-full text-[#C9A84C]/15" viewBox="0 0 400 800" fill="none">
          <circle cx="-100" cy="400" r="450" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="-100" cy="400" r="453" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* Background Mandala top-left */}
      <div className="absolute left-0 top-0 pointer-events-none opacity-[0.07] w-48 h-48 hidden lg:block">
        <svg className="w-full h-full text-[#C9A84C]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="0" cy="0" r="50" />
          <circle cx="0" cy="0" r="40" />
          <circle cx="0" cy="0" r="30" />
          <path d="M0,0 L50,0 M0,0 L35,35 M0,0 L0,50 M0,0 L-35,35 M0,0 L-50,0 M0,0 L-35,-35 M0,0 L0,-50 M0,0 L35,-35" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(30)" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(90)" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(150)" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(210)" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(270)" />
          <path d="M 0 0 C 10 -20, 20 -10, 0 0 C -10 -20, -20 -10, 0 0" transform="rotate(330)" />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Heading and description */}
        <div ref={leftColRef} className="w-full lg:w-[28%] flex flex-col items-center text-center lg:items-start lg:text-left shrink-0">
          <p className="fade-up font-sans text-xs tracking-[0.4em] uppercase mb-4 text-[#C9A84C]" style={{ opacity: 0 }}>
            — Our Collection —
          </p>
          <h2
            className="fade-up font-display font-normal text-[#0B131E] uppercase"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', letterSpacing: '0.04em', lineHeight: 1.1, opacity: 0 }}
          >
            Crafted to<br />
            <span className="font-serif italic font-light text-[#C9A84C] capitalize">
              Perfection
            </span>
          </h2>

          {/* Elegant Lotus Separator */}
          <div className="fade-up flex items-center gap-4 my-6 w-full max-w-[220px]" style={{ opacity: 0 }}>
            <div className="h-[0.75px] grow" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
            <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-1.78-.5-3.5-1.5-5C18.5 5.5 17 4.5 15 4c-1.33 1.33-2 3-2 5.5M12 21a9 9 0 0 1-9-9c0-1.78.5-3.5 1.5-5C5.5 5.5 7 4.5 9 4c1.33 1.33 2 3 2 5.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V9.5M12 9.5c.66-1.5 1.5-2.5 2.5-3M12 9.5c-.66-1.5-1.5-2.5-2.5-3" />
            </svg>
            <div className="h-[0.75px] grow" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
          </div>

          <p className="fade-up font-sans text-xs md:text-sm leading-relaxed mb-8 text-[rgba(11,19,30,0.65)]" style={{ opacity: 0 }}>
            Each piece is a blend of tradition and modern elegance, made to celebrate your special moments.
          </p>
          <a
            href="#gallery"
            className="fade-up uiverse-gold-btn mt-2"
            style={{
              opacity: 0,
            }}
          >
            View All Collections &nbsp;→
          </a>
        </div>

        {/* Right Column: 4 Category Showcase Cards */}
        <div 
          ref={rightColRef}
          className="w-full lg:w-[72%] grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-4"
        >
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={onCardEnter}
              onMouseLeave={onCardLeave}
              onClick={() => setSelectedCategory(cat)}
              className="bg-white border border-[rgba(201,168,76,0.14)] rounded-3xl p-4 pb-6 flex flex-col justify-between items-stretch transition-all duration-500 shadow-[0_8px_30px_rgba(201,168,76,0.02)] relative overflow-hidden cursor-pointer"
              style={{ opacity: 0, height: '420px' }}
            >
              {/* Product Image Showcase container */}
              <div className="w-full h-[200px] rounded-2xl overflow-hidden relative group shrink-0">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                  style={{
                    willChange: 'transform',
                  }}
                />
              </div>

              {/* Card Body content */}
              <div className="flex flex-col items-center text-center mt-5 grow justify-center">
                {/* Category Icon */}
                {cat.icon}
                
                {/* Category Title */}
                <h3 className="font-display text-[14px] md:text-[15px] font-bold text-[#0B131E] tracking-[0.2em] uppercase mt-2">
                  {cat.name}
                </h3>
                
                {/* Designs Count */}
                <p className="font-sans text-[10px] md:text-[11px] tracking-[0.12em] text-[#C9A84C] mt-1 font-semibold">
                  {cat.designs}
                </p>
              </div>

              {/* Card Footer: Explore Collection text + Arrow Button */}
              <div className="flex items-center justify-between w-full pt-4 mt-auto border-t border-[rgba(201,168,76,0.08)]">
                <span className="font-sans text-[10px] font-bold text-[#0B131E]/55 tracking-wider uppercase">
                  Explore Collection
                </span>

                <div 
                  className="arrow-circle w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dialog Overlay */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur fade */}
          <div 
            ref={backdropRef}
            className="absolute inset-0 bg-[#060B12]/80 backdrop-blur-md"
            onClick={() => setSelectedCategory(null)}
          />
          
          {/* Modal Container */}
          <div 
            ref={modalRef}
            className="bg-[#FAF6EE] border border-[#C9A84C]/30 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            style={{
              boxShadow: '0 25px 60px -15px rgba(201, 168, 76, 0.25)',
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-[rgba(11,19,30,0.1)] hover:border-[#C9A84C] flex items-center justify-center text-[#0B131E]/60 hover:text-[#C9A84C] transition-all duration-300 bg-white/50 backdrop-blur-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left: Beautiful Image Container */}
            <div className="w-full md:w-1/2 h-[260px] md:h-auto min-h-[300px] relative shrink-0">
              <img 
                src={selectedCategory.image} 
                alt={selectedCategory.name} 
                className="w-full h-full object-cover" 
              />
              {/* Subtle gold gradient overlay at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B131E]/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Collection Name badge on bottom left of image */}
              <div className="absolute bottom-6 left-6">
                <span className="font-sans text-[10px] font-bold text-[#C9A84C] tracking-[0.25em] uppercase bg-[#0B131E]/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {selectedCategory.name}
                </span>
              </div>
            </div>

            {/* Right: Detailed Content and Specs */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between items-start text-left">
              <div className="w-full">
                <h3 className="font-display text-2xl font-normal text-[#0B131E] uppercase tracking-wide leading-tight">
                  {selectedCategory.details.title}
                </h3>
                <p className="font-serif italic text-xs text-[#C9A84C] mt-1 mb-4">
                  {selectedCategory.details.subtitle}
                </p>
                
                <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-[rgba(11,19,30,0.65)] mb-6">
                  {selectedCategory.details.desc}
                </p>
                
                {/* Spec Table */}
                <div className="border-t border-b border-[rgba(201,168,76,0.12)] py-4 my-4 w-full">
                  <h4 className="font-sans text-[9px] font-bold tracking-[0.2em] text-[#0B131E]/40 uppercase mb-3">
                    Technical Specifications
                  </h4>
                  <div className="flex flex-col gap-2">
                    {selectedCategory.details.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center justify-between text-[11px] md:text-[12px]">
                        <span className="font-sans text-[#0B131E]/50">{spec.label}</span>
                        <span className="font-sans font-semibold text-[#0B131E]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Call to Action: WhatsApp Inquiry */}
              <button
                onClick={() => {
                  const msg = encodeURIComponent(`Hello! I'm interested in exploring the ${selectedCategory.details.title} collection at Bavatharani Jewellers. Please share more designs and details. ✨`)
                  window.open(`https://wa.me/919842014761?text=${msg}`, '_blank')
                }}
                className="w-full mt-4 bg-[#0B131E] text-white hover:text-white font-sans text-xs tracking-[0.15em] font-bold uppercase py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#C9A84C] shadow-lg hover:shadow-[0_10px_20px_rgba(201,168,76,0.15)] group cursor-pointer"
              >
                {/* WhatsApp Icon */}
                <svg className="w-4 h-4 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.419 1.451 5.428 0 9.845-4.414 9.849-9.847.002-2.632-1.018-5.105-2.871-6.96C17.189 1.94 14.722.92 12.01.919c-5.438 0-9.854 4.415-9.858 9.849-.001 1.97.513 3.891 1.492 5.592l-.979 3.578 3.673-.963zm12.334-7.461c-.328-.164-1.94-.959-2.241-1.07-.301-.11-.52-.164-.738.164-.219.329-.848 1.07-1.039 1.29-.19.219-.383.246-.71.082-.328-.164-1.386-.511-2.641-1.63-1.0-.893-1.676-1.996-1.873-2.325-.197-.329-.022-.507.142-.67.147-.147.328-.383.492-.575.164-.19.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-.738-1.78-.178-.43-.36-.37-.502-.375-.126-.005-.271-.005-.416-.005-.145 0-.383.055-.584.274-.2.219-.766.749-.766 1.826 0 1.078.784 2.119.893 2.266.11.147 1.543 2.356 3.739 3.303.522.225.93.36 1.248.462.525.167 1.003.143 1.381.086.42-.063 1.299-.53 1.48-.99.18-.46.18-.854.126-.94-.056-.086-.205-.138-.533-.302z"/>
                </svg>
                Inquire via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
