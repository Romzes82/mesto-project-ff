import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 
// import { Array } from 'core-js';
// import { keys } from 'core-js/core/array';

// DOM узлы
const placesList = document.querySelector('.places__list');
// DOM узел попапа edit
const popupTypeEdit = document.querySelector('.popup_type_edit');
// DOM узел попапа добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// DOM узел попапа с картинкой из карточки
const popupTypeImage = document.querySelector('.popup_type_image');
//дом узел кнопки открытия редактирования попапа
const profileEditButton = document.querySelector('.profile__edit-button');
//дом узел кнопки добавления профиля
const profileAddButton = document.querySelector('.profile__add-button');
// Находим форму в DOM
const formElement_editProfile = document.querySelector('.popup_type_edit .popup__content .popup__form');
const formElement_newCard = document.querySelector('.popup_type_new-card .popup__content .popup__form');
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
    openModal(popupTypeEdit);
});

//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement_editProfile.addEventListener('submit', handleFormSubmitEditProfile);
formElement_newCard.addEventListener('submit', handleFormSubmitNewCard);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Зафиксируем текстовое содержимое в элементы заголовка и параграфа страницы из полей формы
    nameInputContent.textContent = nameInput.value;
    jobInputContent.textContent = jobInput.value;
    closeModal(popupTypeEdit);
}

// функция открывающая попап с картинкой карточки, на которой был клик. Она передается в качестве аргумента в ф-цию addCard
function clickCardImageFunc(evt) { 
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
    popupTypeImage.querySelector('.popup__caption').textContent = evt.target.alt;
    openModal(popupTypeImage);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    placesList.prepend(addCard(evt.currentTarget.link.value, evt.currentTarget['place-name'].value, deleteCardFunc, likeCardFunc, clickCardImageFunc));
    evt.currentTarget.reset();
    closeModal(popupTypeNewCard);
}

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
});

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form');
const formInputName = formElement.querySelector('.popup__input_type_name');
const formInputDescription = formElement.querySelector('.popup__input_type_description');

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

// Слушатель события input
formInputName.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода, 
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
}); 

function enableValidation(validationConfig) {
    console.log(validationConfig);
    // const arr = Object.entries(validationConfig); //Array.from(validationConfig);
    // console.log(arr);

    // arr.forEach(([key, value]) => {
    //     console.table(key, value);
    // });
    Object.keys(validationConfig).forEach((key) => {
        console.log(validationConfig[key]);
    })
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// let arrayLike = {
//     formSelector: 'Hello',
//     inputSelector: 'World',
//     length: 2
// };
  
//   enableValidation(arrayLike);
//   let arr = Array.from(arrayLike); // (*)
// //   alert(arr.pop()); // World (метод работает)
// console.log(arr);