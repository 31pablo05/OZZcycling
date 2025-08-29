import React, { useState, useEffect } from "react";

const serviciosData = [
  {
    id: 1,
    title: "Taller Shimano Service Center",
    img: "/OZZimages/taller.jpg",
    desc: "Servicio técnico certificado y mantenimiento profesional para bicicletas de alta gama con garantía oficial.",
    tag: "Calidad garantizada",
    features: [
      "Diagnóstico computarizado avanzado",
      "Garantía oficial Shimano",
      "Repuestos 100% originales",
      "Técnicos certificados internacionalmente"
    ],
   
    duration: "24-48hs",
    specialty: "Servicio Premium",
    color: "from-blue-600 to-blue-700",
    bgColor: "from-blue-50 to-blue-100"
  },
  {
    id: 2,
    title: "Clases y Asesoramiento",
    img: "/OZZimages/clases.jpg",
    desc: "Capacitaciones personalizadas, clínicas especializadas y asesoramiento técnico para ciclistas de todos los niveles.",
    tag: "Aprendé con expertos",
    features: [
      "Clases individuales y grupales",
      "Grupos reducidos (máx. 6 personas)",
      "Instructores UCI certificados",
      "Técnicas de competición"
    ],
    
    duration: "1-2hs",
    specialty: "Entrenamiento Pro",
    color: "from-indigo-600 to-purple-700",
    bgColor: "from-indigo-50 to-purple-100"
  },
  {
    id: 3,
    title: "Bicicletería Premium",
    img: "/OZZimages/bicicleteria.jpg",
    desc: "Venta exclusiva de bicicletas, componentes, accesorios e indumentaria de las marcas más prestigiosas del mercado.",
    tag: "Todo para tu bici",
    features: [
      "Marcas premium exclusivas",
      "Financiación hasta 24 cuotas",
      "Asesoramiento técnico especializado",
      "Garantía extendida hasta 2 años"
    ],
    price: "Consultar",
    duration: "Inmediato",
    specialty: "Equipamiento Pro",
    color: "from-purple-600 to-pink-700",
    bgColor: "from-purple-50 to-pink-100"
  }
];

const stats = [
  { number: "15+", label: "Años de experiencia", icon: "trophy", detail: "En el mercado argentino" },
  { number: "2000+", label: "Clientes satisfechos", icon: "users", detail: "Y creciendo cada día" },
  { number: "24h", label: "Tiempo de respuesta", icon: "clock", detail: "Servicio express disponible" },
  { number: "100%", label: "Garantía de calidad", icon: "shield", detail: "En todos nuestros trabajos" }
];

const benefits = [
  {
    title: "Servicio Express",
    desc: "Diagnóstico y reparación en tiempo récord sin comprometer la calidad",
    icon: "zap"
  },
  {
    title: "Calidad Premium",
    desc: "Solo trabajamos con repuestos originales y herramientas profesionales",
    icon: "award"
  },
  {
    title: "Técnicos Expertos",
    desc: "Certificados por Shimano y con experiencia en competiciones internacionales",
    icon: "tool"
  },
  {
    title: "Garantía Extendida",
    desc: "Respaldamos nuestro trabajo con garantía completa en servicios y repuestos",
    icon: "check-circle"
  }
];

const IconComponent = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    trophy: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    zap: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    award: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
    ),
    tool: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    "check-circle": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  };
  
  return icons[name] || null;
};

