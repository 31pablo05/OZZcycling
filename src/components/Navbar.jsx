import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
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
  ? "bg-blue-900/60 backdrop-blur-2xl border-b border-blue-200/30 shadow-2xl shadow-blue-500/10 transition-all duration-700 fixed top-0 left-0 right-0 z-50"
  : "bg-gradient-to-r from-blue-900/80 via-blue-700/60 to-blue-500/40 backdrop-blur-xl transition-all duration-700 fixed top-0 left-0 right-0 z-50";

  const navLinks = [
    { name: "Inicio", path: "/", icon: "🏠" },
    { name: "Nosotros", path: "/nosotros", icon: "👥" },
    { name: "Servicios", path: "/servicios", icon: "⚙️" },
    { name: "Tienda", path: "/tienda", icon: "🛒" },
    { name: "Galeria", path: "/galeria", icon: "📸" },
    { name: "Contacto", path: "/contacto", icon: "💬" },
  ];

  // Herramientas exclusivas de la app
  const appTools = [
    { name: "Bike Fitting", path: "/bike-fitting", icon: "📐", description: "Calculadora profesional" },
    { name: "Mantenimiento", path: "/mantenimiento", icon: "🔧", description: "Planificador y recordatorios" },
    { name: "Rendimiento", path: "/rendimiento", icon: "⚡", description: "Análisis y comparación" },
    { name: "Instalar App", path: "/instalar", icon: "📱", description: "Descarga la aplicación", special: true },
  ];


  // Unifica los estilos de color para todos los links
  const getColorClasses = (isActive) => {
    return isActive
      ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white shadow-blue-500/30'
      : 'text-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:via-cyan-400 hover:to-blue-600 hover:text-white hover:shadow-blue-500/20';
  };

  const isActiveLink = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isToolsActive = () => {
    return appTools.some(tool => isActiveLink(tool.path)) || isActiveLink('/instalar');
  };

  return (
  <nav className={`${navClasses} py-4 px-6`}>
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
                src="/LOGO/logo2.webp"
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
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-gray-800 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'} rounded-full shadow-sm`}></span>
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-gray-800 transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1.5'} rounded-full shadow-sm`}></span>
              <span className={`block w-6 h-0.5 bg-gradient-to-r from-blue-600 to-gray-800 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''} rounded-full shadow-sm`}></span>
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
          
          {/* Menú desplegable de Herramientas */}
          <li className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
              className={`
                relative group flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl
                ${isToolsActive() 
                  ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 text-white shadow-blue-500/30 transform scale-105' 
                  : `${scrolled ? 'text-blue-900' : 'text-white'} ${getColorClasses(false)} hover:scale-105`
                }
              `}
            >
              {/* Fondo con brillo sutil */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Icono mejorado */}
              <span className="relative text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm">
                🛠️
              </span>
              
              {/* Texto */}
              <span className="relative tracking-wide font-medium">
                Herramientas
              </span>
              
              {/* Flecha */}
              <svg 
                className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              
              {/* Badge exclusivo con notificación de app disponible */}
              <div className="absolute -top-1 -right-1">
                <div className="flex items-center justify-center w-6 h-6 bg-green-500 text-white rounded-full text-xs font-bold animate-pulse shadow-lg">
                  📱
                </div>
              </div>
              
              {/* Indicador activo */}
              {isToolsActive() && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse"></div>
              )}
            </button>

            {/* Menú desplegable */}
            <div
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
              className={`
                absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300 z-50
                ${toolsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}
              `}
            >
              <div className="p-4">
                <div className="text-xs font-medium text-purple-600 mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  <span>HERRAMIENTAS EXCLUSIVAS DE LA APP</span>
                </div>
                
                <div className="space-y-2">
                  {appTools.map((tool, idx) => (
                    <Link
                      key={idx}
                      to={tool.path}
                      onClick={() => {
                        handleNavigation();
                        setToolsOpen(false);
                      }}
                      className={`
                        block p-3 rounded-xl transition-all duration-300 group hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50
                        ${isActiveLink(tool.path) ? 'bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200' : 'hover:bg-slate-50'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${isActiveLink(tool.path) ? 'text-purple-700' : 'text-slate-800'}`}>
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {tool.description}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center border border-green-200">
                  <div className="text-xs text-green-700 font-medium flex items-center justify-center gap-2">
                    <span>📱</span>
                    <span>¡Descarga GRATIS e instala todas las herramientas!</span>
                    <span>📱</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/* Menú desplegable para móviles mejorado */}
      <div className={`md:hidden transition-all duration-700 ease-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 mt-6 rounded-3xl mx-4 shadow-2xl shadow-blue-500/10 max-h-[80vh] overflow-y-auto mobile-menu-scroll">
          <ul className="py-6 space-y-3">
            {/* Links principales */}
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
                    ${item.special 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border border-green-400/30 animate-pulse-ring'
                      : isActiveLink(item.path) 
                        ? `${getColorClasses(true)}` 
                        : `text-blue-900 ${getColorClasses(false)}`
                    }
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Fondo con brillo */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                    item.special 
                      ? 'bg-gradient-to-r from-green-400/20 to-blue-400/20' 
                      : 'bg-gradient-to-r from-white/5 to-white/10'
                  }`}></div>
                  
                  {/* Icono */}
                  <span className={`relative text-xl opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm ${
                    item.special ? 'animate-bounce-gentle' : ''
                  }`}>
                    {item.icon}
                  </span>
                  
                  {/* Texto */}
                  <span className="relative tracking-wide flex-1">{item.name}</span>
                  
                  {/* Badge especial para app */}
                  {item.special && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                  
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

            {/* Sección de Herramientas */}
            <li className="px-4 mt-6">
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-4 border border-purple-200/30">
                {/* Header clickeable para plegar/desplegar */}
                <button
                  onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                  className="w-full text-center mb-3 group focus:outline-none"
                >
                  <div className="text-xs font-bold text-purple-600 flex items-center justify-center gap-2 group-hover:text-purple-700 transition-colors duration-300">
                    <span>🛠️</span>
                    <span>HERRAMIENTAS EXCLUSIVAS</span>
                    <span>📱</span>
                    <svg 
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${mobileToolsOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {/* Contenido plegable */}
                <div className={`transition-all duration-500 ease-out overflow-hidden ${
                  mobileToolsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-2">
                    {appTools.map((tool, idx) => (
                      <Link
                        key={idx}
                        to={tool.path}
                        onClick={() => {
                          setIsOpen(false);
                          handleNavigation();
                        }}
                        className={`
                          group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-500 overflow-hidden
                          ${tool.special
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg border-2 border-green-400'
                            : isActiveLink(tool.path) 
                              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                              : 'bg-white/50 text-purple-700 hover:bg-white/70'
                          }
                        `}
                        style={{
                          animationDelay: `${(navLinks.length + idx) * 100}ms`
                        }}
                      >
                        {/* Icono */}
                        <span className={`relative text-lg group-hover:scale-110 transition-all duration-300 ${tool.special ? 'animate-bounce' : ''}`}>
                          {tool.icon}
                        </span>
                        
                        {/* Contenido */}
                        <div className="flex-1">
                          <div className="font-semibold text-sm flex items-center gap-2">
                            {tool.name}
                            {tool.special && (
                              <span className="bg-white/20 text-xs px-2 py-1 rounded-full animate-pulse">
                                ¡GRATIS!
                              </span>
                            )}
                          </div>
                          <div className={`text-xs ${
                            tool.special || isActiveLink(tool.path) ? 'text-white/80' : 'text-purple-600/80'
                          }`}>
                            {tool.description}
                          </div>
                        </div>
                        
                        {/* Badge activo */}
                        {isActiveLink(tool.path) && (
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        )}
                        
                        {/* Flecha */}
                        <div className="relative">
                          <svg 
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center">
                    <div className="text-xs text-green-700 font-medium">
                      📱 ¡Instala GRATIS para acceder a todo!
                    </div>
                  </div>
                </div>

                {/* Indicador cuando está cerrado */}
                {!mobileToolsOpen && (
                  <div className="text-center text-xs text-purple-600/70 mt-2">
                    <span>Toca para ver {appTools.length} herramientas ↑</span>
                  </div>
                )}
              </div>
            </li>
            
            {/* Indicador de final del menú con padding extra */}
            <li className="px-4 pb-4">
              <div className="text-center text-xs text-blue-600/60 mt-2">
                <span>• • •</span>
              </div>
            </li>
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
    </nav>
  );
};

export default Navbar;