import React, { useRef, useEffect, useState } from "react";

/**
 * RevealOnScroll
 * Envuelve cualquier contenido y le aplica una animación de entrada cuando aparece en pantalla.
 * Props:
 *  - children: contenido a mostrar
 *  - className: clases extra para el wrapper
 *  - animationDelay: opcional, delay en ms para la animación
 */
const RevealOnScroll = ({ children, className = "", animationDelay = 0 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "animate-revealonscroll" : "opacity-0"} ${className}`}
      style={visible ? { animationDelay: `${animationDelay}ms` } : {}}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;

// Animación CSS para fade-in y slide-up
// Agrega esto en tu CSS global o en el componente que lo use:
//
// @keyframes revealonscroll {
//   from { opacity: 0; transform: translateY(40px) scale(0.96); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// .animate-revealonscroll {
//   animation: revealonscroll 0.9s cubic-bezier(.4,0,.2,1) both;
// }
