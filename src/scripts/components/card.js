import { openModal, closeModal } from './modal.js'; 
import { setPutLike, setDeleteLike } from './api.js';


const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');

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

    if (cacheResponceFromServer.ownerCardId === cacheResponceFromServer.userId) { 
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
        cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc(cacheResponceFromServer.cardId));
    }

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunc(cacheResponceFromServer.cardId));
    cardImage.addEventListener('click', clickCardImageFunc);
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__like-amount').textContent = cacheResponceFromServer.likesObj.length;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

// Функция-обработчик события удаления карточки
export function deleteCardFunc(cardId) {
   return function(evt) {
    objForRemoveCart._id = cardId;
    evt.target.closest('.places__item').classList.add('card_remove_yes-no');
    objForRemoveCart.card = evt.target.closest('.places__item');
    openModal(popupTypeDeleteCard);
   }
}

// функция-обработчик события установки/снятия лайка карточки
export function likeCardFunc(cardId) { 
    return function (evt) {
        const cardLikeAmount = evt.target.closest('.card__like-group').querySelector('.card__like-amount');
        // //проверяем что возвращает метод toogle
        const boolTgl = evt.target.classList.toggle('card__like');
        if (boolTgl) {
            setPutLike('/cards/likes/' + cardId, {}, 'PUT')
                .then(json => { 
                    console.log(json);
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.toggle('card__like-button_is-active');
                })
                .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        } else {
            setDeleteLike('/cards/likes/' + cardId, {}, 'DELETE')
                .then(json => {
                    console.log(json);
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.toggle('card__like-button_is-active');
                })
                 .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        }
    }
}
