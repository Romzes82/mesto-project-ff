export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    // inputElement.classList.add('popup__input_type_error');
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('popup__error_visible');
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    // inputElement.classList.remove('popup__input_type_error');
    // errorElement.classList.remove('popup__error_visible');
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке

        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        // showInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // hideInputError теперь получает параметром форму, в которой
        // находится проверяемое поле, и само это поле
        hideInputError(formElement, inputElement);
    }
};

// Вызовем функцию isValid на каждый ввод символа
// nameInput.addEventListener('input', isValid);

// Функция принимает массив полей

const hasInvalidInput = (inputArr) => {
    // проходим по этому массиву методом some
    return inputArr.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.disabled = true;
        // buttonElement.classList.add('popup__button_disabled');
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        // buttonElement.classList.remove('popup__button_disabled');
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    // const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    // Найдём в текущей форме кнопку отправки
    // const buttonElement = formElement.querySelector('.popup__button');
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
    toggleButtonState(inputList, buttonElement);

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = (validationConfig) => {

    // Object.keys(validationConfig).forEach(key => {
    //     console.log(key + " - " + validationConfig[key]);
    // })
    // console.log(Object.keys(objSettingValidation));

    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    // const formList = Array.from(document.querySelectorAll('.popup__form'));
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // console.log(formList);

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// включение валидации вызовом enableValidation
// все настройки validationConfig передаются при вызове

export const clearValidation = (profileForm, validationConfig) => {
    console.log(profileForm);

    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        // inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        hideInputError(profileForm, inputElement)
        // });
    });

    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
};