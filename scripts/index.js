const popupElement = document.querySelector('.popup'); // popup
const buttonClose = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Попап редактировать профиль
const nameInput = document.querySelector('[id=name-input]'); 
const jobInput = document.querySelector('[id=about-input]'); // Воспользуйтесь инструментом .querySelector()\
const popupEditProfile = document.querySelector('#edit-profile'); // Редактор профиля
const buttonEditProfile = document.querySelector('.profile__edit-button'); // открыть редактор профиля
const userName = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJob = document.querySelector('.profile__user-description'); // "о себе" на странице
const buttonCloseEdit = document.querySelector('#close-button-edit');
// Попап увеличение карточек
const imagePopup = document.querySelector('#type-image');
const imageCard = document.querySelector('.popup__image');
const imagePopupClose = document.querySelector('#image-close');
const imageName = document.querySelector('.popup__image-title');

const elementsContainer = document.querySelector('.elements');
const buttonAddCard = document.querySelector('.profile__add-button'); 
// Попап добавление карточек
const popupAddCard = document.querySelector ('#add-card'); // попап добавить карточку
const popupNameCard = document.querySelector('#card-name');
const popupLinkCard = document.querySelector('#card-link');
const popupFormAdd = document.querySelector('.popup__form_add_card');
const buttonCloseAdd = popupAddCard.querySelector('#close-button-add');
const likeButton = document.querySelector('.element__card-like_active');
// Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup (popupEditProfile);
};

buttonEditProfile.addEventListener('click', function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupEditProfile);
});

buttonClose.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

formElement.addEventListener('submit', handleFormSubmit); 


// добавления карточек
buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

const submitAddCard = (evt) => {
    evt.preventDefault();
    renderCard({name:popupNameCard.value,link:popupLinkCard.value});
    evt.target.reset();
    closePopup(popupAddCard);
    buttonCloseAdd.addEventListener('click', () => closePopup(popupEditProfile));
};

popupFormAdd.addEventListener('submit', submitAddCard);


const deleteCard = (evt) => {
  evt.target.closest('.element').remove();
};

// Активный лайк на фото
const likeCard = (evt) => {
  evt.target.closest('.element__card-like').classList.toggle('element__card-like_active');
};

// добавить новую карточку
const elementTemplate = document.querySelector('#card-elements').content.querySelector('.element');

const createCard = (elementCard) => {
  const newCard = elementTemplate.cloneNode(true);
  const title = newCard.querySelector('.element__title');
  const link = newCard.querySelector('.element__card');
  title.textContent = elementCard.name;
  link.setAttribute('src', `${elementCard.link}`);
  link.setAttribute('alt', `${elementCard.name}`);
  // удалить карточку
  const imageDelete = newCard.querySelector('.element__card-delete');
  imageDelete.addEventListener('click', deleteCard);
  // закрыть карточку
  imagePopupClose.addEventListener('click', () => closePopup(imagePopup));
  // лайк на карточку
  const likeButton = newCard.querySelector('.element__card-like');
  likeButton.addEventListener('click', likeCard);
 
  link.addEventListener('click', function () {
    imageName.textContent = elementCard.name;
    imageCard.src = elementCard.link;
    imageCard.alt = elementCard.name;
    openPopup(imagePopup);
  });

  return newCard;
};

const renderCard = (elementCard) => {
  elementsContainer.prepend(createCard(elementCard));
};

initialCards.forEach((elementCard) => {
  renderCard(elementCard);
});

const addCards = (array) => {
  array.forEach((item) => {
    addCardElement(item.name, item.link);
  })
};

function closePopupAdd(popup) {
  popup.classList.remove('popup_opened');
};

buttonCloseAdd.addEventListener('click', function () {
  closePopup(popupAddCard);
});

