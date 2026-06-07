import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function GoldRing({ scrollProgress, mouseX, mouseY }) {
  const groupRef = useRef()
  const gemRef = useRef()
  const spinAngle = useRef(0)

  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#C9A84C'),
        metalness: 0.97,
        roughness: 0.09,
        envMapIntensity: 3.5,
        emissive: new THREE.Color('#C9A84C'),
        emissiveIntensity: 0.05,
      }),
    []
  )

  const polishedMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F0D060'),
        metalness: 1.0,
        roughness: 0.03,
        envMapIntensity: 5.0,
        emissive: new THREE.Color('#F5D870'),
        emissiveIntensity: 0.07,
      }),
    []
  )

  const diamondMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E8F6FF'),
        metalness: 0.0,
        roughness: 0.0,
        transparent: true,
        opacity: 0.92,
        envMapIntensity: 10.0,
        emissive: new THREE.Color('#8AAFFF'),
        emissiveIntensity: 0.5,
      }),
    []
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current
    const mx = mouseX.current
    const my = mouseY.current

    if (!groupRef.current) return

    spinAngle.current += delta * 0.28

    const targetRotY = spinAngle.current + sp * Math.PI * 2.5 + mx * 0.55
    const targetRotX = -0.38 + my * 0.25 + sp * 0.4

    groupRef.current.rotation.y +=
      (targetRotY - groupRef.current.rotation.y) * 0.045
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.05

    // Zoom-in during first half of scroll, zoom-out during second half
    const targetScale =
      sp < 0.5
        ? 1.0 + sp * 0.55
        : Math.max(0.05, 1.275 - (sp - 0.5) * 1.8)

    const cs = groupRef.current.scale.x
    const ns = cs + (targetScale - cs) * 0.055
    groupRef.current.scale.setScalar(ns)

    // Gentle floating
    groupRef.current.position.y = Math.sin(t * 0.62) * 0.09

    if (gemRef.current) {
      gemRef.current.rotation.y = t * 0.75
    }
  })

  const prong6 = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2)
  const engraveZ = [-0.17, -0.055, 0.055, 0.17]

  return (
    <group ref={groupRef} rotation={[0.35, 0.3, 0]}>
      {/* === MAIN RING BAND === */}
      <mesh>
        <torusGeometry args={[1.0, 0.3, 64, 128]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Top & bottom polished edge ridges */}
      <mesh position={[0, 0, 0.25]}>
        <torusGeometry args={[1.0, 0.07, 24, 128]} />
        <primitive object={polishedMat} attach="material" />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <torusGeometry args={[1.0, 0.07, 24, 128]} />
        <primitive object={polishedMat} attach="material" />
      </mesh>

      {/* Micro-engraving bands */}
      {engraveZ.map((z, i) => (
        <mesh key={`eng-${i}`} position={[0, 0, z]}>
          <torusGeometry args={[1.0, 0.018, 12, 128]} />
          <primitive object={polishedMat} attach="material" />
        </mesh>
      ))}

      {/* === DIAMOND SETTING === */}
      <group position={[0, 1.0, 0]}>
        {/* Bezel base */}
        <mesh>
          <cylinderGeometry args={[0.31, 0.37, 0.22, 8]} />
          <primitive object={goldMat} attach="material" />
        </mesh>

        {/* Inner polished cup */}
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.19, 0.27, 0.08, 8]} />
          <primitive object={polishedMat} attach="material" />
        </mesh>

        {/* 6 prongs — classic solitaire style */}
        {prong6.map((angle, i) => (
          <mesh
            key={`prong-${i}`}
            position={[
              Math.cos(angle) * 0.23,
              0.32,
              Math.sin(angle) * 0.23,
            ]}
          >
            <cylinderGeometry args={[0.022, 0.016, 0.36, 8]} />
            <primitive object={polishedMat} attach="material" />
          </mesh>
        ))}

        {/* === DIAMOND (crown + girdle + pavilion) === */}
        <group ref={gemRef} position={[0, 0.32, 0]}>
          {/* Crown (upper faceted cone) */}
          <mesh>
            <coneGeometry args={[0.185, 0.17, 8]} />
            <primitive object={diamondMat} attach="material" />
          </mesh>
          {/* Girdle (thin cylinder) */}
          <mesh position={[0, -0.065, 0]}>
            <cylinderGeometry args={[0.185, 0.185, 0.04, 8]} />
            <primitive object={diamondMat} attach="material" />
          </mesh>
          {/* Pavilion (lower inverted cone) */}
          <mesh position={[0, -0.21, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.185, 0.27, 8]} />
            <primitive object={diamondMat} attach="material" />
          </mesh>

          {/* Diamond sparkle lights */}
          <pointLight color="#AAC4FF" intensity={3.5} distance={3.5} />
          <pointLight color="#FFFFFF" intensity={1.5} distance={1.5} />
        </group>
      </group>

      {/* === FLOATING GOLD DUST PARTICLES === */}
      {Array.from({ length: 24 }).map((_, i) => {
        const phi = i * 137.508 * (Math.PI / 180)
        const r = 2.2 + (i % 3) * 0.8
        return (
          <mesh
            key={`p-${i}`}
            position={[
              Math.cos(phi) * r,
              Math.sin(phi * 0.7) * 2.2,
              Math.cos(phi * 0.4) * 1.8 - 0.5,
            ]}
          >
            <sphereGeometry args={[0.01 + (i % 4) * 0.006, 6, 6]} />
            <meshStandardMaterial
              color="#C9A84C"
              metalness={1}
              roughness={0.08}
              emissive="#E8C97A"
              emissiveIntensity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function GoldRingCanvas({ scrollProgress, mouseX, mouseY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 38 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.5,
      }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment preset="studio" />

      <ambientLight intensity={0.12} color="#FFF8E0" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={4.5}
        color="#FFE770"
        castShadow
      />
      <directionalLight
        position={[-6, -3, -4]}
        intensity={2.0}
        color="#FFD54F"
      />
      <pointLight
        position={[3, 5, 5]}
        intensity={3.0}
        color="#FFF0C0"
        distance={15}
      />
      <spotLight
        position={[0, 8, 3]}
        intensity={7}
        angle={0.38}
        penumbra={0.85}
        color="#E8C97A"
      />
      <pointLight
        position={[-4, 0, 4]}
        intensity={1.5}
        color="#C9A84C"
        distance={10}
      />

      <GoldRing
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </Canvas>
  )
}
