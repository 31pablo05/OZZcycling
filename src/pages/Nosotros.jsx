import React, { useState, useRef, useEffect } from "react";

const stats = [
  { number: "+15", label: "Años de Experiencia", icon: "🏆" },
  { number: "+3000", label: "Bicicletas Premium", icon: "🚴" },
  { number: "100%", label: "Satisfacción Garantizada", icon: "⭐" }
];

const mediaContent = [
  {
    type: "video",
    src: "/OZZvideos/ozzlocal.mp4",
    title: "Nuestro Espacio Premium",
    description: "Un recorrido por nuestras instalaciones de alta gama"
  },
  {
    type: "video", 
    src: "/OZZvideos/local.mp4",
    title: "Ambiente OZZcycling",
    description: "Donde la pasión por el ciclismo cobra vida"
  },
  {
    type: "image",
    src: "/OZZimages/localav.lib/local2.jpg",
    title: "Comunidad de Élite",
    description: "Ciclistas profesionales confían en nosotros"
  },
  {
    type: "image",
    src: "/OZZimages/localav.lib/local1.jpg", 
    title: "Showroom Exclusivo",
    description: "Las mejores marcas del mundo en un solo lugar"
  }
];

const Nosotros = () => {
  const [activeMedia, setActiveMedia] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaContent.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-24 relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Fondo mejorado con overlay dinámico */}
      <div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url('/OZZimages/localav.lib/local1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
      </div>

      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12">
        {/* Header Premium */}
        <div className="text-center mb-20 mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
            <span className="text-blue-300 text-sm font-semibold tracking-wider">🚴‍♂️ BICICLETERÍA DE ALTA GAMA</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Sobre 
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"> Nosotros</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            Más que una bicicletería, somos el epicentro del ciclismo premium en Buenos Aires
          </p>
        </div>

        {/* Video presentación principal mejorado */}
        <div className="mb-20">
          <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-3xl p-8 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
            <div className="mb-6">
              <span className="text-slate-400 text-sm">Presentación Oficial OZZcycling</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                src="/OZZvideos/holaSoy.mp4"
                controls
                loop
                autoPlay
                muted
                className="w-full h-[520px] md:h-[800px] object-cover rounded-xl shadow-2xl"
                poster="/LOGO/Log.OZZ.webp"
              >
                Tu navegador no soporta el video.
              </video>
              <div className="absolute top-4 right-4">
                <div className="bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  HD • PREMIUM QUALITY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Galería interactiva del local */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nuestro <span className="text-blue-400">Showroom</span> de Élite
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Un espacio diseñado para los ciclistas más exigentes del mundo
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Galería principal */}
            <div className="lg:col-span-2">
              <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-2xl p-6 backdrop-blur-sm border border-slate-700/30 h-full">
                <div className="relative rounded-xl overflow-hidden mb-4">
                  {mediaContent[activeMedia].type === 'video' ? (
                    <video
                      src={mediaContent[activeMedia].src}
                      autoPlay
                      loop
                      muted
                      className="w-full h-80 md:h-96 object-cover"
                      poster="/LOGO/Log.OZZ.webp"
                    >
                      Tu navegador no soporta el video.
                    </video>
                  ) : (
                    <img
                      src={mediaContent[activeMedia].src}
                      alt={mediaContent[activeMedia].title}
                      className="w-full h-80 md:h-96 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {mediaContent[activeMedia].title}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {mediaContent[activeMedia].description}
                    </p>
                  </div>
                </div>
                
                {/* Indicadores */}
                <div className="flex gap-2 justify-center">
                  {mediaContent.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveMedia(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        activeMedia === index ? 'bg-blue-400 w-8' : 'bg-slate-500 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Stats premium */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/80 rounded-xl p-6 backdrop-blur-sm border border-slate-700/30 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{stat.icon}</div>
                    <div>
                      <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-slate-400 text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* CTA en sidebar */}
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 backdrop-blur-sm border border-blue-500/30 text-center">
                <h4 className="text-white font-bold mb-2">¿Listo para la experiencia premium?</h4>
                <p className="text-slate-300 text-sm mb-4">Descubrí por qué somos la elección de los profesionales</p>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg">
                  Visitanos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info corporativa premium */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                La Excelencia en Cada Detalle
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Especialización Premium</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Nos especializamos exclusivamente en bicicletas de alta competición y componentes premium de las marcas más prestigiosas del mundo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Equipo de Élite</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Nuestros técnicos son ciclistas profesionales certificados por las principales marcas internacionales, garantizando un servicio excepcional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">Tecnología Avanzada</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Contamos con equipamiento de última generación para análisis biomecánico, fitting profesional y mantenimiento de precisión.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">Nuestro Compromiso</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Asesoramiento personalizado profesional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Servicio técnico certificado y garantizado</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Selección exclusiva de marcas premium</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Experiencia completa sobre dos ruedas</span>
                    </div>
                  </div>
                </div>
                
                {/* Elemento decorativo */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg transform rotate-12"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg transform -rotate-12"></div>
              </div>
            </div>

            {/* CTA final premium */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    ¡Únete a la Élite del Ciclismo!
                  </h3>
                  <p className="text-slate-300 mb-6 text-lg max-w-2xl mx-auto">
                    Descubrí por qué los ciclistas más exigentes eligen OZZcycling como su partner de confianza
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
                    Experimentá la Diferencia Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Nosotros;