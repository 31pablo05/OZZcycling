// Componente compacto para mostrar el carrusel de videos/imágenes en Nosotros
import React, { useState, useEffect } from "react";

const mediaContent = [
  {
    type: "video",
    src: "/OZZvideos/ozzlocal.mp4",
    title: "Nuestro Espacio Premium",
    description: "Un recorrido por nuestras instalaciones de alta gama",
    poster: "/LOGO/logo2.webp"
  },
  {
    type: "video",
    src: "/OZZvideos/local.mp4",
    title: "Ambiente OZZcycling",
    description: "Donde la pasión por el ciclismo cobra vida",
    poster: "/LOGO/logo2.webp"
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

const NosotrosMediaCarousel = () => {
  const [activeMedia, setActiveMedia] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMedia((prev) => (prev + 1) % mediaContent.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden mb-4">
      {mediaContent[activeMedia].type === "video" ? (
        <video
          src={mediaContent[activeMedia].src}
          autoPlay
          loop
          muted
          controls
          className="w-full h-80 md:h-96 object-cover"
          poster={mediaContent[activeMedia].poster}
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
      {/* Indicadores */}
      <div className="flex gap-2 justify-center mt-4">
        {mediaContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveMedia(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeMedia === index ? "bg-blue-400 w-8" : "bg-slate-500 hover:bg-slate-400"
            }`}
            aria-label={`Ver ${mediaContent[index].title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NosotrosMediaCarousel;
