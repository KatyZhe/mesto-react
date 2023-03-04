import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [newCard, setNewCard] = useState({ name: '', link: '' });

  useEffect(() => {
    setNewCard({ name: '', link: '' });
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(newCard);
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <fieldset className="popup__input-container">
        <input
          type="text"
          className="popup__item popup__item_title_input"
          name="inputplacename"
          value={newCard.name}
          onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
          minLength="2"
          maxLength="30"
          placeholder="Название"
          id="popup__placeinput"
          required
        />
        <span className="popup__span popup__placeinput-error"></span>
        <input
          type="url"
          className="popup__item popup__item_place_input"
          id="popup__linkinput"
          name="inputplacelink"
          value={newCard.link}
          onChange={(e) => setNewCard({ ...newCard, link: e.target.value })}
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__span popup__linkinput-error"></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
