// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function addCard(src, alt, deleteCardFunc) {
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
function deleteCardFunc(evt) {
    evt.target.parentElement.remove();
}

// Вывести карточки из массива initialCards на страницу
initialCards.forEach(element => {
    placesList.append(addCard(element.link, element.name, deleteCardFunc));
});