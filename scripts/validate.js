// включить валидацию
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonSubmit: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_visible'
}; 

// функция показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.errorClass);
    errorElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
};

// функция спрятать ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.errorClass);
    errorElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
};

// функция проверки на валидность
const checkInputValidity = (formElement, inputElement, config) => {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    };
};

// функция проверк на валидность инпутов для кнопки
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
};

// функция работы кнопки save-button
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonSubmit)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonSubmit);
      buttonElement.disabled = false;
    }
};

// Функция навешивает слушателей на все input
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, validationConfig);
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        toggleButtonState(inputList, buttonElement, validationConfig);
      }, 0);      
    });
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
};

  //--Функция запускает валидацию
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
};

  enableValidation(validationConfig); 

