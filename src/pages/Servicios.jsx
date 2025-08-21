import React, { useState, useEffect } from "react";

const serviciosData = [
  {
    title: "Taller Shimano Service Center",
    img: "/OZZimages/taller.jpg",
    desc: "Servicio técnico certificado y mantenimiento profesional para bicicletas de alta gama.",
    tag: "Calidad garantizada",
    features: ["Diagnóstico computarizado", "Garantía oficial Shimano", "Repuestos originales", "Técnicos certificados"],
    icon: "🔧"
  },
  {
    title: "Clases y Asesoramiento",
    img: "/OZZimages/clases.jpg",
    desc: "Capacitaciones, clínicas y asesoramiento personalizado para ciclistas de todos los niveles.",
    tag: "Aprendé con expertos",
    features: ["Clases personalizadas", "Grupos reducidos", "Instructores certificados", "Técnicas avanzadas"],
    icon: "🎯"
  },
  {
    title: "Bicicletería Premium",
    img: "/OZZimages/bicicleteria.jpg",
    desc: "Venta de bicicletas, repuestos, accesorios e indumentaria de las mejores marcas.",
    tag: "Todo para tu bici",
    features: ["Marcas premium", "Financiación disponible", "Asesoramiento técnico", "Garantía extendida"],
    icon: "🚴"
  }
];

const stats = [
  { number: "15+", label: "Años de experiencia", icon: "🏆" },
  { number: "2000+", label: "Clientes satisfechos", icon: "😊" },
  { number: "24h", label: "Tiempo de respuesta", icon: "⚡" },
  { number: "100%", label: "Garantía de calidad", icon: "✅" }
];

const testimonials = [
  {
    name: "María González",
    text: "El mejor servicio técnico de la región. Mi bici quedó como nueva.",
    rating: 5,
    service: "Taller"
  },
  {
    name: "Carlos Rodríguez",
    text: "Las clases me ayudaron a mejorar mi técnica increíblemente.",
    rating: 5,
    service: "Clases"
  },
  {
    name: "Ana López",
    text: "Productos de calidad y excelente atención personalizada.",
    rating: 5,
    service: "Bicicletería"
  }
];

const Servicios = () => {
  const [ setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="mt-24 pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            Shimano Service Center Certificado
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Servicios
            <span className="block text-4xl md:text-6xl">OZZcycling</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Llevamos tu pasión por el ciclismo al siguiente nivel con servicios profesionales y tecnología de vanguardia
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 transform hover:scale-105"
              >
                <div className="text-3xl mb-2" aria-label={stat.label} role="img">
                  {stat.icon === "🏆" && (
                    <svg className="w-8 h-8 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
                  )}
                  {stat.icon === "😊" && (
                    <svg className="w-8 h-8 text-blue-400 mx-auto" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#fff" strokeWidth="2"/><circle cx="9" cy="10" r="1" fill="#fff"/><circle cx="15" cy="10" r="1" fill="#fff"/></svg>
                  )}
                  {stat.icon === "⚡" && (
                    <svg className="w-8 h-8 text-yellow-500 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9v8l7-12h-9z"/></svg>
                  )}
                  {stat.icon === "✅" && (
                    <svg className="w-8 h-8 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                  )}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Soluciones integrales para tu experiencia ciclística
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviciosData.map((serv) => (
              <div
                key={serv.title}
                className="group relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-slate-100 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={serv.img}
                    alt={serv.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-4 py-2 rounded-full shadow-lg font-semibold backdrop-blur-sm">
                    {serv.tag}
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl" aria-label={serv.title} role="img">
                    {serv.icon === "🔧" && (
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m8-10h2M2 12H4m15.07-7.07l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93L6.34 6.34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {serv.icon === "🎯" && (
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"/><circle cx="12" cy="12" r="6" strokeWidth="2"/><circle cx="12" cy="12" r="2" strokeWidth="2"/></svg>
                    )}
                    {serv.icon === "🚴" && (
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="5.5" cy="18.5" r="3.5"/><circle cx="18.5" cy="18.5" r="3.5"/><path d="M5.5 18.5L12 8l6.5 10.5" strokeWidth="2"/></svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {serv.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{serv.desc}</p>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {serv.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Consultar Servicio
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-slate-100 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">¿Por qué elegir OZZcycling?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Somos Shimano Service Center y especialistas en bicicletas de alta gama. Nuestro equipo está formado por profesionales apasionados del ciclismo, brindando atención personalizada y soluciones a medida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-4" aria-label="Servicio Rápido" role="img">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9v8l7-12h-9z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Servicio Rápido</h3>
              <p className="text-slate-600 text-sm">Diagnóstico y reparación en tiempo récord</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-4" aria-label="Calidad Premium" role="img">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Calidad Premium</h3>
              <p className="text-slate-600 text-sm">Solo trabajamos con repuestos originales</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-4" aria-label="Técnicos Expertos" role="img">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v2m0 16v2m8-10h2M2 12H4m15.07-7.07l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M4.93 4.93L6.34 6.34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Técnicos Expertos</h3>
              <p className="text-slate-600 text-sm">Certificados por las mejores marcas</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white mx-auto mb-4" aria-label="Garantía Total" role="img">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Garantía Total</h3>
              <p className="text-slate-600 text-sm">100% garantía en todos nuestros servicios</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white rounded-full"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para la experiencia OZZcycling?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Únete a más de 2000 ciclistas que confían en nosotros. 
            Somos el único Shimano Service Center certificado de la región.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1" aria-label="Agendar Cita" role="button">
              Agendar Cita
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-2xl hover:shadow-2xl transform hover:-translate-y-1" aria-label="Ver Catálogo" role="button">
              Ver Catálogo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servicios;