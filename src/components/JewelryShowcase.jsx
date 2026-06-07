import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from '../animations/gsap'

// ─── SHARED MATERIALS ────────────────────────────────────────────────────────

function useSharedMats() {
  return useMemo(
    () => ({
      // Polished 18K yellow gold — clearcoat gives the lacquered shine
      gold: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#C8A040'),
        metalness: 1.0,
        roughness: 0.06,
        envMapIntensity: 4.5,
        clearcoat: 0.45,
        clearcoatRoughness: 0.06,
        reflectivity: 1.0,
      }),
      // Mirror-polished gold highlight surfaces
      polished: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#EDD060'),
        metalness: 1.0,
        roughness: 0.02,
        envMapIntensity: 6.0,
        clearcoat: 0.9,
        clearcoatRoughness: 0.01,
        reflectivity: 1.0,
      }),
      // Diamond — transmission + high IOR gives sparkle & depth
      diamond: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FFFFFF'),
        metalness: 0,
        roughness: 0,
        transmission: 0.95,
        thickness: 0.5,
        ior: 2.42,
        envMapIntensity: 8.0,
        transparent: true,
        opacity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        reflectivity: 1.0,
      }),
      // Ruby — deep red, semi-transparent, refractive
      ruby: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#AA0000'),
        metalness: 0,
        roughness: 0,
        transmission: 0.55,
        thickness: 0.35,
        ior: 1.77,
        envMapIntensity: 4.0,
        transparent: true,
        opacity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        emissive: new THREE.Color('#550000'),
        emissiveIntensity: 0.35,
      }),
      // Emerald — deep green, refractive
      emerald: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#006622'),
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        thickness: 0.35,
        ior: 1.58,
        envMapIntensity: 4.0,
        transparent: true,
        opacity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        emissive: new THREE.Color('#002200'),
        emissiveIntensity: 0.3,
      }),
      // Sapphire — deep blue, refractive
      sapphire: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0033BB'),
        metalness: 0,
        roughness: 0,
        transmission: 0.55,
        thickness: 0.35,
        ior: 1.77,
        envMapIntensity: 4.5,
        transparent: true,
        opacity: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0,
        emissive: new THREE.Color('#001177'),
        emissiveIntensity: 0.35,
      }),
    }),
    []
  )
}

