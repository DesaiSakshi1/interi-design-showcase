import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import projHotel from "@/assets/proj-hotel.jpg";
import projHotel2 from "@/assets/proj-hotel-2.jpg";
import projHotel3 from "@/assets/proj-hotel-3.jpg";
import projHotel4 from "@/assets/proj-hotel-4.jpg";
import projResidential from "@/assets/proj-residential.jpg";
import projResidential2 from "@/assets/proj-residential-2.jpg";
import projResidential3 from "@/assets/proj-residential-3.jpg";
import projResidential4 from "@/assets/proj-residential-4.jpg";
import projClinic from "@/assets/proj-clinic.jpg";
import projClinic2 from "@/assets/proj-clinic-2.jpg";
import projClinic3 from "@/assets/proj-clinic-3.jpg";
import projClinic4 from "@/assets/proj-clinic-4.jpg";
import projFashion from "@/assets/proj-fashion.jpg";
import projFashion2 from "@/assets/proj-fashion-2.jpg";
import projFashion3 from "@/assets/proj-fashion-3.jpg";
import projFashion4 from "@/assets/proj-fashion-4.jpg";
import dwgEye1 from "@/assets/dwg-eye_clinic-1.jpg.asset.json";
import dwgEye2 from "@/assets/dwg-eye_clinic-2.jpg.asset.json";
import dwgEye3 from "@/assets/dwg-eye_clinic-3.jpg.asset.json";
import dwgRest1 from "@/assets/dwg-restaurant-1.jpg.asset.json";
import dwgRest2 from "@/assets/dwg-restaurant-2.jpg.asset.json";
import dwgRest3 from "@/assets/dwg-restaurant-3.jpg.asset.json";
import dwgVm1 from "@/assets/dwg-vm_store_design-1.jpg.asset.json";
import dwgVm2 from "@/assets/dwg-vm_store_design-2.jpg.asset.json";
import dwgVm3 from "@/assets/dwg-vm_store_design-3.jpg.asset.json";
import dwgVm4 from "@/assets/dwg-vm_store_design-4.jpg.asset.json";

const DWG_PROJECTS = [
  {
    key: "eye",
    title: "Eye Clinic",
    type: "Healthcare · Floor Plan",
    meta: "54'6\" × 41'6\" · AutoCAD",
    desc: "Functional medical layout featuring a dedicated examination room, two assistant offices, dispensary, waiting bay for 12, and segregated staff utility zones around a central lobby spine.",
    sheets: [
      { url: dwgEye1.url, label: "Master Floor Plan" },
      { url: dwgEye2.url, label: "Furniture & Zoning" },
      { url: dwgEye3.url, label: "Detail Sheet" },
    ],
  },
  {
    key: "restaurant",
    title: "Restaurant",
    type: "Hospitality · Master Layout",
    meta: "Multi-zone F&B · AutoCAD",
    desc: "Master layout combining a VIP lounge, VVIP members' enclosure, individual seating hall behind a partition wall, full commercial kitchen with cold/hot prep, buffet line, and dual powder rooms.",
    sheets: [
      { url: dwgRest1.url, label: "Master Layout" },
      { url: dwgRest2.url, label: "Seating & Circulation" },
      { url: dwgRest3.url, label: "Service Zone" },
    ],
  },
  {
    key: "vm",
    title: "VM Store Design",
    type: "Retail · Visual Merchandising",
    meta: "Front Elevation · Scale ft'/in\"",
    desc: "Visual merchandising elevation for a fashion retail front — twin window displays flanking a central seated try-on lounge, with measured 15' display bays at 10' clear height under an RCC slab.",
    sheets: [
      { url: dwgVm1.url, label: "Front Elevation" },
      { url: dwgVm2.url, label: "Display Plan" },
      { url: dwgVm3.url, label: "Measurements" },
      { url: dwgVm4.url, label: "Detail" },
    ],
  },
];

