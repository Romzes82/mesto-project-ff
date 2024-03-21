import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc, objForRemoveCart } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig, showInputError } from './components/validation.js';
import { getInitialUser, getInitialCards, setRedactionProfile, setNewCard, setDeleteCard, setPutLike, setDeleteLike,
    setChangeAvatarProfile, checkUrl } from './components/api.js';

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
// DOM узел попапа edit аватарки
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
// Находим форму в DOM
const formElement_editAvatar = document.forms['edit-avatar']; 
// Находим поля формы в DOM
const urlInput = formElement_editAvatar.querySelector('.popup__input_type_url')
// Находим DOM-элемент аватар profile__image
const profileImage = document.querySelector('.profile__image');

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

// вешаем слушателя на клик по profileImage для добавления аватарки
profileImage.addEventListener('click', () => {
    // urlInput.value = ""; если надо очищать поле перед открытием формы
    clearValidation(popupTypeEditAvatar.querySelector(validationConfig.formSelector), validationConfig);
    openModal(popupTypeEditAvatar);
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement_editProfile.addEventListener('submit', handleFormSubmitEditProfile);
formElement_newCard.addEventListener('submit', handleFormSubmitNewCard);
formElement_controlQuestion.addEventListener('submit', handleFormSubmitControlQuestion);
formElement_editAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const button = evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);
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
            closeModal(popupTypeEdit);
        })      
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        .finally(() => renderLoading(false, button));
}

function renderLoading(isLoading, elemButton) { 
    if (isLoading) {
        // console.log('грузим');
        elemButton.textContent = 'Сохранить...';
    } else { 
        // console.log('заружено');
        elemButton.textContent = 'Сохранить';
    }     
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
    const button = evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);
    const tempObj = {
        link: evt.currentTarget.link.value, 
        name: evt.currentTarget['place-name'].value
    }

    // clearValidation(popupTypeNewCard, validationConfig);
    // evt.currentTarget.reset();
    // clearValidation(popupTypeNewCard.querySelector(validationConfig.formSelector), validationConfig);
    
    // closeModal(popupTypeNewCard);
    setNewCard('/cards', tempObj, 'POST')
        .then(json => {
            placesList.prepend(addCard(json, deleteCardFunc, likeCardFunc, clickCardImageFunc, userId,
                openModal, setPutLike, setDeleteLike));
            formElement_newCard.reset();
            clearValidation(popupTypeNewCard.querySelector(validationConfig.formSelector), validationConfig);
            closeModal(popupTypeNewCard);
        })
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        .finally(() => { 
            renderLoading(false, button);
        });
}

// Обработчик «отправки» формы редактирования аватарки
function handleFormSubmitEditAvatar(evt) { 
    evt.preventDefault();
    const button = evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);    
    const tempObj = {
        avatar: urlInput.value
    };

    // if (!imageExists(tempObj.avatar)) {
    if (false) {        
        showInputError(formElement_editAvatar, urlInput, "По указанной ссылке нет картинки");
        return;
    } else { 
        // urlInput.setCustomValidity("");
    }

    urlInput.value = "";
    setChangeAvatarProfile('/users/me/avatar', tempObj, 'PATCH')
        .then(json => {
            profileImage.style.cssText = `background-image: url("${json.avatar}")`;
            // clearValidation(popupTypeEditAvatar, validationConfig);
            closeModal(popupTypeEditAvatar);
        })
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        .finally(() => {
            renderLoading(false, button);
        });
}

//функция проверяющая есть ли по ссылке изображение 
function imageExists(image_url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
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

// checkUrl('https://e7.pngegg.com/pngimages/863/315/png-clipart-javascript-world-wide-web-product-design-logo-javascript-text-orange.png', 'https://api.codetabs.com/v1/proxy?quest=')
//     .then(response => { 
//         console.log(response);
//         console.log('inRun');
//         console.log(response);
//     })