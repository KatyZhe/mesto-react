import { useState, useEffect } from "react";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../utils/Api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationDelete, setIsConfirmationDelete] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingPlace, setIsLoadingPlace] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [removedCardId, setRemovedCardId] = useState("");

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

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
    setIsConfirmationDelete(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.toggleCardLike(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  const handleCardDeleteClick = (id) => {
    setIsConfirmationDelete(!isConfirmationDelete);
    setRemovedCardId(id);
  };

  function handleCardDelete(id) {
    setIsLoadingDelete(true);
    api.deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      }).finally(() => {
        setIsLoadingDelete(false);
      });;
  }

  function handleUpdateUser(currentUserInfo) {
    setIsLoadingUser(true);
    api
      .changeUserInfo(currentUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoadingAvatar(true);
    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingAvatar(false);
      });
  }

  const handleAddPlaceSubmit = (newData) => {
    setIsLoadingPlace(true);
    api
      .createCard(newData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoadingPlace(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <div className="page">
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onBasketClick={handleCardDeleteClick}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoadingUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoadingAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoadingPlace}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <ConfirmationPopup
            isOpen={isConfirmationDelete}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            onLoading={isLoadingDelete}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
