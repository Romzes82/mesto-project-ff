import '../pages/index.css' // добавьте импорт главного файла стилей
import { addCard, deleteCardFunc, likeCardFunc, objForRemoveCart, cardId } from './components/card.js';
import { initialCards } from './cards.js'; 
import { openModal, closeModal } from './components/modal.js'; 
import { enableValidation, clearValidation, validationConfig } from './components/validation.js'
import { get, post } from './components/api.js'

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
    const obj = {
        link: evt.currentTarget.link.value, 
        name: evt.currentTarget['place-name'].value
    }
    evt.currentTarget.reset();
    clearValidation(popupTypeNewCard, validationConfig);
    closeModal(popupTypeNewCard);
    // post('/cards', obj, 'POST');
}

// функция открывающая попап с контрольным ворпросом, на которой был клик. Она передается в качестве аргумента в ф-цию addCard
function handleFormSubmitControlQuestion(evt) { 
    evt.preventDefault();
    // console.log(evt.currentTarget);
    closeModal(popupTypeDeleteCard);
    console.log(objForRemoveCart);
    console.log('/cards/' + objForRemoveCart._id);
    // post('/card3s/' + objForRemoveCart._id, {}, 'DELETE')
    //  .then(objForRemoveCart.card.remove())
    //  .catch(err => console.log('Ошибка ' + err + ' на элементе ' + this.name));
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

// Токен: 7813a882-8b4e-45b6-82a9-68275120708a
// Идентификатор группы: wff-cohort-9

// const initialCards = [];

const URLSERVER = 'https://nomoreparties.co/v1';
const COHORT = 'wff-cohort-9';
const KEY = '7813a882-8b4e-45b6-82a9-68275120708a';


function test() { 
    return fetch('https://nomoreparties.co/v1/wff-cohort-9/cards', {
        headers: {
            authorization: '7813a882-8b4e-45b6-82a9-68275120708a'
        }
    })
        .then(res => res.json())
        .then((result) => {
            // console.log(result);
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

// test4();
// checkUrl('https://ya.ru/');
// getInitialCards();

// // Вывести карточки из массива initialCards на страницу
// initialCards.forEach(element => {
//     placesList.append(addCard(element.link, element.name, deleteCardFunc, likeCardFunc, clickCardImageFunc));
// });

// EXAMPLE

// // Создаём первый промис
// const firstPromise = new Promise((resolve, reject) => {
//     if (someCondition) {
//         resolve('Первый промис');
//     } else {
//         reject();
//     }
// });

// // Создаём второй промис
// const secondPromise = new Promise((resolve, reject) => {
//     if (secondCondition) {
//         resolve('Второй промис');
//     } else {
//         reject();
//     }
// });

// // Создаём массив с промисами
// const promises = [firstPromise, secondPromise]

// // Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//     .then((results) => {
//         console.log(results); // ["Первый промис", "Второй промис"]
//     });

// Таким образом, промисы — запросы на асинхронный код.Когда мы создаём промис, мы говорим движку:
// выполни вот этот код и по результатам переведи промис в статус «исполнен» или «отклонён».
// Все дальнейшие действия с результатом запроса прописывают в цепочке методов then и catch. Они принимают на вход колбэк
// с одним параметром.В этот параметр записывается либо то, что вернул предыдущий then или catch, либо то значение,
//     с которым была вызвана функция resolve или reject.

// Создаём массив с промисами


const objProfileForServer = {
    name: 'Роман',
    about: 'В процессе'
}

const objNewCard = {
    name: 'Песня про бобров',
    link: 'https://ew.com/thmb/GzVVfW8KGfimpqoVYBiPW8pEens=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mel-gibson-beaver_l-1-5088c6664b634da0873b1195062e379f.jpg'
}

const objNewCard1 = {
    name: 'some string',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    // link: 'https://cdn1.ozone.ru/s3/multimedia-a/6269924842.jpg'
    // https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg
}

const getInitialUser = get('/users/me');
const getInitialCards = get('/cards');
// post('/users/me', objProfileForServer, 'PATCH');
// post('/cards', objNewCard1, 'POST');
// post('/cards/65f46977fa88570012695e3a', {}, 'DELETE');
// post('/users/me/avatar', {avatar: "https://e7.pngegg.com/pngimages/863/315/png-clipart-javascript-world-wide-web-product-design-logo-javascript-text-orange.png"}, 'PATCH');


// setInitiaUser();

// const promises = [getInitialUser, getInitialCards];
// Передаём массив с промисами методу Promise.all
// Promise.all(promises)
//     .then((responses) => {
//         // responses — массив результатов выполнения промисов
//         responses.forEach(resp => {
//             console.log(resp)
//         })
//     })
//     .catch(err => console.log(err));

// profile__image
// Находим DOM-элемент аватар profile__image
const profileImage = document.querySelector('.profile__image');
// Находим DOM-элемент кол-во лайков картиочки card__like-amount
const cardLikeAmount = document.querySelector('.card__like-amount');

let userId; //или записать все в объект сразу


const parsResponseUserInfo = (response) => { 
    nameInputContent.textContent = response.name;
    jobInputContent.textContent = response.about;
    profileImage.style.cssText =  `background-image: url("${response.avatar}")`
    // background-image: url("6666407ac3aa5af1d5de.jpg")
    userId = response._id;

    console.log(response.name)
    console.log(response.about)
    console.log(response.avatar)
    console.log(response._id)
}


const parsResponseCardsInfo = (response) => { 

    console.log("AAAAAAA");
    console.log('idUser=' + userId);
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
    deleteCardFunc.userId = userId;
    response.forEach(cardObj => { 
        // if (cardObj.owner._id === userId) {
        //     // alert(cardObj._id)
        //     deleteCardFunc.cardId = cardObj._id;
        // } else { 
        //     deleteCardFunc.cardId = '';
        // }

        // console.log(cardObj._id);
        // cardId = cardObj._id;
        deleteCardFunc.ownerCardId = cardObj.owner._id;
        placesList.append(addCard(cardObj.link, cardObj.name, deleteCardFunc, likeCardFunc, clickCardImageFunc, cardObj._id));
     //   console.log(cardObj.likes.length + ' - ' + cardObj.name);
        // cardLikeAmount.textContent = cardObj.likes.length;
    })

}

// Загрузка информации о пользователе с сервера и Загрузка карточек с сервера методом Promise.all()
Promise.all([getInitialUser, getInitialCards])
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
