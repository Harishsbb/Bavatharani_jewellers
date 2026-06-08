import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { gsap, ScrollTrigger } from '../animations/gsap'

// ─── Orbiting electron particle ───────────────────────────────────────────────
function Electron({ orbitRadius, speed, tiltX, tiltZ, color }) {
  const ref = useRef()
  const angle = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    angle.current += speed * delta
    if (ref.current) {
      ref.current.position.x = Math.cos(angle.current) * orbitRadius
      ref.current.position.y = Math.sin(angle.current) * orbitRadius * Math.sin(tiltX)
      ref.current.position.z = Math.sin(angle.current) * orbitRadius * Math.cos(tiltZ)
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        metalness={1}
        roughness={0}
      />
    </mesh>
  )
}

// ─── Orbital ring ─────────────────────────────────────────────────────────────
function OrbitalRing({ radius, rotX, rotZ, color, opacity }) {
  return (
    <Torus
      args={[radius, 0.012, 16, 180]}
      rotation={[rotX, 0, rotZ]}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </Torus>
  )
}

// ─── Gold dust particles ───────────────────────────────────────────────────────
function GoldDust({ count = 60 }) {
  const positions = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2.5
      arr.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    }
    return new Float32Array(arr)
  }, [count])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#E8C97A"
        size={0.04}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Full nucleus scene ────────────────────────────────────────────────────────
function NucleusScene({ progress }) {
  const nucleusRef = useRef()
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y = t * 0.3
      nucleusRef.current.rotation.x = t * 0.18
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06
    }
  })

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} color="#C9A84C" intensity={3} />
      <pointLight position={[-4, -4, -2]} color="#E8C97A" intensity={1.5} />
      <spotLight position={[0, 6, 0]} color="#FFE4A0" intensity={4} angle={0.4} penumbra={0.8} />

      <group ref={groupRef}>
        {/* ── Nucleus core ── */}
        <Float speed={0.8} floatIntensity={0.2}>
          <group ref={nucleusRef}>
            {/* Inner glow core */}
            <Sphere args={[0.35, 64, 64]}>
              <meshStandardMaterial
                color="#E8C97A"
                emissive="#C9A84C"
                emissiveIntensity={1.2}
                metalness={1}
                roughness={0.05}
                envMapIntensity={3}
              />
            </Sphere>

            {/* Core halo */}
            <Sphere args={[0.48, 32, 32]}>
              <meshStandardMaterial
                color="#C9A84C"
                transparent
                opacity={0.08}
                metalness={0}
                roughness={1}
              />
            </Sphere>
          </group>
        </Float>

        {/* ── Orbital rings (3 planes) ── */}
        <OrbitalRing radius={1.1} rotX={0}            rotZ={0}            color="#C9A84C" opacity={0.7} />
        <OrbitalRing radius={1.1} rotX={Math.PI/2.4} rotZ={0}            color="#E8C97A" opacity={0.5} />
        <OrbitalRing radius={1.1} rotX={0}            rotZ={Math.PI/2.8} color="#C9A84C" opacity={0.4} />

        {/* Outer slow ring */}
        <OrbitalRing radius={1.7} rotX={Math.PI/5}   rotZ={Math.PI/6}   color="#E8C97A" opacity={0.25} />

        {/* ── Electrons on each orbit ── */}
        <Electron orbitRadius={1.1} speed={1.4}  tiltX={Math.PI/2}   tiltZ={1}            color="#E8C97A" />
        <Electron orbitRadius={1.1} speed={-1.1} tiltX={Math.PI/2.4} tiltZ={0.1}          color="#C9A84C" />
        <Electron orbitRadius={1.1} speed={0.9}  tiltX={0.3}         tiltZ={Math.PI/2.8}  color="#FFD700" />
        <Electron orbitRadius={1.7} speed={0.5}  tiltX={Math.PI/5}   tiltZ={Math.PI/6}    color="#C9A84C" />

        {/* ── Gold dust ── */}
        <GoldDust count={80} />
      </group>

      {/* Core point light that pulses */}
      <pointLight position={[0, 0, 0]} color="#FFD700" intensity={2} distance={3} />
    </>
  )
}

