// This is a backup of the original App.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, MapPin, ExternalLink,
  Award, Briefcase, Rocket, Star, Calendar, Terminal
} from "lucide-react";

// -------- Profile / Content --------
const PROFILE = {
  name: "Hamed Sahebi",
  title: "Software & Data Engineer",
  blurb:
    "I build real-time data systems, microservices, and ML-backed products. 5+ years in Norway delivering drilling analytics, GenAI services, and full-stack apps.",
  location: "Stavanger, Norway",
  email: "hs.hamedsahebi@gmail.com",
  socials: {
    github: "https://github.com/hamedsahebi",
    linkedin: "https://www.linkedin.com/in/hamed-sahebi-2439b249/",
  },
  skills: [
    "Node.js","TypeScript","Python","React","Express","Flask","PostgreSQL","MongoDB",
    "Vector DB","LangChain","OpenAI API","Microservices","Docker","Kubernetes",
    "Cloud deployment","Time-series","Real-time data","Pandas","NumPy","scikit-learn","Keras",
  ],
};

type Project = { title: string; description: string; tags: string[]; link: string };
const PROJECTS: Project[] = [
  {
    title: "Real-time Drilling Data Platform (Equinor-funded)",
    description:
      "Designed and shipped a real-time data acquisition, prediction, and optimization system. Full lifecycle: architecture → deployment (Node.js, TypeScript, Python). Microservices with Docker; data in PostgreSQL & MongoDB; front end in React.",
    tags: ["Node.js","TypeScript","Python","Microservices","PostgreSQL","MongoDB","Docker","React"],
    link: "#",
  },
  {
    title: "GenAI Knowledge & Agents for AI-drill",
    description:
      "Built document QA with vector DB + LangChain + OpenAI and custom AI agents to interact with internal software workflows.",
    tags: ["LangChain","OpenAI","Vector DB"],
    link: "#",
  },
  {
    title: "Operational Data & Well-planning Apps",
    description:
      "Two production web apps for operational data management, visualization, and planning, including REST APIs and cloud deployment.",
    tags: ["React","Express","Flask","PostgreSQL","InfluxDB","Heroku"],
    link: "#",
  },
  {
    title: "Movie DB – Full-stack Sample",
    description:
      "Practice project demonstrating API + UI: Node/Express backend and React front end with clean components and routing.",
    tags: ["Node.js","Express","React"],
    link: "https://github.com/hamedsahebi/movie-db",
  },
];

const ACHIEVEMENTS = [
  { title: "Contributed to securing 5M NOK Commercialization grant (Research Council)", date: "2024–2026", icon: <Rocket className="h-5 w-5" /> },
  { title: "Contributed to securing 500K NOK Qualification grant (Research Council)", date: "2022–2023", icon: <Award className="h-5 w-5" /> },
  { title: "Journal article in Geoenergy Science & Engineering (vol. 223)", date: "2023", icon: <Award className="h-5 w-5" /> },
  { title: "Speaker – SPE Norway Subsurface Conference (Bergen)", date: "2022", icon: <Award className="h-5 w-5" /> },
];

const TESTIMONIALS = [
  { quote: "Hamed delivered beyond expectations. His work on our data platform reduced turnaround time significantly and improved system reliability.", author: "CTO, University of Stavanger Project" },
  { quote: "Strong technical contributor with clear communication. Helped secure major research funding thanks to his engineering input.", author: "Research Council Norway" },
];

// -------- Tiny UI primitives --------
const Button: React.FC<React.ComponentProps<"a"> & { variant?: "primary"|"outline"; size?: "lg"|"md" }> = ({ variant="primary", size="md", className="", ...props }) => (
  <a {...props} className={`btn ${variant==="primary"?"btn-primary":"btn-outline"} ${size==="lg"?"text-base px-5 py-2.5":""} ${className}`} />
);

const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { outline?: boolean }> = ({ outline = false, className="", ...props }) => (
  <span {...props} className={`badge ${outline?"badge-outline":""} ${className}`} />
);

const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = Object.assign(
  ({ className="", ...props }) => <div {...props} className={`card ${className}`} />,
  {
    Header: ({ className="", ...props }) => <div {...props} className={`card-header ${className}`} />,
    Title: ({ className="", ...props }) => <div {...props} className={`card-title ${className}`} />,
    Content: ({ className="", ...props }) => <div {...props} className={`card-content ${className}`} />,
  }
);

// -------- Page --------
export default function App() {
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
          <a className="btn btn-outline rounded-2xl" href={`mailto:${PROFILE.email}`}>
            <Mail className="h-4 w-4 mr-2" />Contact
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
          <Badge className="w-fit">Available for freelance</Badge>
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
              <Badge key={s} className="badge-outline rounded-xl">{s}</Badge>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <Button href="#contact" size="lg" className="rounded-2xl">Start a project</Button>
            <Button href="#projects" size="lg" className="rounded-2xl" variant="outline">See projects</Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Card className="rounded-3xl shadow-xl">
            <Card.Header>
              <Card.Title>What I do</Card.Title>
            </Card.Header>
            <Card.Content className="text-slate-600">
              <Item icon={<Rocket className="h-5 w-5" />}
                title="Data platforms & pipelines"
                text="Design event-driven ETL/ELT, lakehouse architectures, and analytics that scale." />
              <Item icon={<Star className="h-5 w-5" />}
                title="Backend systems"
                text="APIs, services, and infra with strong observability and SLOs." />
              <Item icon={<Calendar className="h-5 w-5" />}
                title="Advisory"
                text="Tech strategy, hiring, and roadmaps. Fractional data/engineering leadership." />
            </Card.Content>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 pb-6">
      <div className="card rounded-3xl">
        <div className="card-content p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">About</h2>
              <p className="text-slate-600">
                I help teams turn data into leverage and get software shipped. Comfortable as an IC or advisor; pragmatic, quality-minded, and business-focused.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Highlights</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>5+ years professional experience</li>
                <li>Security-minded, GDPR-aware</li>
                <li>English & Norwegian (working proficiency)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
            <div className="card rounded-3xl h-full">
              <div className="card-header">
                <div className="card-title">{p.title}</div>
              </div>
              <div className="card-content space-y-3">
                <p className="text-slate-600 text-sm">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} className="badge-outline rounded-xl">{t}</Badge>
                  ))}
                </div>
                <a className="btn btn-outline rounded-xl" href={p.link} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />Case study
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-4 py-4">
      <div className="card rounded-3xl">
        <div className="card-header">
          <div className="card-title text-2xl md:text-3xl font-bold">Achievements</div>
        </div>
        <div className="card-content grid md:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="flex items-start gap-3">
              <div className="mt-1">{a.icon}</div>
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-slate-500">{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <div className="card rounded-3xl h-full">
              <div className="card-content p-6 space-y-3">
                <p className="text-lg leading-relaxed">"{t.quote}"</p>
                <p className="text-sm text-slate-500">— {t.author}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="card rounded-3xl">
        <div className="card-content p-6 md:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold">Let's work together</h2>
              <p className="text-slate-600">
                Tell me about your project scope, timeline, and goals. I typically work on a project or retainer basis and respond within one business day.
              </p>
              <div className="flex gap-3 pt-2">
                <a className="btn btn-primary rounded-2xl text-base px-5 py-2.5" href={`mailto:${PROFILE.email}`}>Email me</a>
                <a className="btn btn-outline rounded-2xl text-base px-5 py-2.5" href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn</a>
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
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
        <a id="cv" href="/my_cv.pdf" className="inline-flex items-center gap-1 hover:underline">
          <Briefcase className="h-4 w-4" /> Download CV
        </a>
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
