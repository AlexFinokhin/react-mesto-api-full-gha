import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, onAddPlace, isOpen, onLoading }) {
  const [placeName, setPlaceName] = useState("");
  const [placeImage, setPlaceImage] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceImage("");
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlace = { name: placeName, link: placeImage };
    onAddPlace(newPlace);
  };

  const handlePlaceNameChange = (event) => {
    setPlaceName(event.target.value);
  };

  const handlePlaceLinkChange = (event) => {
    setPlaceImage(event.target.value);
  };

  return (
    <PopupWithForm
      name="photo"
      title="Новое место"
      buttonText={onLoading ? `Сохранение...` : `Создать`}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="name"
          type="text"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={placeName}
          onChange={handlePlaceNameChange}
          autoFocus
          required
        />
        <span className="popup__input-error" id="name-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input"
          id="link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={placeImage}
          onChange={handlePlaceLinkChange}
          required
        />
        <span className="popup__input-error" id="link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
