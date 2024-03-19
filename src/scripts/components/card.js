// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function addCard(cardObj, deleteCardFunc, likeCardFunc, clickCardImageFunc, userId, openModal, setPutLike, setDeleteLike) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    // наполняем содержимым
    cardImage.src = cardObj.link;
    cardImage.alt = cardObj.name;
    cardImage.addEventListener('click', clickCardImageFunc);

    if (cardObj.owner._id === userId) { 
        cardElement.querySelector('.card__delete-button').classList.remove('card__delete-button-hidden');
        cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc(cardObj._id, openModal));
    }

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCardFunc(cardObj._id, setPutLike, setDeleteLike));
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
        // проверяем что возвращает метод toogle
        const boolTgl = evt.target.classList.toggle('card__like');
        if (boolTgl) {
            setPutLike('/cards/likes/' + cardId, {}, 'PUT')
                .then(json => { 
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.toggle('card__like-button_is-active');
                })
                .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        } else {
            setDeleteLike('/cards/likes/' + cardId, {}, 'DELETE')
                .then(json => {
                    cardLikeAmount.textContent = json.likes.length;
                    evt.target.classList.toggle('card__like-button_is-active');
                })
                 .catch(err => console.log(`Ошибка ${err} на элементе ${this.name}`));
        }
    }
}
