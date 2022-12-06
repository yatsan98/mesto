const popupElement = document.querySelector('.popup'); // popup
const editProfile = document.querySelector('.profile__edit-profile'); // открыть редактор профиля
const closeButton = document.querySelector('.popup__close-button'); // закрыть редактор профиля
const userName = document.querySelector('.profile__user-name'); // имя профиля на странице
const userJob = document.querySelector('.profile__user-description'); // "о себе" на странице
const saveButton = document.querySelector('.popup__save-button'); // кнопка сохранить

let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__user-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__user-description'); // Воспользуйтесь инструментом .querySelector()\

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
  }

function closePopup() {
    popupElement.classList.remove('popup_opened');
  }


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = `${nameInput.value}`;
  userJob.textContent = `${jobInput.value}`;
  closePopup ();
}

formElement.addEventListener('submit', handleFormSubmit); 
editProfile.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
editProfile.addEventListener('submit', handleFormSubmit);