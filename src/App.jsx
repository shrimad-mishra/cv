import { useState } from 'react'
import Starfield from './Starfield.jsx'
import { Reveal, CountUp, Typewriter, Cursor } from './effects.jsx'
import { profile, stats, experience, projects, publications, certificates, skills } from './data.js'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

// Tracks the pointer so the .spotlight glow follows the mouse inside a card.
function track(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

const card =
  'spotlight rounded-2xl border border-line bg-panel/70 p-6 backdrop-blur-sm transition duration-300 ' +
  'hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_-12px_rgba(94,234,212,0.35)]'

function Card({ className = '', children }) {
  return <div onMouseMove={track} className={`${card} ${className}`}>{children}</div>
}

function Section({ id, title, sub, children }) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-20">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {sub && <p className="mb-10 mt-2 text-slate-400">{sub}</p>}
        </Reveal>
        <Reveal delay={120}>{children}</Reveal>
      </div>
    </section>
  )
}

const btn = 'inline-block rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5'
const btnPrimary = `${btn} bg-gradient-to-r from-accent to-accent2 text-ink hover:shadow-[0_8px_30px_-8px_rgba(129,140,248,0.7)] hover:brightness-110`
const btnGhost = `${btn} border border-line text-slate-100 hover:border-accent/60 hover:text-accent`

const navLinks = [
  ['#experience', 'Experience'],
  ['#projects', 'Projects'],
  ['#publications', 'Publications'],
  ['#skills', 'Skills'],
  ['#contact', 'Contact'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <a href="#top" className="font-extrabold text-white transition hover:text-accent">{profile.name}</a>
        <div className="hidden gap-7 sm:flex">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="group relative text-sm text-slate-400 transition hover:text-white">
              {label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent2 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
        <button className="text-slate-300 sm:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 border-t border-line px-5 py-4 sm:hidden">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-slate-300">{label}</a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <header
      id="top"
      onMouseMove={track}
      className="spotlight relative overflow-hidden py-24"
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 md:grid-cols-[1fr_230px]">
        <div>
          <p className="font-mono text-sm text-accent">{profile.role} · {profile.location}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            I build production
            <br />
            <Typewriter
              words={['AI voicebots.', 'multi-agent systems.', 'Generative AI.', 'real-time platforms.']}
              className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"
            />
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-400">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.tags.map((t) => (
              <span
                key={t}
                className="cursor-default rounded-full border border-line bg-panel px-3 py-1 text-xs text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className={btnPrimary} href={profile.resume} {...ext}>View resume</a>
            <a className={btnGhost} href={profile.linkedin} {...ext}>LinkedIn</a>
            <a className={btnGhost} href={profile.github} {...ext}>GitHub</a>
          </div>
        </div>
        <div className="group order-first mx-auto md:order-none">
          <div className="animate-float rounded-full bg-gradient-to-br from-accent to-accent2 p-1 transition duration-500 group-hover:rotate-3 group-hover:scale-105 group-hover:shadow-[0_0_60px_-10px_rgba(94,234,212,0.6)]">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-40 w-40 rounded-full border-4 border-ink object-cover md:h-56 md:w-56"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function Stats() {
  return (
    <section className="border-t border-line py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.value + s.label} delay={i * 100}>
          <Card className="group h-full">
            <CountUp
              value={s.value}
              className="block origin-left bg-gradient-to-r from-accent to-accent2 bg-clip-text text-3xl text-transparent transition duration-300 group-hover:scale-110"
            />
            <span className="text-sm text-slate-400">{s.label}</span>
          </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <Section id="experience" title="Experience" sub="From chatbot NLU to a production voice-AI platform.">
      <div className="relative border-l border-line pl-8">
        {experience.map((job) => (
          <div key={job.title + job.when} className="group relative mb-10 last:mb-0">
            <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-ink transition duration-300 group-hover:scale-125 group-hover:bg-accent" />
            <p className="font-mono text-sm text-slate-500">{job.when}</p>
            <h3 className="mt-1 text-xl font-semibold text-white transition group-hover:text-accent">{job.title}</h3>
            <p className="font-semibold text-accent">{job.company}</p>
            {job.note && <p className="text-sm text-slate-500">{job.note}</p>}
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-slate-300 marker:text-accent2">
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" title="Projects" sub="Selected open-source work.">
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <Card key={p.title} className="group flex flex-col">
            <h3 className="text-lg font-semibold text-white">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-slate-400">{p.text}</p>
            <p className="mt-4 font-mono text-xs text-accent2">{p.stack}</p>
            <a href={p.link} {...ext} className="mt-3 text-sm text-accent">
              {p.cta} <span className="inline-block transition duration-300 group-hover:translate-x-1.5">→</span>
            </a>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Publications() {
  return (
    <Section id="publications" title="Publications & Certificates" sub="Research and continued learning.">
      {publications.map((p) => (
        <Card key={p.title} className="group mb-4">
          <p className="font-mono text-sm text-slate-500">{p.venue}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{p.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{p.text}</p>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <a href={p.link} {...ext} className="text-accent">
              Read the paper <span className="inline-block transition group-hover:translate-x-1.5">→</span>
            </a>
            {p.code && (
              <a href={p.code} {...ext} className="text-accent">
                View code <span className="inline-block transition group-hover:translate-x-1.5">→</span>
              </a>
            )}
          </div>
        </Card>
      ))}
      <div className="grid gap-4 md:grid-cols-3">
        {certificates.map((c) => (
          <Card key={c.title} className="group flex items-center gap-4 !p-4">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-accent to-accent2 font-bold text-ink transition duration-500 group-hover:rotate-[360deg]">
              ✓
            </span>
            <div>
              <b className="block text-sm text-white">{c.title}</b>
              <span className="text-xs text-slate-400">{c.issuer}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" title="Skills" sub="What I use day to day.">
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <Card key={s.title}>
            <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.items.split(/,|·/).map((i) => i.trim()).filter(Boolean).map((i) => (
                <span
                  key={i}
                  className="cursor-default rounded-md border border-line px-2 py-0.5 text-xs text-slate-300 transition hover:scale-105 hover:border-accent2 hover:text-white"
                >
                  {i}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" title="Let's talk">
      <p className="-mt-2 text-slate-400">Open to conversations about backend, platform and applied-AI engineering.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a className={btnPrimary} href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className={btnGhost} href={profile.linkedin} {...ext}>LinkedIn</a>
        <a className={btnGhost} href={profile.github} {...ext}>GitHub</a>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <>
      <Starfield />
      <Cursor />
      <div className="relative z-10">
      <Nav />
      <Hero />
      <Stats />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Contact />
      <footer className="border-t border-line px-5 py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {profile.name} · {profile.education}
      </footer>
      </div>
    </>
  )
}
