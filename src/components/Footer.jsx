import React from "react";
import { FaInstagram, FaFacebook, FaMapMarkerAlt, FaPhone, FaClock, FaTools, FaBicycle } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.instagram.com/ozzcycling/",
    label: "Instagram",
    icon: <FaInstagram className="w-6 h-6" aria-hidden="true" />,
    bgColor: "bg-gradient-to-br from-[#405de6] via-[#833ab4] to-[#fd1f1f]",
    hoverColor: "hover:shadow-lg hover:shadow-purple-500/25",
    tooltip: "Seguinos en Instagram",
  },
  {
    href: "https://www.facebook.com/p/Ozz-cycling-100063464646678/",
    label: "Facebook",
    icon: <FaFacebook className="w-6 h-6" aria-hidden="true" />,
    bgColor: "bg-[#3b5998]",
    hoverColor: "hover:bg-[#2d4373] hover:shadow-lg hover:shadow-blue-500/25",
    tooltip: "Encontranos en Facebook",
  },
];

const SocialIcon = ({
  href,
  label,
  icon,
  bgColor,
  hoverColor,
  tooltip,
}) => (
  <a
    href={href}
    aria-label={label}
    className={`group relative flex justify-center items-center w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${bgColor} ${hoverColor} shadow-md hover:shadow-xl text-white`}
    title={tooltip}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
    <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg z-10">
      {tooltip}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
    </span>
  </a>
);

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Fondo decorativo mejorado */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Círculos decorativos más suaves */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-violet-400/12 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-blue-400/6 rounded-full blur-2xl animate-bounce delay-500"></div>
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        {/* Líneas diagonales sutiles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/3 to-transparent"></div>
        </div>
      </div>


      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Logo y título: siempre primero en mobile, centrado en desktop */}
        <div className="flex flex-col items-center justify-center gap-6 mb-10 lg:hidden">
          <div className="flex items-center gap-4 mb-2">
            <img src="/LOGO/logo2.webp" alt="Logo OZZcycling" className="w-16 h-16 rounded-full shadow-md border-2 border-white/20" />
            <h3 className="text-5xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight mb-2">OZZcycling</h3>
          </div>
          <div className="space-y-2 text-blue-100">
            <p className="text-2xl font-semibold text-cyan-200 flex items-center gap-2"><FaTools className="w-6 h-6" />Bicicletería y Taller Especializado</p>
            <p className="flex items-center gap-2 text-blue-200 text-lg"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>Shimano Service Center Oficial</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Columna 1: Contacto y Horarios (izquierda en desktop) */}
          <div className="flex flex-col gap-6 items-center lg:items-start order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">Ubicación</p>
                    <p className="text-blue-200 text-sm leading-relaxed">Av. del Libertador 2984<br />Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-3">
                  <FaPhone className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-1">Teléfono</p>
                    <a href="tel:01137788374" className="text-blue-200 hover:text-green-300 transition-colors text-sm">011 3778-8374</a>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 sm:col-span-2">
                <div className="flex items-start gap-3">
                  <FaClock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium mb-2">Horarios de Atención</p>
                    <div className="text-blue-200 text-sm space-y-1">
                      <p>Lunes a Viernes: <span className="text-white font-medium">10:00 - 19:00</span></p>
                      <p>Sábados: <span className="text-white font-medium">08:00 - 12:00</span></p>
                      <p className="text-red-300">Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA mejorado */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 w-full">
              <p className="text-white font-medium mb-3 text-center">¿Querés saber más o visitarnos?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/contacto" className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  Contactar
                </a>
                <a
                  href="https://www.google.com/maps?q=Av.+del+Libertador+2984,+Buenos+Aires,+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 border border-white/20 hover:border-white/30"
                >
                  <FaMapMarkerAlt className="w-4 h-4" />
                  Ver Ubicación
                </a>
              </div>
            </div>
          </div>
          {/* Columna 2: Logo y Título (solo desktop) */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6 order-2">
            <div className="flex items-center gap-4 mb-2">
              <img src="/LOGO/logo2.webp" alt="Logo OZZcycling" className="w-16 h-16 rounded-full shadow-md border-2 border-white/20" />
              <h3 className="text-5xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent tracking-tight mb-2">OZZcycling</h3>
            </div>
            <div className="space-y-2 text-blue-100">
              <p className="text-2xl font-semibold text-cyan-200 flex items-center gap-2"><FaTools className="w-6 h-6" />Bicicletería y Taller Especializado</p>
              <p className="flex items-center gap-2 text-blue-200 text-lg"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>Shimano Service Center Oficial</p>
            </div>
          </div>
          {/* Columna 3: Redes Sociales y Estado (derecha en desktop) */}
          <div className="flex flex-col gap-8 items-center lg:items-end order-3">
            <div className="w-full">
              <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-6"><div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div> Síguenos</h4>
              <p className="text-blue-200 text-sm mb-4">Conectá con nosotros en redes sociales</p>
              <div className="flex space-x-4 justify-center lg:justify-end">
                {socialLinks.map((social, index) => (
                  <div className="animate-fade-in" style={{animationDelay: `${index * 0.2}s`}} key={index}>
                    <SocialIcon {...social} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 w-full">
              <h5 className="text-white font-medium mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Estado del Servicio</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center"><span className="text-blue-200">Servicio técnico:</span><span className="text-green-300 font-medium">Activo</span></div>
                <div className="flex justify-between items-center"><span className="text-blue-200">Tiempo de espera:</span><span className="text-yellow-300 font-medium">24-48h</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom mejorado */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-center lg:text-left">
              <p className="text-blue-200 text-sm bg-white/5 rounded-lg px-4 py-2 inline-block shadow-md border border-white/10">
                &copy; {currentYear} OZZcycling. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 rounded-lg px-4 py-2 shadow-md border border-white/10">
              <div className="text-blue-200 text-xs flex items-center gap-2">
                Desarrollado con 
                <span className="text-red-400 animate-pulse text-sm" aria-label="amor" role="img">❤️</span> 
                por <a href="https://dev-craft-lake.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text hover:underline">Pablo Proboste</a>
              </div>
              
              <div className="hidden sm:block w-px h-4 bg-white/20"></div>
              
              <div className="flex items-center gap-3 text-xs">
                <a
                  href="/politicas-de-privacidad"
                  className="text-blue-200 hover:text-blue-300 transition-colors hover:underline"
                  aria-label="Políticas de Privacidad"
                >
                  Privacidad
                </a>
                <span className="text-white/30">|</span>
                <a
                  href="/terminos-y-condiciones"
                  className="text-blue-200 hover:text-blue-300 transition-colors hover:underline"
                  aria-label="Términos y Condiciones"
                >
                  Términos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </footer>
  );
}

export default Footer;