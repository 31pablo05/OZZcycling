import React, { useState, useEffect } from 'react';

const PerformanceCalculator = () => {
  const [rideData, setRideData] = useState({
    distance: '',
    time: '',
    weight: '',
    heartRate: '',
    power: '',
    elevation: ''
  });

  const [results, setResults] = useState(null);
  const [savedRides, setSavedRides] = useState([]);
  const [comparison, setComparison] = useState({
    component1: { name: '', weight: '', price: '', efficiency: '' },
    component2: { name: '', weight: '', price: '', efficiency: '' }
  });

  // Cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem('ozz-performance-rides');
    if (saved) setSavedRides(JSON.parse(saved));
  }, []);

  // Guardar datos
  const saveRide = (rideResults) => {
    const ride = {
      id: Date.now(),
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString('es-AR'),
      data: rideData,
      results: rideResults
    };
    
    const updated = [...savedRides, ride];
    setSavedRides(updated);
    localStorage.setItem('ozz-performance-rides', JSON.stringify(updated));
  };

  // Calcular rendimiento
  const calculatePerformance = () => {
    const distance = parseFloat(rideData.distance);
    const timeInMinutes = parseFloat(rideData.time);
    const weight = parseFloat(rideData.weight);
    const heartRate = parseFloat(rideData.heartRate);
    const elevation = parseFloat(rideData.elevation) || 0;
    
    if (!distance || !timeInMinutes || !weight) {
      alert('Por favor completa los campos básicos: distancia, tiempo y peso');
      return;
    }

    // Velocidad promedio
    const avgSpeed = (distance / (timeInMinutes / 60)).toFixed(1);
    
    // Potencia estimada (fórmula simplificada)
    const estimatedPower = rideData.power ? 
      parseFloat(rideData.power) : 
      Math.round(weight * 2.5 + (parseFloat(avgSpeed) * 8) + (elevation * 0.1));
    
    // Calorías (fórmula mejorada)
    const baseCalories = weight * timeInMinutes * 0.05;
    const intensityMultiplier = heartRate ? 
      (heartRate / 180) : 
      (parseFloat(avgSpeed) / 30);
    const calories = Math.round(baseCalories * intensityMultiplier * 12);
    
    // Eficiencia (Watts por kg)
    const powerToWeight = (estimatedPower / weight).toFixed(1);
    
    // Nivel de intensidad
    const getIntensityLevel = () => {
      if (parseFloat(avgSpeed) < 20) return { level: 'Recreativo', color: 'text-green-600' };
      if (parseFloat(avgSpeed) < 30) return { level: 'Moderado', color: 'text-yellow-600' };
      if (parseFloat(avgSpeed) < 40) return { level: 'Intenso', color: 'text-orange-600' };
      return { level: 'Competitivo', color: 'text-red-600' };
    };
    
    const intensity = getIntensityLevel();
    
    const calculatedResults = {
      avgSpeed,
      estimatedPower,
      calories,
      powerToWeight,
      intensity,
      efficiency: Math.round((distance / calories) * 1000) // km por 1000 calorías
    };
    
    setResults(calculatedResults);
    saveRide(calculatedResults);
  };

  // Comparar componentes
  const compareComponents = () => {
    const { component1, component2 } = comparison;
    
    if (!component1.name || !component2.name) {
      alert('Completa los datos de ambos componentes');
      return;
    }
    
    const weightDiff = parseFloat(component2.weight) - parseFloat(component1.weight);
    const priceDiff = parseFloat(component2.price) - parseFloat(component1.price);
    const efficiencyDiff = parseFloat(component2.efficiency) - parseFloat(component1.efficiency);
    
    return { weightDiff, priceDiff, efficiencyDiff };
  };

  const componentComparison = compareComponents();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Calculadora de Rendimiento
        </h1>
        <p className="text-slate-600">
          Analiza tu rendimiento y compara componentes
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculadora de Rendimiento */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">📊 Análisis de Rendimiento</h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Distancia (km)</label>
                <input
                  type="number"
                  value={rideData.distance}
                  onChange={(e) => setRideData({...rideData, distance: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Tiempo (minutos)</label>
                <input
                  type="number"
                  value={rideData.time}
                  onChange={(e) => setRideData({...rideData, time: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 120"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Peso (kg)</label>
                <input
                  type="number"
                  value={rideData.weight}
                  onChange={(e) => setRideData({...rideData, weight: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 70"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">FC Promedio (opcional)</label>
                <input
                  type="number"
                  value={rideData.heartRate}
                  onChange={(e) => setRideData({...rideData, heartRate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 150"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Potencia (W - opcional)</label>
                <input
                  type="number"
                  value={rideData.power}
                  onChange={(e) => setRideData({...rideData, power: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 250"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Desnivel (m - opcional)</label>
                <input
                  type="number"
                  value={rideData.elevation}
                  onChange={(e) => setRideData({...rideData, elevation: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="ej: 500"
                />
              </div>
            </div>

            <button
              onClick={calculatePerformance}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🚀 Calcular Rendimiento
            </button>
          </div>

          {/* Resultados */}
          {results && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-bold mb-3">📈 Resultados</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded">
                  <div className="text-slate-600">Velocidad Promedio</div>
                  <div className="text-xl font-bold text-blue-600">{results.avgSpeed} km/h</div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <div className="text-slate-600">Potencia Estimada</div>
                  <div className="text-xl font-bold text-green-600">{results.estimatedPower} W</div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <div className="text-slate-600">Calorías Quemadas</div>
                  <div className="text-xl font-bold text-red-600">{results.calories} cal</div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <div className="text-slate-600">Potencia/Peso</div>
                  <div className="text-xl font-bold text-purple-600">{results.powerToWeight} W/kg</div>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-white rounded text-center">
                <div className="text-slate-600">Nivel de Intensidad</div>
                <div className={`text-lg font-bold ${results.intensity.color}`}>
                  {results.intensity.level}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparador de Componentes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">⚖️ Comparador de Componentes</h2>
          
          <div className="space-y-6">
            {/* Componente 1 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 text-blue-600">Componente A</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre del componente"
                  value={comparison.component1.name}
                  onChange={(e) => setComparison({
                    ...comparison,
                    component1: {...comparison.component1, name: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Peso (g)"
                    value={comparison.component1.weight}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component1: {...comparison.component1, weight: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Precio ($)"
                    value={comparison.component1.price}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component1: {...comparison.component1, price: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Eficiencia (1-10)"
                    value={comparison.component1.efficiency}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component1: {...comparison.component1, efficiency: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="inline-block bg-slate-100 rounded-full p-2">
                <span className="text-lg font-bold">VS</span>
              </div>
            </div>

            {/* Componente 2 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 text-green-600">Componente B</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nombre del componente"
                  value={comparison.component2.name}
                  onChange={(e) => setComparison({
                    ...comparison,
                    component2: {...comparison.component2, name: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Peso (g)"
                    value={comparison.component2.weight}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component2: {...comparison.component2, weight: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Precio ($)"
                    value={comparison.component2.price}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component2: {...comparison.component2, price: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Eficiencia (1-10)"
                    value={comparison.component2.efficiency}
                    onChange={(e) => setComparison({
                      ...comparison,
                      component2: {...comparison.component2, efficiency: e.target.value}
                    })}
                    className="px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Resultado de comparación */}
            {componentComparison && comparison.component1.name && comparison.component2.name && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">📊 Comparación</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Diferencia de peso:</span>
                    <span className={componentComparison.weightDiff < 0 ? 'text-green-600' : 'text-red-600'}>
                      {componentComparison.weightDiff > 0 ? '+' : ''}{componentComparison.weightDiff}g
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diferencia de precio:</span>
                    <span className={componentComparison.priceDiff < 0 ? 'text-green-600' : 'text-red-600'}>
                      {componentComparison.priceDiff > 0 ? '+' : ''}${componentComparison.priceDiff}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diferencia de eficiencia:</span>
                    <span className={componentComparison.efficiencyDiff > 0 ? 'text-green-600' : 'text-red-600'}>
                      {componentComparison.efficiencyDiff > 0 ? '+' : ''}{componentComparison.efficiencyDiff}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Historial de entrenamientos */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">📚 Historial de Entrenamientos</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Fecha</th>
                <th className="text-left p-2">Distancia</th>
                <th className="text-left p-2">Velocidad</th>
                <th className="text-left p-2">Potencia</th>
                <th className="text-left p-2">Calorías</th>
              </tr>
            </thead>
            <tbody>
              {savedRides.slice(-10).reverse().map(ride => (
                <tr key={ride.id} className="border-b hover:bg-slate-50">
                  <td className="p-2">{ride.timestamp}</td>
                  <td className="p-2">{ride.data.distance} km</td>
                  <td className="p-2">{ride.results.avgSpeed} km/h</td>
                  <td className="p-2">{ride.results.estimatedPower} W</td>
                  <td className="p-2">{ride.results.calories} cal</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {savedRides.length === 0 && (
            <div className="text-center text-slate-500 py-8">
              No hay entrenamientos registrados aún
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCalculator;
