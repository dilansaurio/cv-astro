// Global i18n script to inject translations after page load
(function() {
  if (typeof localStorage === 'undefined') return;
  
  const lang = localStorage.getItem('lang') || 'es';
  if (lang === 'es') return; // Default language, no need to translate
  
  // Define translations inline to avoid fetch on static sites
  const translations = {
    es: {
      "available": "Disponible",
      "hero.greeting": "Hola, soy Dilan",
      "hero.role": "Desarrollador Front-end",
      "hero.description": "+3 años uniendo el diseño UI y el desarrollo frontend. Especializado en transformar prototipos de Figma en aplicaciones web y móviles escalables con React, Next.js y React Native.",
      "experience.title": "Experiencia Laboral",
      "experience.position": "Desarrollo front-end",
      "experience.item1": "Rediseño y desarrollo de la app mobile Kefuri usando React Native, TypeScript y Atomic Design.",
      "experience.item2": "Desarrollo de interfaces responsivas y sistemas de componentes reutilizables para ministerios y entidades públicas (Mineduc, BID) con React, Next.js y Tailwind.",
      "experience.item3": "Desarrollo de página web con React, Tailwind y la librería shadcn/ui.",
      "experience.company": "Web Intelligence Centre",
      "experience.period": "2023 – 2026",
      "skills.title": "Stacks & Tecnologías",
      "skills.development": "Habilidades de Desarrollo",
      "skills.design": "Habilidades de Diseño",
      "skills.collaboration": "Habilidades de Colaboración",
      "skills.communication": "Habilidades de Comunicación",
      "skills.englishLevel": "Inglés A2",
      "skills.spanishLevel": "Español (Nativo)",
      "projects.title": "Proyectos",
      "projects.comingSoon": "Próximamente...",
      "education.title": "Educación",
      "education.cert1": "Certificación React Native - Udemy",
      "education.cert2": "Titulo Diseño Gráfico - Inacap",
      "contact.title": "Contacto",
      "contact.description": "Abierto a proyectos freelance y nuevas oportunidades laborales.",
      "contact.downloadCV": "Descargar CV",
      "contact.sendEmail": "Envíame un Email",
      "learning.title": "Aprendizaje Continuo"
    },
    en: {
      "available": "Available",
      "hero.greeting": "Hi, I'm Dilan",
      "hero.role": "Front-end Developer",
      "hero.description": "+3 years merging UI design and frontend development. Specialized in transforming Figma prototypes into scalable web and mobile applications with React, Next.js and React Native.",
      "experience.title": "Work Experience",
      "experience.position": "Front-end Development",
      "experience.item1": "Redesign and development of Kefuri mobile app using React Native, TypeScript and Atomic Design.",
      "experience.item2": "Development of responsive interfaces and reusable component systems for ministries and public entities (Mineduc, BID) with React, Next.js and Tailwind.",
      "experience.item3": "Web page development with React, Tailwind and the shadcn/ui library.",
      "experience.company": "Web Intelligence Centre",
      "experience.period": "2023 – 2026",
      "skills.title": "Stacks & Technologies",
      "skills.development": "Development Skills",
      "skills.design": "Design Skills",
      "skills.collaboration": "Collaboration Skills",
      "skills.communication": "Communication Skills",
      "skills.englishLevel": "English A2",
      "skills.spanishLevel": "Spanish (Native)",
      "projects.title": "Projects",
      "projects.comingSoon": "Coming Soon...",
      "education.title": "Education",
      "education.cert1": "React Native Certification - Udemy",
      "education.cert2": "Graphic Design Degree - Inacap",
      "contact.title": "Contact",
      "contact.description": "Open to freelance projects and new job opportunities.",
      "contact.downloadCV": "Download CV",
      "contact.sendEmail": "Send me an Email",
      "learning.title": "Continuous Learning"
    }
  };
  
  const langData = translations[lang];
  const defaultData = translations.es;
  
  // Function to get translation
  function getTranslation(key) {
    return langData[key] || defaultData[key] || key;
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTranslations);
  } else {
    // DOM is already loaded
    setTimeout(applyTranslations, 100);
  }
  
  function applyTranslations() {
    // Replace text content by looking for data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = getTranslation(key);
    });
    
    // Fallback: replace common text patterns if no data-i18n attributes
    if (document.querySelectorAll('[data-i18n]').length === 0) {
      replaceTextInNode(document.body, langData, defaultData);
    }
  }
  
  function replaceTextInNode(node, langData, defaultData) {
    for (const [esText, enText] of Object.entries(langData)) {
      const defaultText = defaultData[esText];
      if (defaultText && esText !== enText) {
        replaceText(node, defaultText, enText);
      }
    }
  }
  
  function replaceText(node, oldText, newText) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.includes(oldText)) {
        node.textContent = node.textContent.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newText);
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        replaceText(node.childNodes[i], oldText, newText);
      }
    }
  }
})();
