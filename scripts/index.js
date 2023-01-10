const popupElement = document.querySelector('.popup'); // popup
const buttonCloseEditProfilePopup = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const submitEditProfilePopup = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Попап редактировать профиль
const nameInputPopupAdd = document.querySelector('[id=name-input]'); 
const jobInputPopupAdd = document.querySelector('[id=about-input]'); // Воспользуйтесь инструментом .querySelector()\
const popupEditProfile = document.querySelector('#edit-profile'); // Редактор профиля
const buttonEditProfile = document.querySelector('.profile__edit-button'); // открыть редактор профиля
const userNameProfile = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJobProfile = document.querySelector('.profile__user-description'); // "о себе" на странице
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
    renderCard({name:popupNameAddCard.value,link:popupLinkAddCard.value});
    evt.target.reset();
    closePopup(popupAddCard);
};

popupFormAddCard.addEventListener('submit', submitAddNewCard);

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

  // лайк на карточку
  const buttonLikeCard  = newCard.querySelector('.element__card-like');
  buttonLikeCard .addEventListener('click', likeCard);
 
  link.addEventListener('click', function () {
    imageName.textContent = elementCard.name;
    imageCard.src = elementCard.link;
    imageCard.alt = elementCard.name;
    openPopup(imagePopup);
  });

  return newCard;
};

// закрыть карточку
buttonClosePopupImage.addEventListener('click', () => closePopup(imagePopup));

const renderCard = (elementCard) => {
  elementsContainer.prepend(createCard(elementCard));
};

constants.forEach((elementCard) => {
  renderCard(elementCard);
});

buttonClosePopupAddCard.addEventListener('click', function () {
  closePopup(popupAddCard);
});

