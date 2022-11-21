import { resetScale } from './edit-photo.js';
import { addPopularBtnListener, renderSimilarList } from './miniatures.js';
import { clearHashAndText, setUserFormSubmit } from './valid-form.js';
import { resetModalWindow } from './effect.js';
import { hideSucsessWindow } from './valid-form.js';
import { isEscButton } from './utils.js';
import { openUploadPhoto } from './upload-image.js';
import { showAlert } from './utils.js';
import { addDefaultBtnListener, addRandBtnListener } from './miniatures.js';
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
  }

};


const showSuccess = () => {
  const success = document.getElementById('success');
  const sucsessForm = success.content.cloneNode(true);
  document.body.appendChild(sucsessForm);
  const sucsessBtn = document.querySelector('.success__button');

  sucsessBtn.addEventListener('click', () => hideSucsessWindow);

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
  .then((photos) => {
    renderSimilarList(photos);
    addDefaultBtnListener(photos);
    addRandBtnListener(photos);
    addPopularBtnListener(photos);
    imgFilters.classList.remove('img-filters--inactive');
  })
  .catch(() => {
    showAlert();
  })

setUserFormSubmit(showSuccess);

export {renderSimilarList};
