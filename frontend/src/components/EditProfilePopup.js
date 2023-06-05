import { useState, useEffect, useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, onUpdateUser, isOpen, onLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleAboutChange = (event) => setAbout(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          name="name"
          id="nameInput"
          type="text"
          className="popup__input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleNameChange}
          autoFocus
          required
        />
        <span className="popup__input-error" id="name-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          name="about"
          id="jobInput"
          type="text"
          className="popup__input"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          value={about || ""}
          onChange={handleAboutChange}
          required
        />
        <span className="popup__input-error" id="job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
