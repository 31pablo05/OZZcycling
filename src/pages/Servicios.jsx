import React from "react";

const serviciosData = [
  {
    title: "Taller Shimano Service Center",
    img: "/OZZimages/taller.jpg",
    desc: "Servicio técnico certificado y mantenimiento profesional para bicicletas de alta gama.",
    tag: "Calidad garantizada",
  },
  {
    title: "Clases y Asesoramiento",
    img: "/OZZimages/clases.jpg",
    desc: "Capacitaciones, clínicas y asesoramiento personalizado para ciclistas de todos los niveles.",
    tag: "Aprendé con expertos",
  },
  {
    title: "Bicicletería Premium",
    img: "/OZZimages/bicicleteria.jpg",
    desc: "Venta de bicicletas, repuestos, accesorios e indumentaria de las mejores marcas.",
    tag: "Todo para tu bici",
  },
];

const Servicios = () => (
  <main className="pt-32 pb-16 bg-gradient-to-br from-[#eaf6ff] via-[#f5fbff] to-[#eaf6ff] min-h-screen">
    {/* ↑ pt-32 para bajar el contenido y evitar que la navbar lo tape */}
    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#004391] drop-shadow-lg animate-fade-in">
      Servicios OZZcycling
    </h1>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
      {serviciosData.map((serv, idx) => (
        <div
          key={serv.title}
          className="group bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100 hover:shadow-blue-300 transition-all duration-500 relative animate-fade-in"
          style={{ animationDelay: `${idx * 0.2}s` }}
        >
          <div className="relative">
            <img
              src={serv.img}
              alt={serv.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#004391] to-[#379299] text-white text-xs px-4 py-1 rounded-full shadow-lg font-semibold tracking-wide animate-bounce">
              {serv.tag}
            </span>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
          </div>
          <div className="p-6 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-bold text-[#004391] mb-3 text-center group-hover:text-[#379299] transition-colors duration-300">
              {serv.title}
            </h2>
            <p className="text-blue-900 text-base text-center mb-4">{serv.desc}</p>
            <button className="mt-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#379299] to-[#004391] text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
              Consultar
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="max-w-4xl mx-auto mt-16 text-center">
      <h3 className="text-2xl font-bold text-[#004391] mb-4 animate-fade-in delay-500">¿Por qué elegir OZZcycling?</h3>
      <p className="text-blue-900 text-lg mb-2">
        Somos Shimano Service Center y especialistas en bicicletas de alta gama. Nuestro equipo está formado por profesionales apasionados del ciclismo, brindando atención personalizada y soluciones a medida.
      </p>
      <p className="text-blue-900 text-lg">
        ¡Viví la experiencia OZZcycling y llevá tu pasión al siguiente nivel!
      </p>
    </div>
    <style>{`
      .animate-fade-in {
        animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
      }
      .animate-fade-in.delay-500 {
        animation-delay: .5s;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-bounce {
        animation: bounceTag 1.2s infinite alternate;
      }
      @keyframes bounceTag {
        from { transform: translateY(0);}
        to { transform: translateY(-8px);}
      }
    `}</style>
  </main>
);

export default Servicios;
