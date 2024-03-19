import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc, objForRemoveCart } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { getInitialUser, getInitialCards, setRedactionProfile, setNewCard, setDeleteCard } from './components/api.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
// DOM узел попапа edit
const popupTypeEdit = document.querySelector('.popup_type_edit');
// DOM узел попапа добавления карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
// DOM узел попапа с картинкой из карточки
const popupTypeImage = document.querySelector('.popup_type_image');
// DOM узел попапа с контрольного вопроса
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

// DOM узел попапа конрольного вопроса удаления карточки
// const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');

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
formElement_controlQuestion.addEventListener('submit', handleFormSubmitControlQuestion);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmitEditProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Зафиксируем текстовое содержимое в элементы заголовка и параграфа страницы из полей формы
    nameInputContent.textContent = nameInput.value;
    jobInputContent.textContent = jobInput.value;
    const objProfileForServer = {
        name: nameInput.value,
        about: jobInput.value
    }
    setRedactionProfile('/users/me', objProfileForServer, 'PATCH')
        .then(json => {
            console.log(json);
            nameInputContent.textContent = json.name,
            jobInputContent.textContent = json.about
        })
    // ответ
    // {
    //     "name": "Marie Skłodowska Curie",
    //     "about": "Physicist and Chemist",
    //     "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
    //     "_id": "e20537ed11237f86bbb20ccb",
    //     "cohort": "cohort0",
    //   } 
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
    // placesList.prepend(addCard(evt.currentTarget.link.value, evt.currentTarget['place-name'].value, deleteCardFunc, likeCardFunc, clickCardImageFunc));
    const obj = {
        link: evt.currentTarget.link.value, 
        name: evt.currentTarget['place-name'].value
    }
    evt.currentTarget.reset();
    clearValidation(popupTypeNewCard, validationConfig);
    closeModal(popupTypeNewCard);
    // post('/cards', obj, 'POST'); нужен .then и .catch
    setNewCard('/cards', obj, 'POST')
        .then(json => {
            console.log(json);
            console.log(json._id);
            console.log(json.owner._id);
            cacheResponceFromServer.cardId = json._id;
            cacheResponceFromServer.ownerCardId = json.owner._id;
            cacheResponceFromServer.cardName = json.name;
            cacheResponceFromServer.cardLink = json.link;
            placesList.prepend(addCard(cacheResponceFromServer.cardLink, cacheResponceFromServer.cardName, deleteCardFunc, likeCardFunc, clickCardImageFunc, cacheResponceFromServer));
        });

    // cacheResponceFromServer.userId = 
    // placesList.prepend(addCard(cacheResponceFromServer.cardLink, cacheResponceFromServer.cardName, deleteCardFunc, likeCardFunc, clickCardImageFunc, cacheResponceFromServer));
    
    // const obj = {
    //     link: evt.currentTarget.link.value, 
    //     name: evt.currentTarget['place-name'].value
    // }
}

// функция открывающая попап с контрольным ворпросом, на которой был клик. Она передается в качестве аргумента в ф-цию addCard
function handleFormSubmitControlQuestion(evt) { 
    evt.preventDefault();
    
    // console.log(evt.currentTarget);
    // closeModal(popupTypeDeleteCard);
    // console.log(objForRemoveCart);
    // console.log('/cards/' + objForRemoveCart._id);
    setDeleteCard('/cards/' + objForRemoveCart._id, {}, 'DELETE')
        .then(response => { 
            objForRemoveCart.card.remove();
            closeModal(popupTypeDeleteCard);
        })
         .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
    // placesList.querySelector('.card_remove_yes-no').remove();
    // document.del_yes - no
    // console.log(deleteCardFunc.cache);
    // console.log(deleteCardFunc.cardId);
    // console.log('---');
    // console.log(deleteCardFunc.cardElem);
    // console.log(deleteCardFunc.ownerCardId);
}

// Вывести карточки из массива initialCards на страницу
// initialCards.forEach(element => {
//     placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
// });

// ****************************************************************

// включение валидации вызовом enableValidation
// все настройки validationConfig передаются при вызове
enableValidation(validationConfig);

//  ------------------------------------- API ------------------------------------

// profile__image
// Находим DOM-элемент аватар profile__image
const profileImage = document.querySelector('.profile__image');
// Находим DOM-элемент кол-во лайков картиочки card__like-amount
// const cardLikeAmount = document.querySelector('.card__like-amount');

// let userId; //или записать все в объект сразу userId, ownerCardId, cardId из добавления со страницы добавятся name и link
// cacheResponceFromServer = { userId, ownerCardId, cardId, likesArr };
const cacheResponceFromServer = {};

const parsResponseUserInfo = (response) => { 
    nameInputContent.textContent = response.name;
    jobInputContent.textContent = response.about;
    profileImage.style.cssText =  `background-image: url("${response.avatar}")`
    // background-image: url("6666407ac3aa5af1d5de.jpg")
    cacheResponceFromServer.userId = response._id;
    // console.log(response.name)
    // console.log(response.about)
    // console.log(response.avatar)
    // console.log(response._id)
}

