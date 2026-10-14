import React from "react";
import { motion, MotionConfig } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ArrowUpRight,
  Award, Mic, BookOpen, Coins, Database, Workflow, Cpu, Network,
  Building2, Handshake, GraduationCap, BadgeCheck,
} from "lucide-react";

// -------- Profile / Content --------
const PROFILE = {
  name: "Hamed Sahebi",
  title: "AI & Data Architecture",
  headline: "I design the data and AI systems that critical operations run on.",
  blurb:
    "Software engineer with 5 years building data platforms and AI integration for energy and drilling operations. The same patterns (high-frequency telemetry, system integration, AI people can trust) apply across industries. I bring them to companies and partners that need them.",
  location: "Stavanger, Norway",
  email: "hs.hamedsahebi@gmail.com",
  phone: "+47 489 24 108",
  phoneHref: "tel:+4748924108",
  cv: "/my_cv.pdf",
  socials: {
    github: "https://github.com/hamedsahebi",
    linkedin: "https://www.linkedin.com/in/hamed-sahebi-2439b249/",
  },
};

const STATS = [
  { value: "5 yrs", label: "building production data systems" },
  { value: "5.5M NOK", label: "research funding secured" },
  { value: "M.Sc.", label: "Well Engineering, GPA A" },
];

const PIPELINE = [
  { name: "Sources", detail: "sensors · ERP · documents" },
  { name: "Integrate", detail: "Python · ETL · events" },
  { name: "Store", detail: "time-series · SQL · vector" },
  { name: "Serve", detail: "REST APIs · FastAPI" },
  { name: "AI layer", detail: "LLMs · agents", highlight: true },
  { name: "Decisions", detail: "people & systems" },
];

const CAPABILITIES = [
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data architecture",
    text: "Data models and storage strategy for high-frequency, production-critical data in PostgreSQL, InfluxDB and MongoDB.",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "System integration",
    text: "Connecting operational systems, APIs and teams so data moves reliably from source to decision.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "AI integration",
    text: "Pragmatic AI feasibility assessment, LLM and agent architecture, and the path from prototype to production.",
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: "Requirements to blueprint",
    text: "Turning business and operational needs into architecture, specifications and design guidelines teams can build on.",
  },
];

const INDUSTRIES = {
  proven: ["Energy", "Drilling & wells"],
  transferable: ["Manufacturing", "Utilities", "Maritime", "Logistics", "Industrial IoT"],
};

type Job = { role: string; org: string; period: string; place: string; summary: string; points: string[] };
const EXPERIENCE: Job[] = [
  {
    role: "Software Engineer · AI Integration for Energy Operations",
    org: "University of Stavanger",
    period: "2023 – present",
    place: "Stavanger",
    summary: "Leading solution design for AI-driven systems supporting critical energy operations.",
    points: [
      "End-to-end responsibility for AI solution architecture, from business requirements to specifications for production deployment.",
      "Assess AI feasibility across energy use cases and communicate capabilities, limits and integration challenges to technical and business stakeholders.",
      "Write architecture documentation and design guidelines, and keep implementation aligned with them.",
    ],
  },
  {
    role: "Software Engineer · Drilling Data Platform & System Architecture",
    org: "University of Stavanger",
    period: "2020 – 2021",
    place: "Stavanger",
    summary: "Led solution design for data-intensive systems supporting critical drilling operations.",
    points: [
      "Designed data models and integration strategies for high-frequency drilling telemetry.",
      "Led specification of drilling workflows with operations teams and subject-matter experts.",
      "Helped secure 5M NOK (2024–2026) and 500K NOK (2022–2023) in research funding through solution design and business cases.",
    ],
  },
  {
    role: "Software Developer",
    org: "Valide AS",
    period: "Jun – Dec 2019",
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
    place: "Bergen",
    summary: "Predictive modelling for drilling and well planning.",
    points: [
      "Machine learning models for well trajectory prediction and time-series forecasting, validated on production well data.",
    ],
  },
];

type Project = { title: string; period: string; description: string; tags: string[]; link?: string };
const PROJECTS: Project[] = [
  {
    title: "Real-time Drilling Data Platform",
    period: "Equinor-funded",
    description:
      "Real-time data acquisition, prediction and optimization system, from architecture to deployment. Microservices in Docker, data in PostgreSQL and MongoDB, React front end.",
    tags: ["Python", "TypeScript", "Microservices", "PostgreSQL", "MongoDB", "Docker"],
  },
  {
    title: "GenAI Knowledge & Agents",
    period: "AI-drill",
    description:
      "Document question-answering over a vector database, and custom AI agents that work with internal software workflows.",
    tags: ["LangChain", "OpenAI API", "Vector DB", "Agents"],
  },
  {
    title: "Operational Data & Planning Apps",
    period: "Production",
    description:
      "Two production web apps for operational data management, visualization and planning, with REST APIs and cloud deployment.",
    tags: ["Flask", "Express", "React", "PostgreSQL", "InfluxDB"],
  },
  {
    title: "Movie DB",
    period: "Open source",
    description: "Full-stack sample: Node/Express API with a React front end, clean components and routing.",
    tags: ["Node.js", "Express", "React"],
    link: "https://github.com/hamedsahebi/movie-db",
  },
];

