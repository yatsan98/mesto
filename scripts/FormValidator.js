export class FormValidator {
  constructor(validationConfig, formsElement) {
    this._form = formsElement;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonSubmit = validationConfig.inactiveButtonSubmit;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputElement = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

// функция показать ошибку
_showInputError = (input, validationMessage) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this.inputErrorClass);
    errorElement.textContent = validationMessage;
};

// функция спрятать ошибку
_hideInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this.inputErrorClass);    
    errorElement.textContent = '';
};

// функция проверки на валидность
_checkInputValidity = (input) => {
    if(!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    };
};

// функция проверк на валидность инпутов для кнопки
_hasInvalidInput () {
    return this._inputElement.some((input) => {
      return !input.validity.valid
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

    this._inputElement.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
};

resetValidation() {
  this._toggleButtonState()
  this._inputElement.forEach((input) => {
    this._hideInputError(input);
  });
}

  enableValidation() {
    this._setEventListeners();
  }; 
}
