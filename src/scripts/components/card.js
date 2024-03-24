// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function addCard(cardObj, funcsObj, userId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    // наполняем содержимым
    cardImage.src = cardObj.link;
    cardImage.alt = cardObj.name;
    cardImage.addEventListener('click', () => funcsObj.clickCardImageFunc(cardObj));

    if (cardObj.owner._id === userId) { 
        cardDeleteButton.classList.remove('card__delete-button-hidden');
        cardDeleteButton.addEventListener('click', funcsObj.deleteCardFunc(cardObj._id, funcsObj.openModal));
    }

    if (cardObj.likes.some(like => like._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', funcsObj.likeCardFunc(cardObj._id, funcsObj.setPutLike, funcsObj.setDeleteLike));
    cardElement.querySelector('.card__title').textContent = cardObj.name;
    cardElement.querySelector('.card__like-amount').textContent = cardObj.likes.length;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

//глобальный объект хранящий cardId и DOM узел удаляемой карточки 
export const objForRemoveCart = {};
// DOM узел попапа с контрольным вопроса
const popupTypeDeleteCard = document.querySelector('.popup_type_delete_card');

// Функция-обработчик события удаления карточки
export function deleteCardFunc(cardId, openModal) {
   return function(evt) {
    objForRemoveCart._id = cardId;
    evt.target.closest('.places__item').classList.add('card_remove_yes-no');
    objForRemoveCart.card = evt.target.closest('.places__item');
    openModal(popupTypeDeleteCard);
   }
}

// функция-обработчик события установки/снятия лайка карточки
export function likeCardFunc(cardId, setPutLike, setDeleteLike) { 
    return function (evt) {
        const cardLikeAmount = evt.target.closest('.card__like-group').querySelector('.card__like-amount');
        // проверяем наличие класса
         const hasLike = evt.target.classList.contains('card__like-button_is-active');
        if (!hasLike) {
            setPutLike(cardId)
                .then(json => { 
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.add('card__like-button_is-active');
                })
                .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        } else {
            setDeleteLike(cardId)
                .then(json => {
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.remove('card__like-button_is-active');
                })
                 .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        }
    }
}