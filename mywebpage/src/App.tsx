import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, animate, useInView, useScroll, useSpring } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ArrowRight, ArrowDown, Copy, Check,
  Award, Mic, BookOpen, Coins, Database, Workflow, Cpu, Network,
  Building2, Handshake, GraduationCap, BadgeCheck,
  FlaskConical, Presentation, Package, RefreshCw, ShieldCheck, ArrowUpRight, Layers, Activity,
} from "lucide-react";

// -------- Profile / Content --------
const PROFILE = {
  name: "H. Hans Sahebi",
  title: "AI & Data Architecture",
  headline: "I design the data and AI systems that critical operations run on.",
  blurb:
    "Five years taking data platforms and AI systems from first prototype to production for energy and drilling operations. The same approach works in any industry where operations depend on data, and I bring it to companies and partners that need it.",
  location: "Stavanger, Norway",
  email: "hs.hamedsahebi@gmail.com",
  phone: "+47 489 24 108",
  phoneHref: "tel:+4748924108",
  cv: "/my_cv.pdf",
  socials: {
    github: "https://github.com/hamedsahebi",
    linkedin: "https://www.linkedin.com/in/hamed-sahebi-2439b249/",
    scholar: "https://scholar.google.com/citations?user=A-h_micAAAAJ&hl=en",
  },
};

const STATS = [
  { value: 5, decimals: 0, suffix: "", unit: "years", label: "building production data systems" },
  { value: 5.5, decimals: 1, suffix: "M", unit: "NOK", label: "research funding secured" },
  { value: 2, decimals: 0, suffix: "", unit: "grants", label: "won from the Research Council of Norway" },
];

const TECH = [
  "Python", "Apache Spark", "Databricks", "Stream processing", "FastAPI", "PostgreSQL", "InfluxDB", "MongoDB", "Docker", "Kubernetes", "LangChain",
  "LangGraph", "LLM agents", "Vector DB", "REST APIs", "TypeScript", "Node.js", "React", "pandas",
  "NumPy", "GitHub Actions", "Linux", "CI/CD",
];

const CAPABILITIES = [
  {
    icon: <Database className="h-6 w-6" />,
    title: "Data architecture",
    text: "Data models and storage strategy for high-frequency, production-critical data in PostgreSQL, InfluxDB and MongoDB.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Data engineering",
    text: "Batch pipelines that clean, transform and analyse large volumes of historical data with Apache Spark and Databricks.",
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Stream processing",
    text: "Real-time pipelines that ingest and process live data streams, such as high-frequency sensor telemetry, as events happen.",
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "System integration",
    text: "Connecting operational systems, APIs and teams so data moves reliably from source to decision.",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "AI integration",
    text: "Pragmatic AI feasibility assessment, LLM and agent architecture, and the path from prototype to production.",
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Requirements to blueprint",
    text: "Turning business and operational needs into architecture, specifications and design guidelines teams can build on.",
  },
];

const PROCESS = [
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Prototype",
    text: "A working prototype on real data, built quickly to prove the idea and expose the hard parts early.",
    output: ["Python", "real data", "quick UI"],
  },
  {
    icon: <Presentation className="h-6 w-6" />,
    title: "Demo",
    text: "Stakeholders see and use it, so decisions are based on something that runs instead of slides.",
    output: ["live demo", "walkthrough"],
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "MVP",
    text: "The smallest version that delivers value to real users, on an architecture that can grow.",
    output: ["APIs", "data model", "Docker"],
  },
  {
    icon: <RefreshCw className="h-6 w-6 animate-[spin_6s_linear_infinite] motion-reduce:animate-none" />,
    title: "Iterate",
    text: "Short feedback cycles with users and domain experts. Measure, adjust and repeat until it fits the work.",
    output: ["user feedback", "metrics"],
    loop: true,
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Production",
    text: "Hardened, tested and documented, with CI/CD and monitoring, and handed over to run in operations.",
    output: ["CI/CD", "tests", "monitoring", "docs"],
  },
];

const INDUSTRIES = {
  proven: ["Energy", "Drilling & wells"],
  transferable: ["Manufacturing", "Utilities", "Maritime", "Logistics", "Industrial IoT"],
};

