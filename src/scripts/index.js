import '../pages/index.css' // добавьте импорт главного файла стилей
import { initialCards } from './cards.js'; 


// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function addCard(src, alt, deleteCardFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    cardElement.querySelector('.card__title').textContent = alt;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

// Функция удаления карточки
function deleteCardFunc(evt) {
    // evt.currentTarget.parentElement.remove();
    // или
    // evt.target.parentElement.remove();
    // или
    evt.target.closest('.places__item').remove();
    // console.log('evt.currentTarget - ' + evt.currentTarget);
    // console.log('evt.taget - ' + evt.taget);
    // evt.currentTarget.parentElement.remove();

}

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc));
});

//===================================

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// popup_type_new-card
// console.log(popupTypeEdit);
// console.log(popupTypeEdit.classList);
// popupTypeEdit.classList.add('popup_is-opened');

//слушатель на кнопку открытия редактирования попапа
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
    popupTypeEdit.classList.add('popup_is-opened');
    onceOpenPopup();
});

function onceOpenPopup() {
    // console.log();
    document.querySelector('.popup_type_edit .popup__content .popup__close').addEventListener('click', function() {
        popupTypeEdit.classList.remove('popup_is-opened');
    })
}

//слушатель на кнопку добавления профиля
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
    popupTypeNewCard.classList.add('popup_is-opened');
    onceOpenPopup_1();
});


function onceOpenPopup_1() {
    console.log("asadd");
    document.querySelector('.popup_type_new-card .popup__content .popup__close').addEventListener('click', function() {
        popupTypeNewCard.classList.remove('popup_is-opened');   
    })
}

// в popup popup_type_image popup_is-opened надо параметром передавать src картинки, который будет 
//браться из таргет при клике на самой картике
