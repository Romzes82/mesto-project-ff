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

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// popup_type_new-card
// console.log(popupTypeEdit);
// console.log(popupTypeEdit.classList);
// popupTypeEdit.classList.add('popup_is-opened');

//слушатель на кнопку открытия редактирования попапа
const profileEditButton = document.querySelector('.profile__edit-button');

profileEditButton.addEventListener('click', function () {
    // popupTypeEdit.classList.add('popup_is-opened');
    popupTypeEdit.classList.toggle('popup_is-opened');
    onceOpenPopup();
});

function onceOpenPopup() {
    // console.log();
    document.querySelector('.popup_type_edit .popup__content .popup__close').addEventListener('click', function(e) {
        console.log(e.target.parentElement.parentElement.classList);
        const thisEvtClass = e.target.classList.value
        popupTypeEdit.classList.remove('popup_is-opened');
        // popupTypeEdit.classList.toggle('popup_is-opened');
        // popupTypeEdit.classList.remove(thisEvtClass);
    })
}

//слушатель на кнопку добавления профиля
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
    popupTypeNewCard.classList.add('popup_is-opened');
    onceOpenPopup_1();
});


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
