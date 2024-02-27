// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function addCard(src, alt, deleteCardFunc, LikeCardFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    cardElement.querySelector('.card__like-button').addEventListener('click', LikeCardFunc);
    cardElement.querySelector('.card__title').textContent = alt;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

// Функция удаления карточки
export function deleteCardFunc(evt) {
    evt.target.closest('.places__item').remove();
}

// Функция установки/снятия лайка карточки
export function LikeCardFunc(evt) { 
    evt.target.classList.toggle('card__like-button_is-active');
}