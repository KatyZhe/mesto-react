import { useEffect, useState } from 'react';
import Card from "./Card";
import api from "../utils/Api.js";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onBasketClick }) => {
    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cardData);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    return (
        <main>
            <section className="profile">
                <div className="profile__user">
                    <button
                        className="profile__edit-avatar"
                        onClick={onEditAvatar}
                    >
                        <img
                            className="profile__avatar"
                            src={userAvatar}
                            style={{ backgroundImage: `url(${userAvatar})` }}
                            alt="аватар"
                        />
                    </button>

                    <div className="profile__info">
                        <h1 className="profile__user-name">{userName}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        ></button>
                        <p className="profile__user-info">{userDescription}</p>
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
                        />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;