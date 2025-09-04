import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstallLinkGenerator from '../components/InstallLinkGenerator';

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installInstructions, setInstallInstructions] = useState('');

  useEffect(() => {
    // Detectar dispositivo y browser
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (/android/.test(userAgent)) {
        if (/chrome/.test(userAgent)) {
          setInstallInstructions('chrome-android');
        } else if (/firefox/.test(userAgent)) {
          setInstallInstructions('firefox-android');
        } else {
          setInstallInstructions('android-other');
        }
      } else if (/iphone|ipad|ipod/.test(userAgent)) {
        setInstallInstructions('ios-safari');
      } else if (/windows/.test(userAgent)) {
        setInstallInstructions('windows');
      } else {
        setInstallInstructions('desktop');
      }
    };

    detectDevice();

    // Verificar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    // Listener para el prompt de instalación
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
    }
  };

  const getInstructionContent = () => {
    switch (installInstructions) {
      case 'chrome-android':
        return {
          title: 'Instalar en Android (Chrome)',
          steps: [
            '1. Toca el menú (⋮) en la esquina superior derecha',
            '2. Selecciona "Agregar a pantalla de inicio"',
            '3. Confirma tocando "Agregar"',
            '4. ¡La app aparecerá en tu pantalla de inicio!'
          ],
          icon: '🤖'
        };
      case 'ios-safari':
        return {
          title: 'Instalar en iOS (Safari)',
          steps: [
            '1. Toca el botón Compartir (□↗) en la parte inferior',
            '2. Desplázate y toca "Agregar a pantalla de inicio"',
            '3. Personaliza el nombre si deseas',
            '4. Toca "Agregar" en la esquina superior derecha'
          ],
          icon: '📱'
        };
      case 'windows':
        return {
          title: 'Instalar en Windows',
          steps: [
            '1. Busca el icono de instalación (+) en la barra de direcciones',
            '2. Haz clic en "Instalar OZZcycling"',
            '3. Confirma en el diálogo que aparece',
            '4. La app se agregará a tu menú de inicio'
          ],
          icon: '💻'
        };
      default:
        return {
          title: 'Instalar la App',
          steps: [
            '1. Busca la opción de "Instalar" en tu navegador',
            '2. Confirma la instalación',
            '3. La app se agregará a tu dispositivo',
            '4. ¡Disfruta de la experiencia mejorada!'
          ],
          icon: '📲'
        };
    }
  };

  const instructions = getInstructionContent();

  if (isInstalled) {
    return (
      <section className="mt-16 md:mt-24 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              ¡App Instalada!
            </h1>
            <p className="text-slate-600 mb-8">
              OZZcycling ya está instalada en tu dispositivo. Puedes acceder a ella desde tu pantalla de inicio.
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 inline-block"
            >
              Ir a la App
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 md:mt-24 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">📱</div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Instala la App de <span className="text-blue-600">OZZcycling</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Obtén la mejor experiencia con nuestra app. Acceso rápido, funciona sin internet y recibe notificaciones exclusivas.
          </p>
        </div>

        {/* Beneficios */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-bold text-slate-900 mb-2">Acceso Rápido</h3>
            <p className="text-slate-600 text-sm">
              Abre la app directamente desde tu pantalla de inicio
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">📶</div>
            <h3 className="font-bold text-slate-900 mb-2">Funciona Sin Internet</h3>
            <p className="text-slate-600 text-sm">
              Ve contenido guardado aunque no tengas conexión
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">🔔</div>
            <h3 className="font-bold text-slate-900 mb-2">Notificaciones</h3>
            <p className="text-slate-600 text-sm">
              Recibe ofertas exclusivas y novedades al instante
            </p>
          </div>
        </div>

        {/* Botón de instalación automática */}
        {deferredPrompt && (
          <div className="text-center mb-12">
            <button
              onClick={handleInstall}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 pwa-install-button"
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Instalar App Ahora
              </span>
            </button>
          </div>
        )}

        {/* Instrucciones manuales */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">{instructions.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {instructions.title}
            </h2>
            <p className="text-slate-600">
              Sigue estos pasos para instalar la app en tu dispositivo:
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {instructions.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <p className="text-blue-800 text-sm">
                <strong>💡 Tip:</strong> Una vez instalada, la app aparecerá en tu pantalla de inicio como cualquier otra aplicación nativa.
              </p>
            </div>
          </div>
        </div>

        {/* QR Code y enlace directo */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
            <h3 className="font-bold text-slate-900 mb-4">Comparte esta página</h3>
            <div className="bg-slate-100 rounded-lg p-4 mb-4">
              <code className="text-sm text-slate-700 break-all">
                https://ozzcycling.vercel.app/instalar
              </code>
            </div>
            <p className="text-slate-600 text-sm">
              Envía este enlace para que otros también puedan instalar la app
            </p>
          </div>
        </div>

        {/* Generador de enlaces para administradores */}
        <div className="mt-16">
          <InstallLinkGenerator />
        </div>
      </div>
    </section>
  );
};

export default InstallPage;
