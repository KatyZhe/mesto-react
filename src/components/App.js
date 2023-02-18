import React from 'react';

import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };

  return (
    <div>
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input type="url" className="popup__item popup__avatar-input" id="popup__avatar" name="avatar"
              placeholder="Ссылка на аватар" required />
            <span className="popup__span popup__avatar-error"></span>
            <button type="submit" className="popup__button popup__button_disabled" disabled>Сохранить</button>
          </fieldset>

        </PopupWithForm>

        <PopupWithForm
          name="profilename"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input type="text" className="popup__item popup__item_name_input" name="name" placeholder="Имя" minLength="2" maxLength="40" id="popup__name-input" required />
            <span className="popup__span popup__name-input-error"></span>
            <input type="text" className="popup__item popup__item_job_input" name="about" placeholder="О себе" minLength="2" maxLength="200" id="popup__job-input" required />
            <span className="popup__span popup__job-input-error"></span>
            <button type="submit" className="popup__input-error popup__button">Сохранить</button>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="new-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="popup__input-container">
            <input type="text" className="popup__item popup__item_title_input" name="inputplacename" minLength="2" maxLength="30" placeholder="Название" id="popup__placeinput"
              required />
            <span className="popup__span popup__placeinput-error"></span>
            <input type="url" className="popup__item popup__item_place_input" id="popup__linkinput" name="inputplacelink"
              placeholder="Ссылка на картинку" required />
            <span className="popup__span popup__linkinput-error"></span>
            <button type="submit" className="popup__button popup__button_disabled" disabled>Создать</button>
          </fieldset>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <div className="popup popup_sure">
          <div className="popup__container">
            <button type="button" className="popup__close"></button>
            <h2 className="popup__heading-sure">Вы уверены?</h2>
            <button type="submit" className="popup__button">Да</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;