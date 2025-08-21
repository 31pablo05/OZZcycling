import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.instagram.com/ozzcycling/",
    label: "Instagram",
    icon: <FaInstagram className="w-6 h-6" aria-hidden="true" />,
    bgColor: "bg-gradient-to-br from-[#405de6] to-[#fd1f1f]",
    hoverColor: "hover:shadow-lg",
    tooltip: "Seguinos en Instagram",
  },
  {
    href: "https://www.facebook.com/p/Ozz-cycling-100063464646678/",
    label: "Facebook",
    icon: <FaFacebook className="w-6 h-6" aria-hidden="true" />,
    bgColor: "bg-[#3b5998]",
    hoverColor: "hover:bg-[#2d4373]",
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
    className={`group relative flex justify-center items-center w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${bgColor} ${hoverColor} shadow-md hover:shadow-xl`}
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
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-cyan-900 to-violet-900 text-white relative overflow-hidden">
      {/* Fondo decorativo moderno con gradiente y partículas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-cyan-400/15 rounded-full blur-2xl animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-violet-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-blue-400/8 rounded-full blur-2xl animate-bounce delay-500"></div>
        {/* Partículas flotantes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Información Principal */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-3">
                <img src="/LOGO/Log.OZZ.png" alt="Logo OZZcycling" className="w-8 h-8 rounded-full shadow-md" />
                OZZcycling
              </h3>
              <p className="text-blue-200 font-medium text-lg mb-2">
                Bicicletería de Alta Gama
              </p>
              <p className="text-blue-100 mb-2">Shimano Service Center</p>
              <p className="text-blue-100 mb-2">
                Av. del Libertador 2984, Buenos Aires, Argentina
              </p>
              <p className="text-blue-100 mb-2">
                Tel:{" "}
                <a
                  href="tel:01137788374"
                  className="hover:underline hover:text-blue-300 transition-colors"
                >
                  011 3778-8374
                </a>
              </p>
              <p className="text-blue-100 mb-2">
                Horario: Lunes a viernes de 10h a 19h | Sábados de 8h a 12h
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-white font-medium mb-3">
                ¿Querés saber más o visitarnos?
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-600 hover:from-cyan-600 hover:to-violet-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-5-5m0 0L7 8m5-5v12" /></svg>
                Contactar Ahora
              </a>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Servicios</h4>
            <ul className="space-y-2">
              <li className="text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="2" />
                </svg>
                Venta de bicicletas de alta gama
              </li>
              <li className="text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="2" />
                </svg>
                Shimano Service Center
              </li>
              <li className="text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="2" />
                </svg>
                Accesorios y componentes premium
              </li>
              <li className="text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="2" />
                </svg>
                Indumentaria y equipamiento
              </li>
              <li className="text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-200"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <circle cx="6" cy="6" r="2" />
                </svg>
                Asesoramiento personalizado
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Redes Sociales</h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <div className="animate-fade-in" style={{animationDelay: `${index * 0.2}s`}} key={index}>
                  <SocialIcon {...social} />
                </div>
              ))}
            </div>
            <h5 className="text-white font-medium mb-2">Ubicación</h5>
            <div className="flex items-start">
              <svg
                className="w-5 h-5 mr-2 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-blue-100 text-sm">
                Av. del Libertador 2984, Buenos Aires, Argentina
              </span>
            </div>
            <div className="flex items-center mt-2">
              <svg
                className="w-5 h-5 mr-2 text-white flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href="tel:01137788374"
                className="text-blue-100 hover:text-blue-300 transition-colors text-sm"
              >
                011 3778-8374
              </a>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
  <div className="border-t border-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-blue-100 text-sm bg-white/5 rounded-lg px-4 py-2 inline-block shadow-md">
                &copy; {new Date().getFullYear()} OZZcycling. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-white/5 rounded-lg px-4 py-2 shadow-md">
              <div className="text-blue-100 text-xs">
                Desarrollado con <span aria-label="amor" role="img">❤️</span> por <span className="font-semibold text-white bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-600 bg-clip-text text-transparent">Pablo Proboste</span>
              </div>
              <span className="hidden md:inline text-blue-100">|</span>
              <a
                href="/politicas-de-privacidad"
                className="text-blue-100 hover:text-blue-300 transition-colors text-sm"
                aria-label="Políticas de Privacidad"
              >
                Políticas de Privacidad
              </a>
              <span className="text-blue-100">|</span>
              <a
                href="/terminos-y-condiciones"
                className="text-blue-100 hover:text-blue-300 transition-colors text-sm"
                aria-label="Términos y Condiciones"
              >
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
/* Animaciones para social icons y fade-in */
/* Puedes mover esto a tu CSS global si prefieres */
<style jsx>{`
  .animate-fade-in {
    animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px);}
    to { opacity: 1; transform: translateY(0);}
  }
`}</style>

export default Footer;