type Job = { role: string; focus?: string; org: string; period: string; year: string; place: string; summary: string; points: string[]; milestones?: { period: string; text: string }[] };
const EXPERIENCE: Job[] = [
  {
    role: "Software Engineer",
    focus: "Drilling data platforms and AI integration for energy operations",
    org: "University of Stavanger",
    period: "2022 – present",
    year: "2022",
    place: "Stavanger",
    summary: "Leading solution design for data-intensive and AI-driven systems that support critical drilling and energy operations.",
    milestones: [
      { period: "2022 – 2023", text: "Secured a 500K NOK qualification grant" },
      { period: "2023 – 2024", text: "Real-time Drilling Data Platform, funded by Equinor" },
      { period: "2024 – 2026", text: "5M NOK commercialization project: AI integration for energy operations" },
    ],
    points: [
      "End-to-end responsibility for solution architecture, from business and operational requirements to specifications for production deployment.",
      "Designed data models and integration strategies for high-frequency drilling telemetry.",
      "Assess AI feasibility across energy use cases and communicate capabilities, limits and integration challenges to technical and business stakeholders.",
      "Write architecture documentation and design guidelines, and keep implementation aligned with them.",
    ],
  },
  {
    role: "Full-Stack Developer",
    focus: "Platforms for historical data analysis and well planning",
    org: "University of Stavanger",
    period: "2020 – 2021",
    year: "2020",
    place: "Stavanger",
    summary: "Built web platforms for analysing historical drilling data and planning wells, with end-to-end ownership of the whole life cycle.",
    points: [
      "Owned each platform from requirements and architecture through development, deployment and maintenance.",
      "Built the full stack: data storage, REST APIs, and interactive front ends for analysis and visualization.",
      "Worked directly with engineers to turn planning and analysis workflows into working software.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Valide AS",
    period: "Jun – Dec 2019",
    year: "2019",
    place: "Stavanger",
    summary: "Data processing and signal analysis for energy system monitoring.",
    points: [
      "Python applications for equipment data analysis and automated signal processing with NumPy and pandas.",
      "Databases for structured operational data storage and real-time retrieval.",
    ],
  },
  {
    role: "ML Engineer Intern",
    org: "ProWellPlan AS",
    period: "Jun – Dec 2018",
    year: "2018",
    place: "Bergen",
    summary: "Predictive modelling for drilling and well planning.",
    points: [
      "Machine learning models for well trajectory prediction and time-series forecasting, validated on production well data.",
    ],
  },
];

type Project = { title: string; period: string; description: string; tags: string[]; visual: "wave" | "graph" | "bars" };
const PROJECTS: Project[] = [
  {
    title: "Real-time Drilling Data Platform",
    period: "2023 – 2024 · Funded by Equinor",
    description:
      "Real-time data acquisition, prediction and optimization system, from architecture to deployment. Microservices in Docker, data in PostgreSQL and MongoDB, React front end.",
    tags: ["Python", "TypeScript", "Microservices", "PostgreSQL", "MongoDB", "Docker"],
    visual: "wave",
  },
  {
    title: "GenAI Knowledge & Agents",
    period: "AI-drill",
    description:
      "Document question-answering over a vector database, and custom AI agents that work with internal software workflows.",
    tags: ["LangChain", "OpenAI API", "Vector DB", "Agents"],
    visual: "graph",
  },
  {
    title: "Operational Data & Planning Apps",
    period: "Production",
    description:
      "Two production web apps for operational data management, visualization and planning, with REST APIs and cloud deployment.",
    tags: ["Flask", "Express", "React", "PostgreSQL", "InfluxDB"],
    visual: "bars",
  },
];

type Paper = { title: string; authors: string; venue: string; year: number; topic: string; practice: string; featured?: boolean };
const PAPERS: Paper[] = [
  {
    title: "Real-Time Drilling Performance Monitoring Using AI-Enhanced Microservices and LLM Integration",
    authors: "H. Sahebi, D. Sui",
    venue: "ADIPEC, Abu Dhabi International Petroleum Exhibition and Conference",
    year: 2025,
    topic: "AI & LLM systems",
    practice: "Live performance monitoring for drilling operations, built as AI-enabled microservices with an LLM layer on top.",
    featured: true,
  },
  {
    title: "Rate of Penetration Optimal Control Considering Drillstring Vibration via Data Analytics",
    authors: "D. Sui, H. Sahebi, A. Hetland",
    venue: "OMAE, International Conference on Offshore Mechanics and Arctic Engineering",
    year: 2025,
    topic: "Optimization & control",
    practice: "Drilling faster without damaging equipment, by using data analytics to account for vibration.",
  },
  {
    title: "Develop AI-Aid Drilling Environment via Micro Service Systems",
    authors: "H. Sahebi, D. Sui",
    venue: "OMAE",
    year: 2024,
    topic: "Software architecture",
    practice: "A microservice architecture for AI-assisted drilling software.",
  },
  {
    title: "Rate of Penetration Optimization with Data Analytics Using Dynamic Trend Analysis",
    authors: "U. B. Ochije, J. E. Gravdal, H. Sahebi, D. Sui",
    venue: "OMAE",
    year: 2024,
    topic: "Optimization & control",
    practice: "Using trends in live drilling data to improve drilling speed.",
  },
  {
    title: "Extremum Seeking Control Implementation for Drilling Efficiency",
    authors: "M. A. Ikhlef, S. Bekkevik, H. Sahebi, J. E. Gravdal, D. Sui",
    venue: "OMAE",
    year: 2024,
    topic: "Optimization & control",
    practice: "Automatic control that searches for the most efficient drilling parameters during operation.",
  },
  {
    title: "Trend and Dynamic Analysis on Temporal Drilling Data and Their Data-Driven Models",
    authors: "D. Sui, H. Sahebi",
    venue: "Geoenergy Science and Engineering, vol. 223",
    year: 2023,
    topic: "Time-series data",
    practice: "Analysis of high-frequency drilling time-series data and data-driven models built on it.",
  },
  {
    title: "Design, Optimization, and Visualization of Wellbore Trajectory in 3D",
    authors: "H. Sahebi, E. Wiktorski, D. Sui",
    venue: "SPE Norway Subsurface Conference",
    year: 2022,
    topic: "Engineering software",
    practice: "Software for designing, optimizing and visualizing well paths in 3D.",
  },
];

const ACHIEVEMENTS: { icon: React.ReactNode; amount?: string; title: string; sub: string; date: string }[] = [
  { icon: <Coins className="h-5 w-5" />, amount: "5M NOK", title: "Commercialization grant", sub: "Research Council of Norway", date: "2024–2026" },
  { icon: <Award className="h-5 w-5" />, amount: "500K NOK", title: "Qualification grant", sub: "Research Council of Norway", date: "2022–2023" },
  { icon: <BookOpen className="h-5 w-5" />, title: "7 industry papers", sub: "ADIPEC, OMAE, SPE and Geoenergy Science & Engineering", date: "2022–2025" },
  { icon: <Mic className="h-5 w-5" />, title: "Conference speaker", sub: "Presented 2 papers at OMAE, Singapore", date: "2024" },
];

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Architecture", items: ["System design", "Data architecture", "REST API design", "System integration"] },
  { group: "Languages & backend", items: ["Python", "JavaScript", "TypeScript", "FastAPI", "Flask", "Node.js", "Express"] },
  { group: "Data engineering", items: ["Apache Spark", "Databricks", "ETL / ELT", "Batch processing", "Stream processing", "pandas", "NumPy"] },
  { group: "Databases", items: ["PostgreSQL", "InfluxDB", "MongoDB", "Vector DB"] },
  { group: "AI", items: ["LLMs", "LangChain", "LangGraph", "Agents", "scikit-learn", "Keras"] },
  { group: "Infrastructure", items: ["Docker", "Kubernetes", "Linux", "GitHub Actions", "CI/CD"] },
];

