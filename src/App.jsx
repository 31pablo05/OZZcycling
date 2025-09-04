import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InstallPWA from "./components/InstallPWA";
import InstallBanner from "./components/InstallBanner";
import AutoInstallHandler from "./components/AutoInstallHandler";
import AppToolsWidget from "./components/AppToolsWidget";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Tienda from "./pages/Tienda";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros"; 
import GaleriaProfesional from "./pages/GaleriaProfesional";
import InstallPage from "./pages/InstallPage";
import BikeFittingPage from "./pages/BikeFittingPage";
import MaintenancePage from "./pages/MaintenancePage";
import PerformancePage from "./pages/PerformancePage";

function App() {
  // Cache buster - 2025-01-04
  useEffect(() => {
    // Service Worker reactivado
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registrado con éxito: ', registration);
            // Forzar actualización del SW
            registration.update();
          })
          .catch((registrationError) => {
            console.log('SW registro falló: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AutoInstallHandler />
        <InstallBanner />
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/galeria" element={<GaleriaProfesional />} />
            <Route path="/instalar" element={<InstallPage />} />
            <Route path="/bike-fitting" element={<BikeFittingPage />} />
            <Route path="/mantenimiento" element={<MaintenancePage />} />
            <Route path="/rendimiento" element={<PerformancePage />} />
          </Routes>
        </div>
        <Footer />
        <InstallPWA />
        <AppToolsWidget />
      </div>
    </Router>
  );
}

export default App;