// ─── BRILLIANT CUT DIAMOND ────────────────────────────────────────────────────
// LatheGeometry generates the proper crown → girdle → pavilion → culet profile.
// r = girdle radius, h = total height (crown up, pavilion down)
function BrilliantDiamond({ mat, r = 0.185, h = 0.44 }) {
  const geo = useMemo(() => {
    const pts = [
      [0.001,       h * 0.30],   // table (flat top, needs tiny x to close)
      [r * 0.62,    h * 0.30],   // table edge
      [r * 0.72,    h * 0.14],   // upper crown break
      [r,           0],           // girdle — widest point
      [r * 0.82,   -h * 0.10],   // upper pavilion
      [r * 0.38,   -h * 0.54],   // lower pavilion taper
      [0.001,      -h * 0.70],   // culet
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(pts, 8)
  }, [r, h])
  return <mesh geometry={geo}><primitive object={mat} attach="material" /></mesh>
}

// ─── JEWELRY MODELS ──────────────────────────────────────────────────────────


function NecklaceModel({ mats }) {
  const chainPts = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 24; i++) {
      const t = i / 24
      const theta = t * Math.PI - Math.PI / 2
      pts.push({ x: Math.sin(theta) * 1.12, y: -Math.cos(theta) * 0.82 + 0.12 })
    }
    return pts
  }, [])

  return (
    <group>
      {/* Main chain links */}
      {chainPts.map((pt, i) => (
        <group
          key={i}
          position={[pt.x, pt.y, 0]}
          rotation={[0.38 * (i % 2 ? 1 : -1), Math.atan2(pt.x, -pt.y), 0]}
        >
          <mesh>
            <torusGeometry args={[0.068, 0.02, 7, 16]} />
            <primitive object={mats.gold} attach="material" />
          </mesh>
        </group>
      ))}

      {/* Gold fringe drops along the bottom curve */}
      {chainPts.map((pt, i) => {
        if (pt.y > -0.48) return null
        const depth = Math.max(0, (-0.48 - pt.y) / 0.34)
        const fringeLen = 0.08 + depth * 0.12
        return (
          <group key={`fringe-${i}`} position={[pt.x, pt.y - fringeLen * 0.5 - 0.02, 0.025]}>
            <mesh>
              <cylinderGeometry args={[0.007, 0.005, fringeLen, 5]} />
              <primitive object={mats.gold} attach="material" />
            </mesh>
            <mesh position={[0, -fringeLen * 0.55, 0]}>
              <sphereGeometry args={[0.024, 6, 6]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* Multi-tier pendant */}
      <group position={[0, -0.86, 0.06]}>
        {/* Bail */}
        <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.032, 0.01, 6, 12]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Top decorative disc */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.038, 8]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Main pendant base */}
        <mesh>
          <cylinderGeometry args={[0.24, 0.24, 0.055, 8]} />
          <primitive object={mats.gold} attach="material" />
        </mesh>
        {/* Outer decorative ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.024, 8, 28]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Inner ring accent */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.013, 6, 24]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Centre ruby */}
        <mesh position={[0, 0, 0.045]} rotation={[0, 0, Math.PI / 6]}>
          <octahedronGeometry args={[0.115, 0]} />
          <primitive object={mats.ruby} attach="material" />
        </mesh>
        {/* 6 surrounding sapphire beads */}
        {Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2).map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 0.19, 0, Math.sin(a) * 0.19 + 0.04]}>
            <sphereGeometry args={[0.028, 6, 6]} />
            <primitive object={mats.sapphire} attach="material" />
          </mesh>
        ))}
        {/* 3 hanging teardrop drops */}
        {[[-0.12, 0.22], [0, 0.32], [0.12, 0.22]].map(([xOff, dropLen], i) => (
          <group key={i} position={[xOff, -0.14, 0.03]}>
            <mesh>
              <cylinderGeometry args={[0.007, 0.007, dropLen * 0.42, 5]} />
              <primitive object={mats.gold} attach="material" />
            </mesh>
            <mesh position={[0, -dropLen * 0.36, 0]}>
              <coneGeometry args={[0.038, 0.072, 6]} rotation={[Math.PI, 0, 0]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
            <mesh position={[0, -dropLen * 0.53, 0]}>
              <sphereGeometry args={[0.036, 7, 7]} />
              <primitive object={mats.ruby} attach="material" />
            </mesh>
          </group>
        ))}
        <pointLight color="#FF5533" intensity={3.0} distance={2.2} />
      </group>
    </group>
  )
}

function BanglesModel({ mats }) {
  const gems = Array.from({ length: 4 }, (_, i) => (i / 4) * Math.PI * 2)
  return (
    <group>
      <mesh position={[0, 0.28, 0]} rotation={[0.15, 0, 0.08]}>
        <torusGeometry args={[0.9, 0.12, 20, 72]} />
        <primitive object={mats.gold} attach="material" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-0.08, 0, -0.1]}>
        <torusGeometry args={[0.95, 0.1, 20, 72]} />
        <primitive object={mats.polished} attach="material" />
      </mesh>
      <mesh position={[0, -0.28, 0]} rotation={[0.05, 0, 0.05]}>
        <torusGeometry args={[0.88, 0.13, 20, 72]} />
        <primitive object={mats.gold} attach="material" />
      </mesh>
      {gems.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * 0.95, 0, Math.sin(a) * 0.95]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <primitive object={mats.sapphire} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