// ─── Section wrapper ───────────────────────────────────────────────────────────
export default function Nucleus() {
  const sectionRef = useRef()
  const canvasRef = useRef()
  const textRef = useRef()
  const labelRef = useRef()
  const lineRef = useRef()
  const subtitleRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    tl.fromTo(
      labelRef.current,
      { opacity: 0, letterSpacing: '0.8em', y: -8 },
      { opacity: 1, letterSpacing: '0.4em', y: 0, duration: 1, ease: 'power3.out' }
    )
    tl.fromTo(
      canvasRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'elastic.out(1, 0.6)' },
      '-=0.4'
    )
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'power4.inOut', transformOrigin: 'center' },
      '-=0.8'
    )
    tl.fromTo(
      textRef.current.querySelectorAll('.nuc-line'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.14, duration: 1, ease: 'power4.out' },
      '-=0.8'
    )
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )

    // Pulse the canvas on scroll enter
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      onEnter: () => {
        gsap.fromTo(
          canvasRef.current,
          { filter: 'brightness(0.4)' },
          { filter: 'brightness(1)', duration: 1.5, ease: 'power2.out' }
        )
      },
      once: true,
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nucleus"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="w-full flex flex-col items-center justify-center py-16 md:py-32"
    >
      {/* Radial bg glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12">

        {/* Label */}
        <p
          ref={labelRef}
          className="text-center font-sans text-xs tracking-[0.4em] uppercase mb-12"
          style={{ color: '#C9A84C', opacity: 0 }}
        >
          — The Gold Atom —
        </p>

        {/* Two-column layout: 3D left, text right */}
        <div className="flex flex-col md:flex-row items-center gap-0">

          {/* 3D Nucleus canvas */}
          <div
            ref={canvasRef}
            className="w-full max-w-[280px] h-[280px] sm:max-w-[360px] sm:h-[360px] md:max-w-[460px] md:h-[460px] shrink-0 self-center pointer-events-none"
            style={{
              opacity: 0,
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              style={{ background: 'transparent', width: '100%', height: '100%' }}
            >
              <NucleusScene />
            </Canvas>
          </div>

          {/* Text content */}
          <div ref={textRef} className="md:pl-12 text-left" style={{ flex: '1 1 0', minWidth: 0 }}>
            {/* Horizontal line */}
            <div
              ref={lineRef}
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(90deg, #C9A84C, transparent)',
                marginBottom: '2rem',
                transformOrigin: 'left',
              }}
            />

            <div style={{ overflow: 'hidden' }}>
              <h2
                className="nuc-line font-serif italic"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  color: '#0B131E',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  opacity: 0,
                }}
              >
                Pure gold begins
              </h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h2
                className="nuc-line font-display gold-text"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.15,
                  opacity: 0,
                }}
              >
                at the atom.
              </h2>
            </div>

            <p
              ref={subtitleRef}
              className="font-sans text-sm leading-loose mt-8"
              style={{ color: 'rgba(11, 19, 30, 0.65)', opacity: 0 }}
            >
              Gold — element 79. The same atom that formed in dying stars
              billions of years ago now rests in every piece that leaves our
              workshop. We don't just shape gold; we honour it.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-12 mt-10">
              {[
                { value: '22K', label: 'Purity Standard' },
                { value: '1064°', label: 'Melting Point' },
                { value: '30+', label: 'Years of Craft' },
              ].map((stat, i) => (
                <div key={i} className="nuc-line" style={{ opacity: 0 }}>
                  <p className="font-display gold-text text-2xl">{stat.value}</p>
                  <p
                    className="font-sans text-xs tracking-[0.15em] uppercase mt-1"
                    style={{ color: 'rgba(11, 19, 30, 0.45)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
