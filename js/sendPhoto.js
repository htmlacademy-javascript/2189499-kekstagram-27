import { resetScale } from './editPhoto.js';
import { renderSimilarList } from './miniatures.js';
import { clearHashAndText, setUserFormSubmit } from './validForm.js';
import { resetModalWindow } from './effect.js';
import { hideSucsessWindow } from './validForm.js';
import { isEscButton } from './utils.js';
import { closeUploadPhoto, openUploadPhoto } from './uploadImage.js';
const SIMILAR_PHOTO_COUNT = 25;
const imgFilters = document.querySelector('.img-filters');




//esc
const onPopupEsc = (evt) => {
  const windowSuccess = document.querySelector('.success');
  if (isEscButton(evt)) {
    if (windowSuccess) {
      windowSuccess.remove();
      openUploadPhoto(evt);
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
    renderSimilarList(data);
  })
  .then(() => {
    imgFilters.classList.remove('img-filters--inactive');
    });


setUserFormSubmit(showSuccess);