function BraceletModel({ mats }) {
  const gemAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]
  return (
    <group>
      <mesh rotation={[0.3, 0, 0]}>
        <torusGeometry args={[1.05, 0.16, 18, 72]} />
        <primitive object={mats.gold} attach="material" />
      </mesh>
      <mesh rotation={[0.3, 0, 0]} position={[0, 0.12, 0]}>
        <torusGeometry args={[1.05, 0.04, 8, 72]} />
        <primitive object={mats.polished} attach="material" />
      </mesh>
      <mesh rotation={[0.3, 0, 0]} position={[0, -0.12, 0]}>
        <torusGeometry args={[1.05, 0.04, 8, 72]} />
        <primitive object={mats.polished} attach="material" />
      </mesh>
      {gemAngles.map((a, i) => {
        const r = 1.05
        const cx = Math.cos(a) * r
        const cy = Math.sin(a) * r
        return (
          <group key={i} position={[cx, cy * Math.cos(0.3), cy * Math.sin(0.3) + 0.1]}>
            <mesh rotation={[Math.PI / 2, 0, a]}>
              <cylinderGeometry args={[0.09, 0.09, 0.07, 6]} />
              <primitive object={mats.emerald} attach="material" />
            </mesh>
            <mesh rotation={[0, 0, a]}>
              <torusGeometry args={[0.11, 0.023, 6, 14]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function AnkletModel({ mats }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.9, 0.05, 10, 72]} />
        <primitive object={mats.polished} attach="material" />
      </mesh>
      {[-0.3, 0, 0.3].map((xOff, i) => (
        <group key={i} position={[xOff, -0.9, 0]}>
          <mesh>
            <cylinderGeometry args={[0.007, 0.007, 0.1, 5]} />
            <primitive object={mats.gold} attach="material" />
          </mesh>
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.055, 7, 7]} />
            <primitive object={mats.gold} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function EarringsModel({ mats }) {
  return (
    <group>
      {[-0.52, 0.52].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* Hook arc */}
          <mesh>
            <torusGeometry args={[0.15, 0.022, 7, 18, Math.PI * 1.4]} />
            <primitive object={mats.polished} attach="material" />
          </mesh>
          {/* Stem */}
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.011, 0.011, 0.22, 5]} />
            <primitive object={mats.gold} attach="material" />
          </mesh>
          {/* Brilliant-cut diamond drop */}
          <group position={[0, -0.46, 0]}>
            <BrilliantDiamond mat={mats.diamond} r={0.11} h={0.28} />
            {/* Gold bezel setting */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <torusGeometry args={[0.112, 0.018, 6, 14]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
            <pointLight color="#E8F4FF" intensity={2.0} distance={1.0} />
          </group>
        </group>
      ))}
    </group>
  )
}

function ChainModel({ mats }) {
  // Figaro chain: 3 small round links followed by 1 large oval link
  const links = useMemo(() => {
    const result = []
    let x = -1.15
    const pattern = [false, false, false, true]
    for (let i = 0; x < 1.15; i++) {
      const isBig = pattern[i % 4]
      const w = isBig ? 0.2 : 0.1
      result.push({ x: x + w / 2, isBig, idx: i })
      x += w + 0.016
    }
    return result
  }, [])

  return (
    <group>
      {links.map(({ x, isBig, idx }) => {
        const t = (x / 2.3) + 0.5
        const y = -Math.pow((t - 0.5) * 2, 2) * 0.32
        const altZ = idx % 2 === 0 ? 0.022 : -0.022
        const isFlat = idx % 2 === 0
        return (
          <group
            key={idx}
            position={[x, y, altZ]}
            rotation={isFlat ? [Math.PI / 2, 0, 0] : [0, Math.PI / 2, 0]}
          >
            <mesh>
              {isBig
                ? <torusGeometry args={[0.088, 0.025, 8, 18]} />
                : <torusGeometry args={[0.05, 0.018, 6, 12]} />}
              <primitive object={isBig ? mats.polished : mats.gold} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* Diamond solitaire pendant at centre */}
      <group position={[0, -0.38, 0.06]}>
        {/* Bail stem */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 5]} />
          <primitive object={mats.gold} attach="material" />
        </mesh>
        {/* Setting cup */}
        <mesh>
          <cylinderGeometry args={[0.1, 0.12, 0.06, 8]} />
          <primitive object={mats.gold} attach="material" />
        </mesh>
        {/* 4 tiny prongs */}
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 0.09, 0.1, Math.sin(a) * 0.09]}>
              <cylinderGeometry args={[0.014, 0.01, 0.22, 5]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
          )
        })}
        {/* Diamond */}
        <group position={[0, 0.04, 0]}>
          <BrilliantDiamond mat={mats.diamond} r={0.088} h={0.26} />
          <pointLight color="#BBDDFF" intensity={2.5} distance={2.0} />
        </group>
      </group>
    </group>
  )
}

