import React, { useState } from 'react';

const InstallLinkGenerator = () => {
  const [copiedState, setCopiedState] = useState('');

  const baseUrl = 'https://ozzcycling.vercel.app';
  
  const installLinks = [
    {
      title: 'Enlace de Instalación Automática',
      url: `${baseUrl}/?install=true`,
      description: 'Este enlace mostrará automáticamente el prompt de instalación',
      icon: '⚡'
    },
    {
      title: 'Página Dedicada de Instalación',
      url: `${baseUrl}/instalar`,
      description: 'Página completa con instrucciones detalladas para cada dispositivo',
      icon: '📱'
    },
    {
      title: 'Enlace Corto para WhatsApp',
      url: `${baseUrl}/?install=true`,
      description: 'Perfecto para compartir en WhatsApp Business o redes sociales',
      icon: '💬'
    }
  ];

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(type);
      setTimeout(() => setCopiedState(''), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `🚴‍♂️ ¡Descarga la App de OZZcycling!

📱 Instala nuestra app para:
• Acceso más rápido
• Funciona sin internet
• Notificaciones exclusivas
• Mejor experiencia de usuario

👇 Instalar ahora:
${baseUrl}/?install=true

¡Es gratis y solo toma 10 segundos! 🎉`;
    
    return encodeURIComponent(message);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          🔗 Generador de Enlaces de Instalación
        </h2>
        <p className="text-slate-600">
          Usa estos enlaces para compartir y promover la instalación de tu PWA
        </p>
      </div>

      <div className="space-y-6">
        {installLinks.map((link, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="text-3xl">{link.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 mb-2">{link.title}</h3>
                <p className="text-slate-600 text-sm mb-3">{link.description}</p>
                <div className="bg-white rounded-lg p-3 border border-slate-200 mb-3">
                  <code className="text-sm text-blue-600 break-all">{link.url}</code>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyToClipboard(link.url, `link-${index}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    {copiedState === `link-${index}` ? (
                      <>
                        <span>✅</span>
                        Copiado!
                      </>
                    ) : (
                      <>
                        <span>📋</span>
                        Copiar Enlace
                      </>
                    )}
                  </button>
                  
                  {index === 0 && (
                    <a
                      href={`https://wa.me/?text=${generateWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <span>💬</span>
                      Compartir en WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instrucciones adicionales */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-4">📋 Instrucciones de Uso:</h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>Enlace automático:</strong> Ideal para campañas de email o notificaciones push</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>Página dedicada:</strong> Mejor para usuarios que necesitan instrucciones detalladas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>WhatsApp:</strong> Perfecto para marketing directo y soporte al cliente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">•</span>
            <span><strong>Tip:</strong> Los enlaces funcionan mejor en Chrome (Android) y Safari (iOS)</span>
          </li>
        </ul>
      </div>

      {/* QR Codes */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="text-center">
          <h4 className="font-bold text-slate-900 mb-4">QR para Instalación Rápida</h4>
          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-300">
            <div className="text-6xl mb-2">📱</div>
            <p className="text-sm text-slate-600">
              Genera un QR en: <br />
              <a href="https://qr-code-generator.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                qr-code-generator.com
              </a>
            </p>
            <div className="mt-2 text-xs text-slate-500">
              URL: {baseUrl}/?install=true
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h4 className="font-bold text-slate-900 mb-4">Página de Instrucciones</h4>
          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-slate-300">
            <div className="text-6xl mb-2">📋</div>
            <p className="text-sm text-slate-600">
              Enlace completo: <br />
              <span className="font-mono text-xs break-all">{baseUrl}/instalar</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallLinkGenerator;
