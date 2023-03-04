import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AreYouSurePopup({ card, onClose, isOpen, onSubmit }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(card);
  }

  return (
    <PopupWithForm
      name="sure"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      hasInput={false}
      buttonText="Да"
    >
    </PopupWithForm>
  );
}

export default AreYouSurePopup;