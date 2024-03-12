import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig} from './components/validation.js'

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
    clearValidation(popupTypeNewCard, validationConfig);
    closeModal(popupTypeNewCard);
}

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
});

// ****************************************************************

// включение валидации вызовом enableValidation
// все настройки validationConfig передаются при вызове
enableValidation(validationConfig);

//  ------------------------------------- API ------------------------------------

// Токен: 7813a882-8b4e-45b6-82a9-68275120708a
// Идентификатор группы: wff-cohort-9

// const initialCards = [];

function test() { 
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/cards', {
        headers: {
            authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            result.forEach(element => { 
                // console.log(element.name);
                // initialCards.name = elem.name;
                // initialCards.link = elem.link;
                placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
            })
        });
}

function test1() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
        headers: {
            authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
}


function test2() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
        headers: {
            authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
        }
    })
        .then((res) => {
            if (res.headers.get('Content-Type').contains('application/json')) {
                return res.json();
            }
        });
}

function test4() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/users/me', {
        headers: {
            authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
        }
    })
        .then(res => {
            console.log(res.status); // какой у ответа статус?
            console.log(res.headers.get('Content-Type')); // а Content-Type какой?
            return res.json();
        })
        .then((data) => {
            console.log(data); // а что пришло в теле?
        });
}

test4();

// // Вывести карточки из массива initialCards на страницу
// initialCards.forEach(element => {
//     placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
// });

// EXAMPLE

// Создаём первый промис
const firstPromise = new Promise((resolve, reject) => {
    if (someCondition) {
        resolve('Первый промис');
    } else {
        reject();
    }
});

// Создаём второй промис
const secondPromise = new Promise((resolve, reject) => {
    if (secondCondition) {
        resolve('Второй промис');
    } else {
        reject();
    }
});

// Создаём массив с промисами
const promises = [firstPromise, secondPromise]

// Передаём массив с промисами методу Promise.all
Promise.all(promises)
    .then((results) => {
        console.log(results); // ["Первый промис", "Второй промис"]
    }); 

// Таким образом, промисы — запросы на асинхронный код.Когда мы создаём промис, мы говорим движку: 
// выполни вот этот код и по результатам переведи промис в статус «исполнен» или «отклонён».
// Все дальнейшие действия с результатом запроса прописывают в цепочке методов then и catch. Они принимают на вход колбэк 
// с одним параметром.В этот параметр записывается либо то, что вернул предыдущий then или catch, либо то значение,
//     с которым была вызвана функция resolve или reject.