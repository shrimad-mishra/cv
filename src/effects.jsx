import { useEffect, useRef, useState } from 'react'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// True once the element has scrolled into view (fires only once).
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return setSeen(true)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen]
}

// Fades and slides its children up as they scroll into view.
export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, seen] = useInView()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${seen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}

// Counts from 0 up to the number inside `value` (e.g. "50+", "70%") once visible.
export function CountUp({ value, className = '' }) {
  const [ref, seen] = useInView(0.5)
  const target = parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reducedMotion()) return setN(target)
    const start = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1400)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, target])
  return <b ref={ref} className={className}>{n}{suffix}</b>
}

// Types each word, pauses, deletes it, then moves to the next.
export function Typewriter({ words, className = '' }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState(reducedMotion() ? words[0] : '')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (reducedMotion()) return
    const word = words[i % words.length]
    let delay = deleting ? 45 : 90
    if (!deleting && text === word) delay = 1800
    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setI(i + 1)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, i, words])
  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-accent align-baseline">&nbsp;</span>
    </span>
  )
}

// Glowing dot + trailing ring that grows over links and buttons. Mouse only.
export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches && !reducedMotion())
  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')
    const pos = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let hover = false
    let raf
    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      hover = !!e.target.closest('a, button')
    }
    const loop = () => {
      lag.x += (pos.x - lag.x) * 0.18
      lag.y += (pos.y - lag.y) * 0.18
      dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
      ring.current.style.transform = `translate(${lag.x}px, ${lag.y}px) translate(-50%, -50%) scale(${hover ? 1.8 : 1})`
      ring.current.style.borderColor = hover ? 'rgba(129,140,248,0.9)' : 'rgba(94,234,212,0.6)'
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('pointermove', move)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [enabled])
  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border transition-[width,height] duration-200" />
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-50 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_3px_rgba(94,234,212,0.8)]" />
    </>
  )
}
