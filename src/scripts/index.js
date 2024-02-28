import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, LikeCardFunc } from './components/card.js';
import { initialCards } from './cards.js'; 



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
    placesList.append(addCard(element.link, element.name, deleteCardFunc, LikeCardFunc)); // еще аргументом надо передать ф-ю лайк и клик по img
});

//===================================

// window.addEventListener('click', function (e) {

//     const target = e.target;
//     console.log(target)

// });




// DOM узел списка карточек с картинками
// const placesList = document.querySelector('.places__list'); он уже есть

// popup_type_new-card
// console.log(popupTypeEdit);
// console.log(popupTypeEdit.classList);
// popupTypeEdit.classList.add('popup_is-opened');



//добавляем слушателя на картинку в карточке по всему списку
placesList.addEventListener('click', function (evt) {
    console.log(evt.target.src);
    if (evt.target.classList.contains('card__image')) { 
        popupTypeImage.classList.add('popup_is-opened');
        // console.log(popupTypeImage.firstElementChild.childNodes);
        const popImg = popupTypeImage.querySelector('.popup__image');
        console.log(popImg);
        popImg.src = evt.target.src;
        console.log(evt.target);
        // для событий (клика по картинке) добавим слушателя событий (ф-ю колбэк удаления класса '.popup_is - opened')
        popupTypeImage.addEventListener('click', removeClassPoppupIsOpened_forImage);  
        hidePopupByEsc(popupTypeImage);
        // popupTypeImage.addEventListener('keydown', hidePopupByEsc);      
        // popupTypeImage.addEventListener('keydown', function () {
        //     console.log('Я возникаю, когда печатают в текстовом поле.');
        // });
    }
});

// const CardLikeButton = document.querySelector('card__like - button');
// card__like - button
// card__like - button_is - active

function removeClassPoppupIsOpened_forImage(evt) {
    console.log(evt.target.classList.value);

    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
         console.log(evt.currentTarget);
         console.log(evt.target.classList.value);
        evt.currentTarget.classList.remove('popup_is-opened');
        popupTypeImage.removeEventListener('click', removeClassPoppupIsOpened_forImage);
    }
}

//добавляем слушателя на кнопку edit
profileEditButton.addEventListener('click', function () {
    nameInput.value = nameInputContent.textContent;
    jobInput.value = jobInputContent.textContent;
    popupTypeEdit.classList.add('popup_is-opened');
    // popupTypeEdit.classList.add('popup_is-opened');
    console.log(popupTypeEdit);
    // console.log(document.getElementsByName('name')[0].focus());
    // popupTypeEdit.focus();
    // popup__input popup__input_type_name
    popupTypeEdit.addEventListener('click', removeClassPoppupIsOpened);
    // document.addEventListener('keydown', hidePopupByEsc);
    hidePopupByEsc(popupTypeEdit);
    //--------- popupTypeEdit.addEventListener('keydown', hidePopupByEsc); // removeClassPoppupIsOpenedByEsc
    // onceOpenPopup(popupTypeEdit); 
    
});

// document.addEventListener('keydown', hidePopupByEsc); 

//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', function () {
    popupTypeNewCard.classList.add('popup_is-opened');
    popupTypeNewCard.addEventListener('click', removeClassPoppupIsOpened_forNewCard);
    hidePopupByEsc(popupTypeNewCard);
    // -------- popupTypeNewCard.addEventListener('keydown', hidePopupByEsc);
    // onceOpenPopup(popupTypeNewCard);
});

function removeClassPoppupIsOpened_forNewCard(evt) {
    console.log(evt.target.classList.value);


    // popup popup_type_edit popup_is-opened
    //|| evt.target.classList.value === elem.classList.value
    // evt.target.classList.contains('popup_is-opened')
    // || evt.target.classList.value === 'popup popup_type_edit popup_is-opened' || evt.target.classList.value === 'popup popup_type_new-card popup_is-opened'

    if (evt.target.classList.contains('popup__close')
        || evt.target.classList.contains('popup__button')
        || evt.target.classList.contains('popup_is-opened')) {
            evt.currentTarget.classList.remove('popup_is-opened');
            // popupTypeEdit.removeEventListener('click', removeClassPoppupIsOpened);
            popupTypeNewCard.removeEventListener('click', removeClassPoppupIsOpened_forNewCard);
    }
}

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
        // popupTypeNewCard.removeEventListener('click', removeClassPoppupIsOpened);
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

// в popup popup_type_image popup_is-opened надо параметром передавать src картинки, который будет 
//браться из таргет при клике на самой картике

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
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    if (evt.currentTarget.parentNode.innerHTML.includes('edit-profile')) {
        nameInputContent.textContent = nameInput.value;
        jobInputContent.textContent = jobInput.value;
    }

    // console.log(evt.currentTarget.classList.contains('popup_type_edit'));
    if (evt.currentTarget.parentNode.innerHTML.includes('new-place')) {
        console.log(evt.currentTarget.link.value);
    }

    // document.querySelector('.profile__title').textContent = nameInput.value;
    // nameInputContent = 
    // document.querySelector('.profile__description').textContent = jobInput.value;

   
    // console.log(nameInput.value); 
    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement_edit.addEventListener('submit', handleFormSubmit);

//*************** */

const formElement_newCard = document.querySelector('.popup_type_new-card .popup__content .popup__form');// Воспользуйтесь методом querySelector()

function handleFormSubmit_newCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // console.log(evt.currentTarget['place-name'].value);
    // console.log(evt.currentTarget.link.value);
    const obj = {
        name: evt.currentTarget['place-name'].value,
        link: evt.currentTarget.link.value
    }
    placesList.prepend(addCard(obj.link, obj.name, deleteCardFunc, LikeCardFunc)); 
    evt.currentTarget.reset();
}

formElement_newCard.addEventListener('submit', handleFormSubmit_newCard);


function hidePopupByEsc(el) {
    console.log('in hidePopupByEsc');
    console.log(el);
    document.addEventListener('keydown', innerHidePopupByEsc);
    
    function innerHidePopupByEsc(evt) {
        console.log('Я возникаю, когда печатают в текстовом поле.');
        console.log(evt.key);
        if (evt.key === "Escape") {
            console.log(el);
            el.classList.remove('popup_is-opened');
            document.removeEventListener('keydown', innerHidePopupByEsc);
        };
    }
}




