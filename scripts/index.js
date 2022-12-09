const popupElement = document.querySelector('.popup'); // popup
const buttonEdit = document.querySelector('.profile__edit-profile'); // открыть редактор профиля
const buttonClose = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const userName = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJob = document.querySelector('.profile__user-description'); // "о себе" на странице

const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__user-name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__user-description'); // Воспользуйтесь инструментом .querySelector()\

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }

function closePopup() {
    popupElement.classList.remove('popup_opened');
  }


function handleFormSubmit (evt) {
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
} /*если удалить эту функцию не открыватеся попап*/


function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = `${nameInput.value}`;
  userJob.textContent = `${jobInput.value}`;
  closePopup ();
}

formElement.addEventListener('submit', handleFormSubmit); 
buttonEdit.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
