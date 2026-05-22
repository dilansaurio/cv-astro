import { useState } from 'react';

const AtomicShowcase = () => {
  const [activeLevel, setActiveLevel] = useState('Átomos');

  const levels = {
    'Átomos': 'Componentes básicos: Botones, Inputs, Colores, Tipografía.',
    'Moléculas': 'Uniones de átomos: Barra de búsqueda, Card simple, Campo de formulario con label.',
    'Organismos': 'Secciones complejas: Navbar, Footer, Grid de productos.',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 my-8 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Arquitectura del Proyecto</h3>
      <div className="flex gap-2 mb-6">
        {Object.keys(levels).map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              activeLevel === level ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
      <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-800 font-medium">{activeLevel}</p>
        <p className="text-gray-600 text-sm mt-2">{levels[activeLevel as keyof typeof levels]}</p>
      </div>
    </div>
  );
};

export default AtomicShowcase;