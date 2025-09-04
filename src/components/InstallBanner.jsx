import React, { useState, useEffect } from 'react';

const InstallBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Verificar si ya está instalado
    const checkInstallation = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        setIsInstalled(true);
        return;
      }
    };

    // Verificar si el banner fue descartado previamente
    const wasDismissed = localStorage.getItem('ozz-install-banner-dismissed');
    
    checkInstallation();

    // Mostrar banner después de unos segundos si no está instalado ni descartado
    if (!isInstalled && !wasDismissed) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 3000); // Mostrar después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [isInstalled]);

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem('ozz-install-banner-dismissed', 'true');
  };

  const handleInstallClick = () => {
    // Disparar el evento para mostrar el prompt de instalación
    const event = new CustomEvent('show-install-prompt');
    window.dispatchEvent(event);
    handleDismiss();
  };

  // No mostrar si está instalado, descartado o no debe mostrarse
  if (isInstalled || dismissed || !showBanner) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                ¡Instala la App de OZZcycling!
              </p>
              <p className="text-xs text-blue-100">
                Acceso rápido, notificaciones y funciona sin internet
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 backdrop-blur-sm"
            >
              Instalar
            </button>
            <button
              onClick={handleDismiss}
              className="text-blue-100 hover:text-white p-1 transition-colors duration-200"
              aria-label="Cerrar banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;
