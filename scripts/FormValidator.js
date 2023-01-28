export class FormValidator {
  constructor(validationConfig, formsElement) {
    this._form = formsElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonSubmit = validationConfig.inactiveButtonSubmit;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._errorClass = validationConfig.errorClass;
  }

// функция показать ошибку
_showInputError = (inputElement, validationMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = validationMessage;
};

// функция спрятать ошибку
_hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);    
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
};

// функция проверки на валидность
_checkInputValidity = (inputElement) => {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
};

// функция проверк на валидность инпутов для кнопки
_hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
};

// функция работы кнопки save-button
_toggleButtonState = () => {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonSubmit)
      this._buttonElement.disabled = true;
     
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonSubmit);
      this._buttonElement.disabled = false;
    }
};

// Функция навешивает слушателей на все input
_setEventListeners = () => {
    this._toggleButtonState();
    this._form.addEventListener('reset', () =>{
      setTimeout(()=> {
        this._toggleButtonState();
      }, 0);
    });
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
};

resetValidation() {
  this._toggleButtonState();
  this._inputElement.forEach((input) => {
    this._hideInputError(input);
  });
}

  enableValidation() {
    this._setEventListeners();
  };
}