const CERTIFICATES: { name: string; hours?: string }[] = [
  { name: "Spark Streaming: Stream Processing in Lakehouse (PySpark)" },
  { name: "LangChain & LangGraph AI Engineer: Agents, Agentic RAG & MCP" },
  { name: "REST APIs with Flask and Python" },
  { name: "Docker & Kubernetes", hours: "22h" },
  { name: "LangChain & LangGraph", hours: "18.5h" },
  { name: "Python for Data Science", hours: "21.5h" },
  { name: "Node.js & REST APIs", hours: "15h" },
  { name: "Understanding TypeScript", hours: "15h" },
];

const EDUCATION = [
  { degree: "M.Sc. Well Engineering", school: "University of Stavanger", period: "2017 – 2020", note: "Drilling engineering, well design, operational technologies · GPA A" },
  { degree: "Computer Science", school: "University of Oslo", period: "2021", note: "High-performance computing and parallel programming in C++ · GPA B" },
];

const ENGAGEMENTS = [
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "For companies",
    text: "Open to roles in data architecture, solution architecture and AI integration.",
    items: ["Solution / data architect", "AI integration lead", "Senior backend & data engineer"],
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: "For business partners",
    text: "Collaboration on projects where data and AI need to work in real operations.",
    items: ["Prototypes, demos and MVPs", "Architecture reviews", "AI feasibility assessments", "Data platform design", "R&D and funding partnerships"],
  },
];

