import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { FaBicycle, FaTools, FaCogs } from "react-icons/fa";

const pilares = [
  {
    icon: (
      <FaBicycle className="w-12 h-12 text-blue-600 drop-shadow-lg" aria-label="Bicicleta premium" />
    ),
    title: "Bicicletas Premium de Marcas Líderes",
    desc: "Pinarello, Specialized, Trek y más. Encontá la bici perfecta para tu nivel y estilo de ciclismo.",
    images: [
      "/OZZimages/bicis/Pinarello2.jpg",
      "/OZZimages/localav.lib/local.jpg",
      "/OZZimages/bicis/f7.jpg",
      "/OZZimages/bicis/bicidiver.webp",
      "/OZZimages/bicis/dogma.jpg",
      "/OZZimages/bicis/bicigw3.webp",
      "/OZZimages/bicis/1.webp"
    ],
  // videos eliminados
    more: "Trabajamos con las marcas más prestigiosas del mundo. Asesoramiento personalizado para cada ciclista, desde principiantes hasta profesionales.",
  },
  {
    icon: (
      <FaTools className="w-12 h-12 text-blue-600 drop-shadow-lg" aria-label="Taller certificado" />
    ),
    title: "Taller Certificado Shimano",
    desc: "Servicio técnico oficial con mecánicos certificados. Tu bici en las mejores manos.",
    images: [
      "/OZZimages/taller.jpg",
      "/OZZimages/localav.lib/service.jpg",
      "/OZZimages/bicis/bici1.webp"
    ],
 
    more: "Shimano Service Center autorizado. Reparaciones, upgrades y mantenimiento preventivo con garantía oficial. Diagnóstico gratuito y presupuesto sin compromiso.",
  },
  {
    icon: (
      <FaCogs className="w-12 h-12 text-blue-600 drop-shadow-lg" aria-label="Componentes pro" />
    ),
    title: "Equipamiento y Componentes Pro",
    desc: "Todo lo que necesitás: componentes, indumentaria y accesorios de alta gama.",
    images: [
      "/OZZimages/indumentaria/Zapatillas.jpg",
      "/OZZimages/indumentaria/mag3.jpg",
      "/OZZimages/indumentaria/mag4.jpg",
      "/OZZimages/localav.lib/local7.jpg",
      "/OZZimages/localav.lib/local6.jpg",
      "/OZZimages/localav.lib/local4.jpg"
    ],
  // videos eliminados
    more: "Indumentaria técnica, cascos, luces, ruedas y componentes premium. Todo para maximizar tu rendimiento y comodidad en cada salida.",
  },
];

const Pilares = () => {
  // Estado para el índice de imagen actual en cada card
  const [imageIndexes, setImageIndexes] = useState([0, 0, 0]);

  const handlePrevImage = (idx) => {
    setImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[idx] = (newIndexes[idx] - 1 + pilares[idx].images.length) % pilares[idx].images.length;
      return newIndexes;
    });
  };

  const handleNextImage = (idx) => {
    setImageIndexes((prev) => {
      const newIndexes = [...prev];
      newIndexes[idx] = (newIndexes[idx] + 1) % pilares[idx].images.length;
      return newIndexes;
    });
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

      {/* Fondo imagen solo detrás del título y las tres cards */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 w-full h-full -z-10 flex justify-center items-center">
            <img
              src="/OZZimages/competencias/fila.jpg"
              alt="Competencia ciclismo"
              className="w-full h-full object-cover opacity-65 mix-blend-multiply rounded-3xl"
              style={{ pointerEvents: 'none' }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 relative animate-fade-in">
            Lo que nos <span className="text-blue-500">Mueve</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#0a174e] max-w-4xl mx-auto leading-relaxed mb-8 font-semibold animate-fade-in delay-200">
            Tu bicicletería de confianza en Av. del Libertador 2984. Más de 15 años acompañando ciclistas con servicio técnico certificado, asesoramiento experto y las mejores marcas.
          </p>
          {/* Tarjetas */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in delay-400">
            {pilares.map((pilar, idx) => (
              <RevealOnScroll key={pilar.title} animationDelay={idx * 120}>
                <div
                  className="group bg-white px-2 py-4 md:px-6 md:py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer border border-blue-100 hover:border-blue-400/30 w-full max-w-[220px] md:max-w-sm flex-1 flex flex-col items-center min-h-[180px] md:min-h-[380px]"
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
                  {/* Slider/carousel compacto de imágenes */}
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="relative w-40 h-24 flex items-center">
                      {pilar.images.length > 1 && (
                        <button
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 text-blue-600 shadow hover:bg-blue-100 transition-all z-10"
                          onClick={() => handlePrevImage(idx)}
                          aria-label="Imagen anterior"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                      <img
                        src={pilar.images[imageIndexes[idx]]}
                        alt={pilar.title}
                        className="rounded-lg shadow w-full h-full object-cover aspect-video transition-all duration-500"
                        loading="lazy"
                      />
                      {pilar.images.length > 1 && (
                        <button
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 text-blue-600 shadow hover:bg-blue-100 transition-all z-10"
                          onClick={() => handleNextImage(idx)}
                          aria-label="Imagen siguiente"
                        >
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
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