const ACHIEVEMENTS = [
  { icon: <Coins className="h-5 w-5" />, title: "5M NOK commercialization grant, Research Council of Norway", date: "2024–2026" },
  { icon: <Award className="h-5 w-5" />, title: "500K NOK qualification grant, Research Council of Norway", date: "2022–2023" },
  { icon: <BookOpen className="h-5 w-5" />, title: "Journal article, Geoenergy Science & Engineering (vol. 223)", date: "2023" },
  { icon: <Mic className="h-5 w-5" />, title: "Speaker, SPE Norway Subsurface Conference, Bergen", date: "2022" },
];

const SKILLS: { group: string; items: string[] }[] = [
  { group: "Architecture", items: ["System design", "Data architecture", "REST API design", "System integration"] },
  { group: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
  { group: "Backend", items: ["FastAPI", "Flask", "Node.js", "Express"] },
  { group: "Data", items: ["PostgreSQL", "InfluxDB", "MongoDB", "Vector DB", "pandas", "NumPy"] },
  { group: "AI", items: ["LLMs", "LangChain", "LangGraph", "Agents", "scikit-learn", "Keras"] },
  { group: "Infrastructure", items: ["Docker", "Kubernetes", "Linux", "GitHub Actions", "CI/CD"] },
];

const CERTIFICATES = [
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
    icon: <Building2 className="h-5 w-5" />,
    title: "For companies",
    text: "Open to roles in data architecture, solution architecture and AI integration.",
    items: ["Solution / data architect", "AI integration lead", "Senior backend & data engineer"],
  },
  {
    icon: <Handshake className="h-5 w-5" />,
    title: "For business partners",
    text: "Collaboration on projects where data and AI need to work in real operations.",
    items: ["Architecture reviews", "AI feasibility assessments", "Data platform design", "R&D and funding partnerships"],
  },
];

// -------- Page --------
const fadeIn = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-ink-950 text-ink-100 font-sans antialiased">
        <Header />
        <main>
          <Hero />
          <Pipeline />
          <Stats />
          <Capabilities />
          <Experience />
          <Projects />
          <Achievements />
          <Skills />
          <WorkWithMe />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-700 bg-ink-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="font-mono text-sm text-ink-100">hamed.sahebi</a>
        <nav className="hidden items-center gap-6 text-sm text-ink-300 md:flex">
          <a href="#capabilities" className="hover:text-ink-100">Capabilities</a>
          <a href="#experience" className="hover:text-ink-100">Experience</a>
          <a href="#projects" className="hover:text-ink-100">Projects</a>
          <a href="#skills" className="hover:text-ink-100">Skills</a>
          <a href="#contact" className="hover:text-ink-100">Contact</a>
        </nav>
        <a href={PROFILE.cv} className="btn btn-outline">
          <Download className="h-4 w-4" />CV
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-4 pb-6 pt-16 md:px-6 md:pt-24">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
        <p className="eyebrow">// {PROFILE.title} · {PROFILE.location}</p>
        <h1 className="max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-balance md:text-6xl">
          {PROFILE.headline}
        </h1>
        <p className="max-w-[62ch] text-lg text-ink-300">{PROFILE.blurb}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="#contact" className="btn btn-primary">Work with me</a>
          <a href="#experience" className="btn btn-outline">See experience</a>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm text-ink-300">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{PROFILE.location}</span>
          <a className="inline-flex items-center gap-1.5 hover:text-ink-100" href={PROFILE.socials.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4" />GitHub</a>
          <a className="inline-flex items-center gap-1.5 hover:text-ink-100" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" />LinkedIn</a>
        </div>
      </motion.div>
    </section>
  );
}

