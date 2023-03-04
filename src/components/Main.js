import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onBasketClick,
  onCardLike,
  onCardDeleteClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <div className="profile__user">
          <button className="profile__edit-avatar" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={avatar}
              style={{ backgroundImage: `url(${avatar})` }}
              alt="аватар"
            />
          </button>

          <div className="profile__info">
            <h1 className="profile__user-name">{name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__user-info">{about}</p>
          </div>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onBasketClick={onBasketClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
