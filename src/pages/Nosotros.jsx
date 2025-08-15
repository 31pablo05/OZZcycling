import React from "react";

const Nosotros = () => (
  <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-24 overflow-hidden">
    {/* Fondo de imagen detrás de todo */}
    <div
      className="absolute inset-0 w-full h-full -z-10"
      style={{
        backgroundImage: "url('/OZZimages/local2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.55)",
      }}
    >
      {/* Overlay oscuro para mejorar contraste */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
    {/* Espacio extra para evitar que el navbar tape el título */}
    <div className="mt-20"></div>
    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-tight animate-fade-in">
      Sobre Nosotros
    </h1>
    {/* Video presentación principal en loop y responsive */}
    <div className="flex justify-center mb-12 w-full">
      <video
        src="/OZZvideos/holaSoy.mp4"
        controls
        loop
        autoPlay
        muted
        className="rounded-2xl shadow-2xl w-full max-w-3xl border-4 border-blue-900 bg-black object-contain md:object-cover"
        poster="/LOGO/Log.OZZ.png"
        style={{ maxHeight: "320px" }}
      >
        Tu navegador no soporta el video.
      </video>
    </div>
    {/* Galería profesional del local */}
    <div className="mb-14 w-full">
      <h2 className="text-3xl font-bold text-white mb-6 text-center animate-fade-in delay-200 drop-shadow-lg">
        Nuestro Local & Comunidad
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="relative group overflow-hidden rounded-xl shadow-xl">
          <img
            src="/OZZimages/local2.jpg"
            alt="Local OZZcycling con ciclistas"
            className="w-full h-56 md:h-72 object-contain md:object-cover transition-transform duration-500 group-hover:scale-105 bg-black"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/80 to-transparent px-4 py-2 text-white text-lg font-semibold opacity-90">
            Comunidad OZZcycling
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-xl shadow-xl">
          <img
            src="/OZZimages/local1.jpg"
            alt="Local OZZcycling con ciclistas"
            className="w-full h-56 md:h-72 object-contain md:object-cover transition-transform duration-500 group-hover:scale-105 bg-black"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/80 to-transparent px-4 py-2 text-white text-lg font-semibold opacity-90">
            Local Premium
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative group rounded-xl shadow-xl overflow-hidden">
          <video
            src="/OZZvideos/ozzlocal.mp4"
            controls
            loop
            autoPlay
            muted
            className="w-full h-56 md:h-72 object-contain md:object-cover bg-black transition-transform duration-500 group-hover:scale-105"
            poster="/LOGO/Log.OZZ.png"
          >
            Tu navegador no soporta el video.
          </video>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/80 to-transparent px-4 py-2 text-white text-lg font-semibold opacity-90">
            Dirección y Espacio
          </div>
        </div>
        <div className="relative group rounded-xl shadow-xl overflow-hidden">
          <video
            src="/OZZvideos/local.mp4"
            controls
            loop
            autoPlay
            muted
            className="w-full h-56 md:h-72 object-contain md:object-cover bg-black transition-transform duration-500 group-hover:scale-105"
            poster="/LOGO/Log.OZZ.png"
          >
            Tu navegador no soporta el video.
          </video>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-900/80 to-transparent px-4 py-2 text-white text-lg font-semibold opacity-90">
            Local OZZcycling
          </div>
        </div>
      </div>
    </div>
    {/* Info y CTA */}
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-blue-100 mt-14 w-full max-w-3xl mx-auto">
      <p className="text-xl text-blue-900 mb-6 leading-relaxed text-center">
        <span className="font-bold text-blue-900">OZZcycling</span> es una
        bicicletería de alta gama ubicada en el corazón de Buenos Aires,
        especializada en bicicletas de competición y servicio premium.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900 mb-2">+10 años</span>
          <span className="text-blue-800">de experiencia</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900 mb-2">+2000</span>
          <span className="text-blue-800">bicicletas vendidas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-900 mb-2">100%</span>
          <span className="text-blue-800">clientes satisfechos</span>
        </div>
      </div>
      <p className="text-lg text-blue-900 mb-4 leading-relaxed text-center">
        Nuestro equipo está formado por apasionados del ciclismo, con años de
        experiencia y un compromiso absoluto con la calidad y la atención
        personalizada.
      </p>
      <p className="text-lg text-blue-900 mb-4 leading-relaxed text-center">
        Ofrecemos las mejores marcas, asesoramiento profesional, servicio técnico
        certificado y una selección exclusiva de accesorios para que vivas la
        mejor experiencia sobre dos ruedas.
      </p>
      <div className="mt-8 text-center">
        <span className="inline-block bg-gradient-to-r from-blue-900 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg text-lg tracking-wide">
          ¡Te invitamos a conocernos y ser parte de la comunidad OZZcycling!
        </span>
      </div>
    </div>
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
      @media (max-width: 768px) {
        .absolute.inset-0.w-full.h-full.-z-10 {
          background-position: top center !important;
        }
        video {
          max-height: 220px !important;
        }
      }
    `}</style>
  </section>
);

export default Nosotros;