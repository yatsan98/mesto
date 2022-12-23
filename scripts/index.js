const popupElement = document.querySelector('.popup'); // popup
const buttonEdit = document.querySelector('.profile__edit-profile'); // открыть редактор профиля
const buttonClose = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const userName = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJob = document.querySelector('.profile__user-description'); // "о себе" на странице

const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('[id=name-input]'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('[id=about-input]'); // Воспользуйтесь инструментом .querySelector()

// Функция открытия попап
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = `${nameInput.value}`;
  userJob.textContent = `${jobInput.value}`;
  closePopup ();
}

formElement.addEventListener('submit', handleFormSubmit); 
buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);


let popupAddCard = document.querySelector ('.popup_add-card'); // попап добавить фотографию
let buttonCardAdd = document.querySelector('.profile__add-button'); 
let popupCardSave = document.querySelector('.popup__save-button');

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

const imagePopup = document.querySelector('.popup_type_image');
const closeImagePopup = imagePopup.querySelector('.popup__close-button');
const cardTitle = document.querySelector('.popup__image-container');

function openImagePopup(element, link) {
  const imageTitle = element.querySelector('.popup__image-title').textContent;
  imagePopup.src = link;
  imagePopup.alt = imageTitle;
  openPopup(imagePopup);
}

closeImagePopup.addEventListener('click', () => {
  closePopup(imagePopup);
})


function addForm() {
  popupElement.classList.add('popup_opened');
}

function closeForm() {
  popupElement.classList.remove('popup_opened');
}


buttonCardAdd.addEventListener('click', addForm);
buttonClose.addEventListener('click', closeForm);

const toggleLikeButton = (evt) => {
  evt.target.classList.toggle('element__card-like-active');
}

const addCardElement = (caption, imageLink) => {
  const elementTemplate = document.querySelector('#card-elements').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__card').src = imageLink;
  cardElement.querySelector('.element__title').textContent = caption;

  const cardElementsList = document.querySelector('.elements__list');
  cardElementsList.prepend(cardElement);
  document.querySelector('.element__card-like').addEventListener('click', toggleLikeButton);
  return cardTitle
}

const addCards = (array) => {
  array.forEach((item) => {
    addCardElement(item.name, item.link);
  })
}
addCards(initialCards);

const addSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardElementName = document.getElementById('#name').value;
  const newCardElementLink = document.getElementById('#link').value;
  addCardElement(newCardElementName, newCardElementLink);
  toggleAddPopup();
}

function closePopupAddCard() {
  popupElement.classList.remove('.popup_add-card');
}


