import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { owner, likes, link, name } = card || {};
  const currentUser = useContext(CurrentUserContext) || {};
  const ownerCard = owner?._id === currentUser?._id;
  const isLiked = likes?.some((user) => user?._id === currentUser?._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card?._id);
  }

  return (
    <figure className="element">
      <img
        className="element__image"
        alt={name}
        src={link}
        onClick={handleCardClick}
      />
      <figcaption className="element__info">
        <h2 className="element__name">{name}</h2>
        {ownerCard && (
          <button
            className="element__trash-button"
            type="button"
            title="Удалить"
            onClick={handleDeleteClick}
          />
        )}
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Нравится"
            onClick={handleLikeClick}
          />
          <p className="element__like-count">{likes?.length}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
