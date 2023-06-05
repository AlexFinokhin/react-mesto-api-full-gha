import useClose from "../utils/useClose";

function ImagePopup({ card, onClose }) {
  useClose(card.link, onClose);
  return (
    <div className={`popup popup_viewer ${card.link ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__text">{card.name}</h2>
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

export default ImagePopup;
