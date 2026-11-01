import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
};

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnBackdrop = true,
}: ModalProps) {
  // shouldRender: si el nodo está en el DOM (se mantiene durante la salida)
  // isVisible: si aplicamos los estilos "abierto" (dispara la transición)
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
    } else {
      // Dispara la animación de salida; el desmontaje ocurre en onTransitionEnd
      setIsVisible(false);
    }
  }, [isOpen]);

  // Ya montado, activamos la entrada en el frame siguiente para que transicione
  useEffect(() => {
    if (!shouldRender || !isOpen) return;
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, [shouldRender, isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Bloquear el scroll del body mientras el modal está montado
  useEffect(() => {
    if (!shouldRender) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onTransitionEnd={(e) => {
          // Solo cuando termina la transición del propio panel al cerrarse
          if (e.target === e.currentTarget && !isOpen) setShouldRender(false);
        }}
        className={clsx(
          "flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl transition-all duration-200 ease-out",
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
