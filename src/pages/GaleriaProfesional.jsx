import React, { useState, useRef, useEffect } from "react";

import allMedia from "./MediaData";

const GaleriaProfesional = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Navegación del carrusel
  const goTo = (idx) => {
    setCurrentIndex(idx);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % allMedia.length;
    goTo(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = currentIndex === 0 ? allMedia.length - 1 : currentIndex - 1;
    goTo(prevIndex);
  };

  // Auto-scroll cada 5 segundos (solo para imágenes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (allMedia[currentIndex].type === 'image' && !isPlaying) {
        goNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  // Control de teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setIsPlaying(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  // Pausar video al cambiar
  useEffect(() => {
    if (videoRef.current && allMedia[currentIndex].type === 'video') {
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [currentIndex]);

  const currentItem = allMedia[currentIndex];

  return (
    <section className="mt-32 relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header elegante */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-md">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 text-sm font-semibold tracking-wider uppercase">Legado Profesional</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text mb-6 tracking-tight leading-none">
            Omar Azzem
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="px-6 py-3 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-full border border-blue-400/50 backdrop-blur-sm">
              <span className="text-blue-100 font-semibold text-lg">🏆 Ciclista Profesional</span>
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full border border-purple-400/50 backdrop-blur-sm">
              <span className="text-purple-100 font-semibold text-lg">⚡ Fundador OZZcycling</span>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Una trayectoria que inspira excelencia en cada pedalada
          </p>
        </div>

        {/* Carrusel principal */}
        <div className="relative mb-12">
          <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] bg-black/80 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50 group">
            {/* Controles de navegación */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicador de tipo de media */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/70 rounded-full backdrop-blur-sm">
              <span className="text-white text-sm font-medium">
                {currentItem.type === 'video' ? '📹' : '📸'} {currentIndex + 1}/{allMedia.length}
              </span>
            </div>

            {/* Media principal */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-black">
              {currentItem.type === "video" ? (
                <video 
                  ref={videoRef}
                  src={currentItem.src} 
                  controls 
                  className="w-full h-full object-contain rounded-3xl"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                />
              ) : (
                <img 
                  src={currentItem.src} 
                  alt={currentItem.title} 
                  className="w-full h-full object-contain rounded-3xl transition-all duration-500"
                />
              )}
            </div>

            {/* Overlay con información */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{currentItem.title}</h2>
                {currentItem.subtitle && (
                  <div className="text-cyan-300 font-semibold mb-2">{currentItem.subtitle}</div>
                )}
                <p className="text-slate-300 text-lg leading-relaxed">{currentItem.description}</p>
              </div>
            </div>
          </div>

          {/* Info visible permanente debajo del carrusel */}
          <div className="text-center mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentItem.title}</h2>
            {currentItem.subtitle && (
              <div className="text-cyan-300 font-semibold mb-3 text-lg">{currentItem.subtitle}</div>
            )}
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">{currentItem.description}</p>
          </div>
        </div>

        {/* Grilla de miniaturas en cuadrícula */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Galería Completa</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {allMedia.map((item, idx) => (
              <div
                key={idx}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'ring-4 ring-blue-400 ring-offset-2 ring-offset-slate-900 scale-110 shadow-2xl shadow-blue-500/25 z-10' 
                    : 'ring-2 ring-slate-600 hover:ring-slate-500 hover:scale-105'
                }`}
                onClick={() => goTo(idx)}
                aria-label={item.title}
              >
                {/* Thumbnail */}
                <div className="w-full h-full bg-slate-800 flex items-center justify-center relative overflow-hidden">
                  {item.type === 'video' ? (
                    <>
                      <video 
                        src={item.src} 
                        className="w-full h-full object-cover" 
                        muted 
                        preload="metadata" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Indicador activo */}
                {idx === currentIndex && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                )}

                {/* Número de índice */}
                <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                  {idx + 1}
                </div>

                {/* Overlay con título al hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-medium truncate">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas del legado */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-3xl p-12 backdrop-blur-md border border-slate-700/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-purple-600/5"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                El <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Legado</span> Continúa
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Cada victoria, cada momento único, cada experiencia profesional se refleja en la excelencia 
                que caracteriza a OZZcycling. La pasión de Omar por el ciclismo es el alma de nuestra filosofía.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl border border-blue-400/30">
                  <div className="text-5xl font-black text-blue-400 mb-3">15+</div>
                  <div className="text-slate-300 font-semibold text-lg">Años Profesionales</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 rounded-2xl border border-cyan-400/30">
                  <div className="text-5xl font-black text-cyan-400 mb-3">50+</div>
                  <div className="text-slate-300 font-semibold text-lg">Victorias Registradas</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-400/30">
                  <div className="text-5xl font-black text-purple-400 mb-3">1000+</div>
                  <div className="text-slate-300 font-semibold text-lg">Ciclistas Inspirados</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default GaleriaProfesional;