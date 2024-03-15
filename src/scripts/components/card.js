import { openModal, closeModal } from './modal.js'; 

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

export const cardToRemove = {};

// Функция создания карточки
export function addCard(link, name, deleteCardFunc, likeCardFunc, clickCardImageFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // наполняем содержимым
    cardImage.src = link;
    cardImage.alt = name;

    // console.log(deleteCardFunc.ownerCardId);
    // console.log('---');
    // console.log(deleteCardFunc.cardId);
    // здесь надо проверять deleteCardFunc.delvisible и на основе этого вешать обработчик или нет 
    if (deleteCardFunc.ownerCardId === '2458a5dbf48d2ce30338e441') { 
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
        cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    }
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunc);
    cardImage.addEventListener('click', clickCardImageFunc);
    cardElement.querySelector('.card__title').textContent = name;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');
// Функция-обработчик события удаления карточки
export function deleteCardFunc(evt) {
    deleteCardFunc.cardElem = evt.target.closest('.places__item');
    evt.target.closest('.places__item').classList.add('card_remove_yes-no');

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
    openDeletePopup(deleteCardFunc.cardId, deleteCardFunc.cardElem);
    // evt.target.closest('.places__item').remove();
}

// функция-обработчик события установки/снятия лайка карточки
export function likeCardFunc(evt) { 
    evt.target.classList.toggle('card__like-button_is-active');
}

// Открытие попапа удаления карточки
function openDeletePopup(cardId, cardElem) {
    cardToRemove._id = cardId;
    cardToRemove.card = cardElem;
    // openPopup(deletePopup);
    openModal(popupTypeDeleteCard);
}

