"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

// Botón persistente en móvil (sección 3 del encargo) -- aparece solo tras
// pasar la primera pantalla (para no tapar el hero) y se oculta cuando el
// propio formulario ya está visible (para no interferir con la navegación
// ni taparlo, tal y como pide el encargo).
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const formulario = document.getElementById("formulario");
    function onScroll() {
      const pasoHero = window.scrollY > window.innerHeight * 0.6;
      const formularioVisible = formulario
        ? formulario.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(pasoHero && !formularioVisible);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-border bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] sm:hidden">
      <a
        href="#formulario"
        className="block rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-navy-dark"
      >
        Solicitar valoración · {business.telefonoContacto}
      </a>
    </div>
  );
}
