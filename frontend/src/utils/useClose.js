import { useEffect } from "react";

export default function useClose(isOpen, handleClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("popup_opened")) handleClose();
    };

    const handleESC = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleESC);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleESC);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleClose]);
}
