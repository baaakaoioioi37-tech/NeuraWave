import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { Menu, X } from "lucide-react";
import { sendContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NeuraWave — Explora el mundo de la Inteligencia Artificial" },
      {
        name: "description",
        content:
          "Descubre qué es la IA, sus aplicaciones en salud, educación, arte y más. Envíanos tu queja o sugerencia.",
      },
      { property: "og:title", content: "NeuraWave — IA para todos" },
      {
        property: "og:description",
        content: "Aplicaciones reales de la Inteligencia Artificial explicadas con claridad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const jelly = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 180, damping: 10, mass: 0.9 },
  },
};

const jellyHover = {
  scale: 1.05,
  rotate: [0, -1.5, 1.5, -1, 1, 0],
  transition: { type: "spring" as const, stiffness: 300, damping: 8 },
};

const jellyTap = {
  scale: 0.9,
  transition: { type: "spring" as const, stiffness: 400, damping: 10 },
};

type App = {
  emoji: string;
  title: string;
  desc: string;
  tint: string;
};

const APPS: App[] = [
  { emoji: "🩺", title: "Salud", desc: "Diagnóstico asistido, análisis de imágenes médicas y descubrimiento de nuevos fármacos.", tint: "from-cyan-400/30 to-blue-500/20" },
  { emoji: "🎓", title: "Educación", desc: "Tutores personalizados, evaluación adaptativa y contenidos generados para cada estudiante.", tint: "from-fuchsia-400/30 to-purple-500/20" },
  { emoji: "🎨", title: "Arte", desc: "Generación de imágenes, música y video que amplifican la creatividad humana.", tint: "from-pink-400/30 to-rose-500/20" },
  { emoji: "🚗", title: "Movilidad", desc: "Vehículos autónomos, optimización de rutas y ciudades más inteligentes.", tint: "from-emerald-400/30 to-teal-500/20" },
  { emoji: "🛒", title: "Comercio", desc: "Recomendaciones personalizadas, detección de fraude y atención al cliente 24/7.", tint: "from-amber-400/30 to-orange-500/20" },
  { emoji: "🌱", title: "Sostenibilidad", desc: "Modelos climáticos, agricultura de precisión y eficiencia energética.", tint: "from-lime-400/30 to-green-500/20" },
];

const SERVICES = [
  { icon: "🧠", title: "Consultoría en IA", desc: "Diagnóstico y hoja de ruta para integrar IA en tu organización." },
  { icon: "📚", title: "Cursos y talleres", desc: "Formación práctica desde fundamentos hasta modelos generativos." },
  { icon: "✍️", title: "Contenido educativo", desc: "Producimos artículos, videos y recursos didácticos sobre IA." },
  { icon: "🤝", title: "Asesoría de proyectos", desc: "Acompañamos prototipos y validación técnica de soluciones IA." },
];

