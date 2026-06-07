import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

// Procedural royal gold necklace with a glowing ruby pendant
export function GoldNecklace({ mouseX, mouseY }) {
  const groupRef = useRef()
  const centerpieceRef = useRef()

  const rubyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D12E2E'), // Deep rich red ruby
        metalness: 0.1,
        roughness: 0.05,
        emissive: new THREE.Color('#8b0000'),
        emissiveIntensity: 1.2,
        envMapIntensity: 3,
      }),
    []
  )

  // Define the U-shaped necklace path
  const curve = useMemo(() => {
    const points = []
    const segments = 40
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const theta = t * Math.PI - Math.PI / 2 // -PI/2 to PI/2
      
      // Hanging loop shape (drapes around the stand)
      const x = Math.sin(theta) * 1.15
      const y = -Math.cos(theta) * 0.85 + 0.15
      const z = Math.cos(theta) * 0.45 - 0.05
      points.push(new THREE.Vector3(x, y, z))
    }
    return new THREE.CatmullRomCurve3(points)
  }, [])

  // Sample points along the curve for link placement
  const chainLinks = useMemo(() => {
    const pointsCount = 45
    return curve.getSpacedPoints(pointsCount)
  }, [curve])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      // Gentle breathing float
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08
      // Mouse parallax rotation
      groupRef.current.rotation.y = t * 0.12 + mouseX.current * 0.5
      groupRef.current.rotation.x = -0.25 + mouseY.current * 0.25
    }
    if (centerpieceRef.current) {
      // Subtle pendulum swing
      centerpieceRef.current.rotation.z = Math.sin(t * 1.5) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Chain Links */}
      {chainLinks.map((pt, idx) => {
        // Alternating rotations for interlinked chain links
        const rotX = idx % 2 === 0 ? 0.3 : -0.3
        const rotY = idx % 2 === 0 ? 0.5 : -0.5
        const rotZ = Math.atan2(pt.y, pt.x) // align link with curve tangent

        // Scale links down near the top ends and larger at the bottom center
        const distanceToCenter = Math.abs(idx - chainLinks.length / 2) / (chainLinks.length / 2)
        const scale = 0.04 + (1 - distanceToCenter) * 0.04

        return (
          <group key={idx} position={[pt.x, pt.y, pt.z]} rotation={[rotX, rotY, rotZ]}>
            <mesh>
              <torusGeometry args={[scale, scale * 0.35, 8, 24]} />
              <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} envMapIntensity={2.5} />
            </mesh>
          </group>
        )
      })}

      {/* Hanging Gold Droplets/Fringes along the bottom curve (choker style) */}
      {chainLinks.map((pt, idx) => {
        const halfLength = chainLinks.length / 2
        const distanceToCenter = Math.abs(idx - halfLength)
        
        // Only render droplets near the bottom center (e.g. index within 12 steps of center)
        if (distanceToCenter > 12) return null

        // Droplet size decreases as we move away from center
        const factor = (12 - distanceToCenter) / 12
        const dropletHeight = 0.12 + factor * 0.18
        const dropletRadius = 0.025 + factor * 0.035
        
        // Offset position downwards and slightly forward
        const posY = pt.y - dropletHeight / 2 - 0.02
        const posZ = pt.z + 0.015
        
        return (
          <group key={`drop-${idx}`} position={[pt.x, posY, posZ]}>
            {/* Small connecting loop */}
            <mesh position={[0, dropletHeight / 2, 0]}>
              <torusGeometry args={[0.02, 0.006, 6, 12]} />
              <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
            </mesh>
            {/* Gold droplet cylinder/cone */}
            <mesh>
              <cylinderGeometry args={[0.005, dropletRadius, dropletHeight, 8]} />
              <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
            </mesh>
            {/* Tiny gold sphere at the bottom tip of droplet */}
            <mesh position={[0, -dropletHeight / 2, 0]}>
              <sphereGeometry args={[dropletRadius, 8, 8]} />
              <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
            </mesh>
          </group>
        )
      })}

      {/* Main Centerpiece Pendant (Aligned to the front drape point) */}
      <group ref={centerpieceRef} position={[0, -0.72, 0.42]}>
        {/* Connecting Ring */}
        <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.012, 8, 24]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
        </mesh>

        {/* Intricate Pendant Base Shield */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.06, 6]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.06} />
        </mesh>
        
        {/* Outer Gold Ring Border around Gem */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.02, 8, 32]} />
          <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.05} />
        </mesh>

        {/* Large Glowing Red Ruby */}
        <mesh position={[0, 0, 0.03]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.14, 0]} />
          <primitive object={rubyMaterial} attach="material" />
        </mesh>

        {/* Hanging Drop Teardrop Gem below Centerpiece */}
        <group position={[0, -0.32, 0.02]}>
          {/* Loop connector */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.06, 8]} />
            <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
          </mesh>
          {/* Gold cap for teardrop gem */}
          <mesh position={[0, 0.05, 0]}>
            <coneGeometry args={[0.06, 0.06, 8]} />
            <meshStandardMaterial color="#C9A84C" metalness={1} roughness={0.08} />
          </mesh>
          {/* Teardrop Ruby Gem (Sphere + Cone stretch) */}
          <mesh position={[0, -0.06, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <primitive object={rubyMaterial} attach="material" />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <coneGeometry args={[0.075, 0.15, 16]} rotation={[Math.PI, 0, 0]} />
            <primitive object={rubyMaterial} attach="material" />
          </mesh>
        </group>

        {/* Point light inside the ruby gemstone */}
        <pointLight position={[0, 0, 0.15]} color="#D12E2E" intensity={2.5} distance={1.8} />
      </group>
    </group>
  )
}

export default function JewelryModel({ mouseX, mouseY }) {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} color="#E8C97A" castShadow />
      <directionalLight position={[-5, -2, -5]} intensity={1} color="#C9A84C" />
      <pointLight position={[0, 3, 2]} intensity={2} color="#FFE4A0" />
      <spotLight position={[0, 6, 0]} intensity={4} angle={0.3} penumbra={0.8} color="#E8C97A" />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <GoldNecklace mouseX={mouseX} mouseY={mouseY} />
      </Float>

      {/* Floating gold dust particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 3 - 1,
          ]}
        >
          <sphereGeometry args={[0.015 + Math.random() * 0.03, 8, 8]} />
          <meshStandardMaterial
            color="#C9A84C"
            metalness={1}
            roughness={0.1}
            emissive="#C9A84C"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </>
  )
}

