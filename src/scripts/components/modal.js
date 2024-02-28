// Ф-ция открытия модального окна
export function openModal(popap) { 
    console.log('in openModal');
    console.log(popap);
    popap.classList.add('popup_is-opened');
    // popup.addEventListener('click', removeClassPoppupIsOpened_forImage);
    // popap.classList.toggle('popup_is-opened');
    closePopupByEsc(popap);
    popap.addEventListener('click', removeClassPoppupIsOpened_forImage);
}

// Ф-ция закрытия модального окна
export function closeModal(popap) {
    console.log('in closeModal');
    console.log(popap);
    popap.classList.remove('popup_is-opened');
    popap.removeEventListener('click', removeClassPoppupIsOpened_forImage);
}

// Функция-обработчик нажатия Esc
function closePopupByEsc(el) {
    console.log('in closePopupByEsc');
    console.log("el:");
    console.log(el);
    document.addEventListener('keydown', innerClosePopupByEsc);

    function innerClosePopupByEsc(evt) {
        console.log('Я возникаю, когда печатают в текстовом поле.');
        console.log(evt.key);
        if (evt.key === "Escape") {
            console.log(el);
            el.classList.remove('popup_is-opened');
            document.removeEventListener('keydown', innerClosePopupByEsc);
        };
    }
}

// Функция-обработчик нажатия клика по оверлею и крестику
function removeClassPoppupIsOpened_forImage(evt) {
    console.log("in removeClassPoppupIsOpened_forImage");
    console.log("evt.target.classList.value:");
    console.log(evt.target.classList.value);

    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened')) {
        console.log(evt.currentTarget);
        console.log(evt.target.classList.value);
        // evt.currentTarget.classList.remove('popup_is-opened');
        closeModal(evt.currentTarget);
        // popupTypeImage.removeEventListener('click', removeClassPoppupIsOpened_forImage);
    }
}
