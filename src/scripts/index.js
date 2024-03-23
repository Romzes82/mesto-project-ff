import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc, objForRemoveCart } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig, showInputError } from './components/validation.js';
import { getInitialUser, getInitialCards, setRedactionProfile, setNewCard, setDeleteCard, setPutLike, setDeleteLike,
    setChangeAvatarProfile, itIsImage, } from './components/api.js';


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
const formElementEditProfile = document.forms['edit-profile'];
const formElementNewCard = document.forms['new-place'];
const formElementControlQuestion = document.forms['control-question'];
// Находим поля формы в DOM
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description');
// Находим DOM-элемент заголовок profile__title
const nameInputContent = document.querySelector('.profile__title');
// Находим DOM-элемент параграф profile__description
const jobInputContent = document.querySelector('.profile__description');
// Находим DOM-элемент img с классом popup__image попапа с картинкой
const popupImg = popupTypeImage.querySelector('.popup__image');
// DOM узел попапа edit аватарки
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar');
// Находим форму в DOM
const formElementEditAvatar = document.forms['edit-avatar']; 
// Находим поля формы в DOM
const urlInputAvatar = formElementEditAvatar.elements.link;
const urlInputCard = formElementNewCard.elements.link;
// Находим DOM-элемент аватар profile__image
const profileImage = document.querySelector('.profile__image');
// Находим DOM-элемент подписи попапа с картинкой
const popapImageCaption = popupTypeImage.querySelector('.popup__caption');

//добавляем слушателя на кнопку edit
profileEditButton.addEventListener('click', () => {
    // при каждом клике на кнопке редактирования полям инпута присвоить значения со страницы
    nameInput.value = nameInputContent.textContent;
    jobInput.value = jobInputContent.textContent;
    clearValidation(formElementEditProfile, validationConfig);
    openModal(popupTypeEdit);
});

//добавляем слушателя на кнопку добавления карточки
profileAddButton.addEventListener('click', () => {
    openModal(popupTypeNewCard);
});

// вешаем слушателя на клик по profileImage для добавления аватарки
profileImage.addEventListener('click', () => {
    // urlInput.value = ""; если надо очищать поле перед открытием формы
    clearValidation(formElementEditAvatar, validationConfig);
    openModal(popupTypeEditAvatar);
});

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElementEditProfile.addEventListener('submit', handleFormSubmitEditProfile);
formElementNewCard.addEventListener('submit', handleFormSubmitNewCard);
formElementControlQuestion.addEventListener('submit', handleFormSubmitControlQuestion);
formElementEditAvatar.addEventListener('submit', handleFormSubmitEditAvatar);

// Обработчик «отправки» формы редактирования профиля
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const button = evt.submitter; //evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);
    // Зафиксируем текстовое содержимое в элементы заголовка и параграфа страницы из полей формы
    // nameInputContent.textContent = nameInput.value;
    // jobInputContent.textContent = jobInput.value;
    const tempObj = {
        name: nameInput.value,
        about: jobInput.value
    }
    setRedactionProfile(tempObj)
        .then(json => {
            nameInputContent.textContent = json.name;
            jobInputContent.textContent = json.about;
            closeModal(popupTypeEdit);
        })      
        // .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        .catch(console.error)
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
function clickCardImageFunc(cardObj) { 
    popupImg.src = cardObj.link;
    popupImg.alt = cardObj.name;       
    popapImageCaption.textContent = cardObj.name; 
    openModal(popupTypeImage);
}

// Обработчик «отправки» формы добавления карточки
function handleFormSubmitNewCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const button = evt.submitter; //evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);
    const tempObj = {
        link: evt.currentTarget.link.value, 
        name: evt.currentTarget['place-name'].value
    }

    if (!itIsImage(tempObj.link)) {
        isNotImage(formElementNewCard, urlInputCard, button);
        return;
    }

    tempObj.link = evt.currentTarget.link.value;

    setNewCard(tempObj)
        .then(json => {
            placesList.prepend(addCard(json, deleteCardFunc, likeCardFunc, clickCardImageFunc, userId,
                openModal, setPutLike, setDeleteLike));
            formElementNewCard.reset();
            // clearValidation(popupTypeNewCard.querySelector(validationConfig.formSelector), validationConfig);
            closeModal(popupTypeNewCard);
        })
        // .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        .catch(console.error)
        .finally(() => { 
            renderLoading(false, button);
        });
}

// Обработчик «отправки» формы редактирования аватарки
function handleFormSubmitEditAvatar(evt) { 
    evt.preventDefault();
    const button = evt.submitter; //evt.currentTarget.querySelector('.popup__button');
    renderLoading(true, button);
    const tempObj = {
        avatar: urlInputAvatar.value
        // 'https://api.codetabs.com/v1/proxy?quest=' + 
    };

    // imageExists(tempObj.avatar);
    // return;

    if (!itIsImage(tempObj.avatar)) {
        isNotImage(formElementEditAvatar, urlInputAvatar, button);
        return;
    }
    
    tempObj.avatar = urlInputAvatar.value;

    setChangeAvatarProfile(tempObj)
        .then(json => {
            profileImage.style.cssText = `background-image: url("${json.avatar}")`;
            // clearValidation(popupTypeEditAvatar, validationConfig);
            urlInputAvatar.value = "";
            closeModal(popupTypeEditAvatar);
        })
        .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`))
        // .catch(console.error)
        .finally(() => {
            renderLoading(false, button);
        });
}

function isNotImage(formElement, inputElement, button) {
    showInputError(formElement, inputElement, "По указанной ссылке нет картинки");
    renderLoading(false, button);
}


// функция открывающая попап с контрольным ворпросом, на которой был клик.
function handleFormSubmitControlQuestion(evt) { 
    evt.preventDefault();
    setDeleteCard(objForRemoveCart._id)
        .then(() => { 
            objForRemoveCart.card.remove();
            closeModal(popupTypeDeleteCard);
        })
        //  .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
            .catch(console.error);
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
Promise.all([getInitialUser(), getInitialCards()])
    .then(([getUser, getCards]) => {
        // responses — массив результатов выполнения промисов
        renderingUserInfo(getUser);
        renderingCardsInfo(getCards);
    })
    .catch(err => console.log(err));