const PARTNERS = [
  { name: "TechNova Labs", type: "Investigación aplicada", since: "2022" },
  { name: "EduFuturo", type: "Programas educativos", since: "2023" },
  { name: "SaludIA MX", type: "Salud digital", since: "2023" },
  { name: "Creativa Studio", type: "Arte generativo", since: "2024" },
  { name: "GreenData Co.", type: "Sostenibilidad", since: "2024" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
];

const TESTIMONIALS = [
  { quote: "NeuraWave nos ayudó a lanzar nuestro primer modelo de clasificación en semanas.", name: "María López", role: "CTO, SaludIA MX" },
  { quote: "Los cursos son claros y directos. Mi equipo entendió IA sin humo.", name: "Carlos Rivera", role: "Líder de datos, EduFuturo" },
  { quote: "Contenido de altísima calidad y con enfoque práctico.", name: "Ana Torres", role: "Directora, Creativa Studio" },
  { quote: "Aliados confiables para explorar IA generativa aplicada al arte.", name: "Diego Méndez", role: "Fundador, Pixel & Prompt" },
];

const NAV_LINKS: [string, string][] = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#sobre-nosotros"],
  ["Misión", "#mision-vision"],
  ["Servicios", "#servicios"],
  ["Aplicaciones", "#aplicaciones"],
  ["Aliados", "#aliados"],
  ["Galería", "#galeria"],
  ["Testimonios", "#testimonios"],
  ["Contacto", "#contacto"],
];

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <MisionVision />
      <Services />
      <Applications />
      <Partners />
      <Gallery />
      <Testimonials />
      <Contact />
      <Legal />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="fixed top-0 inset-x-0 z-50 glass"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#inicio"
          whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
          className="inline-flex items-center gap-3 font-bold text-lg tracking-tight"
        >
          <img src="/icono.png" alt="NeuraWave logo" className="h-12 w-12 rounded-full bg-background object-cover" />
          <span className="text-gradient">◈ NeuraWave</span>
        </motion.a>
        <nav className="hidden lg:flex gap-5 text-sm text-muted-foreground">
          {NAV_LINKS.map(([label, href]) => (
            <motion.a
              key={href}
              href={href}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="hover:text-foreground transition-colors"
            >
              {label}
            </motion.a>
          ))}
        </nav>
        <motion.button
          aria-label="Abrir menú"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 hover:bg-accent/50 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </motion.div>
        </motion.button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border/50"
          >
            <div className="px-6 py-4 flex flex-col gap-3 text-sm">
              {NAV_LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          className="inline-block px-4 py-1.5 rounded-full glass text-xs font-medium mb-8"
        >
          ✨ La era de la Inteligencia Artificial
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold leading-[1.05] mb-6"
        >
          Máquinas que <span className="text-gradient">piensan</span>,
          <br />
          humanos que <span className="text-gradient">imaginan</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          La Inteligencia Artificial es la disciplina que enseña a las computadoras a aprender,
          razonar y crear. Descubre cómo está transformando cada rincón de nuestro mundo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <JellyButton href="#servicios" variant="primary">
            Ver servicios
          </JellyButton>
          <JellyButton href="#contacto" variant="ghost">
            Contáctanos
          </JellyButton>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 140, damping: 14 }}
      className="text-center mb-12"
    >
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full glass text-xs mb-4">{eyebrow}</span>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="sobre-nosotros" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          eyebrow="Quiénes somos"
          title={<>Sobre <span className="text-gradient">nosotros</span></>}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="glass rounded-3xl p-8 sm:p-10 text-center"
        >
          <p className="text-muted-foreground leading-relaxed text-lg">
            <strong className="text-foreground">NeuraWave</strong> es un proyecto educativo dedicado a
            democratizar la Inteligencia Artificial. Explicamos, formamos y acompañamos a estudiantes,
            docentes y organizaciones en su viaje hacia una IA responsable, útil y humana. Creemos que
            entender la IA es tan importante como usarla.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MisionVision() {
  const items = [
    { icon: "🎯", title: "Misión", desc: "Acercar la Inteligencia Artificial a todas las personas mediante educación clara, contenido accesible y proyectos con impacto real." },
    { icon: "🌌", title: "Visión", desc: "Ser el referente iberoamericano en divulgación y formación en IA responsable para 2030, formando una comunidad crítica y creativa." },
  ];
  return (
    <section id="mision-vision" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle title={<>Misión y <span className="text-gradient">Visión</span></>} />
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {items.map((it) => (
            <motion.div
              key={it.title}
              variants={jelly}
              whileHover={jellyHover}
              className="glass rounded-3xl p-8"
            >
              <div className="text-5xl mb-4">{it.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{it.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Servicios / Productos"
          title={<>Nuestros <span className="text-gradient">servicios</span></>}
          subtitle="Soluciones y productos que ofrecemos para impulsar tu conocimiento y proyectos en IA."
        />
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.title}
              variants={jelly}
              whileHover={jellyHover}
              whileTap={jellyTap}
              className="glass rounded-3xl p-6"
            >
              <div className="text-4xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="aplicaciones" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Casos de uso"
          title={<>Aplicaciones de la <span className="text-gradient">IA</span></>}
          subtitle="Desde diagnósticos médicos hasta obras de arte, la IA está presente en todo."
        />

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPS.map((app) => (
            <motion.article
              key={app.title}
              variants={jelly}
              whileHover={jellyHover}
              whileTap={jellyTap}
              className="relative overflow-hidden rounded-3xl p-7 glass cursor-pointer group"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${app.tint} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <motion.div
                whileHover={{ scale: [1, 1.4, 0.9, 1.15, 1], rotate: [0, 15, -10, 5, 0] }}
                transition={{ duration: 0.6 }}
                className="text-5xl mb-4 inline-block"
              >
                {app.emoji}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{app.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section id="aliados" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="Clientes y aliados"
          title={<>Aliados <span className="text-gradient">estratégicos</span></>}
          subtitle="Organizaciones que caminan con nosotros en proyectos de IA."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 140, damping: 14 }}
          className="glass rounded-3xl p-4 sm:p-6 overflow-x-auto"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="py-3 px-3 font-semibold">Aliado</th>
                <th className="py-3 px-3 font-semibold">Tipo de colaboración</th>
                <th className="py-3 px-3 font-semibold">Desde</th>
              </tr>
            </thead>
            <tbody>
              {PARTNERS.map((p) => (
                <tr key={p.name} className="border-b border-border/30 last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="py-3 px-3 font-medium">{p.name}</td>
                  <td className="py-3 px-3 text-muted-foreground">{p.type}</td>
                  <td className="py-3 px-3 text-muted-foreground">{p.since}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section id="galeria" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Multimedia"
          title={<>Galería y <span className="text-gradient">portafolio</span></>}
          subtitle="Momentos, proyectos y explorando visualmente el universo de la IA."
        />

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {GALLERY.map((src, i) => (
            <motion.button
              key={src}
              variants={jelly}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(src)}
              className="relative aspect-square overflow-hidden rounded-2xl glass group"
            >
              <img
                src={src}
                alt={`Proyecto IA ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.button>
          ))}
        </motion.div>

        <div id="conoce-mas" className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6">
            Conoce más: <span className="text-gradient">¿qué es la IA?</span>
          </h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 140, damping: 14 }}
            className="glass rounded-3xl p-3 max-w-3xl mx-auto"
          >
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
              <iframe
                src="https://www.youtube.com/embed/2ePf9rue1Ao"
                title="Introducción a la Inteligencia Artificial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={active}
                alt="Vista ampliada"
                className="max-w-full max-h-full rounded-2xl shadow-jelly"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonios" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Casos de éxito"
          title={<>Lo que <span className="text-gradient">dicen</span> de nosotros</>}
        />
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={jelly}
              whileHover={jellyHover}
              className="glass rounded-3xl p-6 flex flex-col"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">“{t.quote}”</p>
              <footer className="mt-auto">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      // Llamada directa a tu función del navegador
      const res = await sendContactMessage(form);
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setError(res.error ?? "No se pudo enviar el mensaje.");
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error al enviar");
    }
  }

  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionTitle
          title={<>Queja o <span className="text-gradient">sugerencia</span></>}
          subtitle="Cuéntanos qué piensas. Leemos cada mensaje."
        />

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 150, damping: 14 }}
          className="glass rounded-3xl p-8 space-y-5"
        >
          <Field label="Nombre" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Tu nombre" required maxLength={100} />
          <Field label="Correo" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="tu@correo.com" required maxLength={255} />
          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <motion.textarea
              whileFocus={reduce ? undefined : { scale: 1.01 }}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              maxLength={2000}
              rows={5}
              placeholder="Cuéntanos tu queja o sugerencia..."
              className="w-full rounded-2xl bg-input-50 border border-input px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={status === "sending" ? undefined : jellyHover}
            whileTap={status === "sending" ? undefined : jellyTap}
            className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-2xl py-3.5 shadow-jelly disabled:opacity-60"
          >
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </motion.button>

          {status === "ok" && (
            <motion.p initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }} className="text-center text-sm text-primary">
              ✅ ¡Mensaje enviado! Gracias por escribirnos.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ x: -10 }} animate={{ x: [10, -10, 8, -8, 0] }} transition={{ duration: 0.4 }} className="text-center text-sm text-destructive">
              ⚠️ {error}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Legal() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <motion.article
          id="privacidad"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold mb-3">Aviso de privacidad</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            En NeuraWave respetamos tu privacidad. Los datos que compartas mediante el formulario de
            contacto (nombre, correo y mensaje) se usan únicamente para responder a tu solicitud y no
            se comparten con terceros. Puedes solicitar su eliminación escribiendo a nuestro correo.
          </p>
        </motion.article>
        <motion.article
          id="terminos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold mb-3">Términos y condiciones</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El contenido de este sitio tiene fines educativos e informativos. NeuraWave no se hace
            responsable por decisiones tomadas a partir de la información aquí publicada. Al usar el
            sitio aceptas hacerlo de forma respetuosa y conforme a la ley aplicable.
          </p>
        </motion.article>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, required, maxLength,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; maxLength?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <motion.input
        whileFocus={reduce ? undefined : { scale: 1.01 }}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-2xl bg-input-50 border border-input px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
    </div>
  );
}

function JellyButton({
  children, href, variant = "primary",
}: { children: React.ReactNode; href: string; variant?: "primary" | "ghost" }) {
  const base = "inline-flex items-center justify-center px-7 py-3.5 rounded-full font-semibold text-sm transition";
  const styles = variant === "primary"
    ? "bg-gradient-primary text-primary-foreground shadow-jelly"
    : "glass hover:border-primary/60";
  return (
    <motion.a href={href} whileHover={jellyHover} whileTap={jellyTap} className={`${base} ${styles}`}>
      {children}
    </motion.a>
  );
}

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/", icon: "📸" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "💼" },
  { label: "X / Twitter", href: "https://x.com/", icon: "𝕏" },
  { label: "YouTube", href: "https://youtube.com/", icon: "▶️" },
];

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-sm">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold text-lg text-gradient mb-2">◈ NeuraWave</div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Divulgación y formación en Inteligencia Artificial.
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Enlaces</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#sobre-nosotros" className="hover:text-foreground">Sobre nosotros</a></li>
            <li><a href="#servicios" className="hover:text-foreground">Servicios</a></li>
            <li><a href="#aliados" className="hover:text-foreground">Aliados</a></li>
            <li><a href="#privacidad" className="hover:text-foreground">Aviso de privacidad</a></li>
            <li><a href="#terminos" className="hover:text-foreground">Términos y condiciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Síguenos</h4>
          <div className="flex flex-wrap gap-3">
            {SOCIAL.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={jellyHover}
                whileTap={jellyTap}
                aria-label={s.label}
                className="glass rounded-full px-4 py-2 text-xs inline-flex items-center gap-2"
              >
                <span aria-hidden>{s.icon}</span> {s.label}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NeuraWave · Todos los derechos reservados
      </div>
    </footer>
  );
}
