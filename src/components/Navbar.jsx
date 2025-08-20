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
    ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl transition-all duration-500 fixed top-0 left-0 right-0 z-50"
    : "bg-gradient-to-r from-black/40 to-transparent backdrop-blur-sm transition-all duration-500 fixed top-0 left-0 right-0 z-50";

  // Agregamos el botón "Nosotros"
  const navLinks = [
    { name: "Inicio", path: "/", icon: "🏠" },
     { name: "Nosotros", path: "/nosotros", icon: "👤" },
    { name: "Servicios", path: "/servicios", icon: "🛠️" },
    { name: "Tienda", path: "/tienda", icon: "🛒" },
    { name: "Contacto", path: "/contacto", icon: "📞" },
   
  ];

  const isActiveLink = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className={`${navClasses} py-3 px-4 overflow-x-hidden`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo actualizado */}
        <Link 
          to="/" 
          className="group transition-transform duration-300 hover:scale-105"
          onClick={handleNavigation}
        >
          <div className="relative">
            <img
              src="/LOGO/Log.OZZ.png"
              alt="OZZcycling Logo"
              className="h-12 w-auto drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-3xl"
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
            {/* Glow effect */}
            <div className="absolute inset-0 bg-blue-800/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </Link>

        {/* Botón hamburguesa para móviles */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-blue-900 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className={`block w-5 h-0.5 bg-blue-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : 'mb-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-blue-900 transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1'}`}></span>
              <span className={`block w-5 h-0.5 bg-blue-900 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Menú principal */}
        <ul className="hidden md:flex items-center space-x-1">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                onClick={handleNavigation}
                className={`
                  relative group flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300
                  ${isActiveLink(item.path) 
                    ? 'bg-blue-800 text-white shadow-lg transform scale-105' 
                    : 'text-blue-900 hover:text-white hover:bg-blue-800/80'
                  }
                `}
              >
                <span className="text-sm opacity-70 group-hover:opacity-100">{item.icon}</span>
                <span className="tracking-wide">{item.name}</span>
                {isActiveLink(item.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800/0 via-blue-800/10 to-blue-800/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menú desplegable para móviles */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 mt-4 rounded-xl mx-4">
          <ul className="py-4 space-y-2">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavigation();
                  }}
                  className={`
                    group flex items-center space-x-3 px-6 py-3 mx-2 rounded-lg font-medium transition-all duration-300
                    ${isActiveLink(item.path) 
                      ? 'bg-blue-800 text-white shadow-lg' 
                      : 'text-blue-900 hover:text-white hover:bg-blue-800/80'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.name}</span>
                  <div className="ml-auto">
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActiveLink(item.path) ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 to-blue-400 z-50">
          <div className="h-full bg-white/30 animate-pulse"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;