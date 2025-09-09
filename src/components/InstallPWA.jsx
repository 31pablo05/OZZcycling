import React, { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detectar si ya está instalado
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        setIsInstalled(true);
        return;
      }
    };

    checkInstallation();

    // Listener para el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    // Listener para detectar cuando se instala la app
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log('PWA instalada exitosamente');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Mostrar el prompt de instalación
      deferredPrompt.prompt();
      
      // Esperar la respuesta del usuario
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('Usuario aceptó la instalación');
      } else {
        console.log('Usuario rechazó la instalación');
      }
      
      // Limpiar el prompt
      setDeferredPrompt(null);
      setShowInstallButton(false);
    } catch (error) {
      console.error('Error al instalar PWA:', error);
    }
  };

  // No mostrar nada si ya está instalado o no hay prompt disponible
  if (isInstalled || !showInstallButton) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleInstallClick}
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-5 py-3 rounded-2xl shadow-2xl hover:from-green-500 hover:to-blue-500 transition-all duration-300 flex items-center gap-3 group hover:scale-105 animate-pulse hover:animate-none"
        aria-label="Instalar aplicación OZZcycling"
      >
        <span className="text-xl">📱</span>
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm">Instalar App</span>
          <span className="text-xs opacity-80">OZZcycling</span>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </button>
      
      {/* Tooltip informativo mejorado */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-slate-900/95 text-white text-xs px-4 py-3 rounded-xl whitespace-nowrap backdrop-blur-sm shadow-2xl">
          <div className="font-semibold mb-1">📱 Instalar OZZcycling</div>
          <div className="text-slate-300">• Acceso desde pantalla de inicio</div>
          <div className="text-slate-300">• Funciona sin internet</div>
          <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-slate-900/95"></div>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;
