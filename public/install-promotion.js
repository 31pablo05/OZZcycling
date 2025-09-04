// Script para promocionar instalación de PWA - OZZcycling
// Puedes insertar este código en emails, WhatsApp Business, etc.

(function() {
  'use strict';
  
  // Configuración
  const config = {
    appName: 'OZZcycling',
    appUrl: 'https://ozzcycling.vercel.app',
    installUrl: 'https://ozzcycling.vercel.app/?install=true',
    instructionsUrl: 'https://ozzcycling.vercel.app/instalar'
  };

  // Detectar dispositivo
  function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/android/.test(userAgent)) {
      return 'android';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      return 'ios';
    } else if (/windows/.test(userAgent)) {
      return 'windows';
    } else {
      return 'desktop';
    }
  }

  // Verificar si ya está instalado
  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone;
  }

  // Generar mensaje de WhatsApp
  function generateWhatsAppMessage() {
    const message = `🚴‍♂️ ¡Descarga la App de ${config.appName}!

📱 Beneficios de instalar nuestra app:
• Acceso más rápido sin abrir el navegador
• Funciona sin conexión a internet
• Recibe notificaciones exclusivas
• Mejor experiencia de usuario

👇 Instalar ahora (solo toma 10 segundos):
${config.installUrl}

📋 ¿Necesitas ayuda? Ve las instrucciones aquí:
${config.instructionsUrl}

¡Es completamente gratis! 🎉`;
    
    return encodeURIComponent(message);
  }

  // Generar mensaje de email
  function generateEmailContent() {
    return {
      subject: `Instala la App de ${config.appName} - Acceso más rápido!`,
      body: `Hola,

Te invitamos a instalar nuestra aplicación móvil para una experiencia mejorada:

🚴‍♂️ App de ${config.appName}

BENEFICIOS:
• Acceso instantáneo desde tu pantalla de inicio
• Funciona sin conexión a internet
• Notificaciones de ofertas exclusivas
• Interfaz optimizada para móviles

INSTALACIÓN RÁPIDA:
Haz clic aquí: ${config.installUrl}

INSTRUCCIONES DETALLADAS:
Si necesitas ayuda: ${config.instructionsUrl}

¡La instalación es gratuita y toma menos de 10 segundos!

Saludos,
Equipo ${config.appName}`
    };
  }

  // API pública para usar en marketing
  window.OZZInstallPromotion = {
    // Enlaces directos
    links: {
      install: config.installUrl,
      instructions: config.instructionsUrl,
      app: config.appUrl
    },
    
    // Funciones de utilidad
    detectDevice: detectDevice,
    isInstalled: isInstalled,
    
    // Generadores de contenido
    whatsapp: {
      message: generateWhatsAppMessage(),
      url: `https://wa.me/?text=${generateWhatsAppMessage()}`
    },
    
    email: generateEmailContent(),
    
    // Función para mostrar prompt de instalación
    showInstallPrompt: function() {
      if (isInstalled()) {
        alert('¡La app ya está instalada en tu dispositivo!');
        return;
      }
      
      // Redirigir al enlace de instalación
      window.location.href = config.installUrl;
    },
    
    // Función para copiar enlace al portapapeles
    copyInstallLink: async function() {
      try {
        await navigator.clipboard.writeText(config.installUrl);
        alert('¡Enlace copiado al portapapeles!');
        return true;
      } catch (err) {
        console.error('Error al copiar:', err);
        return false;
      }
    },
    
    // Widget HTML para insertar en páginas
    createWidget: function(container) {
      if (isInstalled()) return;
      
      const widget = document.createElement('div');
      widget.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white;
          padding: 16px;
          border-radius: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
          margin: 16px 0;
          text-align: center;
        ">
          <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
          <div style="font-weight: bold; margin-bottom: 8px;">
            ¡Instala la App de ${config.appName}!
          </div>
          <div style="font-size: 14px; margin-bottom: 12px; opacity: 0.9;">
            Acceso rápido • Sin internet • Notificaciones
          </div>
          <button onclick="window.OZZInstallPromotion.showInstallPrompt()" style="
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            margin-right: 8px;
          ">
            Instalar Ahora
          </button>
          <button onclick="window.OZZInstallPromotion.copyInstallLink()" style="
            background: transparent;
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12px;
          ">
            Copiar Enlace
          </button>
        </div>
      `;
      
      if (container) {
        container.appendChild(widget);
      } else {
        document.body.appendChild(widget);
      }
      
      return widget;
    }
  };

  console.log('📱 OZZ Install Promotion cargado. Usa window.OZZInstallPromotion para acceder a las funciones.');
})();

/* 
EJEMPLOS DE USO:

// 1. En JavaScript:
window.OZZInstallPromotion.showInstallPrompt();

// 2. En HTML:
<button onclick="window.OZZInstallPromotion.showInstallPrompt()">
  Instalar App
</button>

// 3. Crear widget automático:
window.OZZInstallPromotion.createWidget();

// 4. WhatsApp Business:
window.open(window.OZZInstallPromotion.whatsapp.url);

// 5. Copiar enlace:
window.OZZInstallPromotion.copyInstallLink();
*/