function TempleNecklaceModel({ mats }) {
  // Indian temple-style: gold bead chain + ornate medallion + hanging drops
  const beadPts = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 18; i++) {
      const t = i / 18
      const theta = t * Math.PI - Math.PI / 2
      pts.push({ x: Math.sin(theta) * 1.05, y: -Math.cos(theta) * 0.72 + 0.08 })
    }
    return pts
  }, [])

  return (
    <group>
      {/* Gold bead chain */}
      {beadPts.map((pt, i) => {
        const t = i / 18
        const beadR = 0.048 + (1 - Math.abs(t - 0.5) * 2) * 0.018
        return (
          <group key={i} position={[pt.x, pt.y, 0]}>
            {/* Connecting wire segment */}
            <mesh rotation={[0, 0, Math.atan2(pt.y, pt.x) + Math.PI / 2]}>
              <cylinderGeometry args={[0.007, 0.007, 0.075, 5]} />
              <primitive object={mats.gold} attach="material" />
            </mesh>
            {/* Spherical gold bead */}
            <mesh>
              <sphereGeometry args={[beadR, 8, 8]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* Central octagonal temple medallion */}
      <group position={[0, -0.8, 0.06]}>
        {/* Bail */}
        <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.035, 0.011, 6, 12]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Outer scalloped border (16-sided for richness) */}
        <mesh>
          <cylinderGeometry args={[0.29, 0.29, 0.05, 16]} />
          <primitive object={mats.gold} attach="material" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.29, 0.026, 8, 32]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Inner gold ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.19, 0.014, 6, 32]} />
          <primitive object={mats.polished} attach="material" />
        </mesh>
        {/* Sapphire centre */}
        <mesh position={[0, 0, 0.04]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 8]} />
          <primitive object={mats.sapphire} attach="material" />
        </mesh>
        {/* 8 alternating ruby + gold surrounding gems */}
        {Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2).map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 0.21, 0, Math.sin(a) * 0.21 + 0.035]}>
            <sphereGeometry args={[0.03, 7, 7]} />
            <primitive object={i % 2 === 0 ? mats.ruby : mats.polished} attach="material" />
          </mesh>
        ))}
        {/* 5 graduated hanging drops */}
        {[[-0.16, 0.2], [-0.08, 0.27], [0, 0.34], [0.08, 0.27], [0.16, 0.2]].map(([xOff, dropLen], i) => (
          <group key={i} position={[xOff, -0.17, 0.03]}>
            <mesh>
              <cylinderGeometry args={[0.007, 0.007, dropLen * 0.4, 5]} />
              <primitive object={mats.gold} attach="material" />
            </mesh>
            <mesh position={[0, -dropLen * 0.3, 0]}>
              <sphereGeometry args={[0.022, 6, 6]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
            {/* Teardrop tip */}
            <mesh position={[0, -dropLen * 0.5, 0]}>
              <coneGeometry args={[0.04, 0.08, 6]} rotation={[Math.PI, 0, 0]} />
              <primitive object={mats.polished} attach="material" />
            </mesh>
            <mesh position={[0, -dropLen * 0.65, 0]}>
              <sphereGeometry args={[0.038, 7, 7]} />
              <primitive object={i === 2 ? mats.sapphire : mats.ruby} attach="material" />
            </mesh>
          </group>
        ))}
        <pointLight color="#2244FF" intensity={2.5} distance={2.2} />
        <pointLight color="#FF4422" intensity={1.5} distance={1.8} />
      </group>
    </group>
  )
}

