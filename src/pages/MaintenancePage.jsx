import React from 'react';
import MaintenancePlanner from '../components/MaintenancePlanner';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white pt-24">
      <MaintenancePlanner />
      
      {/* Información adicional */}
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">
            💡 Tips de Mantenimiento Profesional
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">🔧 Mantenimiento Preventivo</h4>
              <ul className="space-y-1">
                <li>• Lubrica la cadena cada 200-300 km</li>
                <li>• Revisa la presión de neumáticos antes de cada salida</li>
                <li>• Limpia la bici después de entrenamientos intensos</li>
                <li>• Ajusta cambios y frenos regularmente</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">⚠️ Señales de Alerta</h4>
              <ul className="space-y-1">
                <li>• Ruidos extraños en la transmisión</li>
                <li>• Frenos que requieren más fuerza</li>
                <li>• Cambios que no entran suavemente</li>
                <li>• Desgaste visible en componentes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
