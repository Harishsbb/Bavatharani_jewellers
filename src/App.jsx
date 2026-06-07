import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from './animations/gsap'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nucleus from './components/Nucleus'
import Story from './components/Story'
import Collection from './components/Collection'
import Process from './components/Process'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ScrollTrigger.refresh()
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {loaded && (
        <div style={{ background: '#F7F4EB', overflowX: 'hidden', width: '100%' }}>
          <Navbar />
          <Hero />
          <Nucleus />
          <Story />
          <Collection />
          <Process />
          <Gallery />
          <Contact />
        </div>
      )}
    </>
  )
}


