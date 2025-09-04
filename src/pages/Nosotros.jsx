import React from "react";
import NosotrosMediaCarousel from "../components/NosotrosMediaCarousel";

const stats = [
  { number: "+15", label: "Años de Experiencia", icon: "🏆" },
  { number: "+5000", label: "Ciclistas Atendidos", icon: "🚴" },
  { number: "100%", label: "Satisfacción Garantizada", icon: "⭐" }
];

const Nosotros = () => {
  return (
    <section className="mt-16 md:mt-24 relative min-h-screen overflow-hidden">
      {/* Fondo optimizado para móvil */}
      <div 
        className="fixed inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('/OZZimages/localav.lib/local1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
      </div>

      {/* Elementos decorativos optimizados */}
      <div className="absolute inset-0 overflow-hidden -z-5 pointer-events-none">
        <div className="absolute top-10 right-10 md:top-20 md:right-20 w-32 h-32 md:w-64 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 left-8 md:bottom-32 md:left-16 w-24 h-24 md:w-48 md:h-48 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header optimizado para móvil */}
        <div className="text-center mb-12 md:mb-20 mt-8 md:mt-16">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">
            Sobre 
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"> Nosotros</span>
          </h1>
          <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-700/20 to-cyan-600/20 rounded-full border border-blue-400/30 mb-6 md:mb-8 backdrop-blur-sm">
            <span className="text-blue-300 text-xs md:text-sm font-semibold tracking-wider">🚴‍♂️ OZZCYCLING</span>
          </div>
          <p className="text-lg md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-4">
            Más que una bicicletería, somos el epicentro del ciclismo en Buenos Aires
          </p>
        </div>

        {/* Video presentación optimizado */}
        <div className="mb-12 md:mb-20">
          <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
            <div className="mb-4 md:mb-6">
              <span className="text-slate-400 text-xs md:text-sm">Presentación Oficial OZZcycling</span>
            </div>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
              <video
                src="/OZZvideos/holaSoy.mp4"
                controls
                loop
                muted
                playsInline
                className="w-full h-[250px] md:h-[520px] lg:h-[700px] object-cover rounded-lg md:rounded-xl shadow-2xl"
                poster="/LOGO/logo2.webp"
              >
                Tu navegador no soporta el video.
              </video>
              <div className="absolute top-2 right-2 md:top-4 md:right-4">
                <div className="bg-black/70 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs backdrop-blur-sm">
                  HD • PREMIUM
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Galería optimizada para móvil */}
        <div className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4">
              Nuestro <span className="text-blue-400">Showroom</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto px-4">
              Un espacio diseñado para ciclistas de todos los niveles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Galería principal */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-xl md:rounded-2xl p-3 md:p-6 backdrop-blur-sm border border-slate-700/30 h-full">
                <NosotrosMediaCarousel />
              </div>
            </div>

            {/* Stats optimizados para móvil */}
            <div className="space-y-4 md:space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-lg md:rounded-xl p-4 md:p-6 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="text-2xl md:text-3xl">{stat.icon}</div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-slate-400 text-xs md:text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* CTA optimizado */}
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg md:rounded-xl p-4 md:p-6 backdrop-blur-sm border border-blue-500/30 text-center">
                <h4 className="text-white font-bold mb-2 text-sm md:text-base">¿Listo para la experiencia?</h4>
                <p className="text-slate-300 text-xs md:text-sm mb-3 md:mb-4">Descubrí por qué somos la elección de los ciclistas</p>
                <a
                  href="https://share.google/PwI0UEPV0y3V72XHV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg inline-block text-sm md:text-base"
                >
                  Visitanos
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info corporativa optimizada */}
        <div className="mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-12 border border-white/20">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">
                Excelencia en Cada Detalle
              </h2>
              <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-6 md:mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base">Especialización Premium</h3>
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                      Especializados en bicicletas de alta competición y componentes premium de las marcas más prestigiosas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base">Equipo Experto</h3>
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                      Técnicos certificados por las principales marcas internacionales, garantizando servicio excepcional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2 text-sm md:text-base">Tecnología Avanzada</h3>
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                      Equipamiento de última generación para análisis biomecánico y mantenimiento de precisión.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Nuestro Compromiso</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Asesoramiento personalizado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Servicio técnico certificado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Marcas premium exclusivas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm md:text-base">Experiencia completa</span>
                    </div>
                  </div>
                </div>
                
                {/* Elementos decorativos reducidos */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-4 h-4 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg transform rotate-12"></div>
                <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 w-3 h-3 md:w-6 md:h-6 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg transform -rotate-12"></div>
              </div>
            </div>

            {/* CTA final optimizado */}
            <div className="text-center mt-8 md:mt-12">
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl md:rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
                    ¡Únete a la Comunidad OZZ!
                  </h3>
                  <p className="text-slate-300 mb-4 md:mb-6 text-sm md:text-lg max-w-2xl mx-auto">
                    Descubrí por qué los ciclistas eligen OZZcycling como su partner de confianza
                  </p>
                  <a
                    href="/contacto"
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 md:px-10 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 inline-block"
                  >
                    Experimentá la Diferencia
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;