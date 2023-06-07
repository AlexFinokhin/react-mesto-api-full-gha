import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-edit"
          type="button"
          title="Обновить аватар"
          onClick={() => {
            onEditAvatar(true);
          }}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            title="Редактировать профиль"
            onClick={() => {
              onEditProfile(true);
            }}
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить новую фотографию"
          onClick={() => {
            onAddPlace(true);
          }}
        />
      </section>

      <section className="elements">
        <div className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
