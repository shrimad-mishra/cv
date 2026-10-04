import { useEffect, useRef } from 'react'

// Full-page animated starfield. Stars twinkle and drift with a slight
// parallax; stars near the cursor link up into a glowing constellation.
// Clicking spawns a short burst of shooting stars.
export default function Starfield() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const LINK_RADIUS = 190
    let w, h, dpr, stars, raf
    const mouse = { x: -9999, y: -9999, px: 0, py: 0 }
    const shooters = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Fewer stars on small/low-power screens.
      const count = Math.round((w * h) / (w < 768 ? 6000 : 3000))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2, // depth: closer stars are bigger and move more
        r: Math.random() * 1.4 + 0.5,
        tw: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.15 ? 250 : 170, // accent colour for a few stars
        tinted: Math.random() < 0.25, // most stars are plain white
      }))
    }

    // Scrolling speeds the warp up briefly; it eases back down each frame.
    let lastScroll = window.scrollY
    let warp = 0
    function onScroll() {
      warp = Math.min(warp + Math.abs(window.scrollY - lastScroll) * 0.0006, 0.04)
      lastScroll = window.scrollY
    }

    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onLeave() {
      mouse.x = mouse.y = -9999
    }
    function onClick(e) {
      for (let i = 0; i < 6; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 4 + Math.random() * 4
        shooters.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 })
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h)
      // Ease the parallax offset toward the cursor for a smooth drift.
      const tx = mouse.x > -9999 ? (mouse.x - w / 2) / w : 0
      const ty = mouse.y > -9999 ? (mouse.y - h / 2) / h : 0
      mouse.px += (tx - mouse.px) * 0.05
      mouse.py += (ty - mouse.py) * 0.05

      warp *= 0.94
      const speed = reduced ? 0 : 0.0016 + warp
      const near = []
      for (const s of stars) {
        // Stream outward from the centre; respawn near the centre once off-screen.
        s.x += (s.x - w / 2) * speed * s.z
        s.y += (s.y - h / 2) * speed * s.z
        if (s.x < -20 || s.x > w + 20 || s.y < -20 || s.y > h + 20) {
          // Respawn anywhere (not just the centre) so stars never bunch up.
          s.x = Math.random() * w
          s.y = Math.random() * h
          s.z = Math.random() * 0.8 + 0.2
        }
        // Grow brighter as stars move toward the edges, like they're getting closer.
        const edge = Math.min(1, Math.hypot(s.x - w / 2, s.y - h / 2) / (Math.max(w, h) * 0.5))
        const x = s.x - mouse.px * 30 * s.z
        const y = s.y - mouse.py * 30 * s.z
        const twinkle = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(t / 700 + s.tw)
        const d = Math.hypot(x - mouse.x, y - mouse.y)
        const boost = d < LINK_RADIUS ? 1 - d / LINK_RADIUS : 0
        if (boost > 0) near.push({ x, y, boost, hue: s.hue })

        ctx.beginPath()
        ctx.arc(x, y, s.r * s.z * (0.5 + edge) * (1 + boost * 1.8), 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, ${s.tinted || boost ? 90 : 0}%, ${s.tinted ? 75 + boost * 20 : 95}%, ${Math.min(1, twinkle * (0.3 + edge) * s.z + boost)})`
        ctx.shadowBlur = boost * 12
        ctx.shadowColor = `hsl(${s.hue}, 90%, 70%)`
        ctx.fill()
      }
      ctx.shadowBlur = 0

      // Constellation: connect the closest stars to each other and to the cursor.
      near.sort((a, b) => b.boost - a.boost)
      near.length = Math.min(near.length, 14)
      for (let i = 0; i < near.length; i++) {
        const a = near[i]
        ctx.strokeStyle = `rgba(94, 234, 212, ${a.boost * 0.85})`
        ctx.lineWidth = 1.1
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(a.x, a.y)
        ctx.stroke()
        for (let j = i + 1; j < near.length; j++) {
          const b = near[j]
          const dd = Math.hypot(a.x - b.x, a.y - b.y)
          if (dd < 110) {
            ctx.strokeStyle = `rgba(129, 140, 248, ${Math.min(a.boost, b.boost) * (1 - dd / 110) * 1})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Shooting stars from clicks.
      for (let i = shooters.length - 1; i >= 0; i--) {
        const p = shooters[i]
        const grad = ctx.createLinearGradient(p.x, p.y, p.x - p.vx * 6, p.y - p.vy * 6)
        grad.addColorStop(0, `rgba(255,255,255,${p.life})`)
        grad.addColorStop(1, 'rgba(94,234,212,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx * 6, p.y - p.vy * 6)
        ctx.stroke()
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02
        if (p.life <= 0) shooters.splice(i, 1)
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('click', onClick)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
}
