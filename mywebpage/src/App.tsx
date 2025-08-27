import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ExternalLink, Award, Briefcase, Rocket, Star, Calendar, Terminal } from "lucide-react";
// Simple Card components
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return <div className={`bg-white border rounded shadow-sm ${className}`}>{children}</div>;
}

function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`px-6 pt-6 pb-2 border-b ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: CardProps) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`font-bold text-lg ${className}`}>{children}</h3>;
}
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

// ————————————————
// Profile + content (edit these to update the site)
// ————————————————
const PROFILE = {
  name: "Hamed Sahebi",
  title: "Software & Data Engineer",
  blurb:
    "I build real‑time data systems, microservices, and ML‑backed products. 5+ years in Norway delivering drilling analytics, GenAI services, and full‑stack apps.",
  location: "Stavanger, Norway",
  email: "hs.hamedsahebi@gmail.com",
  socials: {
    github: "https://github.com/hamedsahebi",
    linkedin: "https://www.linkedin.com/in/hamed-sahebi-2439b249/",
  },
  skills: [
    "Node.js",
    "TypeScript",
    "Python",
    "React",
    "Express",
    "Flask",
    "PostgreSQL",
    "MongoDB",
    "Vector DB",
    "LangChain",
    "OpenAI API",
    "Microservices",
    "Docker",
    "Kubernetes",
    "Cloud deployment",
    "Time-series",
    "Real-time data",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "Keras",
  ],
};

const PROJECTS = [
  {
    title: "Real‑time Drilling Data Platform (Equinor‑funded)",
    description:
      "Designed and shipped a real‑time data acquisition, prediction, and optimization system. Full lifecycle: architecture → deployment (Node.js, TypeScript, Python). Microservices with Docker; data in PostgreSQL & MongoDB; front end in React.",
    tags: ["Node.js", "TypeScript", "Python", "Microservices", "PostgreSQL", "MongoDB", "Docker", "React"],
    link: "#",
  },
  {
    title: "GenAI Knowledge & Agents for AI‑drill",
    description:
      "Built document QA with vector DB + LangChain + OpenAI and custom AI agents to interact with internal software workflows.",
    tags: ["LangChain", "OpenAI", "Vector DB"],
    link: "#",
  },
  {
    title: "Operational Data & Well‑planning Apps",
    description:
      "Two production web apps for operational data management, visualization, and planning, including REST APIs and cloud deployment.",
    tags: ["React", "Express", "Flask", "PostgreSQL", "InfluxDB", "Heroku"],
    link: "#",
  },
  {
    title: "Movie DB – Full‑stack Sample",
    description:
      "Practice project demonstrating API + UI: Node/Express backend and React front end with clean components and routing.",
    tags: ["Node.js", "Express", "React"],
    link: "https://github.com/hamedsahebi/movie-db",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Contributed to securing 5M NOK Commercialization grant (Research Council)",
    date: "2024–2026",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Contributed to securing 500K NOK Qualification grant (Research Council)",
    date: "2022–2023",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Journal article in Geoenergy Science & Engineering (vol. 223)",
    date: "2023",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Speaker – SPE Norway Subsurface Conference (Bergen)",
    date: "2022",
    icon: <Award className="h-5 w-5" />,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Hamed ... ",
    author: "CTO",
  },
  
];

// ————————————————
// Page component
// ————————————————
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          <span className="font-semibold">{PROFILE.name}</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:opacity-70">About</a>
          <a href="#projects" className="hover:opacity-70">Projects</a>
          <a href="#achievements" className="hover:opacity-70">Achievements</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
          <a href="#cv" className="hover:opacity-70">CV</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <a href={`mailto:${PROFILE.email}`} style={{ textDecoration: 'none', color: 'inherit' }}><Mail className="h-4 w-4 mr-2" />Contact</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Badge bg="success">Available for freelance</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            {PROFILE.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-prose">{PROFILE.blurb}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{PROFILE.location}</span>
            <span>•</span>
            <a className="inline-flex items-center gap-1 hover:underline" href={PROFILE.socials.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a className="inline-flex items-center gap-1 hover:underline" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {PROFILE.skills.map((s) => (
              <Badge key={s} bg="secondary" className="me-1">{s}</Badge>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <Button size="lg" className="me-2">
              <a href="#contact" style={{ textDecoration: 'none', color: 'inherit' }}>Start a project</a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="#projects" style={{ textDecoration: 'none', color: 'inherit' }}>See projects</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-3xl shadow-xl">
            <CardHeader>
              <CardTitle>What I do</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600">
              <Item icon={<Rocket className="h-5 w-5" />}
                title="Data platforms & pipelines"
                text="Design event‑driven ETL/ELT, lakehouse architectures, and analytics that scale." />
              <Item icon={<Star className="h-5 w-5" />}
                title="Backend systems"
                text="APIs, services, and infra with strong observability and SLOs." />
              <Item icon={<Calendar className="h-5 w-5" />}
                title="Advisory"
                text="Tech strategy, hiring, and roadmaps. Fractional data/engineering leadership." />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pb-6">
      <Card className="rounded-3xl">
        <CardContent className="p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">About</h2>
              <p className="text-slate-600">
                I help teams turn data into leverage and get software shipped. Comfortable as an IC or advisor; pragmatic, quality‑minded, and business‑focused.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Highlights</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>5+ years professional experience</li>
                <li>Security‑minded, GDPR‑aware</li>
                <li>English & Norwegian (working proficiency)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Selected Projects</h2>
        <a href="#" className="text-sm inline-flex items-center gap-1 hover:underline">
          View all <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Card className="rounded-3xl h-full">
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-600 text-sm">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} bg="info" className="me-1">{t}</Badge>
                  ))}
                </div>
                <Button variant="secondary">
                  <a href={p.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}><ExternalLink className="h-4 w-4 mr-2"/>Case study</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-4">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold">Achievements</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="flex items-start gap-3">
              <div className="mt-1">{a.icon}</div>
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-slate-500">{a.date}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <Card className="rounded-3xl h-full">
              <CardContent className="p-6 space-y-3">
                <p className="text-lg leading-relaxed">“{t.quote}”</p>
                <p className="text-sm text-slate-500">— {t.author}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
      <Card className="rounded-3xl">
        <CardContent className="p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">Let’s work together</h2>
              <p className="text-slate-600">
                Tell me about your project scope, timeline, and goals. I typically work on a project or retainer basis and respond within one business day.
              </p>
              <div className="flex gap-3 pt-2">
                <Button size="lg" className="me-2">
                  <a href={`mailto:${PROFILE.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>Email me</a>
                </Button>
                <Button size="lg" variant="outline">
                  <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>Connect on LinkedIn</a>
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="font-semibold">Typical engagements</div>
              <ul className="list-disc list-inside space-y-1">
                <li>Data platform/ETL bootstraps</li>
                <li>Backend/API delivery</li>
                <li>Observability & reliability uplift</li>
                <li>Advisory & fractional leadership</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
        <a id="cv" href="my_cv.pdf" className="inline-flex items-center gap-1 hover:underline"><Briefcase className="h-4 w-4" /> Download CV</a>
      </div>
    </footer>
  );
}

function Item({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}