// ─── PIECE REGISTRY ───────────────────────────────────────────────────────────

const PIECES = [
  { name: 'Necklace', Component: NecklaceModel },
  { name: 'Temple Necklace', Component: TempleNecklaceModel },
  { name: 'Bangles', Component: BanglesModel },
  { name: 'Bracelet', Component: BraceletModel },
  { name: 'Anklet', Component: AnkletModel },
  { name: 'Earrings', Component: EarringsModel },
  { name: 'Chain', Component: ChainModel },
]

// ─── ORBIT SYSTEM ─────────────────────────────────────────────────────────────

function getOrbitPos(orbitIdx) {
  const angle = (orbitIdx / 6) * Math.PI * 2  // 6 orbit slots for 7 pieces
  return [
    Math.cos(angle) * 2.8,
    Math.sin(angle) * 0.55,
    Math.sin(angle * 0.7) * 1.0 - 1.2,
  ]
}

function getTargetPos(pieceIdx, activeIdx) {
  if (pieceIdx === activeIdx) return [0, 0, 0]
  let slot = 0
  for (let i = 0; i < PIECES.length; i++) {
    if (i === activeIdx) continue
    if (i === pieceIdx) return getOrbitPos(slot)
    slot++
  }
  return [0, 0, 0]
}

// ─── SHOWCASE SCENE ──────────────────────────────────────────────────────────

