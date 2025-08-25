
import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

const images = [
  { src: "/OZZimages/indumentaria/mag1.jpg", alt: "Indumentaria 1" },
  { src: "/OZZimages/indumentaria/mag2.jpg", alt: "Indumentaria 2" },
  { src: "/OZZimages/indumentaria/mag3.jpg", alt: "Indumentaria 3" },
  { src: "/OZZimages/indumentaria/mag4.jpg", alt: "Indumentaria 4" },
  { src: "/OZZimages/indumentaria/mag5.jpg", alt: "Indumentaria 5" },
  { src: "/OZZimages/indumentaria/mag6.jpg", alt: "Indumentaria 6" },
  { src: "/OZZimages/indumentaria/mag7.jpg", alt: "Indumentaria 7" },
  { src: "/OZZimages/indumentaria/mag8.jpg", alt: "Indumentaria 8" },
];

const IndumentariaAccion = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState(null);

  // Modal navigation
  const openModal = (img, idx) => {
    setModalImgIdx(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const showPrev = () => setModalImgIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const showNext = () => setModalImgIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  // Animación de entrada eliminada (variable sin uso)

  return (
    <section className="py-0 min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-violet-50">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-950 mt-8">
        Indumentaria y Accesorios en Acción
      </h2>
      <div className="w-full flex flex-col items-center justify-center">
        <video
          src="/OZZvideos/indumentari.mp4"
          controls
          autoPlay
          loop
          muted
          className="w-full max-w-4xl h-[calc(100vh-60px)] md:h-[calc(100vh-60px)] object-cover md:object-contain rounded-none shadow-xl bg-black animate-fade-in"
          poster="/LOGO/Log.OZZ.png"
          style={{
            maxHeight: "calc(100vh - 60px)",
            background: "#000",
          }}
        >
          Tu navegador no soporta el video.
        </video>
        <div className="w-full text-center text-blue-950 mt-8 px-4 animate-fade-in">
          <p className="text-lg">
            Descubre nuestra colección de indumentaria y accesorios de ciclismo en movimiento.
          </p>
        </div>
        {/* Galería tipo masonry */}
        <div className="w-full max-w-5xl mx-auto mt-10 columns-2 md:columns-4 gap-6 space-y-6 relative">
          {/* Fondo animado sutil */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="bggrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="800" height="600" fill="url(#bggrad)" />
              <g>
                <circle cx="120" cy="120" r="60" fill="#a5b4fc" opacity="0.12">
                  <animate attributeName="cx" values="120;680;120" dur="12s" repeatCount="indefinite" />
                </circle>
                <circle cx="680" cy="480" r="40" fill="#818cf8" opacity="0.10">
                  <animate attributeName="cy" values="480;120;480" dur="10s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>
          <div className="relative z-10">
            {images.map((img, idx) => (
              <RevealOnScroll key={img.src} animationDelay={idx * 120}>
                <div
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg border-2 border-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-white cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => openModal(img, idx)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver ${img.alt} en grande`}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && openModal(img, idx)}
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    draggable={false}
                    loading="lazy"
                    style={{ height: `${200 + (idx % 3) * 60}px` }}
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
      {/* Modal para imagen ampliada con navegación */}
      {modalOpen && modalImgIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-2xl w-full flex flex-col items-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 text-blue-900 p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label="Cerrar imagen ampliada"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Navegación izquierda */}
            <button
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-blue-900 p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Navegación derecha */}
            <button
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-blue-900 p-2 rounded-full backdrop-blur-sm transition-all"
              aria-label="Imagen siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <img
              src={images[modalImgIdx].src}
              alt={images[modalImgIdx].alt}
              className="w-full h-auto rounded-2xl shadow-2xl border-4 border-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 object-contain bg-white"
              loading="lazy"
            />
            <div className="mt-4 text-center text-white text-lg font-bold">
              {images[modalImgIdx].alt}
            </div>
          </div>
        </div>
      )}
  <style>{`
        @media (max-width: 768px) {
          video {
            object-fit: cover !important;
            border-radius: 0 !important;
            background: #000 !important;
            height: calc(100vh - 60px) !important;
            width: 100vw !important;
            max-width: 100vw !important;
          }
          .columns-2 {
            column-count: 2 !important;
          }
        }
        .animate-staggered {
          animation: fadeInUp 0.9s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
      `}</style>
    </section>
  );
};

export default IndumentariaAccion;
