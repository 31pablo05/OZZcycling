import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AppToolsWidget = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    // Verificar si la app está instalada
    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
      setIsInstalled(isStandalone);
      
      // Mostrar el widget después de unos segundos si está instalada
      if (isStandalone) {
        setTimeout(() => setShowWidget(true), 2000);
      }
    };

    checkInstallation();
  }, []);

  const tools = [
    {
      name: 'Bike Fitting',
      path: '/bike-fitting',
      icon: '📐',
      description: 'Calculá la geometría perfecta de tu bici',
      color: 'from-purple-500 to-blue-500'
    },
    {
      name: 'Mantenimiento',
      path: '/mantenimiento',
      icon: '🔧',
      description: 'Planificá el mantenimiento de tus bicis',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Rendimiento',
      path: '/rendimiento',
      icon: '⚡',
      description: 'Analizá tu performance y componentes',
      color: 'from-green-500 to-emerald-500'
    }
    // Aquí puedes agregar más herramientas en el futuro
  ];

  if (!isInstalled || !showWidget) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-40 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-200 p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-purple-600">⚡</span>
            <h3 className="font-bold text-slate-900 text-sm">Herramientas Exclusivas</h3>
          </div>
          <button
            onClick={() => setShowWidget(false)}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>
        
        <p className="text-xs text-slate-600 mb-4">
          ¡Aprovechá las herramientas exclusivas de la app!
        </p>
        
        <div className="space-y-2">
          {tools.map((tool, index) => (
            <Link
              key={index}
              to={tool.path}
              onClick={() => setShowWidget(false)}
              className={`block p-3 rounded-xl bg-gradient-to-r ${tool.color} text-white hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{tool.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs opacity-90">{tool.description}</div>
                </div>
                <span className="text-sm">→</span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-center text-slate-500">
          Solo disponible en la app instalada
        </div>
      </div>
    </div>
  );
};

export default AppToolsWidget;
