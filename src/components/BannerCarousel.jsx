import React from "react";

const images = [
  "/OZZimages/4.jpg",
  "/OZZimages/3.jpg",
  "/OZZimages/2.jpg",
  "/OZZimages/f7.jpg",
  "/OZZimages/1.jpg",
  "/OZZimages/fila.jpg",
  "/OZZimages/dogma.jpg",
  "/OZZimages/local.jpg",
  "/OZZimages/pinarello.jpg",
];

// Devuelve el grupo de 3 imágenes para desktop
const getCarouselImages = (current) => {
  const total = images.length;
  return [
    images[current % total],
    images[(current + 1) % total],
    images[(current + 2) % total],
  ];
};

const BannerCarousel = () => {
  const [current, setCurrent] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        isMobile
          ? (prev + 1) % images.length // Mobile: pasa de a 1 imagen
          : (prev + 3) % images.length // Desktop: pasa de a 3 imágenes
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile]);

  const carouselImages = getCarouselImages(current);

  return (
    <>
      {/* Espacio extra para que el banner no quede tapado */}
      <div className="h-24 md:h-32"></div>
      <section className="relative h-[420px] md:h-[520px] w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
        {/* Imágenes del carrusel */}
        <div className="relative z-10 flex items-center justify-center h-full w-full">
          <div className="flex w-full h-full items-center justify-center gap-4">
            {/* Desktop: 3 imágenes */}
            {carouselImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Banner OZZcycling ${idx}`}
                className={`
                  hidden md:block
                  md:h-[85%] md:max-h-[440px] md:w-auto md:rounded-2xl md:shadow-2xl object-contain mx-auto transition-all duration-700
                `}
                style={{
                  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                  background: "none",
                  border: "none",
                }}
              />
            ))}
            {/* Mobile: todas las imágenes, una por vez */}
            <img
              src={images[current]}
              alt="Banner OZZcycling"
              className="md:hidden mx-auto h-[90%] max-h-[480px] w-auto rounded-2xl shadow-2xl object-contain"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                background: "none",
                border: "none",
              }}
            />
          </div>
        </div>
        {/* Indicadores de carrusel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {isMobile
            ? images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === idx
                      ? "bg-white shadow-lg scale-125"
                      : "bg-blue-300 opacity-60"
                  }`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Ver imagen ${idx + 1}`}
                />
              ))
            : Array.from({ length: Math.ceil(images.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(current / 3) === idx
                      ? "bg-white shadow-lg scale-125"
                      : "bg-blue-300 opacity-60"
                  }`}
                  onClick={() => setCurrent(idx * 3)}
                  aria-label={`Ver grupo ${idx + 1}`}
                />
              ))}
        </div>
        {/* Animaciones */}
        <style>{`
          .animate-fade-in {
            animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
          }
          .animate-fade-in.delay-200 {
            animation-delay: .2s;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}</style>
      </section>
      {/* Título y subtítulo debajo del banner */}
      <div className="w-full text-center mt-8 mb-4">
        <h1 className="text-4xl md:text-6xl font-black text-blue-900 drop-shadow-lg mb-4 animate-fade-in">
          OZZcycling
        </h1>
        <p className="text-lg md:text-2xl text-blue-700 font-medium mb-6 animate-fade-in delay-200">
          Bicicletería de Alta Gama & Competición en Buenos Aires
        </p>
      </div>
    </>
  );
};

export default BannerCarousel;
