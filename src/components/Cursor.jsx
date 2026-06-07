import { useEffect } from 'react'
import { gsap } from '../animations/gsap'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const follower = document.getElementById('cursor-follower')

    const onMove = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.12 })
    }

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 2.5, duration: 0.3 })
      gsap.to(follower, { scale: 1.6, borderColor: 'rgba(201,168,76,0.9)', duration: 0.3 })
    }

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, borderColor: 'rgba(201,168,76,0.5)', duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)

    const links = document.querySelectorAll('a, button, .magnetic')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-follower" />
    </>
  )
}
