import { MessageCircle, Phone } from "lucide-react"

const FooterInfo = () => (
  <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h3 className="text-xl font-bold mb-4">¿Necesitas ayuda con tu compra?</h3>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <a
          href="https://wa.me/5491123456789"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp: +54 11 2345-6789
        </a>
        <a
          href="tel:+541123456789"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Teléfono: +54 11 2345-6789
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="text-3xl mb-2">💬</div>
          <h4 className="font-semibold text-white">Atención Personalizada</h4>
          <p className="text-sm text-gray-300">Consultanos por WhatsApp las 24hs</p>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🔧</div>
          <h4 className="font-semibold text-white">Servicio Técnico</h4>
          <p className="text-sm text-gray-300">Mantenimiento y reparaciones</p>
        </div>
      </div>
      <p className="mt-4 text-gray-300 text-sm">Horarios: Lun-Vie 9:00-18:00 | Sáb 9:00-13:00</p>
    </div>
  </div>
)

export default FooterInfo