function ShowcaseScene({ scrollProgress, mouseX, mouseY, activeIdxRef, activePieceNameRef, onActivePieceChange }) {
  const rootRef = useRef()
  const piecesRef = useRef([])
  const lastIdxRef = useRef(0)
  const timerRef = useRef(0)
  const spinAngles = useRef(Array.from({ length: PIECES.length }, () => 0))

  const mats = useSharedMats()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current
    const mx = mouseX.current
    const my = mouseY.current

    // Advance cycle — scroll shortens the cycle
    timerRef.current += delta
    const cycleDuration = Math.max(2.0, 4.0 - sp * 3.0)
    if (timerRef.current > cycleDuration) {
      timerRef.current = 0
      activeIdxRef.current = (activeIdxRef.current + 1) % PIECES.length
    }

    const ai = activeIdxRef.current

    // Update DOM name label on switch
    if (ai !== lastIdxRef.current) {
      lastIdxRef.current = ai
      if (activePieceNameRef?.current) {
        const el = activePieceNameRef.current
        gsap.to(el, {
          opacity: 0,
          y: -6,
          duration: 0.2,
          onComplete: () => {
            el.textContent = PIECES[ai].name
            gsap.to(el, { opacity: 0.65, y: 0, duration: 0.4, ease: 'power2.out' })
          },
        })
      }
      if (onActivePieceChange) {
        setTimeout(() => onActivePieceChange(ai), 0)
      }
    }

    // Root group: mouse parallax + gentle float + scroll push
    if (rootRef.current) {
      rootRef.current.rotation.y +=
        (mx * 0.22 - rootRef.current.rotation.y) * 0.025
      rootRef.current.rotation.x +=
        (-my * 0.12 - rootRef.current.rotation.x) * 0.025
      rootRef.current.position.y = Math.sin(t * 0.45) * 0.07 - sp * 0.4
    }

    // Update each piece's position, scale, rotation
    piecesRef.current.forEach((grp, i) => {
      if (!grp) return

      const isActive = i === ai
      const [tx, ty, tz] = getTargetPos(i, ai)
      const targetScale = isActive ? 1.85 : 0

      // Initialize scale and position once on mount
      if (!grp.userData.initialized) {
        grp.scale.setScalar(isActive ? 1.85 : 0)
        grp.position.set(tx, ty, tz)
        grp.userData.initialized = true
      }

      // Smooth lerp position
      grp.position.x += (tx - grp.position.x) * 0.042
      grp.position.y += (ty - grp.position.y) * 0.042
      grp.position.z += (tz - grp.position.z) * 0.042

      // Smooth lerp scale
      const cs = grp.scale.x
      grp.scale.setScalar(cs + (targetScale - cs) * 0.052)

      // Continuous spin — orbit pieces spin faster
      const spinRate = isActive ? 0.28 + sp * 0.35 : 0.55 + sp * 0.9
      spinAngles.current[i] += delta * spinRate
      grp.rotation.y = spinAngles.current[i]

      // Active piece: subtle scroll tilt
      if (isActive) {
        grp.rotation.x += (-0.25 + sp * 0.55 - grp.rotation.x) * 0.04
      } else {
        grp.rotation.x += (0 - grp.rotation.x) * 0.03
      }
    })
  })

  return (
    <group ref={rootRef}>
      {PIECES.map(({ name, Component }, i) => (
        <group
          key={name}
          ref={(el) => { piecesRef.current[i] = el }}
        >
          <Component mats={mats} />
        </group>
      ))}

      {/* Ambient gold dust particles */}
      {Array.from({ length: 24 }).map((_, i) => {
        const phi = i * 137.508 * (Math.PI / 180)
        const r = 3.2 + (i % 3) * 0.8
        return (
          <mesh
            key={`p-${i}`}
            position={[
              Math.cos(phi) * r,
              Math.sin(phi * 0.7) * 2.6,
              Math.cos(phi * 0.4) * 2.0 - 0.8,
            ]}
          >
            <sphereGeometry args={[0.01 + (i % 4) * 0.007, 5, 5]} />
            <meshStandardMaterial
              color="#C9A84C"
              metalness={1}
              roughness={0.08}
              emissive="#E8C97A"
              emissiveIntensity={0.9}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// ─── CANVAS EXPORT ────────────────────────────────────────────────────────────

export function JewelryShowcaseCanvas({ scrollProgress, mouseX, mouseY, activeIdxRef, activePieceNameRef, onActivePieceChange }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 48 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.8,
      }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Environment preset="studio" />

      {/* Low ambient — keeps shadows deep for luxury look */}
      <ambientLight intensity={0.06} color="#FFF0D0" />
      {/* Key light — strong top-front right, warm gold */}
      <directionalLight position={[4, 7, 6]} intensity={6.0} color="#FFE060" />
      {/* Rim light — from behind/left for edge highlights on metal */}
      <directionalLight position={[-5, 2, -6]} intensity={3.5} color="#E8C060" />
      {/* Fill — soft cool light from below to lift shadow detail */}
      <directionalLight position={[0, -4, 3]} intensity={1.2} color="#C0D8FF" />
      {/* Spotlight for gems — tight, high intensity */}
      <spotLight
        position={[1, 8, 5]}
        intensity={12}
        angle={0.28}
        penumbra={0.85}
        color="#FFFFFF"
      />
      {/* Warm backfill glow */}
      <pointLight position={[-4, 3, -4]} intensity={2.5} color="#C9A84C" distance={16} />

      <ShowcaseScene
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
        activeIdxRef={activeIdxRef}
        activePieceNameRef={activePieceNameRef}
        onActivePieceChange={onActivePieceChange}
      />
    </Canvas>
  )
}
