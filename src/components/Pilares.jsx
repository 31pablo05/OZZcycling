import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const pilares = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="#2563eb"
          strokeWidth="4"
          fill="#e0f2fe"
        />
        <path
          d="M12 36l8-16 8 16"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="36" r="3" fill="#2563eb" />
      </svg>
    ),
    title: "Bicicletas Premium de Marcas Líderes",
    desc: "Pinarello, Specialized, Trek y más. Encontá la bici perfecta para tu nivel y estilo de ciclismo.",
    more: (
      <div>
        Trabajamos con las marcas más prestigiosas del mundo. Asesoramiento personalizado para cada ciclista, desde principiantes hasta profesionales.
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <img 
            src="/OZZimages/Pinarello2.jpg" 
            alt="Pinarello" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <img 
            src="/OZZimages/local.jpg" 
            alt="Local OZZ" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <img 
            src="/OZZimages/f7.jpg" 
            alt="F7" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <img 
            src="/OZZimages/dogma.jpg" 
            alt="Dogma" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <img 
            src="/OZZimages/bicigw3.jpg" 
            alt="Bici GW" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <img 
            src="/OZZimages/1.jpg" 
            alt="Bici 1" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
          <video 
            src="/OZZvideos/pasioncicli.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <rect
          x="8"
          y="8"
          width="32"
          height="32"
          rx="8"
          fill="#e0f2fe"
          stroke="#2563eb"
          strokeWidth="4"
        />
        <path
          d="M24 16v16M16 24h16"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Taller Certificado Shimano",
    desc: "Servicio técnico oficial con mecánicos certificados. Tu bici en las mejores manos.",
    more: (
      <div>
        Shimano Service Center autorizado. Reparaciones, upgrades y mantenimiento preventivo con garantía oficial. Diagnóstico gratuito y presupuesto sin compromiso.
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <video 
            src="/OZZvideos/trabajando2.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
          <video 
            src="/OZZvideos/trabajando1.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
          <video 
            src="/OZZvideos/cuidamosbici.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
          <img 
            src="/OZZimages/service.jpg" 
            alt="Service" 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
        <rect
          x="10"
          y="10"
          width="28"
          height="28"
          rx="8"
          fill="#e0f2fe"
          stroke="#2563eb"
          strokeWidth="4"
        />
        <path
          d="M24 18v12M18 24h12"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Equipamiento y Componentes Pro",
    desc: "Todo lo que necesitás: componentes, indumentaria y accesorios de alta gama.",
    more: (
      <div>
        Indumentaria técnica, cascos, luces, ruedas y componentes premium. Todo para maximizar tu rendimiento y comodidad en cada salida.
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <video 
            src="/OZZvideos/zapatillasshimano.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
          <video 
            src="/OZZvideos/Grupo electrónico de 12V ⚡️ Dura-Ace permite realizar cambios instantáneos, precisos y ultra ráp.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
          <video 
            src="/OZZvideos/¡Vení a buscar tu Grupo Shimano 105 Di2! 📍Av. Libertador 2984.Somos el lugar que ciclista quier.mp4" 
            controls 
            className="rounded-lg shadow w-full h-24 object-cover aspect-video" 
            loading="lazy"
            preload="metadata"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <img
            src="/OZZimages/Zapatillas.jpg"
            alt="Zapatillas de ciclismo profesionales"
            className="rounded-lg shadow-md w-40 h-32 object-cover border border-blue-200 aspect-video"
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
];

const Pilares = () => {
  const [open, setOpen] = useState([false, false, false]);

  const handleToggle = (idx) => {
    setOpen(open.map((v, i) => (i === idx ? !v : false)));
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-violet-50 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/15 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-violet-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-blue-400/8 rounded-full animate-bounce delay-500"></div>
        <div
          className="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 transform rotate-45 animate-spin opacity-20"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/3 w-6 h-6 bg-gradient-to-br from-cyan-400 to-violet-400 transform rotate-12 animate-ping opacity-30"
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 relative animate-fade-in">
          Lo que nos <span className="text-blue-500">Mueve</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 font-light animate-fade-in delay-200">
          Tu bicicletería de confianza en Av. del Libertador 2984. Más de 15 años acompañando ciclistas con servicio técnico certificado, asesoramiento experto y las mejores marcas.
        </p>

        {/* Tarjetas */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in delay-400">
          {pilares.map((pilar, idx) => (
            <RevealOnScroll key={pilar.title} animationDelay={idx * 120}>
              <div
                className="group bg-white px-6 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer border border-blue-100 hover:border-blue-400/30 w-full max-w-sm flex-1 flex flex-col items-center min-h-[380px]"
                role="region"
                aria-labelledby={`pilar-title-${idx}`}
              >
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-lg">
                  {pilar.icon}
                </div>
                <h3
                  id={`pilar-title-${idx}`}
                  className="font-bold text-xl mb-3 text-blue-900 group-hover:text-blue-500 transition-colors duration-200 text-center leading-tight"
                >
                  {pilar.title}
                </h3>
                <p className="text-gray-700 mb-4 flex-grow text-center leading-relaxed">{pilar.desc}</p>
                <button
                  className="inline-flex items-center gap-2 text-blue-500 font-semibold underline underline-offset-4 hover:text-cyan-600 transition-colors duration-200 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={open[idx]}
                  aria-controls={`pilar-more-${idx}`}
                >
                  {open[idx] ? "Mostrar menos" : "Conocé más"}
                  <span
                    className={`transition-transform duration-300 ${
                      open[idx] ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`pilar-more-${idx}`}
                  className={`bg-blue-50 rounded-lg text-blue-900 text-sm shadow-inner transition-all duration-500 overflow-hidden w-full ${
                    open[idx]
                      ? "max-h-[600px] opacity-100 p-4"
                      : "max-h-0 opacity-0 p-0"
                  }`}
                  aria-hidden={!open[idx]}
                >
                  {open[idx] && pilar.more}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Cifras mejoradas */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center animate-fade-in delay-600">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-900 mb-2">15+</div>
            <div className="text-gray-600 font-medium">años de experiencia</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-900 mb-2">500+</div>
            <div className="text-gray-600 font-medium">servicios anuales</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-3xl font-bold text-blue-900 mb-2">98%</div>
            <div className="text-gray-600 font-medium">satisfacción del cliente</div>
          </div>
        </div>

        {/* Botón mejorado */}
        <div className="text-center mt-12 animate-fade-in delay-800">
          <a
            href="/tienda"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-4 px-8 rounded-full hover:from-cyan-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">Explorá nuestra tienda</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pilares;