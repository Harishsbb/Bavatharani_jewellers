import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '../animations/gsap'

function FloatingOrb({ position, color, size }) {
  return (
    <Float speed={1 + Math.random()} floatIntensity={0.6} rotationIntensity={0.4}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.7}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  )
}

export default function Contact() {
  const sectionRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray('.reveal')
      if (reveals.length === 0) return

      gsap.fromTo(
        reveals,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }, sectionRef)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => ctx.revert()
  }, [])

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hello! I'm interested in a custom jewellery piece from Bavatharani Jewellers. ✨")
    window.open(`https://wa.me/919842014761?text=${msg}`, '_blank')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById('fullName').value
    const phone = document.getElementById('phoneNumber').value
    const interest = document.getElementById('interest').value
    const message = document.getElementById('message').value

    const interestLabels = {
      custom: 'Custom Design Consultation',
      bridal: 'Bridal & Wedding Rings',
      private: 'Private Gallery Viewing',
      restoration: 'Heirloom Restoration',
      general: 'General Corporate Enquiry'
    }

    const reason = interestLabels[interest] || interest

    const waText = `Hello Bavatharani Jewellers! ✨\n\nI would like to request a consultation:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Reason:* ${reason}\n*Message/Vision:* ${message}`
    const encodedText = encodeURIComponent(waText)
    
    window.open(`https://wa.me/919842014761?text=${encodedText}`, '_blank')
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pb-16 md:pb-16"
      style={{
        background: '#0A1118',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Refined Dark Theme CSS Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        #contact {
          padding-top: 2.5rem !important;
          margin-top: 2.5rem !important;
        }
        @media (min-width: 768px) {
          #contact {
            padding-top: 3.5rem !important;
            margin-top: 0 !important;
          }
        }
        .contact-grid {
          padding-top: 2rem !important;
        }
        @media (min-width: 768px) {
          .contact-grid {
            padding-top: 3rem !important;
          }
        }
        
        .editorial-input-group {
          position: relative;
          margin-bottom: 2.2rem;
          width: 100%;
        }
        .editorial-input, .editorial-textarea, .editorial-select {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(201, 168, 76, 0.3);
          padding: 0.8rem 0.5rem 0.8rem 2.2rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #FFFFFF;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          outline: none;
          border-radius: 0;
        }
        .editorial-select {
          appearance: none;
          cursor: pointer;
        }
        .editorial-select option {
          background: #0A1118;
          color: #FFFFFF;
        }
        .editorial-input:focus, .editorial-textarea:focus, .editorial-select:focus {
          border-bottom-color: #C9A84C;
          box-shadow: 0 4px 15px -4px rgba(201, 168, 76, 0.15);
        }
        .editorial-label {
          position: absolute;
          left: 2.2rem;
          top: 0.8rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          pointer-events: none;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .editorial-input:focus ~ .editorial-label,
        .editorial-input:not(:placeholder-shown) ~ .editorial-label,
        .editorial-textarea:focus ~ .editorial-label,
        .editorial-textarea:not(:placeholder-shown) ~ .editorial-label {
          top: -0.9rem;
          left: 0.2rem;
          font-size: 0.65rem;
          color: #C9A84C;
          font-weight: 600;
          letter-spacing: 0.2em;
        }
        
        /* Select element label always stays up */
        .editorial-select-label {
          top: -0.9rem;
          left: 0.2rem;
          font-size: 0.65rem;
          color: #C9A84C;
          font-weight: 600;
          letter-spacing: 0.2em;
        }
        
        .editorial-icon {
          position: absolute;
          left: 0.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(201, 168, 76, 0.5);
          transition: all 0.4s;
        }
        .editorial-input:focus ~ .editorial-icon,
        .editorial-textarea:focus ~ .editorial-icon,
        .editorial-select:focus ~ .editorial-icon {
          color: #C9A84C;
        }
        
        /* Luxury Editorial buttons */
        .luxury-action-btn {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0px;
          background: transparent;
          color: #FFFFFF;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
        }
        
        .showroom-action-btn {
          border: 1px solid rgba(201, 168, 76, 0.35);
          color: #C9A84C;
        }
        .showroom-action-btn:hover {
          border-color: #C9A84C;
          background: #C9A84C;
          color: #0A1118;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(201, 168, 76, 0.15);
        }
        
        .whatsapp-action-btn {
          border: 1px solid rgba(37, 211, 102, 0.35);
          color: #25D366;
        }
        .whatsapp-action-btn:hover {
          border-color: #25D366;
          background: #25D366;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.15);
        }
        
        .submit-btn-gold {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #B9935A 0%, #E7C794 50%, #B9935A 100%);
          color: #0A1118;
          border: none;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(185, 147, 90, 0.2);
          border-radius: 2px;
        }
        .submit-btn-gold:hover {
          background: linear-gradient(135deg, #C9A84C 0%, #F5DBA5 50%, #C9A84C 100%);
          color: #0A1118;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(201, 168, 76, 0.4);
        }
        .submit-btn-gold::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 100%
          );
          transform: skewX(-25deg);
          transition: 0.75s;
        }
        .submit-btn-gold:hover::before {
          left: 125%;
        }
        
        .social-link-circle {
          width: 40px;
          height: 40px;
          border: 1.25px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          transition: all 0.4s;
          text-decoration: none;
        }
        .social-link-circle:hover {
          color: #C9A84C;
          border-color: #C9A84C;
          background: rgba(201, 168, 76, 0.08);
          transform: translateY(-3px);
        }
      `}} />

      {/* 3D background (highly luminous gold spheres on dark background) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.65, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <Environment preset="studio" />
          <ambientLight intensity={0.1} />
          <pointLight position={[4, 4, 4]} color="#C9A84C" intensity={2} />
          <pointLight position={[-4, -4, -4]} color="#E8C97A" intensity={1} />

          <FloatingOrb position={[-3.5, 2, -2]} color="#C9A84C" size={0.38} />
          <FloatingOrb position={[3.5, -1.5, -3]} color="#E8C97A" size={0.24} />
          <FloatingOrb position={[-2, -2.5, -1]} color="#8B6914" size={0.16} />
          <FloatingOrb position={[2, 2.5, -1]} color="#C9A84C" size={0.3} />
        </Canvas>
      </div>

      <div
        ref={contentRef}
        className="relative px-6 md:px-12 w-full max-w-6xl z-10 flex flex-col items-center"
      >
        {/* Main Grid: Dark Luxury Frameless Editorial Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 contact-grid mb-16 md:mb-36 items-start text-left">

          {/* Left Column: Boutique & Workshop Info */}
          <div className="lg:col-span-5 flex flex-col gap-12 reveal" style={{ opacity: 0 }}>
            <div>
              <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-3 font-semibold">
                — Boutique & Workshop —
              </p>
              <h2 className="font-serif italic text-4xl md:text-5xl text-white font-light tracking-wide mb-6">
                Visit Us
              </h2>
              <div style={{ width: '40px', height: '1.5px', background: '#C9A84C', marginBottom: '2.5rem' }} />

              <p className="font-sans text-xs md:text-sm text-gray-400 leading-relaxed mb-10 max-w-sm">
                Experience the heritage of craftsmanship firsthand. Our main showroom and design consultations are held in our private salon.
              </p>

              {/* Detail Blocks */}
              <div className="flex flex-col gap-8 mb-12">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="text-[#C9A84C] mt-0.5 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-white mb-1 font-semibold">Showroom</h4>
                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                      17/B, Begambur Road,<br />
                      Dindigul Bazaar, Dindigul — 624001<br />
                      <span className="text-[10px] text-gray-500 font-semibold">(Opposite Municipal High School)</span>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="text-[#C9A84C] mt-0.5 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-white mb-1 font-semibold">Hours</h4>
                    <p className="font-sans text-xs md:text-sm text-gray-300 leading-relaxed">
                      Monday – Saturday: 10:00 AM – 8:30 PM<br />
                      Sunday: Available on Call
                    </p>
                  </div>
                </div>

                {/* Direct Line */}
                <div className="flex items-start gap-4">
                  <div className="text-[#C9A84C] mt-0.5 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.118-3.85-6.675-6.675l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-white mb-1 font-semibold">Direct Concierge</h4>
                    <a
                      href="tel:+919842014761"
                      className="font-serif text-lg text-white hover:text-[#C9A84C] transition-colors duration-300 font-semibold tracking-wide"
                      style={{ textDecoration: 'none' }}
                    >
                      +91 98420 14761
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-4.5 mt-6 w-full">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleWhatsApp();
                }}
                className="uiverse-gold-btn w-full gap-2 whitespace-nowrap"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.497 1.45 5.416 1.451 5.58 0 10.121-4.524 10.125-10.098.002-2.702-1.047-5.24-2.954-7.147C17.33 1.455 14.793.4 12.01.4 6.436.4 1.895 4.924 1.89 10.5c-.001 1.924.502 3.8 1.453 5.4l-.985 3.597 3.69-.968zm11.583-7.859c-.3-.15-1.774-.875-2.049-.976-.276-.1-.476-.15-.676.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.414-1.49-1.272-1.135-1.924-2.22-2.156-2.585-.23-.365-.025-.562.125-.712.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.628-.926-2.229-.244-.589-.493-.508-.676-.517-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-.1.525.5 1.15.5 1.225 1.875 2.15 1.875 2.15s3.23 4.962 7.828 6.95c1.093.473 1.947.756 2.612.967 1.097.348 2.096.3 2.885.182.879-.13 1.774-.725 2.024-1.388.25-.663.25-1.23.175-1.388-.075-.15-.275-.25-.575-.4z" />
                </svg>
                WhatsApp Consultation
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bavatharani+Jewellers+Begambur+Road+Dindigul"
                target="_blank"
                rel="noopener noreferrer"
                className="uiverse-gold-btn-secondary-dark w-full gap-2 whitespace-nowrap"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                </svg>
                Locate Showroom
              </a>
            </div>
          </div>

          {/* Right Column: Dark Editorial Form */}
          <div className="lg:col-span-7 reveal" style={{ opacity: 0 }}>
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-3 font-semibold">
              — Private Appointment —
            </p>
            <h2 className="font-serif italic text-4xl md:text-5xl text-white font-light tracking-wide mb-8">
              Request Consultation
            </h2>
            <div style={{ width: '40px', height: '1.5px', background: '#C9A84C', marginBottom: '3.5rem' }} />

            <form onSubmit={handleSubmit} className="flex flex-col w-full">
              {/* Full Name */}
              <div className="editorial-input-group">
                <input
                  type="text"
                  id="fullName"
                  placeholder=" "
                  className="editorial-input"
                  required
                />
                <label htmlFor="fullName" className="editorial-label">Full Name</label>
                <span className="editorial-icon">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
              </div>

              {/* Phone Number */}
              <div className="editorial-input-group">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder=" "
                  className="editorial-input"
                  required
                />
                <label htmlFor="phoneNumber" className="editorial-label">Phone Number</label>
                <span className="editorial-icon">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </span>
              </div>

              {/* Reason for Enquiry (Select) */}
              <div className="editorial-input-group">
                <select
                  id="interest"
                  className="editorial-select"
                  defaultValue=""
                  required
                >
                  <option value="" disabled hidden></option>
                  <option value="custom">Custom Design Consultation</option>
                  <option value="bridal">Bridal & Wedding Rings</option>
                  <option value="private">Private Gallery Viewing</option>
                  <option value="restoration">Heirloom Restoration</option>
                  <option value="general">General Corporate Enquiry</option>
                </select>
                <label htmlFor="interest" className="editorial-label editorial-select-label">Reason for Enquiry</label>
                <span className="editorial-icon">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(201, 168, 76, 0.5)' }}>
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </div>

              {/* Message */}
              <div className="editorial-input-group">
                <textarea
                  id="message"
                  rows={2}
                  placeholder=" "
                  className="editorial-textarea"
                  required
                />
                <label htmlFor="message" className="editorial-label">Tell us your vision</label>
                <span className="editorial-icon" style={{ top: '1.25rem', transform: 'none' }}>
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </span>
              </div>

              {/* Newsletter checkbox */}
              <div className="flex items-start gap-3 mt-1 mb-8">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="w-4 h-4 rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
                  style={{ accentColor: '#C9A84C', cursor: 'pointer' }}
                />
                <label htmlFor="newsletter" className="font-sans text-[11px] text-gray-400 tracking-wide select-none cursor-pointer">
                  Subscribe to receive updates on exclusive collections & private previews
                </label>
              </div>

              {/* Submit button */}
              <div className="flex justify-start mt-8">
                <button
                  type="submit"
                  className="uiverse-gold-btn"
                  style={{
                    marginTop: '10px',      // MOVE DOWN: increase (e.g. '30px'), MOVE UP: decrease (e.g. '-10px')
                    marginBottom: '0px',   // Spacing below the button
                    marginLeft: '0px',     // MOVE RIGHT: increase (e.g. '20px')
                    marginRight: '0px',    // MOVE LEFT: increase (e.g. '20px')
                    paddingTop: '12px',    // SIZE: Top Padding
                    paddingBottom: '10px', // SIZE: Bottom Padding
                    paddingLeft: '32px',   // SIZE: Left Padding
                    paddingRight: '32px',  // SIZE: Right Padding
                    fontSize: '11px',      // TEXT SIZE
                    width: 'auto',         // Width: 'auto' or fixed width (e.g. '200px')
                    height: 'auto'         // Height: 'auto'
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-20 pb-4 w-full flex flex-col items-center">
          {/* Social Links */}
          <ul className="reveal flex justify-center gap-4.5 mb-8 list-none p-0 m-0" style={{ opacity: 0 }}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link-circle">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link-circle">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-link-circle">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.162 0 7.396 2.967 7.396 6.93 0 4.135-2.607 7.462-6.227 7.462-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </li>
          </ul>

          <p className="reveal font-display gold-text text-xl md:text-2xl mb-1 text-center font-normal uppercase" style={{ letterSpacing: '0.22em', opacity: 0 }}>
            BAVATHARANI JEWELLERS
          </p>
          <p className="reveal font-sans text-[9px] tracking-[0.35em] text-[#C9A84C] uppercase mb-12 font-medium" style={{ opacity: 0 }}>
            The Art of Exquisite Gold
          </p>

          <p className="reveal font-sans text-[9px] tracking-[0.2em] text-center uppercase text-gray-500" style={{ opacity: 0 }}>
            Handcrafted Fine Jewellery · Est. 2002 · All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  )
}
