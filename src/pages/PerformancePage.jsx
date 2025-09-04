import React from 'react';
import PerformanceCalculator from '../components/PerformanceCalculator';

const PerformancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-white pt-24">
      <PerformanceCalculator />
      
      {/* Información adicional */}
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-4">
            🚀 Optimiza tu Rendimiento
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-sm text-green-800">
            <div>
              <h4 className="font-semibold mb-2">📊 Métricas Clave</h4>
              <ul className="space-y-1">
                <li>• Potencia/Peso: Indicador principal</li>
                <li>• Velocidad promedio por terreno</li>
                <li>• Eficiencia calórica</li>
                <li>• Consistencia en entrenamientos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🎯 Zonas de Entrenamiento</h4>
              <ul className="space-y-1">
                <li>• Z1: Recuperación (&lt;68% FC max)</li>
                <li>• Z2: Aeróbico (69-83% FC max)</li>
                <li>• Z3: Tempo (84-94% FC max)</li>
                <li>• Z4: Umbral (95-105% FC max)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">⚡ Mejoras de Componentes</h4>
              <ul className="space-y-1">
                <li>• Ruedas: Mayor impacto en velocidad</li>
                <li>• Peso: 1kg = ~10-15W menos</li>
                <li>• Aerodinámica: Posición y equipamiento</li>
                <li>• Presión de neumáticos óptima</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;
