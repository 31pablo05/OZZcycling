import React, { useState } from "react";
import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";

const FooterInfo = () => {
  const [ setHoveredButton] = useState(null);

  return (
  <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white w-full py-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-4 left-16 w-24 h-24 border border-white rounded-full"></div>
      </div>
      
  <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Necesitas <span className="text-blue-400">ayuda</span> con tu compra?
          </h3>
          <p className="text-slate-300 text-lg">
            Contactanos y te asesoramos de forma personalizada
          </p>
        </div>

        {/* Contact buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a
            href="https://wa.me/5491123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            onMouseEnter={() => setHoveredButton('whatsapp')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <MessageCircle className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">WhatsApp</div>
              <div className="text-sm opacity-90">+54 11 2345-6789</div>
            </div>
          </a>
          
          <a
            href="tel:+541123456789"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            onMouseEnter={() => setHoveredButton('phone')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">Llamanos</div>
              <div className="text-sm opacity-90">+54 11 2345-6789</div>
            </div>
          </a>
        </div>

        {/* Quick info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-white">Horarios</div>
              <div className="text-sm text-slate-300">Lun-Vie 9-18hs | Sáb 9-13hs</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-white">Ubicación</div>
              <div className="text-sm text-slate-300">Palermo, Buenos Aires</div>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center mt-6">
          <p className="text-slate-400 text-sm">
            🏆 Shimano Service Center Certificado • Más de 15 años de experiencia
          </p>
        </div>
      </div>
  </section>
  );
};

export default FooterInfo;