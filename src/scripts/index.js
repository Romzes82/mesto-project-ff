import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 



// Темплейт карточки
// const cardTemplate = document.querySelector('#card-template').content;

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

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc)); // еще аргументом надо передать ф-ю лайк и клик по img
});

// функция откывающая попап с картинкой карточки, на которой был клик. Она передается в качестве аргумента в ф-цию addCard
function clickCardImageFunc(evt) { 
    // popupTypeImage.classList.add('popup_is-opened');
    openModal(popupTypeImage);
    const popImg = popupTypeImage.querySelector('.popup__image');
    console.log("popImg:");    
    console.log(popImg);
    popImg.src = evt.target.src;
    console.log("evt.target:");
    console.log(evt.target);

    // popupTypeImage.addEventListener('click', removeClassPoppupIsOpened_forImage);
    // hidePopupByEsc(popupTypeImage);    
}


//добавляем слушателя на кнопку edit
profileEditButton.addEventListener('click', function () {
    // при каждом клике на кнопке редактирования полям инпута присвоить значения со страницы
    nameInput.value = nameInputContent.textContent;
    jobInput.value = jobInputContent.textContent;

    openModal(popupTypeEdit);
    // popupTypeEdit.addEventListener('click', removeClassPoppupIsOpened);
});


//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', function () {
    openModal(popupTypeNewCard);
    // popupTypeNewCard.addEventListener('click', removeClassPoppupIsOpened_forNewCard);
});

// до сюда работает КРУТЬ


//обработчик события submit
// Находим форму в DOM
const formElement_edit = document.querySelector('.popup_type_edit .popup__content .popup__form');// Воспользуйтесь методом querySelector()

// console.log(formElement);
// Находим поля формы в DOM
const nameInput = formElement_edit.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElement_edit.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()


const nameInputContent = document.querySelector('.profile__title');
const jobInputContent = document.querySelector('.profile__description');



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    console.log("in handleFormSubmit");
    console.log(evt.target);
    if (evt.currentTarget.parentNode.innerHTML.includes('edit-profile')) {
        nameInputContent.textContent = nameInput.value;
        jobInputContent.textContent = jobInput.value;
        // closeModal(evt.target);
        popupTypeEdit.classList.remove('popup_is-opened');
    }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement_edit.addEventListener('submit', handleFormSubmit);

//****************/

const formElement_newCard = document.querySelector('.popup_type_new-card .popup__content .popup__form');// Воспользуйтесь методом querySelector()

function handleFormSubmit_newCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // console.log(evt.currentTarget['place-name'].value);
    // console.log(evt.currentTarget.link.value);
    const obj = {
        name: evt.currentTarget['place-name'].value,
        link: evt.currentTarget.link.value
    }
    
    placesList.prepend(addCard(obj.link, obj.name, deleteCardFunc, likeCardFunc, clickCardImageFunc)); 
    evt.currentTarget.reset();
    popupTypeNewCard.classList.remove('popup_is-opened');
}

formElement_newCard.addEventListener('submit', handleFormSubmit_newCard);






