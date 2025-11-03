import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Tienda from "./pages/Tienda";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros"; 
import GaleriaProfesional from "./pages/GaleriaProfesional";
import InstallPage from "./pages/InstallPage";
import BikeFittingPage from "./pages/BikeFittingPage";
import TrainingPage from "./pages/TrainingPage";

// Componente para manejar el scroll al cambiar de página
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // PWA components removed for stability
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
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
            <Route path="/entrenamientos" element={<TrainingPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

