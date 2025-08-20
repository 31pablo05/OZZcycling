import React, { useState, useRef, useEffect } from "react";

const galleryData = {
  hero: {
    type: "image",
    src: "/OZZimages/omar-hero.jpg", // Imagen principal de Omar
    title: "Omar Azzem",
    subtitle: "Ciclista Profesional • Fundador OZZcycling",
    description: "Más de 15 años de trayectoria profesional en el ciclismo de élite"
  },
  categories: [
    {
      id: "competencias-ozz",
      title: "Competencias con Equipo OZZ",
      icon: "🏆",
      color: "from-blue-600 to-cyan-600",
      items: [
        {
          type: "image",
          src: "/OZZimages/teamozz1.jpg",
          title: "Victoria en Ruta Nacional",
          description: "Liderando el equipo OZZcycling hacia la victoria"
        },
        {
          type: "image", 
          src: "/OZZimages/teamozz2.jpg",
          title: "Podium Equipo OZZ",
          description: "Celebrando junto al equipo profesional"
        },
        {
          type: "video",
          src: "/OZZvideos/500millas.mp4",
          title: "Estrategia de Carrera",
          description: "Dirigiendo la estrategia del equipo durante la competencia"
        }
          ,
          {
            type: "image",
            src: "/OZZimages/fila.jpg",
            title: "Equipo OZZ en Fila",
            description: "Trabajo en equipo y disciplina en plena competencia."
          }
      ]
    },
    {
      id: "competencias-otros",
      title: "Trayectoria en Otros Equipos",
      icon: "🚴‍♂️",
      color: "from-purple-600 to-blue-600",
      items: [
        {
          type: "image",
          src: "/OZZimages/teamozz4.jpg",
          title: "Equipo Profesional Continental",
          description: "Años de formación en equipos internacionales"
        },
        {
          type: "image",
          src: "/OZZimages/otros-equipos-2.jpg",
          title: "Campeonatos Nacionales",
          description: "Representando Argentina en competencias de élite"
        },
        {
          type: "video",
          src: "/OZZvideos/pdc.mp4",
          title: "Momentos Históricos",
          description: "Recorriendo la trayectoria profesional de Omar"
        }
      ]
    },
    {
      id: "bragado-victories",
      title: "Victorias en Bragado",
      icon: "🥇",
      color: "from-yellow-500 to-orange-600",
      items: [
        {
          type: "video",
          src: "/OZZvideos/bragado-victoria-1.mp4",
          title: "La Victoria Épica de Bragado",
          description: "El momento que marcó la historia de OZZcycling"
        },
        {
          type: "image",
          src: "/OZZimages/bragado-1.jpg",
          title: "Cruzando la Meta",
          description: "El momento de gloria en la carrera más importante"
        },
        {
          type: "video",
          src: "/OZZvideos/bragado-celebracion.mp4",
          title: "Celebración Histórica",
          description: "La emoción pura del triunfo profesional"
        }
      ]
    },
    {
      id: "momentos-unicos",
      title: "Momentos Únicos",
      icon: "✨",
      color: "from-cyan-600 to-teal-600",
      items: [
        {
          type: "image",
          src: "/OZZimages/momento-unico-1.jpg",
          title: "Detrás de Escena",
          description: "La preparación y dedicación de un profesional"
        },
        {
          type: "video",
          src: "/OZZvideos/momento-unico-1.mp4",
          title: "Pasión por el Ciclismo",
          description: "La esencia que inspira a toda la comunidad OZZ"
        },
        {
          type: "image",
          src: "/OZZimages/momento-unico-2.jpg",
          title: "Mentoría Profesional",
          description: "Transmitiendo conocimiento a las nuevas generaciones"
        }
      ]
    }
  ]
};

const GaleriaProfesional = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef(null);

  const openModal = (item, categoryIndex, itemIndex) => {
    setSelectedMedia({ ...item, categoryIndex, itemIndex });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  const navigateMedia = (direction) => {
    if (!selectedMedia) return;
    
    const currentCategory = galleryData.categories[selectedMedia.categoryIndex];
    const currentIndex = selectedMedia.itemIndex;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % currentCategory.items.length;
    } else {
      newIndex = currentIndex === 0 ? currentCategory.items.length - 1 : currentIndex - 1;
    }
    
    const newItem = currentCategory.items[newIndex];
    setSelectedMedia({ ...newItem, categoryIndex: selectedMedia.categoryIndex, itemIndex: newIndex });
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateMedia('prev');
      if (e.key === 'ArrowRight') navigateMedia('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen, selectedMedia]);

  return (
    <section className="mt-24 relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
      {/* Fondo artístico animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-400/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Patrón geométrico sutil */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)`,
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">🏆 LEGADO PROFESIONAL</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Omar Azzem
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-full border border-blue-400/40 backdrop-blur-sm">
              <span className="text-blue-200 font-semibold">Ciclista Profesional</span>
            </div>
            <div className="hidden md:block w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full border border-purple-400/40 backdrop-blur-sm">
              <span className="text-purple-200 font-semibold">Fundador OZZcycling</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Una trayectoria de excelencia que inspira cada aspecto de OZZcycling
          </p>
        </div>

        {/* Navegación por categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {galleryData.categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                activeCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-blue-500/25 scale-105`
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60 hover:text-white border border-slate-700/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span>
                <span className="font-bold tracking-wide">{category.title}</span>
              </div>
              
              {activeCategory === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl"></div>
              )}
            </button>
          ))}
        </div>

        {/* Galería de contenido */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryData.categories[activeCategory].items.map((item, index) => (
              <div
                key={index}
                onClick={() => openModal(item, activeCategory, index)}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="relative h-64 overflow-hidden">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      muted
                      loop
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    >
                      Tu navegador no soporta el video.
                    </video>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Indicador de tipo de media */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.type === 'video' ? '▶ VIDEO' : '📷 FOTO'}
                    </div>
                  </div>
                  
                  {/* Botón de ampliación */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Información del contenido */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de legado */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-3xl p-12 backdrop-blur-sm border border-slate-700/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-600/5"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                El <span className="text-blue-400">Legado</span> Continúa
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Cada victoria, cada momento único, cada experiencia profesional se refleja en la excelencia 
                que caracteriza a OZZcycling. La pasión de Omar por el ciclismo es el alma de nuestra bicicletería.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-slate-400">Años Profesionales</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="text-slate-400">Victorias Profesionales</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">1000+</div>
                  <div className="text-slate-400">Ciclistas Inspirados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de visualización completa */}
      {isModalOpen && selectedMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            {/* Botones de navegación */}
            <button
              onClick={() => navigateMedia('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => navigateMedia('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Botón de cierre */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Contenido del modal */}
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl overflow-hidden backdrop-blur-lg border border-slate-700/50">
              <div className="relative">
                {selectedMedia.type === 'video' ? (
                  <video
                    ref={modalVideoRef}
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full max-h-[70vh] object-contain bg-black"
                  >
                    Tu navegador no soporta el video.
                  </video>
                ) : (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full max-h-[70vh] object-contain bg-black"
                  />
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedMedia.title}</h3>
                <p className="text-slate-300 text-lg">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-scale {
          animation: fadeInScale 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default GaleriaProfesional;