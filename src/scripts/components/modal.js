// Ф-ция открытия модального окна
export function openModal(popap) { 
    popap.classList.add('popup_is-opened');
    closePopupByEsc(popap);
    popap.addEventListener('click', closePopupByCrossClick);
    popap.addEventListener('click', closePopupByOverleyClick); 
}

// Ф-ция закрытия модального окна
export function closeModal(popap) {
    popap.classList.remove('popup_is-opened');
    popap.removeEventListener('click', closePopupByCrossClick);
    popap.removeEventListener('click', closePopupByOverleyClick);
}

// Функция-обертка (с параметром принимающим попап) для функии-обработчика нажатия Esc
function closePopupByEsc(popapMustBeClosed) {
    document.addEventListener('keydown', innerClosePopupByEsc);
    function innerClosePopupByEsc(evt) {
        if (evt.key === "Escape") {
            // el.classList.remove('popup_is-opened');
            closeModal(popapMustBeClosed);
            document.removeEventListener('keydown', innerClosePopupByEsc);
        };
    }
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