import React, { useState } from "react";

const images = [
  { src: "/OZZimages/mag1.jpg", alt: "Indumentaria 1" },
  { src: "/OZZimages/mag2.jpg", alt: "Indumentaria 2" },
  { src: "/OZZimages/mag3.jpg", alt: "Indumentaria 3" },
  { src: "/OZZimages/mag4.jpg", alt: "Indumentaria 4" },
  { src: "/OZZimages/mag5.jpg", alt: "Indumentaria 5" },
];

const IndumentariaAccion = () => {
  // El primer elemento es el destacado
  const [mainIdx, setMainIdx] = useState(0);

  // Las imágenes secundarias
  const secondaryImages = images.filter((_, idx) => idx !== mainIdx);

  // Cuando se hace click en una secundaria, la intercambia con la principal
  const handleCardClick = (idx) => {
    setMainIdx(idx);
  };

  return (
    <section className="py-0 bg-blue-50 min-h-screen flex flex-col justify-center items-center">
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
          className="w-full h-[calc(100vh-60px)] md:h-[calc(100vh-60px)] object-cover md:object-contain rounded-none shadow-xl bg-black"
          poster="/LOGO/Log.OZZ.png"
          style={{
            maxHeight: "calc(100vh - 60px)",
            background: "#000",
          }}
        >
          Tu navegador no soporta el video.
        </video>
        <div className="w-full text-center text-blue-950 mt-8 px-4">
          <p className="text-lg">
            Descubre nuestra colección de indumentaria y accesorios de ciclismo en movimiento.
          </p>
        </div>
        {/* Cards de indumentaria */}
        <div className="w-full max-w-5xl mx-auto mt-10 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
            {/* Card principal (más grande) */}
            <div className="md:col-span-2 flex justify-center items-center">
              <div className="relative group w-full h-96 md:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#004391] bg-white cursor-pointer transition-all duration-300">
                <img
                  src={images[mainIdx].src}
                  alt={images[mainIdx].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#004391]/80 to-transparent px-4 py-3 text-white font-bold text-lg">
                  {images[mainIdx].alt}
                </div>
              </div>
            </div>
            {/* Cards secundarias */}
            {secondaryImages.map((img, idx) => {
              // El índice real en el array original
              const realIdx = images.findIndex((i) => i.src === img.src);
              return (
                <div
                  key={img.src}
                  className="flex justify-center items-center"
                >
                  <div
                    className="relative group w-full h-44 md:h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-[#379299] bg-white cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => handleCardClick(realIdx)}
                    title="Ver más grande"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      draggable={false}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#379299]/80 to-transparent px-3 py-2 text-white font-semibold text-base">
                      {img.alt}
                    </div>
                    <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-xs text-[#004391] font-bold shadow">
                      Click para ampliar
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Estilos para mejorar la versión mobile y animaciones */}
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
          .grid {
            grid-template-columns: 1fr !important;
          }
          .md\\:col-span-2 {
            grid-column: span 1 / span 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default IndumentariaAccion;
