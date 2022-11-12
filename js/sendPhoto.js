import { resetScale } from './editPhoto.js';
import { renderSimilarList } from './miniatures.js';
import { clearHashAndText, setUserFormSubmit } from './validForm.js';
import { resetModalWindow } from './effect.js';
const SIMILAR_WIZARD_COUNT = 10;
const imgUploadSelectImage = document.getElementById('upload-select-image');
const idErrorMessage = document.getElementById('error-message');


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

setUserFormSubmit(resetScale);
setUserFormSubmit(resetModalWindow);
setUserFormSubmit(clearHashAndText);