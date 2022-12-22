const popupElement = document.querySelector('.popup'); // popup
const buttonEdit = document.querySelector('.profile__edit-profile'); // открыть редактор профиля
const buttonClose = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const userName = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJob = document.querySelector('.profile__user-description'); // "о себе" на странице

const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('[id=name-input]'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('[id=about-input]'); // Воспользуйтесь инструментом .querySelector()

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


const popupAdd = document.querySelector ('.popup_add-card'); // добавить фотографию
const buttonCardAdd = document.querySelector('.profile__add-button'); 
const popupCardClose = document.querySelector('.popup__close-button');
const popupCardSave = document.querySelector('.popup__save-button');

function toggleAddPopup() {
  popupAdd.classList.toggle('popup_add-active');
}

function addForm() {
  toggleAddPopup();
}

buttonCardAdd.addEventListener('click', addForm);
popupCardClose.addEventListener('click', toggleAddPopup);

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


const toggleLikeButton = (e) => {
  e.target.classList.toggle('element__card-like-active');
}

const addCardElement = (caption, imageLink) => {
  const elementTemplate = document.querySelector('#card-elements').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__card').src = imageLink;
  cardElement.querySelector('.element__title').textContent = caption;
  const cardElementsList = document.querySelector('.elements__list');
  cardElementsList.prepend(cardElement);
  document.querySelector('.element__card-like').addEventListener('click', toggleLikeButton);
}

const addCards = (array) => {
  array.forEach((item) => {
    addCardElement(item.name, item.link);
  })
}
addCards(initialCards);

const addSubmitHandler = (e) => {
  e.preventDefault();
  const newCardElementName = document.getElementById('#name').value;
  const newCardElementLink = document.getElementById('#link').value;
  addCardElement(newCardElementName, newCardElementLink);
  toggleAddPopup();
}

/*const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#card-elements").content;

const placeInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  placeInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  const placeElement = placeTemplate
    .querySelector(".element")
    .cloneNode(true);
  placeElement.querySelector(".element__title").textContent = name;
  placeElement.querySelector(".element__card").src = link;

  placesContainer.prepend(placeElement);
}

render();*/



function closePopupAddCard() {
  popupElement.classList.remove('.popup_add-card');
}