const parsResponseCardsInfo = (response) => { 

    console.log("AAAAAAA");
    console.log('idUser=' + cacheResponceFromServer.userId);
    //т.е. надо передать аргументом _id хозяина owner карточки и idUser для того чтоб функция deleteCardFunc смогла понимать
    // добавлять класс card__delete - button - hidden или нет.
    // А может попробовать deleteCardFunc.св-во = true или false, если тру то корзину отображаем
    // как быть с лайком - надо передать массив объект likes или только его _id
    // [{
    //     "likes": [
    //         {
    //             "name": "Виктор",
    //             "about": "Исследователь JavaScript",
    //             "avatar": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //             "_id": "faa37de502d65eafa0ba4bbf",
    //             "cohort": "wff-cohort-9"
    //         },
    //         {
    //             "name": "Jacques Cousteaug",
    //             "about": "Sailor, researcherh",
    //             "avatar": "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=440&h=220&q=60",
    //             "_id": "d30ba6e52ae0b5da4d35e9e6",
    //             "cohort": "wff-cohort-9"
    //         }
    //     ],
    //         "_id": "65f2e545fa8857001268d64e",
    //             "name": "Desert",
    //                 "link": "https://images.unsplash.com/photo-1707345512638-997d31a10eaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //                     "owner": {
    //         "name": "Виктор",
    //             "about": "Исследователь JavaScript",
    //                 "avatar": "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //                     "_id": "faa37de502d65eafa0ba4bbf",
    //                         "cohort": "wff-cohort-9"
    //     },
    //     "createdAt": "2024-03-14T11:53:41.398Z"
    // }]
    // deleteCardFunc.cache = {};

    // deleteCardFunc.userId = userId;

    // cacheResponceFromServer.userId = userId;
    response.forEach(cardObj => { 
        // if (cardObj.owner._id === userId) {
        //     // alert(cardObj._id)
        //     deleteCardFunc.cardId = cardObj._id;
        // } else { 
        //     deleteCardFunc.cardId = '';
        // }

        // console.log(cardObj._id);
        // cardId = cardObj._id;
        cacheResponceFromServer.ownerCardId= cardObj.owner._id; // заполнить объект вызовом ф-и createCaheObj(param1, param2,...)
        cacheResponceFromServer.cardId = cardObj._id;
        cacheResponceFromServer.likesObj = cardObj.likes;
        // deleteCardFunc.ownerCardId = cardObj.owner._id;
        // deleteCardFunc.cardId = cardObj._id;
        // placesList.append(addCard(cardObj.link, cardObj.name, deleteCardFunc, likeCardFunc, clickCardImageFunc, cardObj._id));
        placesList.append(addCard(cardObj.link, cardObj.name, deleteCardFunc, likeCardFunc, clickCardImageFunc, cacheResponceFromServer));
     //   console.log(cardObj.likes.length + ' - ' + cardObj.name);
        // cardLikeAmount.textContent = cardObj.likes.length;
    })

}

// Загрузка информации о пользователе с сервера и Загрузка карточек с сервера методом Promise.all()
Promise.all([getInitialUser('/users/me'), getInitialCards('/cards')])
    .then(([getInitialUser, getInitialCards]) => {
        // responses — массив результатов выполнения промисов
        // понадобятся  name, about и avatar
        parsResponseUserInfo(getInitialUser);
        // console.log(getInitialUser)
        // 1
        parsResponseCardsInfo(getInitialCards);
        // console.log(getInitialCards)
        // 2
    })
    .catch(err => console.log(err));



// let urls = [
//     'https://api.github.com/users/iliakan',
//     'https://api.github.com/users/remy',
//     'https://api.github.com/users/jeresig'
// ];

// // Преобразуем каждый URL в промис, возвращённый fetch
// let requests = urls.map(url => fetch(url));

// // Promise.all будет ожидать выполнения всех промисов
// Promise.all(requests)
//     .then(responses => responses.forEach(
//         response => console.log(`${response.url}: ${response.status}`)
//     ))
//     .catch(err => console.log('err - ' + err))

// ===========================
// const BASE_OPTIONS = { authorization: '7813a882-8b4e-45b6-82a9-68275120708a' };
// const BASE_OPTIONS = {
//     headers: {
//         authorization: '7813a882-8b4e-45b6-82a9-68275120708a',
//         'Content-Type': 'application/json'
//     }
// }

// const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-9';



// function handleResponce(responce) {
//     // реализовать обработку ответа сервера. при ок возвращаем объект responce.json иначе ошибку Promise.reject(err)
//     return responce.json();
// }

// test();
// get('/users/me');



// post('/users/me', objUser, 'PATCH')
// post('/cards', objNewCard)
