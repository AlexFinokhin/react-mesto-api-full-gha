import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={onLoading ? `Сохранение...` : `Обновить`}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="avatar"
          type="url"
          name="avatar"
          ref={avatarRef}
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__input-error" id="avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
