import { useState } from 'react';

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

  const webProjects = projects.filter((p) => p.category === 'web');
  const appProjects = projects.filter((p) => p.category === 'app');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 lg:px-10 py-4 lg:py-5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"
      >
        Ver Proyectos
        {ICON_ARROW}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background-card border border-border rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col"
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

              {/* Desarrollo Web */}
              <section>
                <SectionTitle title="Desarrollo Web" />
                <div className="grid grid-cols-2 gap-4">
                  {webProjects.length > 0
                    ? webProjects.map((p) => <ProjectCard key={p.id} p={p} />)
                    : <p className="col-span-2 text-text-muted text-sm">Próximamente...</p>}
                </div>
              </section>

              {/* Desarrollo App */}
              <section>
                <SectionTitle title="Desarrollo App" />
                <div className="grid grid-cols-2 gap-4">
                  {appProjects.length > 0
                    ? appProjects.map((p) => <ProjectCard key={p.id} p={p} />)
                    : <p className="col-span-2 text-text-muted text-sm">Próximamente...</p>}
                </div>
              </section>

              {/* Diseño UI */}
              <section>
                <SectionTitle title="Diseño UI" />
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.figma.com/design/5cacOKKoQyF703jSBFhLgC/Pawhome-App"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-xl overflow-hidden border border-border bg-background hover:border-primary/40 transition-colors"
                  >
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img
                        src="/proyects/pawhome.png"
                        alt="Pawhome App – Figma"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/40 rounded-full p-3">
                          <svg width="28" height="28" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 28.5C19 24.9 21.9 22 25.5 22C29.1 22 32 24.9 32 28.5C32 32.1 29.1 35 25.5 35C21.9 35 19 32.1 19 28.5Z" fill="#1ABCFE"/>
                            <path d="M6 42C6 38.4 8.9 35.5 12.5 35.5H19V42C19 45.6 16.1 48.5 12.5 48.5C8.9 48.5 6 45.6 6 42Z" fill="#0ACF83"/>
                            <path d="M19 8.5V22H25.5C29.1 22 32 19.1 32 15.5C32 11.9 29.1 9 25.5 9L19 8.5Z" fill="#FF7262"/>
                            <path d="M6 15.5C6 19.1 8.9 22 12.5 22H19V9H12.5C8.9 9 6 11.9 6 15.5Z" fill="#F24E1E"/>
                            <path d="M6 28.5C6 32.1 8.9 35 12.5 35H19V22H12.5C8.9 22 6 24.9 6 28.5Z" fill="#A259FF"/>
                          </svg>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full">Ver en Figma →</span>
                      </div>
                    </div>
                    <div className="p-3 flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-text">Pawhome App</span>
                      <p className="text-xs text-text-muted leading-relaxed">Diseño de aplicación móvil en Figma</p>
                    </div>
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
