import React, { useState, useRef, useEffect } from "react";
import RevealOnScroll from "./RevealOnScroll";

const videos = [
  {
    src: "/OZZvideos/trabajando1.mp4",
    title: "Nuestro equipo en acción",
    description: "Conocé a nuestros especialistas trabajando con dedicación",
    poster: "/LOGO/Log.OZZ.png"
  },
  {
    src: "/OZZvideos/trabajando2.mp4", 
    title: "El local y el ambiente OZZcycling",
    description: "Un recorrido por nuestro espacio y productos premium",
    poster: "/LOGO/Log.OZZ.png"
  }
];

const Experiencia = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleEnded = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      };
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener('ended', handleEnded);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      if (isPlaying) {
        video.play().catch(() => {});
      }
    }
  }, [currentVideoIndex]);

  // Reproducir automáticamente cuando la sección entra en el viewport
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [currentVideoIndex]);

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
  <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Imagen de fondo principal */}
      <div className="absolute inset-0 z-0">
        <img
          src="/OZZimages/local2.jpg"
          alt="Local OZZcycling"
          className="w-full h-full object-cover object-center opacity-100"
          style={{ position: 'absolute', inset: 0, minHeight: '100vh', minWidth: '100vw' }}
        />
      </div>
      {/* Patrón de fondo animado */}
      <div className="absolute inset-0 z-20 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

  <div className="relative z-30 w-full max-w-7xl mx-auto px-2 py-6 md:px-4 md:py-12">
        {/* Header mejorado */}
  <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
            <span className="text-blue-300 text-sm font-medium">✨ EXPERIENCIA PREMIUM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
            Experiencia 
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"> OZZcycling</span>
          </h2>
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Descubrí la pasión por el ciclismo en nuestro local. Un espacio donde la innovación se encuentra con la tradición.
          </p>
        </div>

        {/* Video Player Moderno */}
  <div className="mb-10 md:mb-16">
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl md:rounded-3xl p-2 md:p-8 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
            {/* Video Container */}
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mb-4 md:mb-6">
              <video
                ref={videoRef}
                className="w-full h-[200px] sm:h-[300px] md:h-[500px] object-cover"
                poster={videos[currentVideoIndex].poster}
                preload="metadata"
              >
                <source src={videos[currentVideoIndex].src} type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
              
              {/* Overlay de control personalizado */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="p-2 md:p-6 w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                    <div>
                      <h3 className="text-white text-base md:text-xl font-bold mb-1">
                        {videos[currentVideoIndex].title}
                      </h3>
                      <p className="text-slate-300 text-xs md:text-sm">
                        {videos[currentVideoIndex].description}
                      </p>
                    </div>
                    <button
                      onClick={handlePlayPause}
                      className="bg-blue-600/90 hover:bg-blue-500 text-white p-3 md:p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                    >
                      {isPlaying ? (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Selector */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              {videos.map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoSelect(index)}
                  className={`group relative flex-1 min-w-[180px] max-w-xs p-2 md:p-4 rounded-xl transition-all duration-300 ${
                    currentVideoIndex === index
                      ? 'bg-blue-600/30 border-2 border-blue-400 shadow-lg shadow-blue-500/20'
                      : 'bg-slate-800/60 border-2 border-slate-600/30 hover:bg-slate-700/60 hover:border-slate-500/50'
                  }`}
                >
                    <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-3 h-3 rounded-full transition-colors ${
                      currentVideoIndex === index ? 'bg-blue-400' : 'bg-slate-500 group-hover:bg-slate-400'
                    }`}></div>
                    <div className="text-left">
                      <p className={`font-semibold text-xs md:text-sm transition-colors ${
                        currentVideoIndex === index ? 'text-blue-300' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {video.title}
                      </p>
                      <p className="text-[10px] md:text-xs text-slate-400 mt-1">
                        {video.description}
                      </p>
                    </div>
                  </div>
                  {currentVideoIndex === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Información mejorada */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
    <RevealOnScroll animationDelay={0}>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-4 md:p-8 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Espacio Premium</h3>
        <p className="text-slate-300 leading-relaxed">
          Un ambiente diseñado para ciclistas exigentes, donde cada detalle importa para tu experiencia.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll animationDelay={120}>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Equipo Experto</h3>
        <p className="text-slate-300 leading-relaxed">
          Especialistas certificados que viven el ciclismo y se actualizan constantemente para ofrecerte lo mejor.
        </p>
      </div>
    </RevealOnScroll>
    <RevealOnScroll animationDelay={240}>
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">Comunidad</h3>
        <p className="text-slate-300 leading-relaxed">
          Más que una bicicletería, somos punto de encuentro para ciclistas de todos los niveles.
        </p>
      </div>
    </RevealOnScroll>
  </div>

        {/* CTA mejorado */}
        <div className="text-center mt-10 md:mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-4 md:p-8 backdrop-blur-sm border border-blue-500/30">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">¿Listo para la experiencia OZZcycling?</h3>
            <p className="text-sm md:text-base text-slate-300 mb-4 md:mb-6 max-w-2xl mx-auto">
              Vení a conocernos y descubrí por qué somos la elección de los ciclistas más exigentes.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 md:px-8 md:py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
              Visitanos Hoy
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Experiencia;