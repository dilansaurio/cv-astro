import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
  category?: string;
};

interface Props {
  projects: Project[];
}

const ICON_CLOSE = (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ICON_ARROW = (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.link ?? `/projects/${p.id}`}
      target={p.link ? '_blank' : '_self'}
      rel={p.link ? 'noopener noreferrer' : undefined}
      className="group flex flex-col rounded-xl overflow-hidden border border-border bg-background hover:border-primary/40 transition-colors"
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-text">{p.title}</span>
        <p className="text-xs text-text-muted leading-relaxed">{p.description}</p>
        {p.technologies && p.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {p.technologies.map((tech) => (
              <span key={tech} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-1 h-5 rounded-full bg-primary shrink-0" />
      <h3 className="text-sm font-bold text-text uppercase tracking-wide">{title}</h3>
    </div>
  );
}

export default function ProjectsModal({ projects }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const webProjects = projects.filter((p) => p.category === 'web');
  const appProjects = projects.filter((p) => p.category === 'app');
  const designProjects = projects.filter((p) => p.category === 'design');

  const modal = open && mounted && createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-background-card border border-border rounded-3xl w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-text">Proyectos</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-text-muted hover:text-text transition-colors p-1.5 rounded-lg hover:bg-background"
            aria-label="Cerrar"
          >
            {ICON_CLOSE}
          </button>
        </div>

        {/* Content — scrollable, sections in column */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

          {/* Diseño UI */}
          <section>
            <SectionTitle title="Diseño UI" />
            <div className="grid md:grid-cols-4 gap-4">
              {designProjects.length > 0
                ? designProjects.map((p) => <ProjectCard key={p.id} p={p} />)
                : <p className="col-span-2 text-text-muted text-sm">Próximamente...</p>}
            </div>
          </section>

          {/* Desarrollo Web */}
          <section>
            <SectionTitle title="Desarrollo Web" />
            <div className="grid grid-cols-4 gap-4">
              {webProjects.length > 0
                ? webProjects.map((p) => <ProjectCard key={p.id} p={p} />)
                : <p className="col-span-2 text-text-muted text-sm">Próximamente...</p>}
            </div>
          </section>

          {/* Desarrollo App */}
          <section>
            <SectionTitle title="Desarrollo App" />
            <div className="grid md:grid-cols-4 gap-4">
              {appProjects.length > 0
                ? appProjects.map((p) => <ProjectCard key={p.id} p={p} />)
                : <p className="col-span-2 text-text-muted text-sm">Próximamente...</p>}
            </div>
          </section>

          

        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 lg:px-10 py-4 lg:py-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"
      >
        Ver Proyectos
        {ICON_ARROW}
      </button>
      {modal}
    </>
  );
}
