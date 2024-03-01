// Ф-ция открытия модального окна
export function openModal(popup) { 
    popup.classList.add('popup_is-opened');
    // closePopupByEsc(popup);
    popup.addEventListener('click', closePopupByCrossClick);
    popup.addEventListener('click', closePopupByOverleyClick); 
    document.addEventListener('keydown', closePopupByEsc);
}

// Ф-ция закрытия модального окна
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupByCrossClick);
    popup.removeEventListener('click', closePopupByOverleyClick);
    document.removeEventListener('keydown', closePopupByEsc);    
}

// Функция-обработчик нажатия Esc
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        closeModal(document.querySelector('.popup_is-opened'));
    };
}

// Функция-обработчик клика по крестику
function closePopupByCrossClick(evt) {
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget);
    }
}

// Функция-обработчик клика по оверлею 
function closePopupByOverleyClick(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.currentTarget);
    }
}