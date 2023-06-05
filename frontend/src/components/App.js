import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import api from "../utils/api";
import auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupWithSubmit from "./PopupWithSubmit";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import success from "../images/success.svg";
import failure from "../images/failure.svg";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardToDeleteConfirmation, setCardDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cards, setCards] = useState([]);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipImageSrc, setTooltipImageSrc] = useState("");
  const [tooltipText, setTooltipText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const profileInfo = await api.getUserInfo();
      setCurrentUser(profileInfo);
      const data = await api.getInitialCards();
      setCards(data);
    } catch (error) {
      console.log(`Ошибка при получении данных: ${error.message}`);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [fetchData, isLoggedIn]);

  const checkToken = useCallback(async () => {
    const token = localStorage.getItem("jwt");
    if (isLoggedIn === true) {
      navigate("/");
    } else if (token) {
      try {
        const res = await auth.getJwt(token);
        if (res) {
          setIsLoggedIn(true);
          setUserEmail(res.data.email);
        }
      } catch (error) {
        console.log(`Ошибка ${error} при сохранении токена`);
      }
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const onSignUp = useCallback(
    async ({ email, password }) => {
      try {
        await auth.handleRegistration({ email, password });
        navigate("/sign-in");
        setTooltipImageSrc(success);
        setTooltipText("Вы успешно зарегистрировались!");
        setIsTooltipOpen(true);
      } catch (error) {
        setTooltipImageSrc(failure);
        setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setIsTooltipOpen(true);
      }
    },
    [navigate]
  );

  const onSignIn = useCallback(
    async ({ email, password }) => {
      try {
        const res = await auth.handleLogIn({ email, password });
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate("/");
      } catch (error) {
        setTooltipImageSrc(failure);
        setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        setIsTooltipOpen(true);
      }
    },
    [navigate]
  );

  const onSignOut = useCallback(async () => {
    await Promise.all([
      setIsLoggedIn(false),
      setUserEmail(null),
      localStorage.removeItem("jwt"),
    ]);

    navigate("/sign-in");
  }, [navigate]);

  const handleCardLike = async (card) => {
    try {
      const isLiked = card.likes.some((user) => user._id === currentUser._id);
      const newCard = await api.setLike(card._id, !isLiked);
      setCards((state) =>
        state.map((item) => (item._id === card._id ? newCard : item))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      setIsLoading(true);
      const newCard = await api.addCard(data);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (newUserInfo) => {
    try {
      setIsLoading(true);
      const data = await api.setUserInfo(newUserInfo);
      setCurrentUser(data);
      closeAllPopups();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAvatar = async (newAvatar) => {
    try {
      setIsLoading(true);
      const data = await api.setUserAvatar(newAvatar);
      setCurrentUser(data);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDelete = (cardId) => {
    setCardDelete(cardId);
  };

  const handleDeleteConfirmation = async () => {
    try {
      setIsLoading(true);
      await api.deleteCard(cardToDeleteConfirmation);
      setCards(cards.filter((c) => c._id !== cardToDeleteConfirmation));
      closeAllPopups();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardDelete(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <>
                  <Header linkText="Войти" route="/sign-in" />
                  <Register onSignUp={onSignUp} />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header linkText="Регистрация" route="/sign-up" />
                  <Login onSignIn={onSignIn} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header
                    linkText="Выйти"
                    userEmail={userEmail}
                    onClick={onSignOut}
                    route="/sign-in"
                  />
                  <ProtectedRoute
                    component={Main}
                    isLoggedIn={isLoggedIn}
                    cards={cards}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onCardDelete={handleCardDelete}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardLike}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onEditProfile={setIsEditProfilePopupOpen}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
            />
          </Routes>
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <PopupWithSubmit
            onConfirm={handleDeleteConfirmation}
            isOpen={!!cardToDeleteConfirmation}
            onClose={closeAllPopups}
            onLoading={isLoading}
          />
          <InfoTooltip
            imageStatus={tooltipImageSrc}
            title={tooltipText}
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
