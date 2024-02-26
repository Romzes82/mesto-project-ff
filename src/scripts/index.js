import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 



// Темплейт карточки
// const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
// function addCard(src, alt, deleteCardFunc) {
//     const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем содержимым
    // cardElement.querySelector('.card__image').src = src;
    // cardElement.querySelector('.card__image').alt = alt;
    // cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    // cardElement.querySelector('.card__title').textContent = alt;

    // возвращаем DOM-элемент созданной карточки
//     return cardElement;
// }

// Функция удаления карточки
// function deleteCardFunc(evt) {
    // evt.currentTarget.parentElement.remove();
    // или
    // evt.target.parentElement.remove();
    // или
    // evt.target.closest('.places__item').remove();
    // console.log('evt.currentTarget - ' + evt.currentTarget);
    // console.log('evt.taget - ' + evt.taget);
    // evt.currentTarget.parentElement.remove();

// }

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc)); // еще аргументом надо передать ф-ю лайк и клик по img
});

//===================================

// window.addEventListener('click', function (e) {

//     const target = e.target;
//     console.log(target)

// });

// DOM узлы попапов
const popupTypeEdit = document.querySelector('.popup_type_edit');
// const formEditProfile = document.forms['edit-profile'];
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// popup_type_new-card
// console.log(popupTypeEdit);
// console.log(popupTypeEdit.classList);
// popupTypeEdit.classList.add('popup_is-opened');

//дом узел кнопки открытия редактирования попапа
const profileEditButton = document.querySelector('.profile__edit-button');
//дом узел кнопки добавления профиля
const profileAddButton = document.querySelector('.profile__add-button');

//добавляем слушателя на кнопку edit
profileEditButton.addEventListener('click', function () {
    popupTypeEdit.classList.add('popup_is-opened');
    popupTypeEdit.addEventListener('click', removeClassPoppupIsOpened);
    // onceOpenPopup(popupTypeEdit);
});

//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', function () {
    popupTypeNewCard.classList.add('popup_is-opened');
    popupTypeNewCard.addEventListener('click', removeClassPoppupIsOpened);
    // onceOpenPopup(popupTypeNewCard);
});

function removeClassPoppupIsOpened(evt) { 
    console.log(evt.target.classList.value);
    // popup popup_type_edit popup_is-opened
    //|| evt.target.classList.value === elem.classList.value
    // evt.target.classList.contains('popup_is-opened')
    // || evt.target.classList.value === 'popup popup_type_edit popup_is-opened' || evt.target.classList.value === 'popup popup_type_new-card popup_is-opened'

    if (evt.target.classList.contains('popup__close')
        || evt.target.classList.contains('popup__button')
        || evt.target.classList.contains('popup_is-opened')) {
        // console.log(evt.currentTarget);
        // console.log(evt.target.classList.value);
        evt.currentTarget.classList.remove('popup_is-opened');
        popupTypeEdit.removeEventListener('click', removeClassPoppupIsOpened);
    }
}

// до сюда работает КРУТЬ




// вешаем слушателя события click на крестик сабмит и оверлей функцию колбэк, которая будет вызываться при клике на них
// при открытии попапа надо вешать эти слушатели
// а при закрытии попапа надо удалять эти слушатели

// function addClassPopupIsOpened(evt) { 
//     popupTypeEdit.classList.add('popup_is-opened');
//     onceOpenPopup(popupTypeEdit);
// }

function onceOpenPopup(elem) {
    //  console.log(e.currentTarget);
        
    // document.querySelector('.popup_type_edit .popup__content .popup__close').addEventListener('click', function() {
    // elem.querySelector('.popup__close').addEventListener('click', function (evt) {
    elem.addEventListener('click', function (evt) {

        // console.log(evt.target.classList.value);
        console.log(elem.classList.value);

        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button') || evt.target.classList.value === elem.classList.value) {
            console.log(evt.currentTarget);
            elem.classList.remove('popup_is-opened');
        }
    })
}

// function removeClassPoppupIsOpened(evt) { 
//     console.log(elem.classList.value);

//     if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__button') || evt.target.classList.value === elem.classList.value) {
//         console.log(evt.currentTarget);
//         elem.classList.remove('popup_is-opened');
//     }
// }






function onceOpenPopup_1() {
    // console.log("asadd");
    document.querySelector('.popup_type_new-card .popup__content .popup__close').addEventListener('click', function() {
        popupTypeNewCard.classList.remove('popup_is-opened');   
    })
}

// в popup popup_type_image popup_is-opened надо параметром передавать src картинки, который будет 
//браться из таргет при клике на самой картике

//обработчик события submit
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// console.log(formElement);
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // console.log(evt);

    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    
    // console.log(nameInput.value); 
    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
