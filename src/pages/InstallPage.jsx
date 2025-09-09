import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
          title: 'Android',
          steps: ['Toca el menú (⋮)', 'Selecciona "Agregar a inicio"', '¡Listo!'],
          icon: '🤖'
        };
      case 'ios-safari':
        return {
          title: 'iPhone/iPad',
          steps: ['Toca Compartir (□↗)', 'Toca "Agregar a inicio"', '¡Listo!'],
          icon: '📱'
        };
      case 'windows':
        return {
          title: 'Windows',
          steps: ['Busca el icono (+) en la URL', 'Haz clic en "Instalar"', '¡Listo!'],
          icon: '💻'
        };
      default:
        return {
          title: 'Tu Dispositivo',
          steps: ['Busca "Instalar" en tu navegador', 'Confirma la instalación', '¡Listo!'],
          icon: '📲'
        };
    }
  };

  const instructions = getInstructionContent();

  if (isInstalled) {
    return (
      <section style={{marginTop: '80px'}} className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">
              ¡App Instalada!
            </h1>
            <p className="text-slate-600 mb-6">
              OZZcycling ya está en tu dispositivo
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-500 hover:to-blue-500 transition-all duration-300 inline-block"
            >
              Abrir App
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{marginTop: '80px'}} className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Simple */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Instala <span className="text-green-600">OZZcycling</span>
          </h1>
          <p className="text-lg text-slate-600 mb-4">
            Acceso rápido desde tu pantalla de inicio
          </p>
          
          {/* Link directo de instalación */}
          <div className="bg-blue-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-slate-700 mb-2">📎 Enlace directo:</p>
            <div className="bg-white rounded-lg p-3 border-2 border-dashed border-blue-200">
              <code className="text-blue-600 text-sm break-all font-mono">
                https://ozzcycling.vercel.app/instalar
              </code>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Comparte este enlace para que otros instalen la app
            </p>
          </div>
        </div>

        {/* Botón Principal de Instalación */}
        {deferredPrompt ? (
          <div className="text-center mb-8">
            <button
              onClick={handleInstall}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">⬇️</span>
                Instalar App
              </span>
            </button>
            <p className="text-sm text-slate-500 mt-3">Un solo clic para instalar</p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="text-2xl mb-2">🔄</div>
              <p className="text-amber-800 font-medium">
                Para ver el botón de instalación automática:
              </p>
              <ul className="text-sm text-amber-700 mt-2 space-y-1">
                <li>• Actualiza la página (F5)</li>
                <li>• Usa Chrome, Edge o Safari</li>
                <li>• Verifica que estés en HTTPS</li>
              </ul>
            </div>
            <p className="text-slate-600">Mientras tanto, usa las instrucciones manuales abajo ⬇️</p>
          </div>
        )}

        {/* Instrucciones Simplificadas */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">{instructions.icon}</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {instructions.title}
            </h2>
          </div>

          <div className="space-y-4">
            {instructions.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-slate-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios Resumidos */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-slate-900 text-sm">Acceso Rápido</h3>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <div className="text-2xl mb-2">📶</div>
            <h3 className="font-bold text-slate-900 text-sm">Sin Internet</h3>
          </div>
        </div>

        {/* Ayuda adicional */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="font-bold text-slate-900 mb-3 text-center">💡 ¿Problemas para instalar?</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <span className="text-yellow-600">🔍</span>
              <p>Si no ves el botón "Instalar App", busca un ícono <strong>(+)</strong> en la barra de direcciones de tu navegador</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600">🔄</span>
              <p>En algunos navegadores, la opción aparece en el menú principal como "Instalar" o "Agregar a pantalla de inicio"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600">📧</span>
              <p>¿Necesitas ayuda? Envíanos un mensaje y te asistimos con la instalación</p>
            </div>
          </div>
        </div>

        {/* Volver al inicio */}
        <div className="text-center">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-800 transition-colors font-medium"
          >
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </section>
  );
};

export default InstallPage;
