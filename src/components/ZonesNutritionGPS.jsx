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
  const [showZoneDetails, setShowZoneDetails] = useState(false);
  const [nutritionPlan, setNutritionPlan] = useState({
    duration: 2, // horas
    temperature: 20, // celsius
    intensity: 'moderate',
    bodyWeight: 70,
    sweatRate: 'normal', // 'low', 'normal', 'high'
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
    currentSpeed: 0,
    startTime: null,
    elapsedTime: 0,
    altitude: 0,
    totalElevation: 0,
    calories: 0
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

  // Calcular recomendaciones nutricionales mejoradas
  const calculateNutrition = () => {
    const { duration, temperature, intensity, bodyWeight, sweatRate } = nutritionPlan;
    
    // Factores de intensidad mejorados
    const intensityFactors = {
      easy: { carbs: 30, water: 0.5, calories: 300 },
      moderate: { carbs: 45, water: 0.75, calories: 450 },
      hard: { carbs: 60, water: 1.0, calories: 600 },
      extreme: { carbs: 90, water: 1.25, calories: 800 }
    };
    
    // Factores de sudoración
    const sweatFactors = {
      low: 0.8,
      normal: 1.0,
      high: 1.3
    };
    
    // Cálculos base
    const factor = intensityFactors[intensity];
    const sweatFactor = sweatFactors[sweatRate];
    const carbsPerHour = factor.carbs;
    const baseWaterPerHour = factor.water * sweatFactor;
    const caloriesPerHour = factor.calories;
    
    // Ajuste por temperatura
    let tempAdjustment = 1.0;
    if (temperature > 30) tempAdjustment = 1.5;
    else if (temperature > 25) tempAdjustment = 1.3;
    else if (temperature < 10) tempAdjustment = 0.8;
    else if (temperature < 5) tempAdjustment = 0.7;
    
    // Ajuste por peso corporal
    const weightAdjustment = bodyWeight / 70; // Base 70kg
    
    // Recomendaciones finales
    const recommendations = {
      totalCarbs: Math.round(carbsPerHour * duration),
      carbsPerHour: carbsPerHour,
      totalWater: Math.round((baseWaterPerHour * duration * tempAdjustment * weightAdjustment) * 10) / 10,
      waterPerHour: Math.round((baseWaterPerHour * tempAdjustment * weightAdjustment) * 10) / 10,
      calories: Math.round(caloriesPerHour * duration),
      caloriesPerHour: caloriesPerHour,
      electrolytes: duration > 1 ? 'Necesarios' : 'Opcionales',
      sodiumPerHour: Math.round(200 * sweatFactor * tempAdjustment), // mg de sodio
      caffeineRecommendation: duration > 2 ? '100-200mg antes del entrenamiento' : 'No necesaria',
      preWorkoutMeal: intensity === 'easy' ? '2-3 horas antes' : '3-4 horas antes',
      postWorkoutRecovery: '30g carbohidratos + 15g proteína en los primeros 30 min',
      hydrationStatus: tempAdjustment > 1.2 ? 'Crítica - Bebe frecuentemente' : 'Normal'
    };
    
    setNutritionPlan(prev => ({ ...prev, recommendations }));
  };

  // Funciones GPS mejoradas
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
      maxSpeed: 0,
      currentSpeed: 0,
      altitude: 0,
      totalElevation: 0,
      calories: 0
    }));

    // Obtener posición inicial con mejor precisión
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          speed: position.coords.speed || 0,
          altitude: position.coords.altitude || 0,
          accuracy: position.coords.accuracy
        };
        
        setGpsTracking(prev => ({
          ...prev,
          currentPosition: newPosition,
          route: [newPosition],
          altitude: newPosition.altitude
        }));
        setShowMap(true);
      },
      (error) => {
        console.error('Error GPS:', error);
        let errorMessage = 'Error al acceder al GPS';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Habilita el GPS en configuración.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible. Verifica tu conexión GPS.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado. Intenta nuevamente.';
            break;
        }
        alert(errorMessage);
        setGpsTracking(prev => ({ ...prev, isTracking: false }));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );

    // Iniciar seguimiento continuo con mejor configuración
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          speed: position.coords.speed || 0,
          altitude: position.coords.altitude || 0,
          accuracy: position.coords.accuracy
        };

        setGpsTracking(prev => {
          const newRoute = [...prev.route, newPosition];
          const newDistance = calculateDistance(prev.route, newPosition);
          const elapsed = (Date.now() - prev.startTime) / 1000 / 3600; // horas
          const avgSpeed = elapsed > 0 ? newDistance / elapsed : 0;
          const currentSpeedKmh = (newPosition.speed || 0) * 3.6; // m/s a km/h
          const maxSpeed = Math.max(prev.maxSpeed, currentSpeedKmh);
          
          // Calcular elevación ganada
          let elevationGain = prev.totalElevation;
          if (prev.route.length > 0 && newPosition.altitude && prev.route[prev.route.length - 1].altitude) {
            const altitudeDiff = newPosition.altitude - prev.route[prev.route.length - 1].altitude;
            if (altitudeDiff > 0) {
              elevationGain += altitudeDiff;
            }
          }
          
          // Estimar calorías (aprox 50 cal/km para ciclismo moderado)
          const estimatedCalories = Math.round(newDistance * 50);

          return {
            ...prev,
            currentPosition: newPosition,
            route: newRoute,
            distance: newDistance,
            averageSpeed: avgSpeed,
            maxSpeed: maxSpeed,
            currentSpeed: currentSpeedKmh,
            altitude: newPosition.altitude || prev.altitude,
            totalElevation: elevationGain,
            calories: estimatedCalories
          };
        });
      },
      (error) => {
        console.error('Error GPS tracking:', error);
        // No mostrar alert continuo, solo log del error
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
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

    // Guardar ruta con más detalles
    if (gpsTracking.route.length > 1) {
      const newRoute = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        distance: gpsTracking.distance,
        duration: gpsTracking.elapsedTime,
        averageSpeed: gpsTracking.averageSpeed,
        maxSpeed: gpsTracking.maxSpeed,
        totalElevation: gpsTracking.totalElevation,
        calories: gpsTracking.calories,
        route: gpsTracking.route,
        startPosition: gpsTracking.route[0],
        endPosition: gpsTracking.route[gpsTracking.route.length - 1],
        weather: {
          temperature: nutritionPlan.temperature,
          conditions: 'No registrado'
        }
      };
      
      const updated = [newRoute, ...savedRoutes.slice(0, 9)]; // Mantener solo 10 rutas
      setSavedRoutes(updated);
      localStorage.setItem('ozz-saved-routes', JSON.stringify(updated));
      
      // Notificar guardado exitoso
      alert(`🎉 Ruta guardada: ${newRoute.distance.toFixed(2)}km en ${formatTime(newRoute.duration)}`);
    }

    setGpsTracking(prev => ({ ...prev, isTracking: false }));
  };

  // Función para pausar/reanudar tracking
  const pauseResumeTracking = () => {
    if (gpsTracking.isTracking) {
      // Pausar
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setGpsTracking(prev => ({ ...prev, isTracking: false }));
    } else {
      // Reanudar desde la última posición
      setGpsTracking(prev => ({ ...prev, isTracking: true }));
      
      // Reiniciar tracking desde donde se pausó
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now(),
            speed: position.coords.speed || 0,
            altitude: position.coords.altitude || 0,
            accuracy: position.coords.accuracy
          };

          setGpsTracking(prev => {
            const newRoute = [...prev.route, newPosition];
            const newDistance = calculateDistance(prev.route, newPosition);
            const elapsed = (Date.now() - prev.startTime) / 1000 / 3600;
            const avgSpeed = elapsed > 0 ? newDistance / elapsed : 0;
            const currentSpeedKmh = (newPosition.speed || 0) * 3.6;
            const maxSpeed = Math.max(prev.maxSpeed, currentSpeedKmh);

            return {
              ...prev,
              currentPosition: newPosition,
              route: newRoute,
              distance: newDistance,
              averageSpeed: avgSpeed,
              maxSpeed: maxSpeed,
              currentSpeed: currentSpeedKmh
            };
          });
        },
        (error) => console.error('Error GPS tracking:', error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
      );

      intervalRef.current = setInterval(() => {
        setGpsTracking(prev => ({
          ...prev,
          elapsedTime: prev.startTime ? (Date.now() - prev.startTime) / 1000 : 0
        }));
      }, 1000);
    }
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

        {/* Instrucciones de uso */}
        <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-3xl p-8 shadow-2xl border border-blue-200 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              📋 Guía de Uso Rápida
            </h2>
            <p className="text-slate-600">Sigue estos pasos para aprovechar al máximo la herramienta</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">1. Configura tus Zonas</h3>
                <ul className="text-sm text-slate-600 space-y-2 text-left">
                  <li>• Ingresa tu edad y peso</li>
                  <li>• Elige: Frecuencia Cardíaca o Potencia</li>
                  <li>• Establece tu FC máxima o FTP</li>
                  <li>• Guarda para calcular tus zonas</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🍎</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">2. Planifica tu Nutrición</h3>
                <ul className="text-sm text-slate-600 space-y-2 text-left">
                  <li>• Define duración del entrenamiento</li>
                  <li>• Ajusta temperatura ambiente</li>
                  <li>• Selecciona intensidad prevista</li>
                  <li>• Obtén recomendaciones precisas</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white/80 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">3. Trackea tu Ruta</h3>
                <ul className="text-sm text-slate-600 space-y-2 text-left">
                  <li>• Activa el GPS antes de salir</li>
                  <li>• Monitorea estadísticas en vivo</li>
                  <li>• Visualiza tu ruta en el mapa</li>
                  <li>• Guarda automáticamente al finalizar</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
            <div className="text-center">
              <div className="text-2xl mb-2">💡</div>
              <h4 className="font-bold text-amber-800 mb-2">Tip Profesional</h4>
              <p className="text-sm text-amber-700">
                Usa las tres herramientas juntas: configura tus zonas para entrenar en la intensidad correcta, 
                planifica tu nutrición según la duración y condiciones, y trackea tu progreso con GPS.
              </p>
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

            {/* Zonas calculadas con explicaciones */}
            {zones.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">📊 Tus Zonas de Entrenamiento</h3>
                  <button
                    onClick={() => setShowZoneDetails(!showZoneDetails)}
                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {showZoneDetails ? 'Ocultar info' : 'Más info'}
                  </button>
                </div>
                
                <div className="space-y-3">
                  {zones.map((zone, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-4 h-4 rounded-full ${zone.color}`}></div>
                        <span className="font-bold text-slate-800 flex-1">{zone.name}</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {zone.min} - {zone.max}
                          </div>
                          <div className="text-xs text-slate-500">
                            {userProfile.trainingType === 'hr' ? 'bpm' : 'watts'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-slate-600 mb-2">{zone.description}</div>
                      
                      {showZoneDetails && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                          <div className="text-xs text-slate-700">
                            <div className="font-semibold mb-2">💡 Cuándo usar esta zona:</div>
                            {index === 0 && (
                              <ul className="space-y-1">
                                <li>• Días de recuperación activa</li>
                                <li>• Calentamiento y enfriamiento</li>
                                <li>• Después de entrenamientos intensos</li>
                              </ul>
                            )}
                            {index === 1 && (
                              <ul className="space-y-1">
                                <li>• Base aeróbica (80% del entrenamiento)</li>
                                <li>• Rodadas largas y constantes</li>
                                <li>• Mejora la eficiencia metabólica</li>
                              </ul>
                            )}
                            {index === 2 && (
                              <ul className="space-y-1">
                                <li>• Entrenamientos de tempo</li>
                                <li>• Simulación de ritmo de competencia</li>
                                <li>• Intervalos moderados</li>
                              </ul>
                            )}
                            {index === 3 && (
                              <ul className="space-y-1">
                                <li>• Entrenamientos de umbral</li>
                                <li>• Intervalos de 20-40 minutos</li>
                                <li>• Mejora la potencia sostenible</li>
                              </ul>
                            )}
                            {index === 4 && (
                              <ul className="space-y-1">
                                <li>• Intervalos de VO2 max</li>
                                <li>• Series de 3-8 minutos</li>
                                <li>• Mejora la capacidad aeróbica</li>
                              </ul>
                            )}
                            {index === 5 && (
                              <ul className="space-y-1">
                                <li>• Entrenamientos de potencia</li>
                                <li>• Sprints cortos (15-30 segundos)</li>
                                <li>• Desarrollo neuromuscular</li>
                              </ul>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Resumen de distribución del entrenamiento */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <h4 className="font-bold text-slate-800 mb-3 text-center">📈 Distribución Recomendada del Entrenamiento</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">80%</div>
                      <div className="text-xs text-slate-600">Z1-Z2 (Base)</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-yellow-600">15%</div>
                      <div className="text-xs text-slate-600">Z3-Z4 (Umbral)</div>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-red-600">5%</div>
                      <div className="text-xs text-slate-600">Z5-Z6 (Intenso)</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 text-center mt-3">
                    Modelo 80/20 para ciclistas de resistencia
                  </div>
                </div>
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

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-bold text-slate-700 mb-2">⚖️ Peso (kg)</label>
                  <input
                    type="number"
                    value={nutritionPlan.bodyWeight}
                    onChange={(e) => setNutritionPlan(prev => ({ ...prev, bodyWeight: parseInt(e.target.value) || 70 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">💧 Tasa de sudoración</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'low', label: '💧 Baja', color: 'from-blue-400 to-cyan-400' },
                    { key: 'normal', label: '💧💧 Normal', color: 'from-green-400 to-emerald-400' },
                    { key: 'high', label: '💧💧💧 Alta', color: 'from-orange-400 to-red-400' }
                  ].map(sweatRate => (
                    <button
                      key={sweatRate.key}
                      onClick={() => setNutritionPlan(prev => ({ ...prev, sweatRate: sweatRate.key }))}
                      className={`p-2 rounded-xl font-semibold text-xs transition-all duration-300 ${
                        nutritionPlan.sweatRate === sweatRate.key
                          ? `bg-gradient-to-r ${sweatRate.color} text-white shadow-lg scale-105`
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sweatRate.label}
                    </button>
                  ))}
                </div>
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

            {/* Recomendaciones nutricionales mejoradas */}
            {nutritionPlan.recommendations && (
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 mb-3">🍯 Recomendaciones Detalladas</h3>
                
                {/* Grid principal de nutrientes */}
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
                      <div className="text-xs text-purple-700">Calorías totales</div>
                      <div className="text-xs text-purple-600 mt-1">
                        {nutritionPlan.recommendations.caloriesPerHour}/hora
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-sm font-black text-green-600">
                        {nutritionPlan.recommendations.sodiumPerHour}mg
                      </div>
                      <div className="text-xs text-green-700">Sodio/hora</div>
                      <div className="text-xs text-green-600 mt-1">
                        {nutritionPlan.recommendations.electrolytes}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="space-y-3">
                  {/* Estado de hidratación */}
                  <div className={`p-3 rounded-xl border ${
                    nutritionPlan.recommendations.hydrationStatus.includes('Crítica') 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="text-center">
                      <div className="text-lg mb-1">
                        {nutritionPlan.recommendations.hydrationStatus.includes('Crítica') ? '🚨' : '✅'}
                      </div>
                      <div className={`text-sm font-bold ${
                        nutritionPlan.recommendations.hydrationStatus.includes('Crítica') 
                          ? 'text-red-700' 
                          : 'text-green-700'
                      }`}>
                        {nutritionPlan.recommendations.hydrationStatus}
                      </div>
                    </div>
                  </div>

                  {/* Consejos de timing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-200">
                      <div className="text-xs text-indigo-800">
                        <div className="font-bold mb-1">🍽️ Comida pre-entreno:</div>
                        <div>{nutritionPlan.recommendations.preWorkoutMeal}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-xs text-green-800">
                        <div className="font-bold mb-1">🏃‍♂️ Recuperación post-entreno:</div>
                        <div>{nutritionPlan.recommendations.postWorkoutRecovery}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cafeína */}
                  {nutritionPlan.recommendations.caffeineRecommendation !== 'No necesaria' && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="text-xs text-amber-800">
                        <div className="font-bold mb-1">☕ Cafeína:</div>
                        <div>{nutritionPlan.recommendations.caffeineRecommendation}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Consejos profesionales */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                  <div className="text-sm text-blue-800">
                    <div className="font-bold mb-2">💡 Consejos Profesionales:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• Bebe cada 15-20 minutos (no esperes a tener sed)</li>
                      <li>• Come carbohidratos cada 30-45 minutos después de la primera hora</li>
                      <li>• Practica tu estrategia nutricional en entrenamientos largos</li>
                      <li>• Ajusta según tus sensaciones y experiencia personal</li>
                      <li>• En climas calurosos, prioriza la hidratación sobre los carbohidratos</li>
                      <li>• Usa bebidas deportivas para combinar agua, carbohidratos y electrolitos</li>
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

            {/* Controles GPS mejorados */}
            <div className="space-y-4 mb-6">
              {!gpsTracking.isTracking && gpsTracking.route.length === 0 ? (
                <button
                  onClick={startTracking}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <div>Iniciar Seguimiento GPS</div>
                      <div className="text-xs opacity-80">Necesita permisos de ubicación</div>
                    </div>
                  </div>
                </button>
              ) : gpsTracking.isTracking ? (
                <div className="space-y-3">
                  <button
                    onClick={pauseResumeTracking}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">⏸️</span>
                      <span>Pausar Seguimiento</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={stopTracking}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xl">⏹️</span>
                      <span>Finalizar y Guardar</span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={pauseResumeTracking}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-2xl">▶️</span>
                      <span>Reanudar Seguimiento</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={stopTracking}
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-xl">⏹️</span>
                      <span>Finalizar y Guardar</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Estadísticas en tiempo real mejoradas */}
              {(gpsTracking.isTracking || gpsTracking.route.length > 0) && (
                <div className="space-y-4">
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

                  {/* Estadísticas adicionales */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-cyan-50 rounded-lg border border-cyan-200 text-center">
                      <div className="text-sm font-bold text-cyan-600">
                        {gpsTracking.currentSpeed.toFixed(1)}
                      </div>
                      <div className="text-xs text-cyan-700">km/h actual</div>
                    </div>

                    <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200 text-center">
                      <div className="text-sm font-bold text-indigo-600">
                        {gpsTracking.totalElevation.toFixed(0)}m
                      </div>
                      <div className="text-xs text-indigo-700">desnivel +</div>
                    </div>

                    <div className="p-2 bg-red-50 rounded-lg border border-red-200 text-center">
                      <div className="text-sm font-bold text-red-600">
                        {gpsTracking.calories}
                      </div>
                      <div className="text-xs text-red-700">calorías</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rutas guardadas mejoradas */}
            {savedRoutes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">🗂️ Historial de Rutas</h3>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                    {savedRoutes.length} rutas
                  </span>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {savedRoutes.slice(0, 8).map((route, index) => (
                    <div key={route.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-slate-800">
                              📅 Ruta #{savedRoutes.length - index}
                            </span>
                            {index === 0 && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Reciente
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-600">
                            {route.date} • {route.time}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="text-center">
                          <div className="text-sm font-bold text-blue-600">
                            {route.distance.toFixed(2)} km
                          </div>
                          <div className="text-xs text-slate-500">distancia</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-600">
                            {formatTime(route.duration)}
                          </div>
                          <div className="text-xs text-slate-500">tiempo</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-orange-600">
                            {route.averageSpeed.toFixed(1)} km/h
                          </div>
                          <div className="text-xs text-slate-500">promedio</div>
                        </div>
                      </div>

                      {/* Estadísticas adicionales si están disponibles */}
                      {(route.totalElevation > 0 || route.calories > 0) && (
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                          {route.totalElevation > 0 && (
                            <div className="text-center">
                              <div className="text-xs font-bold text-purple-600">
                                +{route.totalElevation.toFixed(0)}m
                              </div>
                              <div className="text-xs text-slate-500">desnivel</div>
                            </div>
                          )}
                          {route.calories > 0 && (
                            <div className="text-center">
                              <div className="text-xs font-bold text-red-600">
                                {route.calories} cal
                              </div>
                              <div className="text-xs text-slate-500">quemadas</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {savedRoutes.length > 8 && (
                  <div className="text-center">
                    <div className="text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-full inline-block">
                      +{savedRoutes.length - 8} rutas más en el historial
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mensaje cuando no hay rutas */}
            {savedRoutes.length === 0 && !gpsTracking.isTracking && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🗺️</div>
                <div className="text-slate-600 mb-2">Sin rutas guardadas</div>
                <div className="text-xs text-slate-500">
                  Inicia tu primer seguimiento GPS para comenzar
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mapa mejorado */}
        {showMap && gpsTracking.currentPosition && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">🗺️ Mapa en Tiempo Real</h3>
                <div className="text-sm text-slate-600">
                  {gpsTracking.isTracking ? (
                    <span className="text-green-600 font-semibold">● Grabando activamente</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">⏸️ Pausado</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowMap(false)}
                  className="text-slate-500 hover:text-slate-700 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg"
                >
                  Ocultar Mapa
                </button>
              </div>
            </div>
            
            {/* Estadísticas del mapa */}
            {gpsTracking.route.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <div className="text-sm font-bold text-blue-600">{gpsTracking.route.length}</div>
                  <div className="text-xs text-slate-600">puntos GPS</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <div className="text-sm font-bold text-green-600">
                    {gpsTracking.currentPosition?.accuracy ? 
                      `±${gpsTracking.currentPosition.accuracy.toFixed(0)}m` : 'N/A'}
                  </div>
                  <div className="text-xs text-slate-600">precisión</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg text-center">
                  <div className="text-sm font-bold text-purple-600">
                    {gpsTracking.altitude > 0 ? `${gpsTracking.altitude.toFixed(0)}m` : 'N/A'}
                  </div>
                  <div className="text-xs text-slate-600">altitud</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg text-center">
                  <div className="text-sm font-bold text-orange-600">
                    {gpsTracking.currentSpeed.toFixed(1)} km/h
                  </div>
                  <div className="text-xs text-slate-600">velocidad</div>
                </div>
              </div>
            )}
            
            <div className="h-96 rounded-2xl overflow-hidden border border-slate-200 relative">
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
                    color="#3B82F6"
                    weight={4}
                    opacity={0.8}
                  />
                )}
                
                {/* Marcador de posición actual */}
                <Marker position={[gpsTracking.currentPosition.lat, gpsTracking.currentPosition.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <div className="font-bold mb-1">📍 Ubicación Actual</div>
                      <div>Velocidad: {gpsTracking.currentSpeed.toFixed(1)} km/h</div>
                      {gpsTracking.altitude > 0 && (
                        <div>Altitud: {gpsTracking.altitude.toFixed(0)}m</div>
                      )}
                      <div>Precisión: ±{gpsTracking.currentPosition.accuracy?.toFixed(0) || 'N/A'}m</div>
                    </div>
                  </Popup>
                </Marker>

                {/* Marcador de inicio */}
                {gpsTracking.route.length > 1 && (
                  <Marker position={[gpsTracking.route[0].lat, gpsTracking.route[0].lng]}>
                    <Popup>
                      <div className="text-sm">
                        <div className="font-bold text-green-600">🚀 Punto de Inicio</div>
                        <div>{new Date(gpsTracking.route[0].timestamp).toLocaleTimeString()}</div>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>

              {/* Overlay de información */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-xs">
                  <div className="font-bold text-slate-800 mb-1">Resumen del Recorrido</div>
                  <div>📏 {gpsTracking.distance.toFixed(2)} km</div>
                  <div>⏱️ {formatTime(gpsTracking.elapsedTime)}</div>
                  <div>📈 {gpsTracking.averageSpeed.toFixed(1)} km/h promedio</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZonesNutritionGPS;
