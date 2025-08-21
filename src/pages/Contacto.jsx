import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaWhatsapp,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 50
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Al enviar el formulario, abre WhatsApp con el mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Hola, soy ${formData.name || 'un cliente interesado'} (${formData.email || 'sin email'}). ${formData.message}`;
    window.open(`https://wa.me/541137788374?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div className="mt-32 min-h-screen bg-gradient-to-br from-[#004391] via-blue-900 to-[#379299] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-4 w-full overflow-hidden">
        {/* ↑ py-32 para bajar el contenido y evitar que la navbar lo tape */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/50 to-[#004391]"></div>
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 px-2">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#379299] to-cyan-400 break-words"
              data-aos="fade-up"
            >
              Contacto OZZcycling
            </h1>
            <div
              className="w-24 h-1 bg-gradient-to-r from-[#379299] to-cyan-400 mx-auto mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            ></div>
            <p
              className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto px-2"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              ¿Querés saber más sobre nuestras bicicletas, servicios o visitarnos en el local?
              <span className="block mt-4 text-base sm:text-lg text-[#379299] font-medium">
                Estamos para ayudarte. ¡Escribinos!
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full">
            {/* Formulario */}
            <div
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl w-full"
              data-aos="fade-right"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Envíanos un mensaje por WhatsApp</h2>
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="relative w-full">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#379299] text-lg" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu Nombre"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#379299] focus:ring-2 focus:ring-[#379299]/50 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="relative w-full">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#379299] text-lg" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Tu Email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#379299] focus:ring-2 focus:ring-[#379299]/50 transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
                <div className="relative w-full">
                  <FaCommentDots className="absolute left-4 top-6 text-[#379299] text-lg" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    rows="5"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#379299] focus:ring-2 focus:ring-[#379299]/50 transition-all duration-300 resize-none text-sm sm:text-base"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  <FaWhatsapp className="mr-2" />
                  Enviar a WhatsApp
                </button>
              </form>
            </div>

            {/* Información adicional */}
            <div className="space-y-6 w-full" data-aos="fade-left">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 w-full">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-4">Información</h3>
                <div className="space-y-3 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-[#379299] flex-shrink-0" />
                    <span className="text-sm sm:text-base">Av. del Libertador 2984, Buenos Aires, Argentina</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-[#379299] flex-shrink-0" />
                    <span className="text-sm sm:text-base">011 3778-8374</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-[#379299] flex-shrink-0" />
                    <span className="text-sm sm:text-base">Omar.azzem1@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-[#379299] flex-shrink-0" />
                    <span className="text-sm sm:text-base">Lunes a viernes de 10h a 19h | Sábados de 8h a 12h</span>
                  </div>
                </div>
              </div>
              {/* Redes sociales */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 sm:p-6 w-full">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-4">Nuestras redes</h3>
                <div className="flex space-x-4 justify-center sm:justify-start">
                  <a
                    href="https://instagram.com/ozzcycling"
                    className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="text-white text-lg" />
                  </a>
                  <a
                    href="https://facebook.com/p/Ozz-cycling-100063464646678/"
                    className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-110"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-white text-lg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contacto;