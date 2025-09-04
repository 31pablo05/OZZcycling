import React from 'react';
import BikeFittingCalculator from '../components/BikeFittingCalculator';

const BikeFittingPage = () => {
  return (
    <section className="mt-16 md:mt-24 min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header informativo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-full mb-6">
            <span>⚡</span>
            <span className="font-semibold">Herramienta Exclusiva de la App</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Bike Fitting <span className="text-blue-600">Profesional</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Calculá la geometría perfecta para tu bicicleta con nuestra herramienta profesional. 
            Basada en métodos utilizados por mecánicos certificados de OZZcycling.
          </p>
        </div>

        {/* Beneficios de usar la herramienta */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="font-bold text-slate-900 mb-2">Precisión Profesional</h3>
            <p className="text-slate-600 text-sm">
              Algoritmos basados en métodos de fitting utilizados en talleres profesionales
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">💾</div>
            <h3 className="font-bold text-slate-900 mb-2">Guarda Múltiples Bicis</h3>
            <p className="text-slate-600 text-sm">
              Calcula y guarda configuraciones para diferentes tipos de bicicletas
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="font-bold text-slate-900 mb-2">Funciona Offline</h3>
            <p className="text-slate-600 text-sm">
              Disponible siempre, incluso sin conexión a internet
            </p>
          </div>
        </div>

        {/* Calculadora principal */}
        <BikeFittingCalculator />

        {/* Información adicional */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              🔧 ¿Qué es el Bike Fitting?
            </h3>
            <div className="space-y-4 text-slate-700">
              <p>
                El bike fitting es el proceso de ajustar tu bicicleta a las medidas específicas 
                de tu cuerpo para optimizar comodidad, eficiencia y prevenir lesiones.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mejora tu eficiencia de pedaleo hasta un 10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Reduce fatiga y previene lesiones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Aumenta comodidad en salidas largas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Optimiza transferencia de potencia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              📏 Cómo Tomar las Medidas
            </h3>
            <div className="space-y-4 text-slate-700">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Altura:</h4>
                <p className="text-sm">De pie, descalzo, contra una pared. Medir desde el suelo hasta la coronilla.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Entrepierna:</h4>
                <p className="text-sm">Con un libro entre las piernas, medir desde el suelo hasta el borde superior del libro.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Largo de brazos:</h4>
                <p className="text-sm">Del centro del pecho hasta la punta de los dedos con el brazo extendido.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Largo de torso:</h4>
                <p className="text-sm">Desde la base del cuello hasta la cadera, en posición sentada.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action para fitting profesional */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Querés un Fitting Profesional Completo?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Esta herramienta te da una excelente base, pero nuestro servicio profesional de 
            bike fitting incluye análisis biomecánico, ajustes finos y garantía de comodidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              📅 Agendar Fitting Profesional
            </a>
            <a
              href="https://wa.me/5491137788374?text=Hola! Me interesa el servicio de bike fitting profesional"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              💬 Consultar por WhatsApp
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>
            Esta herramienta proporciona estimaciones basadas en fórmulas profesionales. 
            Para un ajuste óptimo, recomendamos un fitting profesional en nuestro taller.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BikeFittingPage;
