import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { gsap, ScrollTrigger } from '../animations/gsap'
import { GoldNecklace } from './JewelryModel'

function ScrollyNecklaceScene({ mouseX, mouseY }) {
  const modelGroupRef = useRef()

  useEffect(() => {
    if (!modelGroupRef.current) return

    // Ensure ScrollTriggers are clean and refreshed
    ScrollTrigger.refresh()

    // 1. Hero -> Nucleus (moves left, scales down, tilts side-profile)
    gsap.to(modelGroupRef.current.position, {
      x: -1.3,
      y: -0.15,
      z: 0.15,
      scrollTrigger: {
        trigger: '#nucleus',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.rotation, {
      x: 0.08,
      y: Math.PI / 4.5,
      z: -0.04,
      scrollTrigger: {
        trigger: '#nucleus',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.scale, {
      x: 0.75,
      y: 0.75,
      z: 0.75,
      scrollTrigger: {
        trigger: '#nucleus',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })

    // 2. Nucleus -> Story (moves right, returns to full size, tilts other side)
    gsap.to(modelGroupRef.current.position, {
      x: 1.35,
      y: 0.05,
      z: -0.1,
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.rotation, {
      x: -0.12,
      y: -Math.PI / 6,
      z: 0.02,
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.scale, {
      x: 0.95,
      y: 0.95,
      z: 0.95,
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })

    // 3. Story -> Collection (recedes deep into the background behind horizontal cards)
    gsap.to(modelGroupRef.current.position, {
      x: 0,
      y: -0.25,
      z: -2.4,
      scrollTrigger: {
        trigger: '#collection',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.rotation, {
      x: 0,
      y: Math.PI * 0.8,
      z: 0,
      scrollTrigger: {
        trigger: '#collection',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.scale, {
      x: 0.55,
      y: 0.55,
      z: 0.55,
      scrollTrigger: {
        trigger: '#collection',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })

    // 4. Collection -> Contact (centers, zooms in close, rotates forward)
    gsap.to(modelGroupRef.current.position, {
      x: 0,
      y: 0.05,
      z: 0.8,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.rotation, {
      x: -0.1,
      y: Math.PI * 2,
      z: 0,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
    gsap.to(modelGroupRef.current.scale, {
      x: 1.25,
      y: 1.25,
      z: 1.25,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <group ref={modelGroupRef} position={[1.4, -0.05, 0.25]} scale={[1.0, 1.0, 1.0]} rotation={[-0.2, 0, 0]}>
      <GoldNecklace mouseX={mouseX} mouseY={mouseY} />
    </group>
  )
}

export default function ScrollyNecklace({ mouseX, mouseY }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1, // Behind HTML page overlays but in front of background gradients
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} color="#E8C97A" castShadow />
        <directionalLight position={[-5, -2, -5]} intensity={1} color="#C9A84C" />
        <pointLight position={[0, 3, 2]} intensity={2} color="#FFE4A0" />
        <spotLight position={[0, 6, 0]} intensity={4} angle={0.3} penumbra={0.8} color="#E8C97A" />

        <ScrollyNecklaceScene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
