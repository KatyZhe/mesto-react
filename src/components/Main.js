import React from 'react';
import Card from "./Card";
import api from "../utils/Api.js";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
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
                        />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;