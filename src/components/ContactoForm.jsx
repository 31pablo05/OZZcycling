import React from "react";

const ContactoForm = () => (
  <section className="py-12 bg-white text-blue-950">
    <h2 className="text-2xl font-bold text-center mb-8">Contáctanos</h2>
    <form className="max-w-lg mx-auto grid gap-4">
      <input className="border p-2 rounded" type="text" placeholder="Nombre" required />
      <input className="border p-2 rounded" type="email" placeholder="Email" required />
      <textarea className="border p-2 rounded" placeholder="Mensaje" rows="4" required></textarea>
      <button className="bg-blue-900 text-white py-2 rounded" type="submit">Enviar</button>
    </form>
  </section>
);

export default ContactoForm;
