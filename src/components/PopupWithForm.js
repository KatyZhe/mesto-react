import React from "react";

const PopupWithForm = (props) => {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={props.onClose}></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form
          name={`${props.name}`}
          action="#"
          className="popup__form"
          onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm