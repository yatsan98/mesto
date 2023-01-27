export class Card {
    constructor(elementCard, templateSelector, openCardPopup) {
        this._name = elementCard.name;
        this._link = elementCard.link;
        this._templateSelector = templateSelector;
        this._openCardPopup = openCardPopup;
    }

    // разметка
    _getTemplale() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }
    
  generateCard() {
    this._element = this._getTemplale();

    this._elementPhoto = this._element.querySelector('.element__card');
        this._elementTitle = this._element.querySelector('.element__title');
        this._like = this._element.querySelector('.element__card-like');
        this._deleted = this._element.querySelector('.element__card-delete');

        this._setEventListeners(); 

		this._elementPhoto.src = this._link;
		this._elementPhoto.alt = this._name;
		this._elementTitle.textContent = this._name;

		return this._element;
  }

  // слушатель событий
  _setEventListeners() {
		this._elementPhoto.addEventListener('click', () => {
			this._openCardPopup(this._name, this._link)
		});
		this._like.addEventListener('click', () => {
			this._handleLikeCard();
		});
		this._deleted.addEventListener('click', () => {
			this._handleDeleteCard();
		});
	}

  _handleDeleteCard () {
    this._element.remove();
    this._element = null;
  };
  
  // Активный лайк на фото
  _handleLikeCard () {
    this._like.classList.toggle('element__card-like_active');
  };
}