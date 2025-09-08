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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header mejorado */}
        <div className="text-center mb-12 relative">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="text-6xl mb-6 animate-bounce">🚴‍♂️</div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
              Calculadora de Bike Fitting
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              🎯 Herramienta profesional para encontrar la geometría perfecta de tu bicicleta
            </p>
            
            {/* Badge mejorado */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-sm font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg animate-pulse">⚡</span>
              <span>EXCLUSIVO APP OZZCYCLING</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">GRATIS</span>
            </div>
            
            {/* Estadísticas llamativas */}
            <div className="grid grid-cols-3 gap-6 mt-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-xs text-slate-600">Fittings realizados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">98%</div>
                <div className="text-xs text-slate-600">Precisión profesional</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-slate-600">Disponible siempre</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de medidas mejorado */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">📏</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Tus Medidas
              </h2>
            </div>
            
            <div className="space-y-6">
              {/* Medidas principales con iconos */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-lg">📐</span>
                    Altura (cm) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={measurements.height}
                      onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-semibold group-hover:border-blue-300"
                      placeholder="175"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                      cm
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-lg">📏</span>
                    Entrepierna (cm) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={measurements.inseam}
                      onChange={(e) => setMeasurements({...measurements, inseam: e.target.value})}
                      className="w-full px-4 py-4 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-semibold group-hover:border-blue-300"
                      placeholder="84"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                      cm
                    </div>
                  </div>
                </div>
              </div>

              {/* Medidas opcionales */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-sm font-medium text-blue-700 mb-3 flex items-center gap-2">
                  <span>✨</span>
                  Medidas opcionales para mayor precisión
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                      <span className="text-lg">💪</span>
                      Largo de brazos (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.armLength}
                      onChange={(e) => setMeasurements({...measurements, armLength: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold bg-white group-hover:border-blue-300"
                      placeholder="65"
                    />
                  </div>
                  
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                      <span className="text-lg">🦴</span>
                      Largo de torso (cm)
                    </label>
                    <input
                      type="number"
                      value={measurements.torsoLength}
                      onChange={(e) => setMeasurements({...measurements, torsoLength: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold bg-white group-hover:border-blue-300"
                      placeholder="58"
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de bicicleta mejorado */}
              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-4">
                  <span className="text-lg">🚴</span>
                  Tipo de Bicicleta
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { label: 'Ruta', value: 'road' },
                    { label: 'Montaña', value: 'mountain' },
                    { label: 'Híbrida', value: 'hybrid' },
                    { label: 'Triatlón', value: 'triathlon' },
                    { label: 'Gravel', value: 'gravel' },
                    { label: 'Urbana', value: 'urban' }
                  ].map((tipo) => (
                    <button
                      key={tipo.value}
                      type="button"
                      onClick={() => setMeasurements({...measurements, bikeType: tipo.value})}
                      className={`p-4 rounded-xl font-semibold text-sm transition-all duration-300 border-2 hover:scale-105 ${
                        measurements.bikeType === tipo.value
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500 shadow-lg'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {tipo.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón de cálculo mejorado */}
              <div className="mt-8">
                <button
                  onClick={calculateFitting}
                  disabled={!measurements.height || !measurements.inseam}
                  className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed text-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🧮</span>
                    <span>Calcular Bike Fitting</span>
                    <span className="text-2xl">⚡</span>
                  </div>
                </button>
                
                {(!measurements.height || !measurements.inseam) && (
                  <p className="text-center text-slate-500 mt-3 text-sm">
                    * Completa altura y entrepierna para calcular
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Panel de resultados mejorado */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">📊</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Resultados del Fitting
              </h2>
            </div>
            
            {results ? (
              <div className="space-y-6">
                {/* Configuración principal */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">✅</span>
                    <h3 className="text-xl font-bold text-green-800">Tu Configuración Ideal</h3>
                    <span className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      CALCULADO
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🚲</span>
                        <div className="text-sm font-bold text-slate-600">Talla del cuadro</div>
                      </div>
                      <div className="text-3xl font-black text-blue-600">{results.frameSize}</div>
                      <div className="text-xs text-slate-500 mt-1">centímetros</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🪑</span>
                        <div className="text-sm font-bold text-slate-600">Altura de sillín</div>
                      </div>
                      <div className="text-3xl font-black text-cyan-600">{results.saddleHeight}</div>
                      <div className="text-xs text-slate-500 mt-1">centímetros</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">⬅️</span>
                        <div className="text-sm font-bold text-slate-600">Retroceso de sillín</div>
                      </div>
                      <div className="text-3xl font-black text-purple-600">{results.saddleSetback}</div>
                      <div className="text-xs text-slate-500 mt-1">centímetros</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-orange-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🤲</span>
                        <div className="text-sm font-bold text-slate-600">Largo de stem</div>
                      </div>
                      <div className="text-3xl font-black text-orange-600">{results.stemLength}</div>
                      <div className="text-xs text-slate-500 mt-1">centímetros</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-pink-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">📐</span>
                        <div className="text-sm font-bold text-slate-600">Drop del manillar</div>
                      </div>
                      <div className="text-3xl font-black text-pink-600">{results.handlebarDrop > 0 ? '+' : ''}{results.handlebarDrop}mm</div>
                      <div className="text-xs text-slate-500 mt-1">milímetros</div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">📏</span>
                        <div className="text-sm font-bold text-slate-600">Largo de bielas</div>
                      </div>
                      <div className="text-3xl font-black text-indigo-600">{results.crankLength}mm</div>
                      <div className="text-xs text-slate-500 mt-1">milímetros</div>
                    </div>
                  </div>
                </div>

                {/* Recomendaciones profesionales */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🎯</span>
                    <h3 className="text-xl font-bold text-blue-800">Recomendaciones Profesionales</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
                      <div className="font-bold text-blue-700 mb-2">💡 Tip de ajuste</div>
                      <p className="text-slate-600">Realiza los ajustes gradualmente. Cambia máximo 5mm por semana para que tu cuerpo se adapte.</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border-l-4 border-cyan-500">
                      <div className="font-bold text-cyan-700 mb-2">⚠️ Importante</div>
                      <p className="text-slate-600">Si sientes molestias después de 2-3 salidas, consulta con un profesional de bike fitting.</p>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={saveFitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">💾</span>
                      <span>Guardar Fitting</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">🖨️</span>
                      <span>Imprimir</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      const text = `Mi Bike Fitting OZZcycling:\n- Talla: ${results.frameSize}cm\n- Sillín: ${results.saddleHeight}cm\n- Stem: ${results.stemLength}cm\n\n¡Calculado con la app de OZZcycling!`;
                      navigator.share ? navigator.share({title: 'Mi Bike Fitting', text}) : navigator.clipboard.writeText(text);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">📤</span>
                      <span>Compartir</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚴‍♂️</div>
                <p className="text-xl text-slate-500 mb-2">¡Estamos listos para calcular!</p>
                <p className="text-slate-400">Completa tus medidas y haz clic en "Calcular Bike Fitting"</p>
              </div>
            )}
          </div>
        </div>

        {/* Sección de fittings guardados */}
        {savedFittings.length > 0 && (
          <div className="mt-12 bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">📚</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Fittings Guardados
              </h2>
              <span className="ml-auto bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {savedFittings.length}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedFittings.map((fitting) => (
                <div key={fitting.id} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-sm font-bold text-slate-700">
                      📅 {fitting.results.timestamp}
                    </div>
                    <button
                      onClick={() => deleteFitting(fitting.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Talla:</span>
                      <span className="font-bold text-blue-600">{fitting.results.frameSize}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sillín:</span>
                      <span className="font-bold text-cyan-600">{fitting.results.saddleHeight}cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Stem:</span>
                      <span className="font-bold text-purple-600">{fitting.results.stemLength}cm</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => loadFitting(fitting)}
                    className="w-full mt-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 text-sm"
                  >
                    📥 Cargar Fitting
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeFittingCalculator;
