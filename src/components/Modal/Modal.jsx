import { createPortal } from "react-dom";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import css from "./Modal.module.css";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          <AiOutlineClose size={24} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
