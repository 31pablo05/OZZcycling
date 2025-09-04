import React, { useEffect } from 'react';

const AutoInstallHandler = () => {
  useEffect(() => {
    // Verificar si hay parámetro de instalación en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const shouldInstall = urlParams.get('install') === 'true';

    // Listener para capturar el prompt de instalación
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      
      // Si hay parámetro de instalación, mostrar automáticamente
      if (shouldInstall) {
        setTimeout(() => {
          showInstallPrompt(e);
        }, 1500); // Esperar 1.5 segundos para que cargue la página
      }
    };

    const showInstallPrompt = async (prompt) => {
      if (prompt) {
        try {
          prompt.prompt();
          const { outcome } = await prompt.userChoice;
          
          if (outcome === 'accepted') {
            console.log('Usuario instaló la app desde enlace directo');
            // Limpiar el parámetro de la URL
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
          }
        } catch (error) {
          console.error('Error en instalación automática:', error);
        }
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return null; // Este componente no renderiza nada
};

export default AutoInstallHandler;
