import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ZonesNutritionGPS = () => {
  // Estados para zonas de entrenamiento
  const [userProfile, setUserProfile] = useState({
    fcMax: '',
    ftp: '',
    weight: 70,
    age: 30,
    gender: 'male',
    trainingType: 'hr' // 'hr' para frecuencia cardíaca, 'power' para potencia
  });
  
  const [zones, setZones] = useState([]);
  
  // Estados para nutrición
  const [nutritionPlan, setNutritionPlan] = useState({
    duration: 2, // horas
    temperature: 20, // celsius
    intensity: 'moderate',
    recommendations: null
  });
  
  // Estados para GPS
  const [gpsTracking, setGpsTracking] = useState({
    isTracking: false,
    currentPosition: null,
    route: [],
    distance: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    startTime: null,
    elapsedTime: 0
  });
  
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const watchIdRef = useRef(null);
  const intervalRef = useRef(null);

  // Calcular zonas de entrenamiento
  const calculateZones = useCallback((profile = userProfile) => {
    if (profile.trainingType === 'hr' && profile.fcMax) {
      const hrZones = [
        { name: 'Z1 - Recuperación Activa', min: Math.round(profile.fcMax * 0.50), max: Math.round(profile.fcMax * 0.60), color: 'bg-gray-400', description: 'Muy fácil, conversacional' },
        { name: 'Z2 - Aeróbico Base', min: Math.round(profile.fcMax * 0.60), max: Math.round(profile.fcMax * 0.70), color: 'bg-blue-400', description: 'Fácil, quema grasas' },
        { name: 'Z3 - Tempo', min: Math.round(profile.fcMax * 0.70), max: Math.round(profile.fcMax * 0.80), color: 'bg-green-400', description: 'Moderado, conversación difícil' },
        { name: 'Z4 - Umbral', min: Math.round(profile.fcMax * 0.80), max: Math.round(profile.fcMax * 0.90), color: 'bg-yellow-400', description: 'Duro, sin conversación' },
        { name: 'Z5 - VO2 Max', min: Math.round(profile.fcMax * 0.90), max: Math.round(profile.fcMax * 0.95), color: 'bg-orange-400', description: 'Muy duro, intervalos' },
        { name: 'Z6 - Neuromuscular', min: Math.round(profile.fcMax * 0.95), max: profile.fcMax, color: 'bg-red-400', description: 'Máximo, sprints' }
      ];
      setZones(hrZones);
    } else if (profile.trainingType === 'power' && profile.ftp) {
      const powerZones = [
        { name: 'Z1 - Recuperación Activa', min: 0, max: Math.round(profile.ftp * 0.55), color: 'bg-gray-400', description: 'Muy fácil, < 55% FTP' },
        { name: 'Z2 - Resistencia', min: Math.round(profile.ftp * 0.56), max: Math.round(profile.ftp * 0.75), color: 'bg-blue-400', description: 'Fácil, 56-75% FTP' },
        { name: 'Z3 - Tempo', min: Math.round(profile.ftp * 0.76), max: Math.round(profile.ftp * 0.90), color: 'bg-green-400', description: 'Moderado, 76-90% FTP' },
        { name: 'Z4 - Umbral', min: Math.round(profile.ftp * 0.91), max: Math.round(profile.ftp * 0.105), color: 'bg-yellow-400', description: 'Duro, 91-105% FTP' },
        { name: 'Z5 - VO2 Max', min: Math.round(profile.ftp * 1.06), max: Math.round(profile.ftp * 1.20), color: 'bg-orange-400', description: 'Muy duro, 106-120% FTP' },
        { name: 'Z6 - Neuromuscular', min: Math.round(profile.ftp * 1.21), max: Math.round(profile.ftp * 1.50), color: 'bg-red-400', description: 'Máximo, > 120% FTP' }
      ];
      setZones(powerZones);
    }
  }, [userProfile]);

  // Cargar datos guardados
  useEffect(() => {
    const savedProfile = localStorage.getItem('ozz-user-profile');
    const savedRoutes = localStorage.getItem('ozz-saved-routes');
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      if (profile.fcMax || profile.ftp) {
        calculateZones(profile);
      }
    }
    if (savedRoutes) setSavedRoutes(JSON.parse(savedRoutes));
  }, [calculateZones]);

  // Estimar FC máxima
  const estimateHRMax = () => {
    const estimated = 220 - userProfile.age;
    setUserProfile(prev => ({ ...prev, fcMax: estimated }));
    calculateZones({ ...userProfile, fcMax: estimated });
  };

  // Calcular recomendaciones nutricionales
  const calculateNutrition = () => {
    const { duration, temperature, intensity } = nutritionPlan;
    
    // Factores de intensidad
    const intensityFactors = {
      easy: { carbs: 30, water: 0.5 },
      moderate: { carbs: 45, water: 0.75 },
      hard: { carbs: 60, water: 1.0 },
      extreme: { carbs: 90, water: 1.25 }
    };
    
    // Cálculos
    const factor = intensityFactors[intensity];
    const carbsPerHour = factor.carbs;
    const baseWaterPerHour = factor.water;
    
    // Ajuste por temperatura
    const tempAdjustment = temperature > 25 ? 1.3 : temperature < 10 ? 0.8 : 1.0;
    
    // Recomendaciones finales
    const recommendations = {
      totalCarbs: Math.round(carbsPerHour * duration),
      carbsPerHour: carbsPerHour,
      totalWater: Math.round((baseWaterPerHour * duration * tempAdjustment) * 10) / 10,
      waterPerHour: Math.round((baseWaterPerHour * tempAdjustment) * 10) / 10,
      calories: Math.round(carbsPerHour * duration * 4), // 4 cal por gramo de carbs
      electrolytes: duration > 1 ? 'Necesarios' : 'Opcionales'
    };
    
    setNutritionPlan(prev => ({ ...prev, recommendations }));
  };

  // Funciones GPS
  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('GPS no disponible en este dispositivo');
      return;
    }

    setGpsTracking(prev => ({
      ...prev,
      isTracking: true,
      startTime: Date.now(),
      route: [],
      distance: 0,
      averageSpeed: 0,
      maxSpeed: 0
    }));

    // Obtener posición inicial
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          speed: position.coords.speed || 0
        };
        
        setGpsTracking(prev => ({
          ...prev,
          currentPosition: newPosition,
          route: [newPosition]
        }));
        setShowMap(true);
      },
      (error) => {
        console.error('Error GPS:', error);
        alert('Error al acceder al GPS');
        setGpsTracking(prev => ({ ...prev, isTracking: false }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );

    // Iniciar seguimiento continuo
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          speed: position.coords.speed || 0
        };

        setGpsTracking(prev => {
          const newRoute = [...prev.route, newPosition];
          const newDistance = calculateDistance(prev.route, newPosition);
          const elapsed = (Date.now() - prev.startTime) / 1000 / 3600; // horas
          const avgSpeed = elapsed > 0 ? newDistance / elapsed : 0;
          const maxSpeed = Math.max(prev.maxSpeed, newPosition.speed * 3.6 || 0); // m/s a km/h

          return {
            ...prev,
            currentPosition: newPosition,
            route: newRoute,
            distance: newDistance,
            averageSpeed: avgSpeed,
            maxSpeed: maxSpeed
          };
        });
      },
      (error) => console.error('Error GPS tracking:', error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
    );

    // Timer para tiempo transcurrido
    intervalRef.current = setInterval(() => {
      setGpsTracking(prev => ({
        ...prev,
        elapsedTime: prev.startTime ? (Date.now() - prev.startTime) / 1000 : 0
      }));
    }, 1000);
  };

  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Guardar ruta
    if (gpsTracking.route.length > 1) {
      const newRoute = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        distance: gpsTracking.distance,
        duration: gpsTracking.elapsedTime,
        averageSpeed: gpsTracking.averageSpeed,
        maxSpeed: gpsTracking.maxSpeed,
        route: gpsTracking.route
      };
      
      const updated = [newRoute, ...savedRoutes];
      setSavedRoutes(updated);
      localStorage.setItem('ozz-saved-routes', JSON.stringify(updated));
    }

    setGpsTracking(prev => ({ ...prev, isTracking: false }));
  };

  // Calcular distancia entre puntos
  const calculateDistance = (route, newPoint) => {
    if (route.length === 0) return 0;
    
    let totalDistance = 0;
    for (let i = 1; i < route.length; i++) {
      totalDistance += getDistanceBetweenPoints(route[i-1], route[i]);
    }
    
    if (route.length > 0) {
      totalDistance += getDistanceBetweenPoints(route[route.length - 1], newPoint);
    }
    
    return totalDistance;
  };

  // Fórmula de Haversine para calcular distancia
  const getDistanceBetweenPoints = (point1, point2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Formatear tiempo
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Guardar perfil
  const saveProfile = () => {
    localStorage.setItem('ozz-user-profile', JSON.stringify(userProfile));
    calculateZones();
    alert('Perfil guardado correctamente');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-500/10 to-green-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="text-6xl mb-6 animate-pulse">🎯</div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-600 via-blue-500 to-green-600 bg-clip-text text-transparent mb-4">
              Zonas + Nutrición + GPS
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              🚴‍♂️ Centro de entrenamiento completo con seguimiento profesional
            </p>
            
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg animate-pulse">📊</span>
              <span>HERRAMIENTA COMPLETA</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">GRATIS</span>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna 1: Zonas de Entrenamiento */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🎯</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Zonas de Entrenamiento
              </h2>
            </div>

            {/* Configuración de perfil */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">👤 Edad</label>
                  <input
                    type="number"
                    value={userProfile.age}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">⚖️ Peso (kg)</label>
                  <input
                    type="number"
                    value={userProfile.weight}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">📊 Tipo de entrenamiento</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setUserProfile(prev => ({ ...prev, trainingType: 'hr' }))}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      userProfile.trainingType === 'hr'
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ❤️ Frecuencia Cardíaca
                  </button>
                  <button
                    onClick={() => setUserProfile(prev => ({ ...prev, trainingType: 'power' }))}
                    className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      userProfile.trainingType === 'power'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ⚡ Potencia
                  </button>
                </div>
              </div>

              {userProfile.trainingType === 'hr' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">❤️ FC Máxima</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={userProfile.fcMax}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, fcMax: parseInt(e.target.value) || 0 }))}
                      className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                      placeholder="185"
                    />
                    <button
                      onClick={estimateHRMax}
                      className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors text-sm"
                    >
                      Estimar
                    </button>
                  </div>
                </div>
              )}

              {userProfile.trainingType === 'power' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">⚡ FTP (watts)</label>
                  <input
                    type="number"
                    value={userProfile.ftp}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, ftp: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                    placeholder="250"
                  />
                </div>
              )}

              <button
                onClick={saveProfile}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                💾 Guardar Perfil y Calcular Zonas
              </button>
            </div>

            {/* Zonas calculadas */}
            {zones.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 mb-3">📊 Tus Zonas de Entrenamiento</h3>
                {zones.map((zone, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-4 h-4 rounded-full ${zone.color}`}></div>
                      <span className="font-bold text-slate-800">{zone.name}</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600 mb-1">
                      {zone.min} - {zone.max} {userProfile.trainingType === 'hr' ? 'bpm' : 'w'}
                    </div>
                    <div className="text-sm text-slate-600">{zone.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna 2: Nutrición */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🍎</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Planificación Nutricional
              </h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">⏱️ Duración (horas)</label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="12"
                  value={nutritionPlan.duration}
                  onChange={(e) => setNutritionPlan(prev => ({ ...prev, duration: parseFloat(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">🌡️ Temperatura (°C)</label>
                <input
                  type="number"
                  value={nutritionPlan.temperature}
                  onChange={(e) => setNutritionPlan(prev => ({ ...prev, temperature: parseInt(e.target.value) || 20 }))}
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">💪 Intensidad</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'easy', label: '😌 Fácil', color: 'from-green-400 to-emerald-400' },
                    { key: 'moderate', label: '🚴 Moderado', color: 'from-yellow-400 to-orange-400' },
                    { key: 'hard', label: '🔥 Duro', color: 'from-orange-500 to-red-500' },
                    { key: 'extreme', label: '⚡ Extremo', color: 'from-red-500 to-purple-500' }
                  ].map(intensity => (
                    <button
                      key={intensity.key}
                      onClick={() => setNutritionPlan(prev => ({ ...prev, intensity: intensity.key }))}
                      className={`p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        nutritionPlan.intensity === intensity.key
                          ? `bg-gradient-to-r ${intensity.color} text-white shadow-lg scale-105`
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {intensity.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateNutrition}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                🧮 Calcular Nutrición
              </button>
            </div>

            {/* Recomendaciones nutricionales */}
            {nutritionPlan.recommendations && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 mb-3">🍯 Recomendaciones</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🍯</div>
                      <div className="text-2xl font-black text-orange-600">
                        {nutritionPlan.recommendations.totalCarbs}g
                      </div>
                      <div className="text-xs text-orange-700">Carbohidratos totales</div>
                      <div className="text-xs text-orange-600 mt-1">
                        {nutritionPlan.recommendations.carbsPerHour}g/hora
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">💧</div>
                      <div className="text-2xl font-black text-blue-600">
                        {nutritionPlan.recommendations.totalWater}L
                      </div>
                      <div className="text-xs text-blue-700">Agua total</div>
                      <div className="text-xs text-blue-600 mt-1">
                        {nutritionPlan.recommendations.waterPerHour}L/hora
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-2xl font-black text-purple-600">
                        {nutritionPlan.recommendations.calories}
                      </div>
                      <div className="text-xs text-purple-700">Calorías</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-sm font-black text-green-600">
                        {nutritionPlan.recommendations.electrolytes}
                      </div>
                      <div className="text-xs text-green-700">Electrolitos</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <div className="font-bold mb-2">💡 Consejos:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• Bebe cada 15-20 minutos</li>
                      <li>• Come carbohidratos cada 30-45 minutos</li>
                      <li>• Ajusta según sensaciones personales</li>
                      <li>• Hidrátate antes, durante y después</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Columna 3: GPS Tracker */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🗺️</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                GPS Tracker
              </h2>
            </div>

            {/* Controles GPS */}
            <div className="space-y-4 mb-6">
              {!gpsTracking.isTracking ? (
                <button
                  onClick={startTracking}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">📍</span>
                    <span>Iniciar Seguimiento GPS</span>
                  </div>
                </button>
              ) : (
                <button
                  onClick={stopTracking}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">⏹️</span>
                    <span>Detener Seguimiento</span>
                  </div>
                </button>
              )}

              {/* Estadísticas en tiempo real */}
              {gpsTracking.isTracking && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-center">
                    <div className="text-lg font-black text-green-600">
                      {gpsTracking.distance.toFixed(2)}
                    </div>
                    <div className="text-xs text-green-700">km recorridos</div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                    <div className="text-lg font-black text-blue-600">
                      {formatTime(gpsTracking.elapsedTime)}
                    </div>
                    <div className="text-xs text-blue-700">tiempo</div>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-center">
                    <div className="text-lg font-black text-orange-600">
                      {gpsTracking.averageSpeed.toFixed(1)}
                    </div>
                    <div className="text-xs text-orange-700">km/h promedio</div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-center">
                    <div className="text-lg font-black text-purple-600">
                      {gpsTracking.maxSpeed.toFixed(1)}
                    </div>
                    <div className="text-xs text-purple-700">km/h máxima</div>
                  </div>
                </div>
              )}
            </div>

            {/* Rutas guardadas */}
            {savedRoutes.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800">🗂️ Rutas Guardadas</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {savedRoutes.slice(0, 5).map((route) => (
                    <div key={route.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-slate-800 text-sm">
                            📅 {route.date} - {route.time}
                          </div>
                          <div className="text-xs text-slate-600">
                            {route.distance.toFixed(2)} km • {formatTime(route.duration)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-600">
                            {route.averageSpeed.toFixed(1)} km/h
                          </div>
                          <div className="text-xs text-slate-500">promedio</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mapa (se muestra cuando está activo el GPS) */}
        {showMap && gpsTracking.currentPosition && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">🗺️ Mapa en Tiempo Real</h3>
              <button
                onClick={() => setShowMap(false)}
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                ✕ Ocultar
              </button>
            </div>
            
            <div className="h-96 rounded-2xl overflow-hidden border border-slate-200">
              <MapContainer
                center={[gpsTracking.currentPosition.lat, gpsTracking.currentPosition.lng]}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Ruta recorrida */}
                {gpsTracking.route.length > 1 && (
                  <Polyline
                    positions={gpsTracking.route.map(point => [point.lat, point.lng])}
                    color="blue"
                    weight={4}
                    opacity={0.8}
                  />
                )}
                
                {/* Marcador de posición actual */}
                <Marker position={[gpsTracking.currentPosition.lat, gpsTracking.currentPosition.lng]}>
                  <Popup>
                    📍 Tu ubicación actual<br />
                    Velocidad: {(gpsTracking.currentPosition.speed * 3.6 || 0).toFixed(1)} km/h
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZonesNutritionGPS;
