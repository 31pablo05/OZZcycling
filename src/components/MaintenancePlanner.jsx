import React, { useState, useEffect } from 'react';

const MaintenancePlanner = () => {
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [maintenanceLog, setMaintenanceLog] = useState([]);
  const [newBike, setNewBike] = useState({ name: '', type: '', totalKm: 0 });
  const [showAddBike, setShowAddBike] = useState(false);

  // Cargar datos al montar
  useEffect(() => {
    const savedBikes = localStorage.getItem('ozz-bikes');
    const savedLog = localStorage.getItem('ozz-maintenance-log');

    if (savedBikes) setBikes(JSON.parse(savedBikes));
    if (savedLog) setMaintenanceLog(JSON.parse(savedLog));
  }, []);

  // Guardar datos
  const saveData = (type, data) => {
    localStorage.setItem(`ozz-${type}`, JSON.stringify(data));
  };

  // Componentes principales
  const components = [
    { name: 'Cadena', life: 3000, current: 0 },
    { name: 'Cassette', life: 8000, current: 0 },
    { name: 'Frenos', life: 5000, current: 0 },
    { name: 'Cables', life: 4000, current: 0 },
    { name: 'Pastillas', life: 2000, current: 0 },
    { name: 'Cubiertas', life: 6000, current: 0 }
  ];

  // Checklist pre-salida
  const preRideChecklist = [
    'Presión de neumáticos correcta',
    'Frenos funcionando bien',
    'Cambios ajustados',
    'Cadena lubricada',
    'Luces funcionando',
    'Casco y elementos de seguridad',
    'Nivel de agua/hidratación',
    'Kit de reparación'
  ];

  const addBike = () => {
    if (!newBike.name) return;
    
    const bike = {
      id: Date.now(),
      ...newBike,
      components: components.map(comp => ({ ...comp, current: 0 })),
      createdAt: new Date().toISOString()
    };
    
    const updatedBikes = [...bikes, bike];
    setBikes(updatedBikes);
    saveData('bikes', updatedBikes);
    setNewBike({ name: '', type: '', totalKm: 0 });
    setShowAddBike(false);
  };

  const updateKilometers = (bikeId, newKm) => {
    const updatedBikes = bikes.map(bike => {
      if (bike.id === bikeId) {
        const kmDiff = newKm - bike.totalKm;
        return {
          ...bike,
          totalKm: newKm,
          components: bike.components.map(comp => ({
            ...comp,
            current: comp.current + kmDiff
          }))
        };
      }
      return bike;
    });
    setBikes(updatedBikes);
    saveData('bikes', updatedBikes);
  };

  const getComponentStatus = (component) => {
    const percentage = (component.current / component.life) * 100;
    if (percentage >= 90) return { status: 'danger', color: 'bg-red-500', text: 'Cambiar YA' };
    if (percentage >= 70) return { status: 'warning', color: 'bg-yellow-500', text: 'Cambiar Pronto' };
    return { status: 'good', color: 'bg-green-500', text: 'OK' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header mejorado */}
        <div className="text-center mb-12 relative">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/10 via-blue-500/10 to-slate-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="text-6xl mb-6 animate-pulse">🔧</div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-600 via-blue-500 to-slate-600 bg-clip-text text-transparent mb-4">
              Planificador de Mantenimiento
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              🚴‍♂️ Mantén tus bicicletas en perfecto estado con seguimiento profesional
            </p>
            
            {/* Badge exclusivo */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg animate-pulse">⚙️</span>
              <span>HERRAMIENTA PROFESIONAL</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">GRATIS</span>
            </div>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 mt-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">100%</div>
                <div className="text-xs text-slate-600">Prevención efectiva</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-slate-600">Monitoreo continuo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-600">Pro</div>
                <div className="text-xs text-slate-600">Nivel profesional</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selector/Agregar Bici mejorado */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🚲</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Mis Bicicletas
              </h2>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {bikes.length}
              </span>
            </div>
            <button
              onClick={() => setShowAddBike(!showAddBike)}
              className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">➕</span>
                <span>Agregar Bici</span>
              </div>
            </button>
          </div>

          {showAddBike && (
            <div className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-6 mb-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h3 className="font-bold text-slate-700">Agregar Nueva Bicicleta</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    🏷️ Nombre de la bici
                  </label>
                  <input
                    type="text"
                    placeholder="Mi bici favorita"
                    value={newBike.name}
                    onChange={(e) => setNewBike({...newBike, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold group-hover:border-blue-300"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    🚴 Tipo de bicicleta
                  </label>
                  <select
                    value={newBike.type}
                    onChange={(e) => setNewBike({...newBike, type: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold group-hover:border-blue-300"
                  >
                    <option value="">Selecciona tipo</option>
                    <option value="road">🏁 Ruta</option>
                    <option value="mountain">⛰️ MTB</option>
                    <option value="gravel">🛤️ Gravel</option>
                    <option value="urban">🏙️ Urbana</option>
                  </select>
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    📊 Kilómetros actuales
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        placeholder="0"
                        value={newBike.totalKm}
                        onChange={(e) => setNewBike({...newBike, totalKm: parseInt(e.target.value) || 0})}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold group-hover:border-blue-300"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                        km
                      </div>
                    </div>
                    <button
                      onClick={addBike}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <span className="text-xl">✅</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lista de bicis mejorada */}
          {bikes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚲</div>
              <p className="text-xl text-slate-500 mb-2">¡Agrega tu primera bicicleta!</p>
              <p className="text-slate-400">Comienza a gestionar el mantenimiento profesionalmente</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bikes.map(bike => {
                const typeIcons = {
                  road: '🏁',
                  mountain: '⛰️',
                  gravel: '🛤️',
                  urban: '🏙️'
                };
                const isSelected = selectedBike?.id === bike.id;
                
                return (
                  <div
                    key={bike.id}
                    onClick={() => setSelectedBike(bike)}
                    className={`group p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{typeIcons[bike.type] || '🚴'}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{bike.name}</h3>
                        <p className="text-sm text-slate-500 capitalize">{bike.type}</p>
                      </div>
                      {isSelected && (
                        <div className="text-blue-500 text-xl animate-pulse">✨</div>
                      )}
                    </div>
                    
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl font-black text-blue-600">{bike.totalKm.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">kilómetros recorridos</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-slate-400 text-center">
                      {isSelected ? '📍 Seleccionada' : '👆 Click para seleccionar'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      {/* Detalles de la bici seleccionada */}
      {selectedBike && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Estado de componentes mejorado */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">⚙️</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Estado de Componentes
              </h3>
            </div>
            
            <div className="space-y-4">
              {selectedBike.components.map((component, idx) => {
                const status = getComponentStatus(component);
                const percentage = Math.min((component.current / component.life) * 100, 100);
                
                const componentIcons = {
                  'Cadena': '🔗',
                  'Cassette': '⚙️',
                  'Frenos': '🛑',
                  'Cables': '🔌',
                  'Pastillas': '🟫',
                  'Cubiertas': '⚫'
                };
                
                return (
                  <div key={idx} className="group bg-gradient-to-r from-slate-50 to-white rounded-2xl p-4 border border-slate-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{componentIcons[component.name] || '🔧'}</span>
                        <span className="font-bold text-slate-800">{component.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                    
                    <div className="relative w-full bg-slate-200 rounded-full h-3 mb-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${status.color} shadow-inner`}
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">
                        {component.current.toLocaleString()} / {component.life.toLocaleString()} km
                      </span>
                      <span className="font-bold text-slate-800">
                        {percentage.toFixed(1)}% usado
                      </span>
                    </div>
                    
                    {percentage >= 70 && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-yellow-800 text-xs font-medium">
                          ⚠️ {percentage >= 90 ? 'Requiere reemplazo inmediato' : 'Programa el mantenimiento'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actualizar kilómetros mejorado */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📊</span>
                <h4 className="font-bold text-slate-700">Actualizar Kilómetros</h4>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="number"
                    placeholder={selectedBike.totalKm.toString()}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-bold text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        updateKilometers(selectedBike.id, parseInt(e.target.value) || 0);
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium">
                    km
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    const input = e.target.parentElement.previousElementSibling.querySelector('input');
                    updateKilometers(selectedBike.id, parseInt(input.value) || 0);
                    input.value = '';
                  }}
                  className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📈</span>
                    <span>Actualizar</span>
                  </div>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                💡 Actualiza después de cada salida para un seguimiento preciso
              </p>
            </div>
          </div>

          {/* Checklist pre-salida mejorado */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">✅</div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Checklist Pre-Salida
              </h3>
            </div>
            
            <div className="space-y-3">
              {preRideChecklist.map((item, idx) => {
                const itemIcons = [
                  '🚴', '🛑', '⚙️', '🔗', '💡', '🦺', '💧', '🔧'
                ];
                
                return (
                  <label key={idx} className="group flex items-center gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-slate-50 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-blue-200">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600 rounded-lg focus:ring-blue-500 focus:ring-2 transition-all duration-300"
                    />
                    <span className="text-xl">{itemIcons[idx]}</span>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Tips de seguridad */}
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💡</span>
                  <span className="font-bold text-green-800">Tip Profesional</span>
                </div>
                <p className="text-green-700 text-sm">
                  Completar este checklist antes de cada salida puede prevenir el 90% de problemas mecánicos en ruta.
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏆</span>
                  <span className="font-bold text-blue-800">Nivel Pro</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Los ciclistas profesionales realizan esta verificación antes de cada entrenamiento.
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="mt-6">
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl">🚀</span>
                  <span>¡Todo Listo para Salir!</span>
                  <span className="text-xl">✨</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Historial de mantenimiento mejorado */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">📋</div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Historial de Mantenimiento
            </h3>
            <span className="ml-auto bg-slate-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {maintenanceLog.filter(log => log.bikeId === selectedBike.id).length} registros
            </span>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {maintenanceLog
              .filter(log => log.bikeId === selectedBike.id)
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((log, index) => {
                const componentIcons = {
                  'Cadena': '🔗',
                  'Cassette': '⚙️',
                  'Frenos': '🛑',
                  'Cables': '🔌',
                  'Pastillas': '🟫',
                  'Cubiertas': '⚫'
                };
                
                return (
                  <div key={log.id} className="group relative">
                    {/* Línea de tiempo */}
                    {index < maintenanceLog.filter(log => log.bikeId === selectedBike.id).length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-8 bg-gradient-to-b from-blue-300 to-transparent"></div>
                    )}
                    
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                          {componentIcons[log.componentName] || '🔧'}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-slate-800">{log.componentName}</h4>
                            <p className="text-sm text-slate-600">{log.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500">{log.timestamp}</div>
                            <div className="text-sm font-bold text-blue-600">{log.km} km</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>🕐</span>
                          <span>Registrado por el sistema</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            
            {maintenanceLog.filter(log => log.bikeId === selectedBike.id).length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl text-slate-500 mb-2">Sin historial de mantenimiento</p>
                <p className="text-slate-400">Los registros aparecerán automáticamente cuando realices mantenimientos</p>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <span className="text-lg">💡</span>
                    <span className="font-bold text-blue-800">Próximamente</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Funcionalidad de registro manual de mantenimientos en desarrollo
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Botón para agregar mantenimiento */}
          {maintenanceLog.filter(log => log.bikeId === selectedBike.id).length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <button className="w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">➕</span>
                  <span>Registrar Mantenimiento Manual</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">PRÓXIMAMENTE</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenancePlanner;
