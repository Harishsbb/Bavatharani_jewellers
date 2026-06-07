import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export { gsap, ScrollTrigger }

export const revealText = (el, delay = 0) =>
  gsap.fromTo(
    el,
    { y: 80, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, delay, ease: 'power4.out' }
  )

export const fadeIn = (el, delay = 0) =>
  gsap.fromTo(
    el,
    { opacity: 0 },
    { opacity: 1, duration: 1.4, delay, ease: 'power2.out' }
  )

export const maskReveal = (el, delay = 0) =>
  gsap.fromTo(
    el,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1.4, delay, ease: 'power4.inOut' }
  )

export const scaleIn = (el, delay = 0) =>
  gsap.fromTo(
    el,
    { scale: 1.15, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.6, delay, ease: 'power3.out' }
  )

export const initScrollTrigger = () => {
  ScrollTrigger.refresh()
}
