import React from "react";

const IndumentariaAccion = () => (
  <section className="py-0 bg-blue-50 min-h-screen flex flex-col justify-center items-center">
    <h2 className="text-2xl font-bold text-center mb-8 text-blue-950 mt-8">Indumentaria y Accesorios en Acción</h2>
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
        <p className="text-lg">Descubre nuestra colección de indumentaria y accesorios de ciclismo en movimiento.</p>
      </div>
    </div>
    {/* Estilos para mejorar la versión mobile */}
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
      }
    `}</style>
  </section>
);

export default IndumentariaAccion;
