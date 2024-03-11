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

// ****************************************************************

// Вынесем все необходимые элементы формы в константы
//  const formElement = document.querySelector('.form');
// const formInput = formElement.querySelector('.form__input');

// Выбираем элемент ошибки на основе уникального класса 
// const formError = formElement_editProfile.querySelector(`.${nameInput.id}-error`);
// console.log(formError); // "email-input" 

// // Функция, которая добавляет класс с ошибкой
// const showInputError = (element, errorMessage) => {
//     element.classList.add('popup__input_error');
//     // Заменим содержимое span с ошибкой на переданный параметр
//     formError.textContent = errorMessage;    
//     // Показываем сообщение об ошибке
//     formError.classList.add('popup__error_visible');
// };

const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
}; 

// Функция, которая удаляет класс с ошибкой
// const hideInputError = (element) => {
//     element.classList.remove('popup__input_error');
//     // Скрываем сообщение об ошибке
//     formError.classList.remove('popup__error_visible');
//     // Очистим ошибку
//     formError.textContent = '';
// };

// Функция, которая проверяет валидность поля
// const isValid = () => {
//     hideInputError(nameInput);
//     if (!nameInput.validity.valid) {
//         // Если поле не проходит валидацию, покажем ошибку
//         showInputError(nameInput, nameInput.validationMessage);
//     } else {
//         // Если проходит, скроем
//         hideInputError(nameInput);
//     }
// };

// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке

        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement);
    }
}; 

// Вызовем функцию isValid на каждый ввод символа
// nameInput.addEventListener('input', isValid);

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        // доработать
        buttonElement.classList.add('popup__button_inactive');
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        // доработать
        buttonElement.classList.remove('popup__button_inactive');
    }
}; 

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector('.popup__button');

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
}; 


const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // console.log(formList);

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Вызовем функцию
enableValidation(); 

// // включение валидации вызовом enableValidation
// // все настройки objSettingValidation передаются при вызове

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
// });
// // очистка ошибок валидации вызовом clearValidation

// clearValidation(profileForm, validationConfig);

