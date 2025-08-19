import React from "react";

const videos = [
  {
    src: "/OZZvideos/trabajando1.mp4",
    title: "Nuestro equipo en acción",
    poster: "/LOGO/Log.OZZ.png"
  },
  {
    src: "/OZZvideos/trabajando2.mp4",
    title: "El local y el ambiente OZZcycling",
    poster: "/LOGO/Log.OZZ.png"
  }
];

const Experiencia = () => (
  <section className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden overflow-hidden">
    {/* Fondo de imagen detrás de todo */}
    <div className="absolute inset-0 w-full h-full z-0">
      <img
        src="/OZZimages/local2.jpg"
        alt="Fondo OZZcycling"
        className="w-full h-full object-cover object-center"
      />
    </div>
    <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-lg tracking-tight animate-fade-in">
        Experiencia OZZcycling
      </h2>
      <p className="text-lg text-gray-100 mb-10 text-center leading-relaxed drop-shadow-lg">
        Viví la pasión por el ciclismo en nuestro local. Te mostramos cómo trabajamos, el ambiente y la dedicación de nuestro equipo para que tu bici esté siempre lista para competir o disfrutar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {videos.map((video, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            <div className="w-full">
              <video
                src={video.src}
                controls
                className="rounded-xl shadow-2xl w-full max-w-full h-[220px] md:h-[360px] object-cover bg-black mb-4"
                poster={video.poster}
                style={{ display: "block" }}
              >
                Tu navegador no soporta el video.
              </video>
            </div>
            <span className="font-semibold text-blue-100 text-center drop-shadow-lg">{video.title}</span>
          </div>
        ))}
      </div>
      <div className="bg-blue-900/80 rounded-2xl shadow-xl p-6 md:p-8 border border-blue-100 text-center">
        <p className="text-base md:text-lg text-blue-50 mb-4 leading-relaxed">
          <span className="font-bold text-white">OZZcycling</span> es más que una bicicletería: es un espacio de encuentro, asesoramiento y servicio premium para ciclistas de todos los niveles.
        </p>
        <p className="text-base md:text-lg text-blue-50 mb-4 leading-relaxed">
          Nuestro equipo está formado por especialistas que viven el ciclismo y se capacitan constantemente para ofrecerte lo mejor.
        </p>
        <p className="text-base md:text-lg text-blue-50 mb-4 leading-relaxed">
          Vení a conocernos y sumate a la comunidad OZZcycling.
        </p>
      </div>
    </div>
    <style>{`
      .animate-fade-in {
        animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      @media (max-width: 768px) {
        section {
          min-height: 100vh !important;
          padding: 0 !important;
        }
        .grid {
          gap: 1rem !important;
        }
        .rounded-xl {
          border-radius: 1rem !important;
        }
        .w-full {
          width: 100% !important;
          max-width: 100vw !important;
        }
        video {
          width: 100vw !important;
          max-width: 100vw !important;
          height: 220px !important;
          object-fit: cover !important;
          margin: 0 auto !important;
          display: block !important;
        }
      }
    `}</style>
  </section>
);

export default Experiencia;
