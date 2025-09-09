import React, { useState, useEffect, useRef, useCallback } from 'react';

const TrainingTimer = () => {
  // Estados principales
  const [mode, setMode] = useState('basic'); // 'basic' o 'intervals'
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  
  // Estados para intervalos
  const [intervalConfig, setIntervalConfig] = useState({
    workTime: 180, // 3 minutos en segundos
    restTime: 120, // 2 minutos en segundos
    repetitions: 5,
    name: 'Entrenamiento Personalizado'
  });
  const [currentInterval, setCurrentInterval] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('work'); // 'work', 'rest', 'finished'
  const [intervalTime, setIntervalTime] = useState(0);
  const [completedIntervals, setCompletedIntervals] = useState(0);
  
  // Estados para configuración
  const [showConfig, setShowConfig] = useState(false);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  
  // Referencias
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Cargar datos guardados
  useEffect(() => {
    const saved = localStorage.getItem('ozz-training-history');
    
    if (saved) setWorkoutHistory(JSON.parse(saved));
  }, []);

  // Formatear tiempo
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Sonido de beep
  const playBeep = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Fallback si no se puede reproducir audio
        console.log('Beep!');
      });
    }
  }, []);

  // Guardar entrenamiento en historial
  const saveWorkoutToHistory = () => {
    const workout = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      mode: mode,
      totalTime: time,
      ...(mode === 'basic' ? { laps: laps } : {
        config: intervalConfig,
        completedIntervals: completedIntervals
      })
    };
    
    const updated = [workout, ...workoutHistory];
    setWorkoutHistory(updated);
    localStorage.setItem('ozz-training-history', JSON.stringify(updated));
  };

  // Manejar completar intervalo
  const handleIntervalComplete = () => {
    playBeep();
    
    if (currentPhase === 'work') {
      setCurrentPhase('rest');
    } else {
      setCompletedIntervals(prev => prev + 1);
      setCurrentInterval(prev => prev + 1);
      
      if (completedIntervals + 1 >= intervalConfig.repetitions) {
        setCurrentPhase('finished');
        setIsRunning(false);
        saveWorkoutToHistory();
      } else {
        setCurrentPhase('work');
      }
    }
  };

  // Timer principal
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (mode === 'basic') {
          setTime(prev => prev + 1);
        } else {
          setIntervalTime(prev => {
            const newTime = prev + 1;
            const currentLimit = currentPhase === 'work' ? intervalConfig.workTime : intervalConfig.restTime;
            
            if (newTime >= currentLimit) {
              handleIntervalComplete();
              return 0;
            }
            return newTime;
          });
          setTime(prev => prev + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isPaused, mode, currentPhase, intervalConfig.workTime, intervalConfig.restTime, intervalConfig.repetitions, completedIntervals]);

  // Iniciar/Pausar
  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  }, [isRunning, isPaused]);

  // Reiniciar
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(0);
    setLaps([]);
    setIntervalTime(0);
    setCurrentInterval(0);
    setCurrentPhase('work');
    setCompletedIntervals(0);
  }, []);

  // Agregar lap mejorado
  const addLap = useCallback(() => {
    if (!isRunning) return;
    
    const newLap = {
      id: Date.now(),
      time: time,
      lapTime: laps.length === 0 ? time : time - laps[laps.length - 1].time,
      timestamp: new Date().toLocaleTimeString(),
      pace: laps.length === 0 ? time : time - laps[laps.length - 1].time // Para futuras mejoras
    };
    setLaps(prev => [...prev, newLap]);
    
    // Feedback haptico si está disponible
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    
    // Feedback visual/sonoro
    playBeep();
  }, [isRunning, time, laps, playBeep]);

  // Manejar entradas de teclado para uso en bici
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Evitar conflictos con inputs
      if (e.target.tagName === 'INPUT') return;
      
      switch(e.key.toLowerCase()) {
        case ' ': // Espaciadora para lap
          e.preventDefault();
          if (mode === 'basic' && isRunning) {
            addLap();
          }
          break;
        case 'enter': // Enter para iniciar/pausar
          e.preventDefault();
          toggleTimer();
          break;
        case 'escape': // Escape para reiniciar
          e.preventDefault();
          resetTimer();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isRunning, mode, addLap, toggleTimer, resetTimer]);

  // Obtener color de fase actual
  const getPhaseColor = () => {
    if (mode === 'basic') return 'from-blue-500 to-cyan-500';
    if (currentPhase === 'work') return 'from-red-500 to-orange-500';
    if (currentPhase === 'rest') return 'from-green-500 to-emerald-500';
    return 'from-purple-500 to-pink-500';
  };

  // Obtener texto de fase
  const getPhaseText = () => {
    if (mode === 'basic') return 'Cronómetro';
    if (currentPhase === 'work') return '🔥 ESFUERZO';
    if (currentPhase === 'rest') return '😌 DESCANSO';
    return '🏁 COMPLETADO';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="text-6xl mb-6 animate-pulse">⏱️</div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-4">
              Entrenamientos Guiados
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              ⚡ Cronómetro profesional con intervalos programables
            </p>
            
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full text-sm font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg animate-pulse">🎯</span>
              <span>ENTRENAMIENTO PROFESIONAL</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">GRATIS</span>
            </div>
          </div>
        </div>

        {/* Selector de modo */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setMode('basic'); resetTimer(); }}
              className={`p-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                mode === 'basic'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-500 shadow-xl scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="text-3xl mb-2">⏱️</div>
              <div>Modo Básico</div>
              <div className="text-sm opacity-75">Cronómetro + Laps</div>
            </button>
            
            <button
              onClick={() => { setMode('intervals'); resetTimer(); }}
              className={`p-6 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                mode === 'intervals'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-xl scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:shadow-lg'
              }`}
            >
              <div className="text-3xl mb-2">🔥</div>
              <div>Intervalos</div>
              <div className="text-sm opacity-75">Entrenamientos programados</div>
            </button>
          </div>
        </div>

        {/* Panel principal del timer */}
        <div className={`bg-gradient-to-br ${getPhaseColor()} rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden`}>
          {/* Efecto de fondo animado */}
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          
          <div className="relative z-10">
            {/* Indicador de fase */}
            <div className="text-center mb-6">
              <div className="text-2xl font-bold mb-2">{getPhaseText()}</div>
              {mode === 'intervals' && currentPhase !== 'finished' && (
                <div className="text-lg opacity-90">
                  Intervalo {currentInterval + 1} de {intervalConfig.repetitions}
                </div>
              )}
            </div>

            {/* Tiempo principal */}
            <div className="text-center mb-8">
              <div className="text-6xl md:text-8xl font-black mb-4 font-mono tracking-wider">
                {mode === 'basic' ? formatTime(time) : 
                 mode === 'intervals' && currentPhase !== 'finished' ?
                   formatTime((currentPhase === 'work' ? intervalConfig.workTime : intervalConfig.restTime) - intervalTime) :
                   formatTime(time)
                }
              </div>
              
              {mode === 'intervals' && currentPhase !== 'finished' && (
                <div className="text-xl opacity-90">
                  {currentPhase === 'work' ? 'Tiempo restante de esfuerzo' : 'Tiempo restante de descanso'}
                </div>
              )}
            </div>

            {/* Progreso de intervalos */}
            {mode === 'intervals' && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-90">Progreso del entrenamiento</span>
                  <span className="text-sm opacity-90">{completedIntervals}/{intervalConfig.repetitions}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="h-3 bg-white rounded-full transition-all duration-1000"
                    style={{ width: `${(completedIntervals / intervalConfig.repetitions) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Controles principales */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <button
                onClick={toggleTimer}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg min-w-[120px]"
              >
                {!isRunning ? '▶️ Iniciar' : isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
              </button>
              
              <button
                onClick={resetTimer}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg min-w-[120px]"
              >
                🔄 Reiniciar
              </button>
              
              {mode === 'basic' && (
                <button
                  onClick={addLap}
                  disabled={!isRunning}
                  className={`backdrop-blur-sm font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg min-w-[120px] ${
                    !isRunning 
                      ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  📝 Lap
                </button>
              )}
              
              {/* Botón de finalizar entrenamiento */}
              {isRunning && mode === 'basic' && (
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setIsPaused(false);
                    saveWorkoutToHistory();
                  }}
                  className="bg-red-500/80 hover:bg-red-600/80 backdrop-blur-sm text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base md:text-lg min-w-[120px]"
                >
                  🏁 Finalizar
                </button>
              )}
            </div>

            {/* Controles adicionales para ciclistas */}
            {mode === 'basic' && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-bold mb-2">🚴 Controles Rápidos para Bici</h4>
                  <p className="text-sm opacity-90">Botones grandes para uso durante el pedaleo</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={toggleTimer}
                    className="bg-green-500/80 hover:bg-green-600/80 backdrop-blur-sm text-white font-black py-6 px-4 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-xl"
                  >
                    {!isRunning ? '🚀 EMPEZAR' : isPaused ? '🚀 SEGUIR' : '⏸️ PAUSA'}
                  </button>
                  
                  <button
                    onClick={addLap}
                    disabled={!isRunning}
                    className={`backdrop-blur-sm font-black py-6 px-4 rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-xl ${
                      !isRunning 
                        ? 'bg-gray-500/50 text-white/50 cursor-not-allowed' 
                        : 'bg-blue-500/80 hover:bg-blue-600/80 text-white'
                    }`}
                  >
                    � VUELTA
                  </button>
                </div>
                
                {/* Estadísticas rápidas */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/10 rounded-xl py-3">
                    <div className="text-lg font-bold">{laps.length}</div>
                    <div className="text-xs opacity-75">Vueltas</div>
                  </div>
                  <div className="bg-white/10 rounded-xl py-3">
                    <div className="text-lg font-bold">
                      {laps.length > 0 ? formatTime(Math.floor(time / laps.length)) : '--:--'}
                    </div>
                    <div className="text-xs opacity-75">Promedio</div>
                  </div>
                  <div className="bg-white/10 rounded-xl py-3">
                    <div className="text-lg font-bold">
                      {laps.length > 0 ? formatTime(laps[laps.length - 1]?.lapTime || 0) : '--:--'}
                    </div>
                    <div className="text-xs opacity-75">Última</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuración de intervalos */}
        {mode === 'intervals' && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">⚙️ Configuración de Intervalos</h3>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
              >
                {showConfig ? 'Ocultar' : 'Configurar'}
              </button>
            </div>

            {showConfig && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">🔥 Tiempo de esfuerzo (min)</label>
                  <input
                    type="number"
                    min="1"
                    value={Math.floor(intervalConfig.workTime / 60)}
                    onChange={(e) => setIntervalConfig(prev => ({ ...prev, workTime: parseInt(e.target.value) * 60 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">😌 Tiempo de descanso (min)</label>
                  <input
                    type="number"
                    min="1"
                    value={Math.floor(intervalConfig.restTime / 60)}
                    onChange={(e) => setIntervalConfig(prev => ({ ...prev, restTime: parseInt(e.target.value) * 60 }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">🔢 Repeticiones</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={intervalConfig.repetitions}
                    onChange={(e) => setIntervalConfig(prev => ({ ...prev, repetitions: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">📝 Nombre</label>
                  <input
                    type="text"
                    value={intervalConfig.name}
                    onChange={(e) => setIntervalConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Plantillas predefinidas */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: '🚀 Sprint Corto', work: 30, rest: 90, reps: 8 },
                { name: '💪 Resistencia', work: 300, rest: 120, reps: 5 },
                { name: '🔥 HIIT Clásico', work: 180, rest: 60, reps: 6 }
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => setIntervalConfig({
                    workTime: template.work,
                    restTime: template.rest,
                    repetitions: template.reps,
                    name: template.name
                  })}
                  className="p-4 bg-gradient-to-r from-slate-100 to-blue-50 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 text-left"
                >
                  <div className="font-bold text-slate-800 mb-1">{template.name}</div>
                  <div className="text-sm text-slate-600">
                    {Math.floor(template.work / 60)}min trabajo + {Math.floor(template.rest / 60)}min descanso × {template.reps}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Laps (solo en modo básico) */}
        {mode === 'basic' && laps.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800">📝 Tiempos Parciales</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setLaps([])}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                  �️ Limpiar
                </button>
                <button
                  onClick={() => {
                    const lastLap = laps[laps.length - 1];
                    if (lastLap) {
                      setLaps(prev => prev.slice(0, -1));
                    }
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                  disabled={laps.length === 0}
                >
                  ↶ Deshacer
                </button>
              </div>
            </div>
            
            {/* Estadísticas de rendimiento */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-600">{laps.length}</div>
                <div className="text-sm text-blue-700">Total Vueltas</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-600">
                  {laps.length > 0 ? formatTime(Math.min(...laps.map(l => l.lapTime))) : '--:--'}
                </div>
                <div className="text-sm text-green-700">Mejor Vuelta</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-orange-600">
                  {laps.length > 0 ? formatTime(Math.floor(time / laps.length)) : '--:--'}
                </div>
                <div className="text-sm text-orange-700">Promedio</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {laps.length > 0 ? formatTime(laps[laps.length - 1]?.lapTime || 0) : '--:--'}
                </div>
                <div className="text-sm text-purple-700">Última Vuelta</div>
              </div>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {laps.map((lap, index) => {
                const bestTime = Math.min(...laps.map(l => l.lapTime));
                const isPersonalBest = lap.lapTime === bestTime;
                const isRecentBest = index >= laps.length - 3 && lap.lapTime === Math.min(...laps.slice(-3).map(l => l.lapTime));
                
                return (
                  <div key={lap.id} className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                    isPersonalBest 
                      ? 'bg-yellow-50 border-yellow-300 shadow-lg' 
                      : isRecentBest 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-lg ${
                          isPersonalBest ? 'text-yellow-600' : isRecentBest ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          #{index + 1}
                        </span>
                        {isPersonalBest && <span className="text-yellow-500">🏆</span>}
                        {isRecentBest && !isPersonalBest && <span className="text-green-500">⚡</span>}
                      </div>
                      <span className="text-sm text-slate-500">{lap.timestamp}</span>
                    </div>
                    <div className="flex gap-6 font-mono text-lg">
                      <div className="text-center">
                        <div className={`font-bold ${isPersonalBest ? 'text-yellow-600' : isRecentBest ? 'text-green-600' : 'text-slate-600'}`}>
                          {formatTime(lap.lapTime)}
                        </div>
                        <div className="text-xs text-slate-500">Parcial</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-slate-800">{formatTime(lap.time)}</div>
                        <div className="text-xs text-slate-500">Total</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Historial de entrenamientos */}
        {workoutHistory.length > 0 && (
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">📊 Historial de Entrenamientos</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {workoutHistory.slice(0, 10).map((workout) => (
                <div key={workout.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-slate-800">
                        {workout.mode === 'basic' ? '⏱️ Cronómetro' : `🔥 ${workout.config?.name || 'Intervalos'}`}
                      </div>
                      <div className="text-sm text-slate-600">
                        {workout.date} - {workout.time}
                      </div>
                      {workout.mode === 'intervals' && (
                        <div className="text-sm text-slate-500">
                          {workout.completedIntervals}/{workout.config?.repetitions} intervalos completados
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{formatTime(workout.totalTime)}</div>
                      {workout.laps && (
                        <div className="text-sm text-slate-500">{workout.laps.length} laps</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio para beeps */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0GJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj+Y2+/OfC0G" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
};

export default TrainingTimer;