// -------- Page --------
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink-950 font-sans text-ink-100 antialiased">
        <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-wire to-signal" />
        <Header />
        <main>
          <Hero />
          <Marquee />
          <Stats />
          <Capabilities />
          <Process />
          <Experience />
          <Projects />
          <Achievements />
          <Skills />
          <Research />
          <WorkWithMe />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="font-display text-sm font-extrabold tracking-wide text-ink-100">
          H<span className="text-signal">.</span> Hans Sahebi
        </a>
        <nav className="hidden items-center gap-7 text-sm text-ink-300 md:flex">
          <a href="#capabilities" className="nav-link">Capabilities</a>
          <a href="#process" className="nav-link">Process</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#research" className="nav-link">Research</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
        <a href={PROFILE.cv} className="btn btn-outline py-1.5">
          <Download className="h-4 w-4" />CV
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const words = PROFILE.headline.split(" ");
  return (
    <section id="top" className="hero-bg relative flex flex-col overflow-hidden lg:block lg:min-h-[100svh]">
      {/* full-bleed animation on desktop, stacked below the text on small screens */}
      <div className="order-2 h-[320px] sm:h-[400px] lg:absolute lg:inset-0 lg:h-auto">
        <HeroCanvas />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[58%] bg-gradient-to-r from-ink-950 via-ink-950/85 to-transparent lg:block" />

      <div className="pointer-events-none relative z-10 order-1 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pb-10 pt-28 md:px-6 lg:min-h-[100svh] lg:pb-24">
        <div className="pointer-events-auto max-w-2xl space-y-7">
          <motion.p initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="eyebrow">
            {PROFILE.title} · {PROFILE.location}
          </motion.p>

          <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
            {["H. Hans", "Sahebi"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className={`block ${i === 1 ? "text-signal" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="max-w-xl font-display text-2xl font-semibold leading-snug text-ink-100 md:text-3xl">
            {words.map((word, i) => {
              const tone = word === "data" ? "text-wire" : word === "AI" ? "text-signal" : "";
              return (
                <motion.span
                  key={i}
                  className={`inline-block ${tone}`}
                  initial={{ opacity: 0, y: "0.5em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.05 }}
                >
                  {word}&nbsp;
                </motion.span>
              );
            })}
          </p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} className="space-y-7">
            <p className="max-w-[54ch] text-ink-300">{PROFILE.blurb}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary group">
                Work with me <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#experience" className="btn btn-outline">See experience</a>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-400">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{PROFILE.location}</span>
              <a className="inline-flex items-center gap-1.5 hover:text-ink-100" href={PROFILE.socials.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub</a>
              <a className="inline-flex items-center gap-1.5 hover:text-ink-100" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</a>
              <a className="inline-flex items-center gap-1.5 hover:text-ink-100" href={PROFILE.socials.scholar} target="_blank" rel="noreferrer"><BookOpen className="h-4 w-4" />Google Scholar</a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-3 font-mono text-xs text-ink-500 lg:flex">
        Move through the pipeline · click to send a burst
      </div>
      <a href="#capabilities" aria-label="Scroll down" className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-ink-400 hover:text-ink-100 lg:block">
        <ArrowDown className="h-5 w-5 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}

function Marquee() {
  const row = [...TECH, ...TECH];
  return (
    <div className="marquee group relative overflow-hidden border-y border-ink-700 bg-ink-900 py-4" aria-label="Technologies">
      <div className="marquee-track flex w-max gap-10 group-hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= TECH.length} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-semibold uppercase tracking-wide text-ink-400">
            {t}<span className="h-1.5 w-1.5 rotate-45 bg-signal/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

function CountUp({ value, decimals }: { value: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(value); return; }
    const controls = animate(0, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref}>{shown.toFixed(decimals)}</span>;
}

function Stats() {
  return (
    <section className="border-b border-ink-700">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="border-b border-ink-700 px-4 py-10 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
            <div className="flex items-baseline gap-2 font-display font-extrabold tabular-nums">
              <span className="text-6xl text-ink-100 md:text-7xl"><CountUp value={s.value} decimals={s.decimals} />{s.suffix}</span>
              <span className="text-xl uppercase text-signal">{s.unit}</span>
            </div>
            <div className="mt-2 text-sm text-ink-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: React.ReactNode; intro?: string }) {
  return (
    <motion.div {...reveal} className="mb-12 space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="max-w-[18ch] font-display text-4xl font-extrabold leading-[0.95] tracking-tight text-balance md:text-6xl">{title}</h2>
      {intro && <p className="max-w-[60ch] text-lg text-ink-300">{intro}</p>}
    </motion.div>
  );
}

// Card whose border and background light up around the cursor.
function SpotCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div onPointerMove={onMove} className={`spot ${className}`}>{children}</div>;
}

function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-6 md:py-32">
      <SectionTitle
        eyebrow="What I do"
        title={<>Architecture for data that <span className="text-signal">has to be right</span></>}
        intro="Wherever operations depend on data arriving on time and being trusted, the problems look the same. These are the parts I own."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <motion.div key={c.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}>
            <SpotCard className="h-full p-8">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center border border-ink-700 text-wire">{c.icon}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-extrabold">{c.title}</h3>
              <p className="mt-3 text-ink-300">{c.text}</p>
            </SpotCard>
          </motion.div>
        ))}
      </div>
      <motion.div {...reveal} className="mt-10 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-2 font-mono text-xs text-ink-400">PROVEN IN</span>
        {INDUSTRIES.proven.map((x) => <span key={x} className="chip chip-signal">{x}</span>)}
        <span className="ml-4 mr-2 font-mono text-xs text-ink-400">TRANSFERABLE TO</span>
        {INDUSTRIES.transferable.map((x) => <span key={x} className="chip">{x}</span>)}
      </motion.div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="process" className="scroll-mt-16 border-t border-ink-700">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <SectionTitle
          eyebrow="How I deliver"
          title={<>From first prototype to <span className="text-signal">production</span></>}
          intro="I get something working early, put it in front of the people who will use it, and keep improving it with their feedback until it is ready to run in production."
        />
        <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* connecting line: vertical on small screens, horizontal on large */}
          <span aria-hidden className="absolute bottom-0 left-6 top-0 w-px bg-ink-700 lg:bottom-auto lg:left-0 lg:right-0 lg:top-6 lg:h-px lg:w-auto" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-wire to-signal lg:hidden" />
          <motion.span aria-hidden style={{ scaleX: fill }} className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-wire to-signal lg:block" />

          {PROCESS.map((step, i) => (
            <motion.li
              key={step.title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="relative grid grid-cols-[3rem_1fr] gap-5 lg:block"
            >
              <span className={`relative z-10 grid h-12 w-12 place-items-center border bg-ink-950 ${step.loop ? "border-signal text-signal" : "border-ink-600 text-wire"}`}>
                {step.icon}
              </span>
              <div className="min-w-0 lg:mt-6">
                <div className="font-mono text-xs text-ink-400">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-1 font-display text-2xl font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-300">{step.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {step.output.map((o) => <span key={o} className="chip">{o}</span>)}
                </div>
                {step.loop && (
                  <div className="mt-3 inline-flex items-center gap-2 font-mono text-xs text-signal">
                    <RefreshCw className="h-3.5 w-3.5" /> repeats until it fits
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Experience() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const job = EXPERIENCE[active];

  return (
    <section id="experience" className="scroll-mt-16 border-t border-ink-700 bg-ink-900/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle eyebrow="Experience" title="Where I've done it" />
          <div className="hidden lg:block">
            <motion.div key={job.year} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="font-display text-[8rem] font-extrabold leading-none tracking-tighter bg-gradient-to-br from-wire to-signal bg-clip-text text-transparent">{job.year}</div>
              <div className="mt-4 font-mono text-sm text-wire">{job.org}</div>
            </motion.div>
          </div>
        </div>

        <ol ref={listRef} className="relative space-y-16 pl-8">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-ink-700" />
          <motion.span aria-hidden style={{ scaleY: fill }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-wire to-signal" />
          {EXPERIENCE.map((j, i) => (
            <motion.li
              key={j.year + j.org}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.6 }}
              className="relative"
            >
              <motion.div {...reveal}>
              <span aria-hidden className={`absolute -left-[37px] top-2 h-3 w-3 rotate-45 border transition-colors ${active === i ? "border-signal bg-signal" : "border-ink-500 bg-ink-950"}`} />
              <div className="font-mono text-xs uppercase text-ink-400">{j.period} · {j.place}</div>
              <h3 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">{j.role}</h3>
              {j.focus && <div className="mt-1 text-lg text-ink-100">{j.focus}</div>}
              <div className="mt-1 text-sm text-wire">{j.org}</div>
              <p className="mt-4 text-ink-300">{j.summary}</p>
              {j.milestones && (
                <ol className="mt-5 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
                  {j.milestones.map((m) => (
                    <li key={m.period} className="bg-ink-950 p-4">
                      <div className="font-mono text-xs text-signal">{m.period}</div>
                      <div className="mt-1 text-sm text-ink-100">{m.text}</div>
                    </li>
                  ))}
                </ol>
              )}
              <ul className="mt-3 space-y-2 text-sm text-ink-300">
                {j.points.map((p) => (
                  <li key={p} className="flex gap-3"><span className="mt-2 h-px w-3 shrink-0 bg-signal" />{p}</li>
                ))}
              </ul>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "wave") {
    const path = Array.from({ length: 41 }, (_, i) => {
      const x = i * 10;
      const y = 50 + Math.sin(i * 0.55) * 18 + Math.sin(i * 1.7) * 7;
      return `${i === 0 ? "M" : "L"}${x},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 400 100" className="h-full w-full" preserveAspectRatio="none">
        {[25, 50, 75].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#22303d" strokeWidth="1" />)}
        <path d={path} fill="none" stroke="#5fb8cc" strokeWidth="2" className="draw-line" />
        <path d={`${path} L400,100 L0,100 Z`} fill="url(#wavefill)" opacity="0.35" />
        <defs><linearGradient id="wavefill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5fb8cc" /><stop offset="1" stopColor="#5fb8cc" stopOpacity="0" /></linearGradient></defs>
        <circle cx="400" cy="50" r="4" fill="#f0a83a" className="animate-pulse" />
      </svg>
    );
  }
  if (kind === "graph") {
    const pts = [[60, 30], [130, 70], [200, 25], [200, 75], [270, 50], [340, 30], [340, 72]];
    const links = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5], [4, 6], [1, 2]];
    return (
      <svg viewBox="0 0 400 100" className="h-full w-full">
        {links.map(([a, b], i) => (
          <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="#34455a" strokeWidth="1.5" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 4 ? 8 : 5} fill={i === 4 ? "#f0a83a" : "#5fb8cc"} className={i === 4 ? "animate-pulse" : ""} />
        ))}
      </svg>
    );
  }
  const bars = [38, 62, 45, 80, 55, 70, 92, 60, 74, 50];
  return (
    <svg viewBox="0 0 400 100" className="h-full w-full" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect key={i} x={12 + i * 39} y={100 - h} width="24" height={h} fill={i === 6 ? "#f0a83a" : "#5fb8cc"} opacity={i === 6 ? 1 : 0.55} className="grow-bar" style={{ animationDelay: `${i * 60}ms` }} />
      ))}
    </svg>
  );
}

