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
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-4">🔧</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Planificador de Mantenimiento
        </h1>
        <p className="text-slate-600">
          Gestiona el mantenimiento de tus bicicletas y componentes
        </p>
      </div>

      {/* Selector/Agregar Bici */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mis Bicicletas</h2>
          <button
            onClick={() => setShowAddBike(!showAddBike)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Agregar Bici
          </button>
        </div>

        {showAddBike && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nombre de la bici"
                value={newBike.name}
                onChange={(e) => setNewBike({...newBike, name: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <select
                value={newBike.type}
                onChange={(e) => setNewBike({...newBike, type: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="">Tipo de bici</option>
                <option value="road">Ruta</option>
                <option value="mountain">MTB</option>
                <option value="gravel">Gravel</option>
                <option value="urban">Urbana</option>
              </select>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Km actuales"
                  value={newBike.totalKm}
                  onChange={(e) => setNewBike({...newBike, totalKm: parseInt(e.target.value) || 0})}
                  className="px-3 py-2 border rounded-lg flex-1"
                />
                <button
                  onClick={addBike}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  ✓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de bicis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bikes.map(bike => (
            <div
              key={bike.id}
              onClick={() => setSelectedBike(bike)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedBike?.id === bike.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <h3 className="font-bold">{bike.name}</h3>
              <p className="text-sm text-slate-600 capitalize">{bike.type}</p>
              <p className="text-lg font-bold text-blue-600">{bike.totalKm} km</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detalles de la bici seleccionada */}
      {selectedBike && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Estado de componentes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Estado de Componentes</h3>
            
            <div className="space-y-4">
              {selectedBike.components.map((component, idx) => {
                const status = getComponentStatus(component);
                const percentage = Math.min((component.current / component.life) * 100, 100);
                
                return (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{component.name}</span>
                      <span className={`px-2 py-1 rounded text-xs text-white ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${status.color}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="text-xs text-slate-600">
                      {component.current} / {component.life} km ({percentage.toFixed(0)}%)
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actualizar kilómetros */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium mb-2">Actualizar Kilómetros</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={selectedBike.totalKm}
                  className="px-3 py-2 border rounded-lg flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      updateKilometers(selectedBike.id, parseInt(e.target.value) || 0);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    updateKilometers(selectedBike.id, parseInt(input.value) || 0);
                    input.value = '';
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>

          {/* Checklist pre-salida */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Checklist Pre-Salida</h3>
            
            <div className="space-y-3">
              {preRideChecklist.map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>💡 Tip:</strong> Completar este checklist antes de cada salida 
                puede prevenir problemas mecánicos y mejorar tu seguridad.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Historial de mantenimiento */}
      {selectedBike && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Historial de Mantenimiento</h3>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {maintenanceLog
              .filter(log => log.bikeId === selectedBike.id)
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(log => (
                <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{log.componentName}</h4>
                      <p className="text-sm text-slate-600">{log.description}</p>
                    </div>
                    <div className="text-xs text-slate-500 text-right">
                      <div>{log.timestamp}</div>
                      <div>{log.km} km</div>
                    </div>
                  </div>
                </div>
              ))}
            
            {maintenanceLog.filter(log => log.bikeId === selectedBike.id).length === 0 && (
              <div className="text-center text-slate-500 py-8">
                No hay registros de mantenimiento aún
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePlanner;
