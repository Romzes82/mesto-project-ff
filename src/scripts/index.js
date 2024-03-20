import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc, objForRemoveCart } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { getInitialUser, getInitialCards, setRedactionProfile, setNewCard, setDeleteCard, setPutLike, setDeleteLike,
    setChangeAvatarProfile } from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
// DOM узел попапа edit
const popupTypeEdit = document.querySelector('.popup_type_edit');
// DOM узел попапа добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// DOM узел попапа с картинкой из карточки
const popupTypeImage = document.querySelector('.popup_type_image');
// DOM узел попапа с контрольным вопроса удаления карточки
const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');
//дом узел кнопки открытия редактирования попапа
const profileEditButton = document.querySelector('.profile__edit-button');
//дом узел кнопки добавления профиля
const profileAddButton = document.querySelector('.profile__add-button');
// Находим форму в DOM
const formElement_editProfile = document.querySelector('.popup_type_edit .popup__content .popup__form');
const formElement_newCard = document.querySelector('.popup_type_new-card .popup__content .popup__form');
const formElement_controlQuestion = document.forms['control-question']; 
// Находим поля формы в DOM
const nameInput = formElement_editProfile.querySelector('.popup__input_type_name');
const jobInput = formElement_editProfile.querySelector('.popup__input_type_description');
// Находим DOM-элемент заголовок profile__title
const nameInputContent = document.querySelector('.profile__title');
// Находим DOM-элемент параграф profile__description
const jobInputContent = document.querySelector('.profile__description');
// Находим DOM-элемент img с классом popup__image попапа с картинкой
const popupImg = popupTypeImage.querySelector('.popup__image');

//добавляем слушателя на кнопку edit
profileEditButton.addEventListener('click', () => {
    // при каждом клике на кнопке редактирования полям инпута присвоить значения со страницы
    nameInput.value = nameInputContent.textContent;
    jobInput.value = jobInputContent.textContent;
    clearValidation(popupTypeEdit.querySelector(validationConfig.formSelector), validationConfig);
    openModal(popupTypeEdit);
});

//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement_editProfile.addEventListener('submit', handleFormSubmitEditProfile);
formElement_newCard.addEventListener('submit', handleFormSubmitNewCard);
formElement_controlQuestion.addEventListener('submit', handleFormSubmitControlQuestion);

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Зафиксируем текстовое содержимое в элементы заголовка и параграфа страницы из полей формы
    nameInputContent.textContent = nameInput.value;
    jobInputContent.textContent = jobInput.value;
    const tempObj = {
        name: nameInput.value,
        about: jobInput.value
    }
    setRedactionProfile('/users/me', tempObj, 'PATCH')
        .then(json => {
            nameInputContent.textContent = json.name;
            jobInputContent.textContent = json.about;
        })      
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
    closeModal(popupTypeEdit);
}

// функция открывающая попап с картинкой карточки, на которой был клик
function clickCardImageFunc(evt) { 
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupTypeImage.querySelector('.popup__caption').textContent = evt.target.alt;
    openModal(popupTypeImage);
}

// Обработчик «отправки» формы добавления карточки
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const tempObj = {
        link: evt.currentTarget.link.value, 
        name: evt.currentTarget['place-name'].value
    }
    evt.currentTarget.reset();
    clearValidation(popupTypeNewCard, validationConfig);
    closeModal(popupTypeNewCard);
    setNewCard('/cards', tempObj, 'POST')
        .then(json => {
            placesList.prepend(addCard(json, deleteCardFunc, likeCardFunc, clickCardImageFunc, userId,
                openModal, setPutLike, setDeleteLike));
        })
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
}

// функция открывающая попап с контрольным ворпросом, на которой был клик.
function handleFormSubmitControlQuestion(evt) { 
    evt.preventDefault();
    setDeleteCard('/cards/' + objForRemoveCart._id, {}, 'DELETE')
        .then(() => { 
            objForRemoveCart.card.remove();
            closeModal(popupTypeDeleteCard);
        })
         .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
}


//  ------------------------------------- Валидация ------------------------------------
// включение валидации вызовом enableValidation
// все настройки validationConfig передаются при вызове
enableValidation(validationConfig);

//  ------------------------------------- API ------------------------------------

// Находим DOM-элемент аватар profile__image
const profileImage = document.querySelector('.profile__image');

// PATCH https://nomoreparties.co/v1/cohortId/users/me/avatar
//  setChangeAvatarProfile('/users/me/avatar', { avatar: 'https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg' }, 'PATCH');

// вешаем слушателя на profileImage
// profileImage.addEventListener('mouseover', () => {
    // openModal(popupTypeNewCard);
    // http://localhost:8080/6c7bf05444b9793fdf6e.svg
// });

//объявляем переменную, для последующей передачи аргументом в addCard
let userId;

//визуализируем response о профиле
const renderingUserInfo = (response) => { 
    nameInputContent.textContent = response.name;
    jobInputContent.textContent = response.about;
    profileImage.style.cssText =  `background-image: url("${response.avatar}")`
    userId = response._id;
}
//визуализируем response о карточках
const renderingCardsInfo = (response) => { 
    response.forEach(cardObj => { 
        placesList.append(addCard(cardObj, deleteCardFunc, likeCardFunc, clickCardImageFunc, userId,
            openModal, setPutLike, setDeleteLike));
    })
}

// Загрузка информации о пользователе с сервера и загрузка карточек с сервера методом Promise.all()
Promise.all([getInitialUser('/users/me'), getInitialCards('/cards')])
    .then(([getUser, getCards]) => {
        // responses — массив результатов выполнения промисов
        renderingUserInfo(getUser);
        renderingCardsInfo(getCards);
    })
    .catch(err => console.log(err));
