import React from "react";
import useClose from "../utils/useClose";

function PopupWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  useClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className="popup__form popup__form_profile"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__save-button"
            type="submit"
            title="Сохранить"
          >
            {buttonText}
          </button>
        </form>
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