function Pipeline() {
  return (
    <section aria-label="The kind of system I design" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
        {PIPELINE.map((step, i) => (
          <li key={step.name} className="flex items-center">
            <div className={`flex-1 border bg-ink-900 px-4 py-4 ${step.highlight ? "border-signal" : "border-ink-700"}`}>
              <div className="font-mono text-sm text-ink-100">{step.name}</div>
              <div className="mt-1 font-mono text-xs text-ink-400">{step.detail}</div>
            </div>
            {i < PIPELINE.length - 1 && (
              <span aria-hidden className="hidden w-5 shrink-0 text-center font-mono text-wire lg:block">→</span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 font-mono text-xs text-ink-400">
        Proven in {INDUSTRIES.proven.join(" and ").toLowerCase()} · applies to {INDUSTRIES.transferable.join(", ").toLowerCase()}
      </p>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-ink-700">
      <div className="mx-auto grid max-w-6xl md:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="border-b border-ink-700 px-4 py-6 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:last:border-r-0">
            <div className="text-3xl font-extrabold tabular-nums text-signal">{s.value}</div>
            <div className="mt-1 text-sm text-ink-300">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-8 space-y-2">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="text-3xl font-extrabold tracking-tight text-balance md:text-4xl">{title}</h2>
      {intro && <p className="max-w-[62ch] text-ink-300">{intro}</p>}
    </div>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-6">
      <SectionTitle
        eyebrow="// what I do"
        title="Architecture for data that has to be right"
        intro="Wherever operations depend on data arriving on time and being trusted, the problems look the same. These are the parts I own."
      />
      <div className="grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
        {CAPABILITIES.map((c) => (
          <motion.div key={c.title} {...fadeIn} className="space-y-2 bg-ink-950 p-6">
            <div className="text-wire">{c.icon}</div>
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-sm text-ink-300">{c.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-2 font-mono text-xs text-ink-400">PROVEN</span>
        {INDUSTRIES.proven.map((x) => <span key={x} className="chip chip-signal">{x}</span>)}
        <span className="ml-4 mr-2 font-mono text-xs text-ink-400">TRANSFERABLE</span>
        {INDUSTRIES.transferable.map((x) => <span key={x} className="chip">{x}</span>)}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-ink-700">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionTitle eyebrow="// experience" title="Where I've done it" />
        <ol className="space-y-10">
          {EXPERIENCE.map((job) => (
            <motion.li key={job.role} {...fadeIn} className="grid gap-2 md:grid-cols-[180px_1fr] md:gap-8">
              <div className="font-mono text-xs uppercase text-ink-400 md:pt-1.5">
                {job.period}<br className="hidden md:block" /><span className="md:hidden"> · </span>{job.place}
              </div>
              <div className="min-w-0 space-y-2">
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <div className="text-sm text-wire">{job.org}</div>
                <p className="text-ink-300">{job.summary}</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-ink-300 marker:text-ink-500">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-6">
      <SectionTitle eyebrow="// selected work" title="Projects" />
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <motion.article key={p.title} {...fadeIn} className="flex flex-col gap-3 border border-ink-700 bg-ink-900 p-6">
            <div className="font-mono text-xs uppercase text-wire">{p.period}</div>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-ink-300">{p.description}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-1 text-sm text-signal hover:underline">
                View on GitHub <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="border-y border-ink-700 bg-ink-900">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <SectionTitle eyebrow="// recognition" title="Funding, research and talks" />
        <ul className="grid gap-6 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <li key={a.title} className="flex items-start gap-3">
              <span className="mt-0.5 text-signal">{a.icon}</span>
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="font-mono text-xs text-ink-400">{a.date}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 md:px-6">
      <SectionTitle eyebrow="// toolkit" title="Skills, education and certificates" />
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <div key={s.group} className="space-y-2">
            <div className="font-mono text-xs uppercase text-ink-400">{s.group}</div>
            <div className="flex flex-wrap gap-2">
              {s.items.map((x) => <span key={x} className="chip">{x}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><GraduationCap className="h-5 w-5 text-wire" />Education</h3>
          {EDUCATION.map((e) => (
            <div key={e.degree} className="space-y-1">
              <div className="font-medium">{e.degree}</div>
              <div className="text-sm text-ink-300">{e.school} · <span className="font-mono text-xs">{e.period}</span></div>
              <div className="text-sm text-ink-400">{e.note}</div>
            </div>
          ))}
          <div className="text-sm text-ink-300"><span className="font-medium text-ink-100">Languages:</span> English (fluent), Norwegian (B1)</div>
        </div>
        <div className="space-y-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><BadgeCheck className="h-5 w-5 text-wire" />Certificates</h3>
          <ul className="divide-y divide-ink-700 border-y border-ink-700">
            {CERTIFICATES.map((c) => (
              <li key={c.name} className="flex justify-between gap-4 py-2.5 text-sm">
                <span>{c.name}</span>
                <span className="font-mono text-xs tabular-nums text-ink-400">{c.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WorkWithMe() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-ink-700">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <SectionTitle
          eyebrow="// work with me"
          title="Hiring or collaborating"
          intro="Whether you're building a team or looking for a partner on a data or AI project, I'd like to hear about it."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {ENGAGEMENTS.map((e) => (
            <div key={e.title} className="space-y-3 border border-ink-700 bg-ink-900 p-6">
              <div className="flex items-center gap-2 text-signal">{e.icon}<h3 className="text-lg font-semibold text-ink-100">{e.title}</h3></div>
              <p className="text-sm text-ink-300">{e.text}</p>
              <ul className="space-y-1 text-sm">
                {e.items.map((x) => <li key={x} className="before:mr-2 before:font-mono before:text-wire before:content-['→']">{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={`mailto:${PROFILE.email}`} className="btn btn-primary"><Mail className="h-4 w-4" />{PROFILE.email}</a>
          <a href={PROFILE.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" />{PROFILE.phone}</a>
          <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Linkedin className="h-4 w-4" />LinkedIn</a>
        </div>
        <p className="mt-6 text-sm text-ink-400">References available on request.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ink-700 py-8 text-sm text-ink-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 md:flex-row md:px-6">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href={PROFILE.cv} className="inline-flex items-center gap-1.5 hover:text-ink-100">
          <Download className="h-4 w-4" />Download CV
        </a>
      </div>
    </footer>
  );
}