function Drawings() {
  const [proj, setProj] = useState(0);
  const [sheet, setSheet] = useState(0);
  const [dir, setDir] = useState(1);
  const current = DWG_PROJECTS[proj];
  const cur = current.sheets[sheet];

  const swapProject = (i: number) => {
    if (i === proj) return;
    setDir(i > proj ? 1 : -1);
    setProj(i);
    setSheet(0);
  };
  const nextSheet = () => { setDir(1); setSheet((s) => (s + 1) % current.sheets.length); };
  const prevSheet = () => { setDir(-1); setSheet((s) => (s - 1 + current.sheets.length) % current.sheets.length); };

  return (
    <Section id="drawings" className="bg-card/20">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="04.5 / 10" label="Technical Drawings · DWG Files" />
        <h2 className="mt-6 max-w-4xl text-5xl font-light leading-[1] tracking-tight md:text-7xl">
          From concept to <span className="text-neon-glow italic">construction</span> sheets.
        </h2>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          Tap a project tab — each opens a fresh window of working drawings. Flip through plans, elevations, and detail sheets exactly as delivered from AutoCAD.
        </p>

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-border">
          {DWG_PROJECTS.map((p, i) => (
            <button
              key={p.key}
              onClick={() => swapProject(i)}
              className={`relative px-5 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-colors ${
                i === proj ? "text-neon" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-2 opacity-60">0{i + 1}</span>{p.title}
              {i === proj && (
                <motion.span
                  layoutId="dwg-underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-neon shadow-[0_0_10px_var(--neon)]"
                />
              )}
            </button>
          ))}
        </div>

        {/* Window */}
        <div className="relative mt-10 overflow-hidden rounded-md border border-border bg-background" style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.key + sheet}
              custom={dir}
              initial={{ opacity: 0, rotateY: dir * 35, x: dir * 80 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -dir * 35, x: -dir * 80 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-6 p-6 md:grid-cols-[1fr_320px] md:p-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* sheet image */}
              <div className="relative">
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="relative overflow-hidden rounded-sm border border-border bg-white">
                  <img
                    src={cur.url}
                    alt={`${current.title} — ${cur.label}`}
                    loading="lazy"
                    className="w-full object-contain"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-neon/60 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon backdrop-blur">
                    DWG · {String(sheet + 1).padStart(2, "0")} / {String(current.sheets.length).padStart(2, "0")}
                  </div>
                </div>
              </div>

              {/* info panel */}
              <aside className="flex flex-col justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{current.type}</p>
                  <h3 className="mt-3 text-4xl font-light tracking-tight">{current.title}</h3>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">{current.meta}</p>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{current.desc}</p>

                  <div className="mt-6 rounded-md border border-border bg-card/50 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Current Sheet</div>
                    <div className="mt-1 text-lg">{cur.label}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={prevSheet}
                    className="rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-neon hover:text-neon"
                  >
                    ← Prev
                  </button>
                  <div className="flex gap-1.5">
                    {current.sheets.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setDir(i > sheet ? 1 : -1); setSheet(i); }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === sheet ? "w-8 bg-neon" : "w-4 bg-border hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSheet}
                    className="rounded-full border border-neon bg-neon/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neon transition-all hover:shadow-[0_0_20px_var(--neon)]"
                  >
                    Next →
                  </button>
                </div>
              </aside>
            </motion.div>
          </AnimatePresence>

          {/* scanline overlay */}
          <div className="pointer-events-none absolute inset-0 scanline" />
        </div>
      </div>
    </Section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashok Chaudhari — Interior Designer" },
      { name: "description", content: "Interior Designer, Site Supervisor & Vastu Shastra Consultant. Portfolio of projects, software mastery, thesis and certifications." },
      { property: "og:title", content: "Ashok Chaudhari — Interior Designer Portfolio" },
      { property: "og:description", content: "Sustainable, functional, beautifully resolved interiors." },
    ],
  }),
  component: Portfolio,
});

/* ------------------------- shared bits ------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const } }),
};

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-neon">
      <span className="inline-block h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)]" />
      <span>{index}</span>
      <span className="h-px w-10 bg-neon/50" />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative min-h-screen w-full px-6 py-24 md:px-16 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

/* ------------------------- nav + progress ------------------------- */

const NAV = [
  ["01", "Intro", "intro"],
  ["02", "Software", "software"],
  ["03", "Internship", "internship"],
  ["04", "Experience", "experience"],
  ["05", "Education", "education"],
  ["06", "Thesis", "thesis"],
  ["07", "Certs", "certs"],
  ["08", "About", "about"],
  ["09", "Stack", "stack"],
  ["10", "Contact", "contact"],
] as const;

function TopNav() {
  const [active, setActive] = useState("intro");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach(([, , id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#intro" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-neon text-neon shadow-[0_0_14px_var(--neon)]">A</span>
          <span className="hidden sm:inline">ASHOK.CHAUDHARI</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map(([n, label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  active === id ? "text-neon" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="opacity-50">{n}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="rounded-full border border-neon px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:shadow-[0_0_20px_var(--neon)]">
          Hire
        </a>
      </div>
    </nav>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-[60px] z-50 h-px bg-neon shadow-[0_0_10px_var(--neon)]"
    />
  );
}

/* ------------------------- 01 INTRO ------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Section id="intro" className="overflow-hidden">
      <div ref={ref} className="absolute inset-0 dot-grid opacity-60" />
      <motion.div style={{ y, opacity }} className="relative mx-auto flex max-w-[1600px] flex-col justify-center pt-16">
        <SectionLabel index="01 / 10" label="Portfolio · 2025" />

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          className="mt-10 text-[14vw] font-light leading-[0.85] tracking-[-0.06em] md:text-[10vw]"
        >
          ASHOK
          <br />
          <span className="text-neon-glow">CHAUDHARI</span>
        </motion.h1>

        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show" className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              [ Interior Designer · Site Supervisor · Vastu Shastra Consultant ]
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Creative and detail-oriented interior designer transforming spaces into
              <span className="text-foreground"> functional, aesthetically resolved environments</span>.
              Blending modern trends with timeless principles — from space planning and material
              selection to full-scale visualization and on-site execution.
            </p>
          </div>
          <div className="space-y-3 font-mono text-sm">
            {[
              ["EMAIL", "choudhariashok123456@gmail.com"],
              ["PHONE", "+91 80800 48202"],
              ["BASE", "Pune, Maharashtra"],
              ["LANGS", "EN · HI · MR · MW · GU · JP"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2">
                <span className="text-muted-foreground">{k}</span>
                <span className="truncate">{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show" className="mt-16 flex flex-wrap items-center gap-4">
          <a href="#experience" className="group inline-flex items-center gap-3 rounded-full bg-neon px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-all hover:shadow-[0_0_30px_var(--neon)]">
            View Work →
          </a>
          <a href="#contact" className="inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground">
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-8 left-0 right-0 overflow-hidden">
        <div className="ticker whitespace-nowrap font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground/50">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">SPATIAL DESIGN · MATERIAL · LIGHT · FORM · FUNCTION · VASTU · {"  "}</span>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 02 SOFTWARE ------------------------- */

const SOFTWARES = [
  { name: "AutoCAD", level: 95, role: "2D & 3D Drafting", years: "2022→", color: "oklch(0.72 0.22 25)" },
  { name: "SketchUp", level: 92, role: "3D Modeling", years: "2022→", color: "oklch(0.86 0.18 95)" },
  { name: "3ds Max", level: 85, role: "Photoreal 3D", years: "2023→", color: "oklch(0.72 0.22 25)" },
  { name: "V-Ray", level: 82, role: "Rendering Engine", years: "2023→", color: "oklch(0.86 0.18 95)" },
  { name: "Enscape", level: 88, role: "Realtime Render", years: "2023→", color: "oklch(0.72 0.22 25)" },
  { name: "Lumion", level: 86, role: "Realtime Render", years: "2023→", color: "oklch(0.86 0.18 95)" },
  { name: "Photoshop", level: 80, role: "Post · Boards", years: "2022→", color: "oklch(0.72 0.22 25)" },
  { name: "Adobe Suite", level: 78, role: "Branding · Layout", years: "2022→", color: "oklch(0.86 0.18 95)" },
  { name: "MS Excel", level: 84, role: "BOQ · Tracking", years: "2022→", color: "oklch(0.72 0.22 25)" },
];

function Software() {
  return (
    <Section id="software">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="02 / 10" label="Software Mastery" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1] tracking-tight md:text-7xl">
          Tools as <span className="text-neon-glow italic">instruments</span> — fluent across the entire interior pipeline.
        </h2>

        <div className="mt-16 overflow-hidden rounded-lg border border-border bg-card">
          {[...SOFTWARES].sort((a, b) => b.level - a.level).map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative grid grid-cols-12 items-center gap-6 border-b border-border px-6 py-6 transition-colors last:border-b-0 hover:bg-secondary md:px-10 md:py-8"
            >
              <div className="col-span-2 md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground">/{String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="col-span-10 md:col-span-3">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{s.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.role}</p>
              </div>

              <div className="col-span-8 md:col-span-5">
                <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(20, minmax(0,1fr))" }}>
                  {Array.from({ length: 20 }).map((_, idx) => {
                    const filled = idx < Math.round((s.level / 100) * 20);
                    return (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + idx * 0.015 }}
                        className="aspect-square rounded-full"
                        style={{
                          backgroundColor: filled ? s.color : "oklch(0.26 0 0)",
                          boxShadow: filled ? `0 0 6px ${s.color}` : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="col-span-2 flex items-baseline justify-end gap-2 md:col-span-2 md:gap-3">
                <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:inline">{s.years}</span>
                <span className="text-2xl font-light text-foreground md:text-3xl">
                  {s.level}<span className="text-xs text-muted-foreground">%</span>
                </span>
              </div>

              <div className="md:col-span-1 hidden md:flex justify-end">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }} />
              </div>

              <div className="absolute bottom-0 left-0 h-px w-0 bg-neon transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </Section>
  );
}

/* ------------------------- 03 INTERNSHIP / SITE WORK ------------------------- */

const SITES = [
  "Palladio Balewadi Central — VJ Developers",
  "Portia Grande, Baner — VJ Developers",
  "New Civil Court Building, Shivaji Nagar",
  "The Anthem, Aundh — Banyan Tree",
  "Elina Lite, Mohammadwadi — Karandikar Spaces",
  "Commissioner of Education Maharashtra — Proposed Building",
];

const SCOPE = [
  "PVC & Acrylic Ceilings",
  "Grid Ceiling Systems",
  "PVC Fluted Panels",
  "Cement Board Partitions",
  "Site Dimension Verification",
  "Material Handling",
  "Workforce Allocation",
  "Finishing QA / Drawings",
];

const SKILLS_DEV = [
  ["Hard", ["Working Drawings", "Detailing", "BOQs", "Vendor Coordination", "Site Survey"]],
  ["Soft", ["Client Empathy", "Communication", "Problem Solving", "Time Management", "Adaptability"]],
] as const;

function Internship() {
  return (
    <Section id="internship" className="bg-card/30">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="03 / 10" label="Internship & Site Experience" />
        <div className="mt-6 grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
              Site Supervisor —
              <br />
              <span className="text-neon-glow">Interior & False Ceiling</span>
            </h2>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Contractor-based · Pune · 4 Months
            </p>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Managed execution of residential and commercial interior ceiling works across
              multiple premium projects. Coordinated vendors, verified drawings on site,
              and ensured finishing quality up to client requirements.
            </p>

            <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.3em] text-neon">Scope</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
              {SCOPE.map((s) => (
                <li key={s} className="flex items-center gap-2 text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-neon" /> {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">Projects Worked On</h3>
            <ol className="mt-4 space-y-3">
              {SITES.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-center gap-4 border-b border-border/60 py-3"
                >
                  <span className="font-mono text-xs text-muted-foreground">P/{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-sm transition-colors group-hover:text-neon">{p}</span>
                  <span className="font-mono text-xs text-muted-foreground">↗</span>
                </motion.li>
              ))}
            </ol>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {SKILLS_DEV.map(([title, items]) => (
                <div key={title}>
                  <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{title} Skills Developed</h4>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {items.map((s) => <li key={s}>· {s}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 04 EXPERIENCE (with renders) ------------------------- */

const PROJECTS = [
  {
    title: "The Noble Stag",
    type: "Boutique Hotel · Hospitality",
    img: projHotel,
    desc: "Full-scale hotel concept with lobby, guest rooms and dining spaces engineered around luxury aesthetics and operational flow.",
    tags: ["Lobby", "Suites", "F&B", "Lighting Design"],
  },
  {
    title: "3BHK Residence",
    type: "Residential · Modular Living",
    img: projResidential,
    desc: "Modern, elegant interiors with modular kitchen, false-ceiling concepts and custom-built furniture tuned to the family's rhythm.",
    tags: ["Modular Kitchen", "False Ceiling", "Custom Furniture"],
  },
  {
    title: "Eye Clinic",
    type: "Healthcare · Commercial",
    img: projClinic,
    desc: "Modular reception, calm waiting-area design and clinical zones detailed for patient comfort and staff efficiency.",
    tags: ["Reception", "Waiting Area", "Wayfinding"],
  },
  {
    title: "Fashion Flagship",
    type: "Retail · Visual Merchandising",
    img: projFashion,
    desc: "Visual merchandising principles applied to layout and product placement. Vendor coordination for premium-quality execution.",
    tags: ["VM", "Display", "Material"],
  },
];

function Experience() {
  return (
    <Section id="experience">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="04 / 10" label="Professional Experience" />
        <h2 className="mt-6 max-w-4xl text-5xl font-light leading-[1] tracking-tight md:text-7xl">
          Selected work — concept,
          <br />
          <span className="text-neon-glow italic">visualized</span> & executed.
        </h2>

        <div className="mt-20 space-y-32">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative">
                <div className="absolute -inset-4 dot-grid opacity-50" />
                <div className="relative overflow-hidden rounded-md border border-border">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full border border-neon/60 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-neon backdrop-blur">
                    Render · {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{p.type}</p>
                <h3 className="mt-4 text-4xl font-light tracking-tight md:text-6xl">{p.title}</h3>
                <p className="mt-6 max-w-md text-muted-foreground">{p.desc}</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li key={t} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 05 EDUCATION ------------------------- */

const EDU_TIMELINE = [
  { year: "2022", title: "Foundation Year", note: "Bachelor of Interior Design begins — Sandip University, Nashik.", sw: ["AutoCAD (intro)", "Sketching", "Color Theory"] },
  { year: "2023", title: "Visualization Years", note: "Spatial Design + Styling. Studio projects across residential & commercial.", sw: ["SketchUp", "Photoshop", "3ds Max (intro)"] },
  { year: "2024", title: "Rendering Pipeline", note: "Material, light and atmosphere. Working drawings & detailing.", sw: ["V-Ray", "Enscape", "Lumion"] },
  { year: "2025", title: "Thesis & Diploma", note: "Major in Interior Styling & Spatial Design — Thesis: Sustainable Living Spaces for Urban Environments. Diploma at Graphix Technologies, Pune.", sw: ["3ds Max (adv.)", "V-Ray (adv.)", "MS Excel · BOQs"] },
];

function Education() {
  return (
    <Section id="education" className="bg-card/30">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="05 / 10" label="Education" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          A four-year arc — from
          <span className="text-neon-glow"> first line</span> to fully resolved space.
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {EDU_TIMELINE.map((y, i) => (
            <motion.div
              key={y.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-card p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-6xl font-light text-neon">{y.year}</span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-neon font-mono text-xs text-neon">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-medium">{y.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{y.note}</p>
              <div className="mt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Software learned</p>
                <ul className="mt-3 space-y-1.5">
                  {y.sw.map((s) => (
                    <li key={s} className="flex items-center gap-2 font-mono text-xs">
                      <span className="h-1 w-1 rounded-full bg-neon" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">2022 — 2025</p>
            <h3 className="mt-3 text-2xl font-medium">Bachelor of Interior Design</h3>
            <p className="mt-2 text-muted-foreground">Sandip University, Nashik — Major in Interior Styling & Spatial Design.</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">Thesis: "Sustainable Living Spaces for Urban Environments."</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">2025 — Present</p>
            <h3 className="mt-3 text-2xl font-medium">Diploma in Interior Design</h3>
            <p className="mt-2 text-muted-foreground">Graphix Technologies, Shivaji Nagar, Pune.</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">AutoCAD · 3ds Max · Photoshop · V-Ray · Lumion · Enscape</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 06 THESIS ------------------------- */

function Thesis() {
  return (
    <Section id="thesis">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="06 / 10" label="Thesis Projects" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1] tracking-tight md:text-7xl">
          Research that <span className="text-neon-glow italic">designs</span>.
        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {[
            {
              tag: "THESIS / 01",
              title: "The Noble Stag",
              sub: "Hospitality Design with Case Studies",
              body: "Full-scale hotel concept supported by 5 major and 3 minor case studies analysing real hospitality projects. In-depth study of ambient, accent and task lighting across lobby, suites and F&B.",
              stats: [["Case studies", "5 + 3"], ["Zones", "Lobby · Suites · F&B"], ["Focus", "Lighting Strategy"]],
            },
            {
              tag: "THESIS / 02",
              title: "Sabyasachi Flagship",
              sub: "Visual Merchandising Concept",
              body: "Researched the heritage, aesthetics and clientele of Sabyasachi Mukherjee. Designed floor plans optimised for luxury retail flow — focal points, colour blocking, hierarchy, storytelling through space.",
              stats: [["Brand", "Sabyasachi"], ["Method", "VM Principles"], ["Output", "Plans · Layouts"]],
            },
          ].map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative overflow-hidden rounded-lg border border-border bg-card p-10"
            >
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">{t.tag}</p>
                <h3 className="mt-6 text-4xl font-light tracking-tight md:text-5xl">{t.title}</h3>
                <p className="mt-2 font-mono text-sm text-muted-foreground">{t.sub}</p>
                <p className="mt-6 max-w-lg text-muted-foreground">{t.body}</p>

                <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {t.stats.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-mono text-sm text-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-neon/40 bg-card p-8 neon-glow">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon">University Thesis</p>
          <p className="mt-3 text-2xl font-light md:text-3xl">"Sustainable Living Spaces for Urban Environments"</p>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Investigating how compact urban homes can embed passive cooling, material honesty,
            and biophilic detail without compromising spatial generosity.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 07 CERTIFICATIONS ------------------------- */

const CERTS = [
  { t: "Autodesk AutoCAD — Interior Design & Drafting", d: "2D drafting, 3D modeling, technical drawings for precise floor plans, layouts and construction documentation." },
  { t: "Modular Kitchen Design", d: "Kitchen space planning, ergonomics, storage optimization and material selection with practical modular fittings." },
  { t: "Vastu Shastra", d: "Traditional Vastu principles for spatial orientation and energy flow — applied to modern interiors for harmony." },
  { t: "3ds Max & V-Ray", d: "High-end 3D modeling and photoreal rendering for interior visualization." },
  { t: "SketchUp & V-Ray", d: "Rapid 3D modeling pipeline with V-Ray rendering for concept and presentation." },
  { t: "Lumion & Enscape", d: "Realtime rendering and walkthroughs for immersive client presentation." },
  { t: "Photoshop", d: "Post-production, mood boards, presentation sheets and graphic compositing." },
  { t: "MS Excel — BOQs", d: "Bill of Quantities, material tracking and cost-control documentation." },
];

function Certifications() {
  return (
    <Section id="certs" className="bg-card/30">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="07 / 10" label="Certifications" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1] tracking-tight md:text-6xl">
          Credentials backing the
          <span className="text-neon-glow"> craft</span>.
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {CERTS.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card p-6 transition-colors hover:bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-neon font-mono text-xs text-neon group-hover:shadow-[0_0_18px_var(--neon)]">
                  ✓
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">CERT / {String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-base font-medium leading-snug">{c.t}</h3>
              <p className="mt-3 text-xs text-muted-foreground">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 08 ADDITIONAL / ABOUT ------------------------- */

function About() {
  const LANGS = ["English", "Hindi", "Marathi", "Marwadi", "Gujarati", "Japanese"];
  const HOBBIES = [
    "Art Journalling & Freehand Sketching",
    "Graphic Design & Typography",
    "Psychology of Space & Human Behaviour",
    "Writing & Design Documentation",
    "Reading on Interior Trends & Spatial Theory",
  ];
  return (
    <Section id="about">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="08 / 10" label="Additional Information" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          Beyond the <span className="text-neon-glow italic">drawing board</span>.
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">Languages · 06</h3>
            <ul className="mt-6 space-y-3">
              {LANGS.map((l, i) => (
                <motion.li
                  key={l}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-baseline justify-between border-b border-border/60 pb-3"
                >
                  <span className="text-xl">{l}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {l === "Japanese" ? "Understanding" : l === "English" || l === "Hindi" || l === "Marathi" ? "Fluent" : "Conversational"}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-neon">Hobbies & Pursuits</h3>
            <ul className="mt-6 space-y-4">
              {HOBBIES.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-2 inline-block h-1 w-6 bg-neon" />
                  <span className="text-lg leading-snug">{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {[
            ["10+", "Site Projects"],
            ["8", "Software Tools"],
            ["8+", "Certifications"],
            ["6", "Languages"],
          ].map(([n, l]) => (
            <div key={l} className="bg-card p-8 text-center">
              <div className="text-5xl font-light text-neon md:text-6xl">{n}</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 09 STACK ------------------------- */

const HARD = ["Autodesk AutoCAD (2D & 3D)", "Google SketchUp", "Adobe Suite", "Autodesk 3ds Max", "Chaos V-Ray", "Enscape", "Lumion", "MS Excel"];
const SOFT = ["Communication", "Time Management", "Attention to Detail", "Collaboration", "Adaptability", "Problem-Solving", "Research & Material Sourcing", "Presentation & Visualization", "Client & Stakeholder Empathy"];
const DESIGN_SKILLS = ["Space Planning", "Furniture & Fixture Design", "Color Theory & Material Selection", "Sustainable Design", "Lighting Design", "Project Management & Budgeting", "Interaction Design", "Vastu Consultation"];

function Stack() {
  return (
    <Section id="stack" className="bg-card/30">
      <div className="mx-auto max-w-[1600px]">
        <SectionLabel index="09 / 10" label="Full Stack" />
        <h2 className="mt-6 max-w-3xl text-5xl font-light leading-[1] tracking-tight md:text-6xl">
          The complete <span className="text-neon-glow">toolkit</span>.
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {[
            { title: "Software", items: HARD, prefix: "SW" },
            { title: "Design Skills", items: DESIGN_SKILLS, prefix: "DS" },
            { title: "Soft Skills", items: SOFT, prefix: "SS" },
          ].map((col, ci) => (
            <div key={col.title} className="bg-card p-8">
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-light">{col.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">[ {String(col.items.length).padStart(2, "0")} ]</span>
              </div>
              <ul className="mt-8 divide-y divide-border">
                {col.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.1 + i * 0.04 }}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-sm md:text-base">{it}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {col.prefix}/{String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------- 10 CONTACT ------------------------- */

function Contact() {
  return (
    <Section id="contact" className="overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto flex max-w-[1600px] flex-col justify-center">
        <SectionLabel index="10 / 10" label="Contact" />
        <h2 className="mt-6 text-[14vw] font-light leading-[0.85] tracking-[-0.06em] md:text-[12vw]">
          Let's
          <br />
          <span className="text-neon-glow italic">build space.</span>
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_auto]">
          <div className="space-y-2 font-mono text-sm">
            {[
              ["MAIL", "choudhariashok123456@gmail.com", "mailto:choudhariashok123456@gmail.com"],
              ["TEL.", "+91 80800 48202", "tel:+918080048202"],
              ["LINKEDIN", "ashok-choudhari-06744b370", "https://www.linkedin.com/in/ashok-choudhari-06744b370"],
              ["BASED", "Pune, Maharashtra · India", "#"],
            ].map(([k, v, h]) => (
              <a key={k} href={h} className="group flex items-baseline justify-between gap-6 border-b border-border py-4 transition-colors hover:border-neon">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{k}</span>
                <span className="text-xl text-foreground transition-colors group-hover:text-neon md:text-2xl">{v} <span className="ml-2 opacity-50">↗</span></span>
              </a>
            ))}
          </div>
          <a
            href="mailto:choudhariashok123456@gmail.com"
            className="grid h-48 w-48 place-items-center self-end rounded-full bg-neon font-mono text-xs uppercase tracking-[0.3em] text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_50px_var(--neon)] md:h-56 md:w-56"
          >
            <span className="text-center leading-tight">
              Start a
              <br />
              Project →
            </span>
          </a>
        </div>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© 2025 Ashok Chaudhari · All rights reserved</span>
          <span>Portfolio v1.0 · Designed with intent</span>
        </footer>
      </div>
    </Section>
  );
}

/* ------------------------- ROOT ------------------------- */

function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <TopNav />
      <ProgressBar />
      <main className="pt-16">
        <Hero />
        <Software />
        <Internship />
        <Experience />
        <Drawings />
        <Education />
        <Thesis />
        <Certifications />
        <About />
        <Stack />
        <Contact />
      </main>
    </div>
  );
}