// Mount the visual only once it scrolls into view, so its draw-in animation is seen.
function VisualPanel({ kind }: { kind: Project["visual"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="h-36 border-b border-ink-700 bg-ink-950/60 p-5">
      {inView && <ProjectVisual kind={kind} />}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-6 md:py-32">
      <SectionTitle eyebrow="Selected work" title="Systems in production" />
      <div className="grid gap-4 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div key={p.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
            <SpotCard className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1">
              <VisualPanel kind={p.visual} />
              <div className="flex flex-1 flex-col gap-3 p-7">
                <div className="font-mono text-xs uppercase text-signal">{p.period}</div>
                <h3 className="font-display text-2xl font-extrabold leading-tight">{p.title}</h3>
                <p className="text-sm text-ink-300">{p.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-3">
                  {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            </SpotCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Research() {
  const [featured, ...rest] = [...PAPERS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  const venues = new Set(PAPERS.map((p) => p.venue.split(",")[0]));
  return (
    <section id="research" className="scroll-mt-16 border-t border-ink-700">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <SectionTitle
          eyebrow="Applied research"
          title={<>Research that <span className="text-signal">runs in the field</span></>}
          intro="Peer-reviewed industry papers on drilling data, optimization and AI systems, written with operators and engineers in mind."
        />

        <motion.div {...reveal} className="mb-10 space-y-5">
          <dl className="flex flex-wrap gap-x-12 gap-y-6">
            {[
              { value: PAPERS.length, label: "Industry papers" },
              { value: venues.size, label: "Venues" },
              { value: `${Math.min(...PAPERS.map((p) => p.year))}–${Math.max(...PAPERS.map((p) => p.year))}`, label: "Published" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-400">{s.label}</dt>
                <dd className="order-first font-display text-4xl font-extrabold leading-none tabular-nums text-ink-100">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-2">
            {["ADIPEC", "OMAE", "SPE", "Geoenergy Science & Engineering"].map((v) => <span key={v} className="chip">{v}</span>)}
          </div>
        </motion.div>

        <motion.div {...reveal}>
          <SpotCard className="grid gap-6 p-8 md:grid-cols-[1fr_auto] md:items-end md:p-10">
            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip chip-signal">Latest · {featured.year}</span>
                <span className="font-mono text-xs uppercase text-wire">{featured.topic}</span>
              </div>
              <h3 className="max-w-[28ch] font-display text-2xl font-extrabold leading-tight md:text-4xl">{featured.title}</h3>
              <p className="max-w-[60ch] text-ink-300">{featured.practice}</p>
              <div className="text-sm text-ink-400">{featured.authors} · {featured.venue}</div>
            </div>
          </SpotCard>
        </motion.div>

        <ul className="mt-4 divide-y divide-ink-700 border-y border-ink-700">
          {rest.map((p, i) => (
            <motion.li key={p.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }}
              className="group grid gap-2 py-6 transition-colors hover:bg-ink-900/60 md:grid-cols-[5rem_1fr_12rem] md:gap-6 md:px-4">
              <div className="font-display text-2xl font-extrabold tabular-nums text-ink-500 transition-colors group-hover:text-signal">{p.year}</div>
              <div className="min-w-0 space-y-1">
                <h3 className="font-display text-lg font-extrabold leading-snug">{p.title}</h3>
                <p className="text-sm text-ink-300">{p.practice}</p>
                <div className="text-xs text-ink-400">{p.authors} · {p.venue}</div>
              </div>
              <div className="md:text-right"><span className="chip">{p.topic}</span></div>
            </motion.li>
          ))}
        </ul>

        <motion.a {...reveal} href={PROFILE.socials.scholar} target="_blank" rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:underline">
          All publications on Google Scholar <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="border-y border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <SectionTitle eyebrow="Recognition" title="Funding, research and talks" />
        <div className="grid gap-px bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div key={a.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="flex flex-col gap-4 bg-ink-900 p-7">
              <span className="text-signal">{a.icon}</span>
              <div className="font-mono text-xs text-ink-400">{a.date}</div>
              <div className="font-display text-xl font-extrabold leading-tight">
                {a.amount && <span className="block text-signal">{a.amount}</span>}
                {a.title}
              </div>
              <div className="text-sm text-ink-300">{a.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-24 md:px-6 md:py-32">
      <SectionTitle eyebrow="Toolkit" title="Skills, education and certificates" />
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <motion.div key={s.group} {...reveal} transition={{ ...reveal.transition, delay: i * 0.05 }} className="space-y-3">
            <div className="font-mono text-xs uppercase text-ink-400">{s.group}</div>
            <div className="flex flex-wrap gap-2">
              {s.items.map((x) => <span key={x} className="chip chip-hover">{x}</span>)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid gap-12 md:grid-cols-2">
        <motion.div {...reveal} className="space-y-6">
          <h3 className="flex items-center gap-2 font-display text-2xl font-extrabold"><GraduationCap className="h-6 w-6 text-wire" />Education</h3>
          {EDUCATION.map((e) => (
            <div key={e.degree} className="space-y-1 border-l border-ink-700 pl-5">
              <div className="font-display text-lg font-extrabold">{e.degree}</div>
              <div className="text-sm text-ink-300">{e.school} · <span className="font-mono text-xs">{e.period}</span></div>
              <div className="text-sm text-ink-400">{e.note}</div>
            </div>
          ))}
          <div className="text-sm text-ink-300"><span className="font-semibold text-ink-100">Languages:</span> English (fluent), Norwegian (B1)</div>
        </motion.div>
        <motion.div {...reveal} className="space-y-6">
          <h3 className="flex items-center gap-2 font-display text-2xl font-extrabold"><BadgeCheck className="h-6 w-6 text-wire" />Certificates</h3>
          <ul className="divide-y divide-ink-700 border-y border-ink-700">
            {CERTIFICATES.map((c) => (
              <li key={c.name} className="flex justify-between gap-4 py-3 text-sm transition-colors hover:text-signal">
                <span>{c.name}</span>
                {c.hours && <span className="shrink-0 font-mono text-xs tabular-nums text-ink-400">{c.hours}</span>}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <button onClick={copy} className="btn btn-outline" aria-live="polite">
      {copied ? <><Check className="h-4 w-4 text-signal" />Copied</> : <><Copy className="h-4 w-4" />Copy email</>}
    </button>
  );
}

function WorkWithMe() {
  return (
    <section id="contact" className="contact-bg scroll-mt-16 border-t border-ink-700">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
        <motion.p {...reveal} className="eyebrow">Work with me</motion.p>
        <motion.h2 {...reveal} className="mt-6 max-w-[14ch] font-display text-[clamp(2.8rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em]">
          Let's build systems that <span className="text-signal">run.</span>
        </motion.h2>
        <motion.p {...reveal} className="mt-6 max-w-[56ch] text-lg text-ink-300">
          Whether you're building a team or looking for a partner on a data or AI project, I'd like to hear about it.
        </motion.p>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {ENGAGEMENTS.map((e, i) => (
            <motion.div key={e.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
              <SpotCard className="h-full p-8">
                <div className="flex items-center gap-3 text-signal">{e.icon}<h3 className="font-display text-2xl font-extrabold text-ink-100">{e.title}</h3></div>
                <p className="mt-3 text-ink-300">{e.text}</p>
                <ul className="mt-5 space-y-2">
                  {e.items.map((x) => (
                    <li key={x} className="flex items-center gap-3"><ArrowRight className="h-4 w-4 shrink-0 text-wire" />{x}</li>
                  ))}
                </ul>
              </SpotCard>
            </motion.div>
          ))}
        </div>

        <motion.div {...reveal} className="mt-14 space-y-6">
          <a href={`mailto:${PROFILE.email}`} className="group inline-block break-all font-display text-2xl font-extrabold text-ink-100 md:text-5xl">
            {PROFILE.email}
            <span className="block h-0.5 origin-left scale-x-0 bg-signal transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary"><Mail className="h-4 w-4" />Email me</a>
            <CopyEmail />
            <a href={PROFILE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" />{PROFILE.phone}</a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Linkedin className="h-4 w-4" />LinkedIn</a>
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Github className="h-4 w-4" />GitHub</a>
          </div>
          <p className="text-sm text-ink-400">References available on request.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-700 py-8 text-sm text-ink-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 md:flex-row md:px-6">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <div className="flex flex-wrap items-center gap-5">
          <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink-100"><Github className="h-4 w-4" />GitHub</a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink-100"><Linkedin className="h-4 w-4" />LinkedIn</a>
          <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink-100"><BookOpen className="h-4 w-4" />Scholar</a>
          <a href={PROFILE.cv} className="inline-flex items-center gap-1.5 hover:text-ink-100"><Download className="h-4 w-4" />Download CV</a>
        </div>
      </div>
    </footer>
  );
}
