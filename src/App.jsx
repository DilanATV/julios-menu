import { useState } from 'react';
import { menuData } from './data';

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(menuData.map(item => item.category))];

  // Filtrar platillos
  const filteredMenu = activeCategory === 'Todos' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header / Navbar */}
      <header className="bg-brandRed text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black italic tracking-wider">
            JULIO'S <span className="text-brandYellow">ASADERO</span>
          </h1>
        </div>
        
        {/* Navegación de Categorías estilo Vips */}
        <div className="bg-white text-gray-600 shadow-sm overflow-x-auto">
          <div className="max-w-6xl mx-auto px-4 flex space-x-6 py-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap font-bold text-sm uppercase pb-1 border-b-4 transition-colors ${
                  activeCategory === category 
                    ? 'border-brandRed text-brandRed' 
                    : 'border-transparent hover:text-brandRed'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid de Platillos */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-l-4 border-brandYellow pl-4">
          {activeCategory === 'Todos' ? 'Nuestro Menú' : activeCategory}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <button className="mt-4 w-full bg-brandRed text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;