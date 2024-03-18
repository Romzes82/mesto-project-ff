import { openModal, closeModal } from './modal.js'; 
// import { cardId } from '../index.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export const objForRemoveCart = {};
// export let cardId;

// Функция создания карточки
export function addCard(link, name, deleteCardFunc, likeCardFunc, clickCardImageFunc, cacheResponceFromServer) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // наполняем содержимым
    cardImage.src = link;
    cardImage.alt = name;

    // const onRemove = (evt) => {
    //     deleteCardById(cardId);
    //     // deleteCardById(deleteCardFunc.cardId);
    //     evt.target.closest('.places__item').classList.add('card_remove_yes-no');
        
    //     objForRemoveCart._id = cardId;
    //     objForRemoveCart.card = evt.target.closest('.places__item');
    //     openModal(popupTypeDeleteCard);
    // }

    //   const curry = function(i) {
    //     return (e) => changeCountry(e, i);
    //   }; 
    //   const handler = curry(i);
    //   button.addEventListener('click', handler);

    // function onRemove(someVar) {
    //     return function(event) {
    //       console.log('Значение someVar:', someVar);
    //     };
    //   }
      
    //   button.addEventListener('click', createListener(data));
  
    //   const onRemove = curry(cardId);

    //   button.addEventListener('click', onRemove);

    // console.log(deleteCardFunc.ownerCardId);
    // console.log('---');
    // console.log(deleteCardFunc.cardId);
    // здесь надо проверять deleteCardFunc.delvisible и на основе этого вешать обработчик или нет 
    // console.log(cacheResponceFromServer.likesArr);
    if (cacheResponceFromServer.ownerCardId === cacheResponceFromServer.userId) { 
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
        // cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
        cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc(cacheResponceFromServer.cardId));
    }
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunc(cacheResponceFromServer.likesArr));
    cardImage.addEventListener('click', clickCardImageFunc);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__like-amount').textContent = cacheResponceFromServer.likesArr.length;
    // cardElement.property = deleteCardFunc.cardId;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

// const curry = function(cardId) {
//     return (e) => deleteCardFunc(e, cardId);
//   }; 

// function deleteCardById(idCard) {
//     console.log(idCard);
//     // objForRemoveCart._id = cardId;
//     objForRemoveCart._id = idCard;
// }

export let glob_var;

const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');
// Функция-обработчик события удаления карточки
export function deleteCardFunc(cardId) {
   return function(evt) {
    // deleteCardById(cardId);
    // console.log(cardId);
    objForRemoveCart._id = cardId;
    
    evt.target.closest('.places__item').classList.add('card_remove_yes-no');
        
    objForRemoveCart.card = evt.target.closest('.places__item');
       // console.log(objForRemoveCart.card);
    openModal(popupTypeDeleteCard);
    // deleteCardFunc.cardElem = evt.target.closest('.places__item');
    // evt.target.closest('.places__item').classList.add('card_remove_yes-no');
    // objForRemoveCart._id = evt.target.closest('.places__item').property;
    // objForRemoveCart.card = evt.target.closest('.places__item');

    // console.log(evt.target.closest('.places__item').property);
    // console.log(deleteCardFunc.ownerCardId);
    // console.log('---');
    // console.log(deleteCardFunc.cardId);
    // popup.classList.add('card__delete-button-hidden');
    // openModal(popupTypeDeleteCard);
    // openModal(popupTypeDeleteCard);
    // console.log(evt.target.closest('.places__item'));
   // openDeletePopup(deleteCardFunc.cardId); // , evt.target.closest('.places__item'));
    // openModal(popupTypeDeleteCard, deleteCardFunc.cardElem);
    // openModal(popupTypeDeleteCard);
    // openDeletePopup(deleteCardFunc.cardId, deleteCardFunc.cardElem);
    // evt.target.closest('.places__item').remove();
   }
}

// функция-обработчик события установки/снятия лайка карточки
export function likeCardFunc(arrLikes) { 
    return function (evt) {
        console.log(arrLikes);
        const tgl = evt.target.classList.toggle('card__like-button_is-active');
        if (tgl) { 
            console.log(arrLikes.length + 1)
        } else {
            console.log(arrLikes.length)
        }
    }    
}

// Открытие попапа удаления карточки
// function openDeletePopup(cardId, cardElem) {
//     objForRemoveCart._id = cardId;
//     objForRemoveCart.card = cardElem;
//     // openPopup(deletePopup);
//     openModal(popupTypeDeleteCard, cardToRemove);
// }

///
