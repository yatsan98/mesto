import { Card} from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationConfig } from './constants.js';


const popupElement = document.querySelector('.popup'); // popup
const buttonCloseEditProfilePopup = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const submitEditProfilePopup = document.querySelector('.popup__form'); // 
// Попап редактировать профиль
const nameInputPopupAdd = document.querySelector('[id=name-input]'); 
const jobInputPopupAdd = document.querySelector('[id=about-input]'); // 
const popupEditProfile = document.querySelector('#edit-profile'); // Редактор профиля
const buttonEditProfile = document.querySelector('.profile__edit-button'); // открыть редактор профиля
const userNameProfile = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJobProfile = document.querySelector('.profile__user-description'); // "о себе" на странице
const popupProfileForm = document.querySelector('#popupProfileForm');
// Попап увеличение карточек
const imagePopup = document.querySelector('#type-image');
const imageCard = document.querySelector('.popup__image');
const buttonClosePopupImage = document.querySelector('#image-close');
const imageName = document.querySelector('.popup__image-title');
// Попап добавление карточек
const elementsContainer = document.querySelector('.elements');
const buttonAddCard = document.querySelector('.profile__add-button'); 
const popupAddCard = document.querySelector ('#add-card'); // попап добавить карточку
const popupNameAddCard = document.querySelector('#card-name');
const popupLinkAddCard = document.querySelector('#card-link');
const popupFormAddCard = document.querySelector('.popup__form_add_card');
const buttonClosePopupAddCard = popupAddCard.querySelector('#close-button-add');

// функция открытия попапов
const openPopup = function (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByKey)
  document.addEventListener('mousedown', handleExitPopup)
};

// функция закрытия попапов
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByKey)
  document.removeEventListener('mousedown', handleExitPopup)
};

// функция закрытия попап Esc 
function closePopupByKey(evt) {
  
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function handleExitPopup(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-button'))) {
    closePopup(openedPopup);
  }
};

// открыть фото
function openCardPopup(title, link, alt) {
  imageName.textContent = title;
  imageCard.src = link;
  imageCard.image = alt;
  openPopup(imagePopup);
}

function submitEditProfileForm (evt) {
  evt.preventDefault();
  userNameProfile.textContent = nameInputPopupAdd.value;
  userJobProfile.textContent = jobInputPopupAdd.value;
  closePopup (popupEditProfile);
};

buttonEditProfile.addEventListener('click', function () {
  nameInputPopupAdd.value = userNameProfile.textContent;
  jobInputPopupAdd.value = userJobProfile.textContent;
  openPopup(popupEditProfile);
});

buttonCloseEditProfilePopup.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

submitEditProfilePopup.addEventListener('submit', submitEditProfileForm); 

// добавления карточек
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

const submitAddNewCard = (evt) => {
    evt.preventDefault();
    const card = createCard({name:popupNameAddCard.value,
                             link:popupLinkAddCard.value})
    renderCard(card);
    evt.target.reset();
    closePopup(popupAddCard);
};

popupFormAddCard.addEventListener('submit', submitAddNewCard);


function createCard({name, link}) {
  const card = new Card({name, link},'#card-elements', openCardPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

// закрыть карточку
buttonClosePopupImage.addEventListener('click', () => closePopup(imagePopup));

const renderCard = (elementCard) => {
  elementsContainer.prepend(elementCard);
};

initialCards.forEach((elementCard) => {
  const card = createCard(elementCard);
  renderCard(card);
});

buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// вызов валидации
// попап редактировать профиль
const formValidatorForEdit = new FormValidator(validationConfig, popupProfileForm);
formValidatorForEdit.enableValidation();

//попап добавить карточку
const formValidatorForAdd = new FormValidator(validationConfig, popupFormAddCard);
formValidatorForAdd.enableValidation();
