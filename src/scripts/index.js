import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 

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
// Находим DOM-элемент попапа с картинкой
const popupImg = popupTypeImage.querySelector('.popup__image');

document.querySelector('.profile__info').setAttribute('style', 'grid-template-areas: "title button" "description .";');

//строчку снизу можно закомментировать, тогда текстовое содержание парагрофа с классом "profile__description"
//не будет обрезаться троеточием, а будет выравниваться в колонку шириной 295px-17px с последующим переносом на сл. строку
document.querySelector('.profile__description').setAttribute('style', 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;');

// Создадим медиавыражение с параметрами ширины и подпишемся на его изменение, для утсановки секции с классом .profile ширины,
// равной ширине карточек в версии mobile (=< 480px)
const mobileWidthMediaQuery = window.matchMedia('(max-width: 480px)');

function printLog(isMobileSize) {
    isMobileSize ? document.querySelector('.profile').style.width = '282px' : document.querySelector('.profile').style.width = '';
}

printLog(mobileWidthMediaQuery.matches);

mobileWidthMediaQuery.addEventListener('change', function (event) {
    printLog(event.matches)
})

// функция открывающая попап с картинкой карточки, на которой был клик. Она передается в качестве аргумента в ф-цию addCard
function clickCardImageFunc(evt) { 
    openModal(popupTypeImage);
    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;
}

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

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const obj = {
        name: evt.currentTarget['place-name'].value,
        link: evt.currentTarget.link.value
    }
    placesList.prepend(addCard(obj.link, obj.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
    evt.currentTarget.reset();
    closeModal(popupTypeNewCard);
}

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
});