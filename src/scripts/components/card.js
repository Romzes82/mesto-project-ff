// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function addCard(src, alt, deleteCardFunc) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = src;
    cardElement.querySelector('.card__image').alt = alt;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    cardElement.querySelector('.card__title').textContent = alt;

    // возвращаем DOM-элемент созданной карточки
    return cardElement;
}

// Функция удаления карточки
export function deleteCardFunc(evt) {
    // evt.currentTarget.parentElement.remove();
    // или
    // evt.target.parentElement.remove();
    // или
    evt.target.closest('.places__item').remove();
    // console.log('evt.currentTarget - ' + evt.currentTarget);
    // console.log('evt.taget - ' + evt.taget);
    // evt.currentTarget.parentElement.remove();

}

//function isLiked