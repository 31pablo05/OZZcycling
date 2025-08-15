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
    <footer className="bg-[#004391] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Información Principal */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2 text-white">OZZcycling</h3>
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
                className="inline-block bg-[#379299] hover:bg-[#2d7a7f] text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
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
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} {...social} />
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
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-blue-100 text-sm">
                &copy; {new Date().getFullYear()} OZZcycling. Todos los derechos
                reservados.
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="text-blue-100 text-xs">
                Desarrollado con{" "}
                <span aria-label="amor" role="img">
                  ❤️
                </span>{" "}
                por{" "}
                <span className="font-semibold text-white">Pablo Proboste</span>
              </div>
              <span className="hidden md:inline text-blue-100">|</span>
              <a
                href="/politicas-de-privacidad"
                className="text-blue-100 hover:text-blue-300 transition-colors text-sm"
              >
                Políticas de Privacidad
              </a>
              <span className="text-blue-100">|</span>
              <a
                href="/terminos-y-condiciones"
                className="text-blue-100 hover:text-blue-300 transition-colors text-sm"
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

export default Footer;
