import { useState, useEffect } from 'react'

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  navy:      '#0d3b52',
  navyDark:  '#05202e',
  navyMid:   '#0a2d40',
  coral:     '#f4714a',
  coralDk:   '#e05f38',
  white:     '#ffffff',
  offWhite:  '#f7f9fb',
  border:    '#e4edf3',
  textMain:  '#1a2b38',
  textMid:   '#4b6070',
  textMute:  '#8da5b5',
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV = ['Programs', 'Immersives', 'Schedule', 'Resources']

const HERO_FEATURES = [
  { icon: '🎓', title: 'University Life', body: 'Immersive residential and intensive learning formats that go far beyond a classroom.' },
  { icon: '🏆', title: 'Skilled Lecturers', body: 'All trainers are ANLP UK certified and bring decades of real-world application.' },
  { icon: '✦',  title: 'Scholarship Facility', body: 'Merit and need-based scholarships available for qualifying participants.' },
]

const STATS = [
  { val: '#1',   label: 'NLP Training\nOrganisation in India' },
  { val: '99%',  label: 'Positive\nOutcome Rate' },
  { val: '87%',  label: 'Graduate\nCareer Rate' },
  { val: '2.4K', label: 'Lives\nTransformed' },
]

const PROGRAMS = [
  { tag: 'Certification', title: 'NLP Practitioner', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop&auto=format', desc: 'The complete NLP foundation. ANLP UK accredited. 10-day residential or modular format.' },
  { tag: 'Certification', title: 'Master Practitioner', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format', desc: 'Advanced patterns and processes. Designed for practitioners ready to go deeper.' },
  { tag: 'Certification', title: 'NLP Trainer Training', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format', desc: 'Become an internationally certified NLP trainer. India\'s most respected trainer program.' },
  { tag: 'Business',      title: 'Business NLP', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop&auto=format', desc: 'NLP applied to leadership, sales, coaching and organisational development.' },
  { tag: 'Online',        title: 'Online NLP Intensive', img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop&auto=format', desc: 'Full practitioner content delivered live online. Batch sizes kept deliberately small.' },
  { tag: 'Coaching',      title: 'NLP Life Coaching', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop&auto=format', desc: 'Integrate NLP with professional coaching. ICF-aligned competencies covered.' },
]

const WHY_ITEMS = [
  { icon: '◎', title: 'Flexibility',  body: 'Residential, modular, and online formats available for every lifestyle and schedule.' },
  { icon: '◈', title: 'Quality',      body: 'ANLP UK accredited. Internationally recognised and verified training standards.' },
  { icon: '⊕', title: 'Global',       body: 'Programs delivered across India, Europe, and the Himalayas. Alumni in 12 countries.' },
  { icon: '✦', title: 'Expertise',    body: '18 years of NLP training excellence under one founder-led faculty.' },
  { icon: '◉', title: 'Support',      body: 'Lifetime alumni community, coaching supervision, and ongoing learning resources.' },
  { icon: '★', title: 'Certified',    body: 'Every qualification is internationally recognised and certificate-bearing.' },
]

const IMMERSIVES = [
  {
    title: 'NLP Retreat — Goa',
    dates: 'Feb 14–20, 2026',
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&h=460&fit=crop&auto=format',
    desc: 'Six immersive days by the Arabian Sea. Morning practices on the beach, deep NLP work in the afternoon, integration circles at dusk.',
  },
  {
    title: 'NLP Retreat — Switzerland',
    dates: 'Jul 5–12, 2026',
    badge: 'Limited',
    img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=700&h=460&fit=crop&auto=format',
    desc: 'ANLP-accredited practitioner training in the Swiss Alps. Profoundly transformational with some of Europe\'s most breathtaking scenery.',
  },
  {
    title: 'NLP Retreat — Himalayas',
    dates: 'Apr 18–26, 2026',
    badge: 'Exclusive',
    img: 'https://images.unsplash.com/photo-1645033393602-4f7623917853?w=700&h=460&fit=crop&auto=format',
    desc: 'Once-a-year. Ancient mountains, silent mornings, and deep transformational NLP work. This experience changes people permanently.',
  },
]

const TESTIMONIALS = [
  { name: 'Priya Mehta', role: 'Director, Deloitte India', stars: 5, img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=140&h=140&fit=crop&auto=format', quote: 'Nishith\'s NLP Practitioner program fundamentally changed how I lead teams. Within a month I could see measurable shifts in communication and performance across my entire department.' },
  { name: 'Rahul Sharma',  role: 'Entrepreneur & Coach',   stars: 5, img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=140&h=140&fit=crop&auto=format', quote: 'The Switzerland retreat was the most transformative week of my adult life. I returned with tools I use daily and a clarity about my purpose that I had been seeking for years.' },
  { name: 'Anita Desai',   role: 'HR Head, Tata Group',    stars: 5, img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=140&h=140&fit=crop&auto=format', quote: 'Thought Labs gave our leadership team a shared language for change. World-class NLP training delivered with genuine warmth and exceptional depth.' },
]

const UPCOMING = [
  { name: 'NLP Practitioner Certification', dates: 'Sep 12–22, 2025', location: 'Mumbai',    seats: 4,  mode: 'In-Person' },
  { name: 'NLP Master Practitioner',        dates: 'Oct 5–18, 2025',  location: 'Bangalore', seats: 7,  mode: 'In-Person' },
  { name: 'NLP Business Practitioner',      dates: 'Nov 1–10, 2025',  location: 'Online',    seats: 12, mode: 'Online'    },
  { name: 'NLP Trainer Training',           dates: 'Dec 8–20, 2025',  location: 'Pune',      seats: 3,  mode: 'In-Person' },
]

const HOW_STEPS = [
  { n: '01', title: 'Choose your program',      body: 'Browse certifications, retreats, and online intensives to find your right fit.' },
  { n: '02', title: 'Complete Application Form', body: 'A short application helps us understand where you are on your journey.' },
  { n: '03', title: 'Tell us about yourself',   body: 'A free 45-min exploration call with Nishith to confirm the right path.' },
  { n: '04', title: 'Self-report your courses',  body: 'Complete prerequisite reading and pre-work before your program begins.' },
  { n: '05', title: 'Student Activities',        body: 'Engage the alumni community — events, practice groups, supervision circles.' },
  { n: '06', title: 'Payment of Fees',           body: 'Flexible payment plans and scholarship pathways available on application.' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill={C.coral}>
          <path d="M6.5 1l1.43 2.9 3.2.46-2.32 2.26.55 3.19L6.5 8.15l-2.86 1.66.55-3.19L1.87 4.36l3.2-.46L6.5 1z"/>
        </svg>
      ))}
    </div>
  )
}

function Tag({ children, small }: { children: React.ReactNode; small?: boolean }) {
  return (
    <span
      className="inline-block font-semibold tracking-widest uppercase"
      style={{ fontSize: small ? 11 : 10, color: C.coral, letterSpacing: '0.14em' }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-6 h-px block" style={{ backgroundColor: C.coral }} />
      <Tag>{children}</Tag>
    </div>
  )
}

function ArrowLink({ href = '#', color = C.coral }: { href?: string; color?: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3" style={{ color }}>
      LEARN MORE
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 5h14M10 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif", color: C.textMain }}>

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.97)',
          boxShadow: scrolled ? '0 2px 20px rgba(13,59,82,0.10)' : '0 1px 0 rgba(13,59,82,0.06)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-[1250px] mx-auto px-6 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: C.navy }}>TL</div>
            <span className="font-display font-bold text-base tracking-wide hidden sm:block" style={{ color: C.navy }}>THOUGHT LABS</span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(l => (
              <a key={l} href="#" className="text-sm font-medium transition-colors hover:opacity-60" style={{ color: C.textMid }}>{l}</a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block text-sm font-medium" style={{ color: C.navy }}>info@thoughtlabs.in</a>
            <a
              href="#"
              className="px-5 py-2.5 rounded-sm text-sm font-bold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: C.coral }}
            >
              Free Exploration Call
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pt-[68px]" style={{ backgroundColor: C.offWhite }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

            {/* Left: copy */}
            <div className="flex flex-col justify-center py-20 pr-10">
              <SectionLabel>NLP Training &amp; Immersive Retreats</SectionLabel>
              <h1
                className="font-display leading-[1.1] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: C.navy }}
              >
                Discover. Grow.<br />
                Life Changing<br />
                <span style={{ color: C.coral }}>Experiences</span>
              </h1>
              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: C.textMid }}>
                Thought Labs delivers internationally accredited NLP training and immersive retreats that transform how you think, communicate, and lead — since 2006.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="px-7 py-3.5 rounded-sm text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: C.coral }}
                >
                  APPLY NOW
                </a>
                <a
                  href="#"
                  className="px-7 py-3.5 rounded-sm text-sm font-bold transition-all hover:bg-slate-100"
                  style={{ color: C.navy, border: `2px solid ${C.navy}` }}
                >
                  FIND OUT MORE
                </a>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="hidden lg:flex items-end justify-end relative">
              <div
                className="absolute top-0 right-0 bottom-0 w-[120%]"
                style={{ backgroundColor: '#e8f0f5' }}
              />
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&h=640&fit=crop&auto=format&crop=top"
                alt="Nishith Shah, Founder of Thought Labs"
                className="relative z-10 object-cover object-top"
                style={{ height: 480, width: 420 }}
              />
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div style={{ backgroundColor: C.navy }}>
          <div className="max-w-[1250px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-white/10">
              {HERO_FEATURES.map((f) => (
                <div key={f.title} className="px-8 py-7 flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{f.icon}</span>
                  <div>
                    <div className="font-bold text-sm text-white mb-1">{f.title}</div>
                    <p className="text-white/55 text-xs leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / FOUNDER ──────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1726091983472-a7da2540c492?w=680&h=500&fit=crop&auto=format"
                alt="Thought Labs group session outdoors"
                className="w-full rounded-sm object-cover"
                style={{ height: 400 }}
              />
              {/* coral accent bar */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-sm" style={{ backgroundColor: C.coral, zIndex: -1 }} />
            </div>

            {/* Copy */}
            <div>
              <SectionLabel>About Thought Labs</SectionLabel>
              <h2 className="font-display text-[2.4rem] leading-[1.2] mb-5" style={{ color: C.navy }}>
                Welcome to Thought Labs<br />
                <em>School of NLP</em>
              </h2>
              <p className="leading-relaxed mb-4 text-[0.97rem]" style={{ color: C.textMid }}>
                For over eighteen years, Thought Labs has been India's foremost NLP training institute. Our programs are internationally accredited by ANLP UK and have been experienced by participants from 12 countries.
              </p>
              <p className="leading-relaxed mb-8 text-[0.97rem]" style={{ color: C.textMid }}>
                Founded by Nishith Shah — Master Trainer, Coach, and one of India's most respected NLP practitioners — Thought Labs offers a rare combination of rigorous methodology and genuinely transformational learning environments.
              </p>
              <ArrowLink />

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 mt-10 pt-8" style={{ borderTop: `1px solid ${C.border}` }}>
                {STATS.map(s => (
                  <div key={s.label}>
                    <div className="font-display text-[1.9rem] font-bold leading-none mb-1" style={{ color: C.coral }}>{s.val}</div>
                    <div className="text-xs leading-snug whitespace-pre-line" style={{ color: C.textMute }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DARK MISSION BAND ────────────────────────────────────── */}
      <section
        className="relative py-24 text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(5,32,46,0.88), rgba(10,45,64,0.92)), url('https://images.unsplash.com/photo-1623721122828-c38f5c0b1373?w=1600&h=600&fit=crop&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1250px] mx-auto px-6 relative z-10">
          <SectionLabel>
            <span className="text-white/50">Our Mission</span>
          </SectionLabel>
          <h2 className="font-display text-[2.8rem] leading-[1.15] text-white mb-6">
            Empowering Minds, Changing Lives,<br />Shaping Futures
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-base leading-relaxed mb-9">
            We believe that when people understand the language of their own minds, everything changes. NLP is not an add-on skill — it is a fundamental shift in how you experience yourself and the world.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3.5 text-sm font-bold text-white rounded-sm transition hover:opacity-90"
            style={{ backgroundColor: C.coral }}
          >
            EXPLORE PROGRAMS
          </a>
        </div>
      </section>

      {/* ── PROGRAMS GRID ────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel>
              <span className="mx-auto">Our Programs</span>
            </SectionLabel>
            <h2 className="font-display text-[2.4rem]" style={{ color: C.navy }}>
              Outcomes &amp; Modules
            </h2>
            <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: C.textMid }}>
              Empowering minds for a better tomorrow — choose the program that meets you where you are.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map(p => (
              <div
                key={p.title}
                className="group rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ border: `1px solid ${C.border}`, boxShadow: '0 2px 12px rgba(13,59,82,0.05)' }}
              >
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white rounded-sm"
                    style={{ backgroundColor: C.coral }}
                  >
                    {p.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-base mb-2" style={{ color: C.navy }}>{p.title}</h3>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: C.textMid }}>{p.desc}</p>
                  <ArrowLink />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────────────── */}
      <section className="py-0" style={{ backgroundColor: C.offWhite }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">

            {/* Photo */}
            <div className="lg:col-span-2 relative">
              <img
                src="https://images.unsplash.com/photo-1676989880361-091e12efc056?w=600&h=680&fit=crop&auto=format&crop=top"
                alt="NLP practitioner testimonial"
                className="w-full object-cover"
                style={{ height: 480 }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: `linear-gradient(to right, transparent, ${C.offWhite})` }}
              />
            </div>

            {/* Quote */}
            <div className="lg:col-span-3 flex flex-col justify-center py-16 pl-0 lg:pl-14">
              <SectionLabel>Case Study</SectionLabel>
              <blockquote className="font-display text-[1.85rem] leading-[1.3] mb-8" style={{ color: C.navy }}>
                "Knowledge will bring you the opportunity to make a difference"
              </blockquote>
              <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: C.textMid }}>
                After completing the Master Practitioner program with Thought Labs, I transformed not just my coaching practice but my entire relationship with language, emotion, and possibility. Nishith's teaching is precise, generous, and profoundly practical.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format"
                  alt="Anita Desai"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-sm" style={{ color: C.navy }}>Anita Desai</div>
                  <div className="text-xs" style={{ color: C.textMute }}>HR Head, Tata Group</div>
                </div>
                <div
                  className="ml-4 pl-4 text-2xl font-serif italic leading-none"
                  style={{ color: C.coral, borderLeft: `2px solid ${C.border}` }}
                >
                  ❝
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ───────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel><span className="mx-auto">Why Thought Labs</span></SectionLabel>
            <h2 className="font-display text-[2.4rem]" style={{ color: C.navy }}>Why Choose Thought Labs?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: C.border }}>
            {WHY_ITEMS.map(w => (
              <div
                key={w.title}
                className="group flex gap-4 p-8 transition-colors duration-200 hover:bg-slate-50"
                style={{ backgroundColor: C.white }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-base shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-white"
                  style={{ backgroundColor: '#edf4f8', color: C.navy }}
                >
                  {w.icon}
                </div>
                <div>
                  <div className="font-bold text-sm mb-1" style={{ color: C.navy }}>{w.title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: C.textMid }}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(5,32,46,0.84), rgba(5,32,46,0.84)), url('https://images.unsplash.com/photo-1597120590849-a1d5a743d155?w=1600&h=700&fit=crop&auto=format')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1250px] mx-auto px-6 text-center">
          <SectionLabel><span className="text-white/50">Video Tour</span></SectionLabel>
          <h2 className="font-display text-[2.4rem] text-white mb-3">Watch Video Tour in Thought Labs</h2>
          <p className="text-white/55 text-sm max-w-md mx-auto mb-10">
            Step inside a Thought Labs program. See what makes our retreats and certification trainings different from anything else available in India.
          </p>

          {/* Play button */}
          <button className="group relative w-20 h-20 mx-auto flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110">
            <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(244,113,74,0.2)', border: `2px solid rgba(244,113,74,0.5)` }} />
            <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ backgroundColor: C.coral }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                <path d="M7 4.5v13l11-6.5L7 4.5z"/>
              </svg>
            </div>
          </button>

          {/* Three video thumbnails */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
            {[
              { title: 'What is NLP and How Can It Change Your Life?', dur: '12:34', views: '48K', img: 'https://images.unsplash.com/photo-1726091983472-a7da2540c492?w=500&h=300&fit=crop&auto=format' },
              { title: 'Inside the Himalayan NLP Retreat', dur: '8:47', views: '31K', img: 'https://images.unsplash.com/photo-1516478679236-b2f42e7062f7?w=500&h=300&fit=crop&auto=format' },
              { title: 'NLP for Leaders: Transforming Teams', dur: '18:02', views: '62K', img: 'https://images.unsplash.com/photo-1599828586134-fbaff96c63d5?w=500&h=300&fit=crop&auto=format' },
            ].map(v => (
              <div key={v.title} className="group cursor-pointer rounded-sm overflow-hidden text-left" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="relative h-44 overflow-hidden bg-slate-800">
                  <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill={C.navy}><path d="M4 2.5v9l8-4.5-8-4.5z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}>{v.dur}</div>
                </div>
                <div className="p-4">
                  <p className="text-white/80 text-xs font-medium leading-snug mb-1">{v.title}</p>
                  <span className="text-white/35 text-[10px]">{v.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMMERSIVE RETREATS ───────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.offWhite }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Left text */}
            <div className="lg:col-span-2">
              <SectionLabel>Immersive Retreats</SectionLabel>
              <h2 className="font-display text-[2.4rem] leading-[1.2] mb-5" style={{ color: C.navy }}>
                Live as if you were to<br />die tomorrow. Learn as<br />if you were to live forever.
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.textMid }}>
                Our immersive retreats combine the very best NLP training with extraordinary locations and a depth of experience that simply cannot be replicated in a conventional classroom.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '◎', title: 'Graduation', body: 'Complete your certification in a context that embeds learning at every level.' },
                  { icon: '◈', title: 'Powerful Alumni', body: 'Join a global community of practitioners who continue to support each other.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0 mt-0.5" style={{ backgroundColor: C.coral }}>{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5" style={{ color: C.navy }}>{item.title}</div>
                      <p className="text-xs leading-relaxed" style={{ color: C.textMid }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: retreat cards */}
            <div className="lg:col-span-3 space-y-4">
              {IMMERSIVES.map(r => (
                <div
                  key={r.title}
                  className="group flex gap-0 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
                  style={{ border: `1px solid ${C.border}`, backgroundColor: C.white }}
                >
                  <div className="w-40 shrink-0 relative overflow-hidden bg-slate-200">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ height: 130 }}/>
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-white rounded-sm" style={{ backgroundColor: C.coral }}>{r.badge}</div>
                  </div>
                  <div className="flex-1 p-5">
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: C.textMute }}>{r.dates}</div>
                    <h3 className="font-bold text-sm mb-1.5" style={{ color: C.navy }}>{r.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: C.textMid }}>{r.desc}</p>
                    <ArrowLink />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel><span className="mx-auto">How to Enrol</span></SectionLabel>
            <h2 className="font-display text-[2.4rem]" style={{ color: C.navy }}>How to Apply to Thought Labs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="p-7 rounded-sm transition-all duration-200 hover:shadow-lg"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="font-display text-4xl font-bold mb-4 opacity-15" style={{ color: C.coral }}>{s.n}</div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-4" style={{ backgroundColor: i % 2 === 0 ? C.coral : C.navy }}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: C.navy }}>{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: C.textMid }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING PROGRAMS TABLE ───────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.offWhite }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Left copy */}
            <div className="lg:col-span-2">
              <SectionLabel>Schedule 2025–26</SectionLabel>
              <h2 className="font-display text-[2.4rem] leading-[1.2] mb-5" style={{ color: C.navy }}>
                The Campus<br />Experience
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.textMid }}>
                Every program runs with a carefully considered cohort. We keep numbers small so every participant receives the attention they deserve.
              </p>
              <a
                href="#"
                className="inline-block px-6 py-3 text-xs font-bold text-white rounded-sm transition hover:opacity-90"
                style={{ backgroundColor: C.coral }}
              >
                EXPLORE MORE
              </a>
            </div>

            {/* Right: schedule cards */}
            <div className="lg:col-span-3 space-y-3">
              {UPCOMING.map((p, i) => (
                <div
                  key={i}
                  className="group flex flex-wrap md:flex-nowrap items-center gap-4 px-6 py-4 rounded-sm transition-all hover:shadow-md cursor-pointer"
                  style={{ backgroundColor: C.white, border: `1px solid ${C.border}` }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate" style={{ color: C.navy }}>{p.name}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: C.textMute }}>{p.location}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs shrink-0" style={{ color: C.textMid }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="0.5" y="1" width="11" height="10" rx="1.5"/><path d="M0.5 5h11M4 0v2M8 0v2"/></svg>
                    {p.dates}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.seats <= 4 ? C.coral : '#22c55e' }}/>
                    <span className="text-xs font-semibold" style={{ color: p.seats <= 4 ? C.coral : '#16a34a' }}>{p.seats} left</span>
                  </div>
                  <a
                    href="#"
                    className="shrink-0 px-4 py-2 text-xs font-bold rounded-sm transition-all group-hover:text-white"
                    style={{ backgroundColor: '#edf4f8', color: C.navy }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = C.coral; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#edf4f8'; (e.currentTarget as HTMLElement).style.color = C.navy }}
                  >
                    VIEW DETAILS →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel><span className="mx-auto">Alumni Stories</span></SectionLabel>
            <h2 className="font-display text-[2.4rem]" style={{ color: C.navy }}>What Our Alumni Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div
                key={t.name}
                className="p-8 rounded-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <Stars n={t.stars} />
                <p className="text-sm leading-relaxed my-5 italic" style={{ color: C.textMid }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover"/>
                  <div>
                    <div className="font-bold text-sm" style={{ color: C.navy }}>{t.name}</div>
                    <div className="text-xs" style={{ color: C.textMute }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section style={{ backgroundColor: C.navy }}>
        <div className="max-w-[1250px] mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-[2.6rem] text-white leading-[1.15]">
              Together We Learn,<br />Together We Grow
            </h2>
            <p className="text-white/55 mt-4 text-sm leading-relaxed max-w-md">
              Join over 2,400 people who have transformed their lives, careers, and relationships through NLP training with Thought Labs. Your journey begins with a single conversation.
            </p>
            <a
              href="#"
              className="inline-block mt-8 px-8 py-3.5 text-sm font-bold text-white rounded-sm transition hover:opacity-90"
              style={{ backgroundColor: C.coral }}
            >
              BOOK FREE EXPLORATION CALL
            </a>
          </div>
          <div className="flex items-center justify-end">
            <img
              src="https://images.unsplash.com/photo-1599828586134-fbaff96c63d5?w=520&h=360&fit=crop&auto=format"
              alt="Thought Labs alumni gathering"
              className="rounded-sm object-cover"
              style={{ width: 420, height: 280 }}
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: '#03141e' }}>
        <div className="max-w-[1250px] mx-auto px-6 pt-14 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-sm flex items-center justify-center text-white text-xs font-black" style={{ backgroundColor: C.coral }}>TL</div>
                <span className="font-display text-sm font-bold tracking-wide text-white">THOUGHT LABS</span>
              </div>
              <p className="text-white/35 text-xs leading-relaxed mb-5">ANLP UK accredited NLP training and immersive retreats since 2006. 2,400+ lives transformed across 12 countries.</p>
              <div className="flex gap-2">
                {['in','fb','yt','ig'].map(s => (
                  <a key={s} href="#" className="w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold uppercase transition-colors hover:bg-white/20" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)' }}>{s}</a>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <div className="text-[10px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Programs</div>
              <ul className="space-y-2.5">
                {['NLP Practitioner','Master Practitioner','NLP Trainer','Business NLP','Online Programs'].map(i => (
                  <li key={i}><a href="#" className="text-white/45 text-xs hover:text-white/75 transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>

            {/* Immersives */}
            <div>
              <div className="text-[10px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Immersives</div>
              <ul className="space-y-2.5">
                {['Retreat Goa','Retreat Switzerland','Retreat Himalayas','Corporate Retreats','Custom Programs'].map(i => (
                  <li key={i}><a href="#" className="text-white/45 text-xs hover:text-white/75 transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Contact Us</div>
              <ul className="space-y-3 text-white/45 text-xs">
                <li className="flex gap-2 items-start"><span style={{ color: C.coral }}>✉</span>info@thoughtlabs.in</li>
                <li className="flex gap-2 items-start"><span style={{ color: C.coral }}>✆</span>+91 98200 12345</li>
                <li className="flex gap-2 items-start"><span style={{ color: C.coral }}>◎</span>Mumbai, India</li>
              </ul>
              <a href="#" className="inline-block mt-5 px-5 py-2 text-xs font-bold text-white rounded-sm" style={{ backgroundColor: C.coral }}>
                Free Call
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-[11px]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.22)' }}>
            <span>© 2025 Thought Labs. All rights reserved.</span>
            <div className="flex gap-5">
              {['Privacy Policy','Terms of Use','Refund Policy'].map(i => (
                <a key={i} href="#" className="hover:text-white/45 transition-colors">{i}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
