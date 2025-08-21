import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const navClasses = scrolled 
    ? "bg-white/95 backdrop-blur-2xl border-b border-blue-200/30 shadow-2xl shadow-blue-500/10 transition-all duration-700 fixed top-0 left-0 right-0 z-50"
    : "bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-transparent backdrop-blur-xl transition-all duration-700 fixed top-0 left-0 right-0 z-50";

  const navLinks = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Nosotros", path: "/nosotros", icon: "👥" },
    { name: "Servicios", path: "/servicios", icon: "⚙️" },
    { name: "Tienda", path: "/tienda", icon: "🛒" },
    { name: "Galeria", path: "/galeria", icon: "📸" },
    { name: "Contacto", path: "/contacto", icon: "💬" },
  ];

  // Unifica los estilos de color para todos los links
  const getColorClasses = (isActive) => {
    return isActive
      ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white shadow-blue-500/30'
      : 'text-blue-900 hover:bg-gradient-to-r hover:from-blue-600 hover:via-cyan-500 hover:to-violet-600 hover:text-white hover:shadow-blue-500/20';
  };

  const isActiveLink = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`${navClasses} py-4 px-6 overflow-x-hidden`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo mejorado */}
        <Link 
          to="/" 
          className="group transition-all duration-500 hover:scale-110"
          onClick={handleNavigation}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"></div>
            <div className="relative bg-gradient-to-br from-white/20 to-white/5 rounded-2xl p-3 border border-white/30 backdrop-blur-sm shadow-xl">
              <img
                src="/LOGO/Log.OZZ.png"
                alt="OZZcycling Logo"
                className="h-12 w-auto drop-shadow-2xl transition-all duration-500 group-hover:brightness-110 group-hover:drop-shadow-3xl"
                width="89"
                height="48"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                style={{ 
                  maxWidth: '89px', 
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </Link>

        {/* Botón hamburguesa mejorado */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/30 text-blue-900 hover:from-blue-500/20 hover:to-purple-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-500 shadow-lg hover:shadow-xl"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'} rounded-full shadow-sm`}></span>
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1.5'} rounded-full shadow-sm`}></span>
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''} rounded-full shadow-sm`}></span>
            </div>
          </button>
        </div>

        {/* Menú principal mejorado */}
        <ul className="hidden md:flex items-center space-x-2">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={handleNavigation}
                className={`
                  relative group flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl
                  ${isActiveLink(item.path) 
                    ? `${getColorClasses(true)} transform scale-105` 
                    : `${scrolled ? 'text-blue-900' : 'text-white'} ${getColorClasses(false)} hover:scale-105`
                  }
                `}
              >
                {/* Fondo con brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Icono mejorado */}
                <span className="relative text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm">
                  {item.icon}
                </span>
                
                {/* Texto */}
                <span className="relative tracking-wide font-medium">
                  {item.name}
                </span>
                
                {/* Indicador activo */}
                {isActiveLink(item.path) && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
                )}
                
                {/* Efecto de brillo que se mueve */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menú desplegable para móviles mejorado */}
      <div className={`md:hidden transition-all duration-700 ease-out overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 mt-6 rounded-3xl mx-4 shadow-2xl shadow-blue-500/10">
          <ul className="py-6 space-y-3">
            {navLinks.map((item, index) => (
              <li key={index} className="px-4">
                <Link
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavigation();
                  }}
                  className={`
                    group relative flex items-center space-x-4 px-6 py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl
                    ${isActiveLink(item.path) 
                      ? `${getColorClasses(true)}` 
                      : `text-blue-900 ${getColorClasses(false)}`
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Fondo con brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Icono */}
                  <span className="relative text-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm">
                    {item.icon}
                  </span>
                  
                  {/* Texto */}
                  <span className="relative tracking-wide flex-1">{item.name}</span>
                  
                  {/* Flecha */}
                  <div className="relative ml-auto">
                    <svg 
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActiveLink(item.path) ? 'rotate-90 text-white' : 'group-hover:translate-x-2 group-hover:scale-110'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Indicador de carga mejorado */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 z-50 shadow-lg">
          <div className="h-full bg-gradient-to-r from-white/60 via-white/90 to-white/60 animate-pulse"></div>
          <div className="absolute top-0 left-0 h-full w-1/3 bg-white/80 animate-pulse rounded-full blur-sm" 
               style={{
                 animation: 'shimmer 1.5s ease-in-out infinite',
                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)'
               }}>
          </div>
        </div>
      )}

      {/* Estilos CSS internos */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;