import React, { useState, useEffect } from 'react';

const BikeFittingCalculator = () => {
  const [measurements, setMeasurements] = useState({
    height: '',
    inseam: '',
    armLength: '',
    torsoLength: '',
    bikeType: 'road',
    ridingStyle: 'recreational'
  });

  const [results, setResults] = useState(null);
  const [savedFittings, setSavedFittings] = useState([]);

  // Cargar fittings guardados al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem('ozz-bike-fittings');
    if (saved) {
      setSavedFittings(JSON.parse(saved));
    }
  }, []);

  // Algoritmos de cálculo profesional
  const calculateFitting = () => {
    const height = parseFloat(measurements.height);
    const inseam = parseFloat(measurements.inseam);
    const armLength = parseFloat(measurements.armLength);
    const torsoLength = parseFloat(measurements.torsoLength);

    if (!height || !inseam) {
      alert('Por favor ingresa al menos tu altura y entrepierna');
      return;
    }

    // Factores de ajuste según tipo de bici y estilo
    const bikeFactors = {
      road: { frameReduction: 0.67, saddleHeight: 0.883, reach: 1.0 },
      mountain: { frameReduction: 0.63, saddleHeight: 0.885, reach: 0.95 },
      gravel: { frameReduction: 0.65, saddleHeight: 0.884, reach: 0.97 },
      triathlon: { frameReduction: 0.69, saddleHeight: 0.88, reach: 1.05 }
    };

    const styleFactors = {
      aggressive: { saddleAdjust: 1.02, reachAdjust: 1.03, stemLength: 1.1 },
      recreational: { saddleAdjust: 0.98, reachAdjust: 0.97, stemLength: 0.9 },
      comfort: { saddleAdjust: 0.95, reachAdjust: 0.93, stemLength: 0.85 }
    };

    const bikeFactor = bikeFactors[measurements.bikeType];
    const styleFactor = styleFactors[measurements.ridingStyle];

    // Cálculos principales
    const frameSize = inseam * bikeFactor.frameReduction;
    const saddleHeight = inseam * bikeFactor.saddleHeight * styleFactor.saddleAdjust;
    const saddleSetback = inseam * 0.045;
    
    // Cálculo de reach si tenemos medidas de brazos y torso
    let stemLength = 100; // default
    let reach = null;
    
    if (armLength && torsoLength) {
      const totalReach = (armLength + torsoLength) * bikeFactor.reach * styleFactor.reachAdjust;
      reach = totalReach * 0.4; // aproximación de reach horizontal
      stemLength = ((armLength * 0.8) + (torsoLength * 0.2)) * styleFactor.stemLength;
    }

    // Ajustes adicionales por tipo de bici
    let handlebarDrop = 30;
    if (measurements.bikeType === 'mountain') handlebarDrop = -10;
    if (measurements.bikeType === 'comfort') handlebarDrop = -20;
    if (measurements.ridingStyle === 'aggressive') handlebarDrop += 20;

    const fittingResults = {
      frameSize: Math.round(frameSize),
      saddleHeight: Math.round(saddleHeight * 10) / 10,
      saddleSetback: Math.round(saddleSetback * 10) / 10,
      stemLength: Math.round(stemLength),
      reach: reach ? Math.round(reach * 10) / 10 : null,
      handlebarDrop: handlebarDrop,
      crankLength: height < 170 ? 170 : height < 180 ? 172.5 : 175,
      timestamp: new Date().toLocaleString('es-AR'),
      bikeType: measurements.bikeType,
      ridingStyle: measurements.ridingStyle
    };

    setResults(fittingResults);
  };

  const saveFitting = () => {
    if (!results) return;
    
    const newFitting = {
      id: Date.now(),
      name: `Fitting ${results.bikeType} - ${results.timestamp}`,
      measurements: { ...measurements },
      results: { ...results }
    };

    const updatedFittings = [...savedFittings, newFitting];
    setSavedFittings(updatedFittings);
    localStorage.setItem('ozz-bike-fittings', JSON.stringify(updatedFittings));
    alert('¡Fitting guardado correctamente!');
  };

  const deleteFitting = (id) => {
    const updatedFittings = savedFittings.filter(f => f.id !== id);
    setSavedFittings(updatedFittings);
    localStorage.setItem('ozz-bike-fittings', JSON.stringify(updatedFittings));
  };

  const loadFitting = (fitting) => {
    setMeasurements(fitting.measurements);
    setResults(fitting.results);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🚴‍♂️</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Calculadora de Bike Fitting
        </h1>
        <p className="text-slate-600">
          Herramienta profesional para encontrar la geometría perfecta de tu bicicleta
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm mt-4">
          <span>⚡</span>
          <span>Exclusivo de la App OZZcycling</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulario de medidas */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📏 Tus Medidas</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Altura (cm) *
              </label>
              <input
                type="number"
                value={measurements.height}
                onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="175"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Entrepierna (cm) *
              </label>
              <input
                type="number"
                value={measurements.inseam}
                onChange={(e) => setMeasurements({...measurements, inseam: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="84"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Largo de brazos (cm)
              </label>
              <input
                type="number"
                value={measurements.armLength}
                onChange={(e) => setMeasurements({...measurements, armLength: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="65"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Largo de torso (cm)
              </label>
              <input
                type="number"
                value={measurements.torsoLength}
                onChange={(e) => setMeasurements({...measurements, torsoLength: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="58"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tipo de bicicleta
            </label>
            <select
              value={measurements.bikeType}
              onChange={(e) => setMeasurements({...measurements, bikeType: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="road">🏁 Ruta</option>
              <option value="mountain">⛰️ MTB</option>
              <option value="gravel">🛤️ Gravel</option>
              <option value="triathlon">🏊‍♂️ Triatlón</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Estilo de pedaleo
            </label>
            <select
              value={measurements.ridingStyle}
              onChange={(e) => setMeasurements({...measurements, ridingStyle: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="aggressive">🏎️ Agresivo/Competición</option>
              <option value="recreational">🚴‍♂️ Recreativo</option>
              <option value="comfort">😌 Comfort/Turismo</option>
            </select>
          </div>

          <button
            onClick={calculateFitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🧮 Calcular Fitting
          </button>
        </div>

        {/* Resultados */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">📊 Resultados del Fitting</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-4">✅ Tu Configuración Ideal</h3>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Talla del cuadro</div>
                    <div className="text-2xl font-bold text-blue-600">{results.frameSize} cm</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Altura de sillín</div>
                    <div className="text-2xl font-bold text-blue-600">{results.saddleHeight} cm</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Retroceso de sillín</div>
                    <div className="text-2xl font-bold text-blue-600">{results.saddleSetback} cm</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Largo de potencia</div>
                    <div className="text-2xl font-bold text-blue-600">{results.stemLength} mm</div>
                  </div>
                  
                  {results.reach && (
                    <div className="bg-white rounded-lg p-3">
                      <div className="font-medium text-slate-600">Reach horizontal</div>
                      <div className="text-2xl font-bold text-blue-600">{results.reach} cm</div>
                    </div>
                  )}
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Drop del manillar</div>
                    <div className="text-2xl font-bold text-blue-600">{results.handlebarDrop > 0 ? '+' : ''}{results.handlebarDrop} mm</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3">
                    <div className="font-medium text-slate-600">Largo de bielas</div>
                    <div className="text-2xl font-bold text-blue-600">{results.crankLength} mm</div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={saveFitting}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    💾 Guardar Fitting
                  </button>
                  <button
                    onClick={() => window.open('/contacto', '_blank')}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    📅 Agendar Fitting Profesional
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">💡 Recomendaciones:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Estos son cálculos estimativos basados en fórmulas profesionales</li>
                  <li>• Para un fitting completo, visitá nuestro taller</li>
                  <li>• Considerá flexibilidad y lesiones previas</li>
                  <li>• Ajustá gradualmente las medidas</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">📐</div>
              <p className="text-slate-600">
                Ingresá tus medidas para obtener tu configuración personalizada
              </p>
            </div>
          )}

          {/* Fittings guardados */}
          {savedFittings.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-bold text-slate-800 mb-3">📚 Fittings Guardados</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {savedFittings.map((fitting) => (
                  <div key={fitting.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{fitting.name}</div>
                      <div className="text-xs text-slate-600">
                        {fitting.results.bikeType} • Talla {fitting.results.frameSize}cm
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadFitting(fitting)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        📂
                      </button>
                      <button
                        onClick={() => deleteFitting(fitting.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeFittingCalculator;
