import { resetScale } from './editPhoto.js';
import { renderSimilarList } from './miniatures.js';
import { clearHashAndText, setUserFormSubmit } from './validForm.js';
import { resetModalWindow } from './effect.js';
import { hideSucsessWindow } from './validForm.js';
import { isEscButton } from './utils.js';
import { closeUploadPhoto, openUploadPhoto } from './uploadImage.js';
const SIMILAR_WIZARD_COUNT = 10;
const imgUploadSelectImage = document.getElementById('upload-select-image');
const idErrorMessage = document.getElementById('error-message');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');


//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hideSucsessWindow();
  }
};

//esc
const onPopupEsc = (evt) => {
  const windowSuccess = document.querySelector('.success');
  if (isEscButton(evt)) {
    if (windowSuccess) {
      console.log('сообщение есть');
      windowSuccess.remove();
      openUploadPhoto(evt);
  } else {
    console.log('сообщения нет');
    // closeUploadPhoto();
  }
document.removeEventListener('keydown', onPopupEsc);
};

};


const showSuccess = () => {
  const success = document.getElementById('success');
  const sucsessForm = success.content.cloneNode(true);
  document.body.appendChild(sucsessForm);
  const sucsessBtn = document.querySelector('.success__button');

  sucsessBtn.addEventListener('click', () => {
    hideSucsessWindow();
  });

  const section = document.querySelector('.success');
  section.addEventListener('click', hideSucsessWindow);

  document.addEventListener('keydown', onPopupEsc);

  resetScale();
  resetModalWindow();
  clearHashAndText();
};

fetch ('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    renderSimilarList(data.slice(0, SIMILAR_WIZARD_COUNT));
  })
  .catch(() => {
    imgUploadSelectImage.classList.add('hidden');
    idErrorMessage.classList.remove('hidden');
    document.querySelector('.error-messgae__button').addEventListener('click', () => {
      location.reload();
    });
  });


setUserFormSubmit(showSuccess);