const Servicios = () => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="mt-24 pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/OZZimages/localav.lib/local2.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
          aria-hidden="true"
        ></div>
        {/* Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        
        <div className={`relative max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Servicios
            <span className="block text-5xl md:text-7xl mt-2">OZZcycling</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold text-white max-w-4xl mx-auto mb-12 leading-relaxed">
            <span className="text-white">Transformamos tu pasión por el ciclismo con servicios profesionales,</span>
            <span className="font-extrabold text-blue-800"> tecnología de vanguardia y </span>
            <span className="font-extrabold text-blue-900"> experiencia internacional</span>
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 transform hover:scale-105 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent name={stat.icon} className="w-12 h-12 mx-auto" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-lg font-bold text-slate-700 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-24 relative">
  {/* Background Image removed as requested */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-6 py-2 rounded-full text-sm font-bold mb-6">
              NUESTROS SERVICIOS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">
              Soluciones <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Integrales</span>
            </h2>
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>🏆 Shimano Service Center Certificado</span>
          </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Cada servicio está diseñado para llevar tu experiencia ciclística al máximo nivel profesional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviciosData.map((service, index) => (
              <div
                key={service.id}
                className={`group relative bg-white rounded-4xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-700 border border-slate-100/50 transform hover:-translate-y-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                // Eliminados onMouseEnter y onMouseLeave porque no se usan
              >
                {/* Enhanced Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.bgColor} opacity-20`}></div>
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Enhanced Tag */}
                  <div className={`absolute top-6 left-6 bg-gradient-to-r ${service.color} text-white text-sm px-5 py-2 rounded-full shadow-xl font-bold backdrop-blur-sm border border-white/20`}>
                    {service.tag}
                  </div>
                  
                  {/* Service Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {service.duration}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {service.price}
                      </span>
                    </div>
                    <div className="text-xs font-medium opacity-90">{service.specialty}</div>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-8 leading-relaxed text-lg">{service.desc}</p>
                  
                  {/* Enhanced Features */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-4 group/feature">
                        <div className={`w-3 h-3 bg-gradient-to-r ${service.color} rounded-full mt-2 group-hover/feature:scale-125 transition-transform duration-300 shadow-lg`}></div>
                        <span className="text-slate-700 font-medium group-hover/feature:text-slate-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="/contacto"
                      className={`w-full block text-center bg-gradient-to-r ${service.color} hover:shadow-2xl text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]`}
                      aria-label="Consultar Servicio"
                    >
                      Consultar Servicio
                    </a>
                    <button className="w-full border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold py-3 rounded-2xl transition-all duration-300 hover:bg-blue-50">
                      Más Información
                    </button>
                  </div>
                </div>

                {/* Enhanced Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-t ${service.bgColor} opacity-0 group-hover:opacity-10 transition-all duration-500 pointer-events-none`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/OZZimages/omazz/teamozz4.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
          aria-hidden="true"
        ></div>
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-blue-300 rounded-full"></div>
          <div className="absolute top-60 right-40 w-60 h-60 border-2 border-indigo-300 rounded-full"></div>
          <div className="absolute bottom-40 left-1/3 w-32 h-32 border-2 border-purple-300 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6">
              ¿POR QUÉ NOSOTROS?
            </span>
            <h2 className="text-5xl font-black text-slate-800 mb-6">
              La Diferencia <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">OZZcycling</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-blue-600">Shimano Service Center oficial</span> con más de 15 años especializándonos en bicicletas de alta gama. 
              Nuestro equipo de profesionales certificados brinda atención personalizada y soluciones a medida para cada ciclista.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className={`group text-center bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 transform hover:-translate-y-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                  <IconComponent name={benefit.icon} className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
  <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-700 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 right-1/4 w-40 h-40 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold mb-8 border border-white/30">
            <span>🚴‍♂️</span>
            <span>Únete a la Familia OZZcycling</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
            ¿Listo para la experiencia 
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              OZZcycling?
            </span>
          </h2>
          
          <p className="text-xl mb-12 opacity-95 leading-relaxed max-w-3xl mx-auto font-light">
            Más de <span className="font-bold text-yellow-300">2000 ciclistas</span> confían en nosotros. 
            Somos el <span className="font-bold text-yellow-300">único Shimano Service Center certificado</span> de la región 
            con presencia internacional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/contacto"
              className="group bg-white text-blue-600 font-black py-5 px-10 rounded-2xl hover:bg-yellow-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 text-lg flex items-center justify-center"
              aria-label="Agendar Cita"
            >
              <span className="flex items-center gap-3">
                📅 Agendar Cita
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </a>
            <a
              href="/tienda"
              className="group border-2 border-white text-white font-black py-5 px-10 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 text-lg flex items-center justify-center"
              aria-label="Ver Catálogo"
            >
              <span className="flex items-center gap-3">
                🛍️ Ver Catálogo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </span>
            </a>
          </div>
          
          {/* Contact Info */}
          <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm opacity-90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a
                href="https://wa.me/5491112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-white/90"
                aria-label="Contactar por WhatsApp"
              >
                +54 9 11 1234-5678
              </a>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Palermo, Buenos Aires</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Servicios;