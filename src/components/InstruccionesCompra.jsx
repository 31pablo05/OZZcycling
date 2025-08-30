import React from "react";
import { ShoppingCart, MessageCircle, CheckCircle, CreditCard, Truck, User } from "lucide-react";

const steps = [
  {
    icon: <User className="w-8 h-8 text-blue-600" />, title: "Seleccioná tus productos", desc: "Explorá el catálogo y agregá lo que te interesa al carrito. No es una compra directa, solo seleccionás para cotizar o consultar."
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-indigo-600" />, title: "Revisá tu pedido", desc: "Entrá al carrito para ver el resumen y modificar cantidades si lo necesitás."
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-500" />, title: "Completá tus datos", desc: "Ingresá tu información y elegí método de pago y entrega."
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-green-500 animate-bounce" />, title: "Enviá el pedido por WhatsApp", desc: "Al confirmar, se abrirá WhatsApp con tu pedido listo para enviar. Así te asesoramos y coordinamos la compra personalmente."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-emerald-500" />, title: "¡Listo!", desc: "Nos comunicamos con vos para finalizar la compra y coordinar la entrega o retiro."
  },
];

const InstruccionesCompra = () => (
  <section className="mt-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl shadow-lg p-4 mb-4 max-w-4xl mx-auto border border-blue-100/40">
    <h2 className="text-xl md:text-2xl font-black text-blue-700 mb-3 text-center tracking-tight">
      ¿Cómo comprar en <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">OZZcycling</span>?
    </h2>
    <div className="flex flex-col md:flex-row md:gap-4 gap-3 md:justify-center md:items-stretch">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start gap-2 bg-white/80 rounded-xl shadow p-2 border border-blue-100/30 md:flex-col md:items-center md:w-56 md:min-h-[140px]">
          <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 md:w-10 md:h-10 md:mb-2">
            {React.cloneElement(step.icon, { className: "w-5 h-5 md:w-7 md:h-7" })}
          </div>
          <div className="md:text-center">
            <div className="font-bold text-sm text-blue-800 mb-0.5 md:mb-1">{step.title}</div>
            <div className="text-slate-700 text-xs opacity-90 leading-tight md:text-xs">{step.desc}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-4 text-center">
      <span className="inline-block bg-gradient-to-r from-green-400 to-blue-400 text-white px-3 py-2 rounded-full text-sm font-bold shadow">
        Solo seleccionás, cotizás y enviás tu pedido por WhatsApp. ¡Fácil y seguro!
      </span>
    </div>
  </section>
);

export default InstruccionesCompra;
