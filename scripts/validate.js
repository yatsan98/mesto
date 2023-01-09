// функция при валидности
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`${inputElement.id}-error`);
  
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = '';
};

// функция спрятать ошибку
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`${inputElement.id}-error`);
      
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// функция проверки на валидность
function checkInputValidity(formElement, inputElement, config) {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, config);
    } else {
      hideInputError(formElement, inputElement, config);
    };
};

//проверка на валидность инпутов для кнопки
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// функция работы кнопки save-button
function toggleButtonState(inputList, buttonElement, config) {
    if(hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonSubmit)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonSubmit);
      buttonElement.disabled = false;
    }
  };

// Функция навешивает слушателей на все input
function setEventListeners (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      })
    })
  };

  //--Функция запускает валидацию
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, config)
    })
  };

    

