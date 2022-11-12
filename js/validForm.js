import {isEscButton} from './utils.js';
import { showAlert } from './utils.js';
const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form);


//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hideSucsessWindow();
  }
};

const clearHashAndText = () => {
  let inputHash = document.querySelector('.text__hashtags');
  inputHash.value = '';
  let comment = document.querySelector('.text__description');
  comment.value = '';
}


function isHashtagValid() {
  const input = document.querySelector('.text__hashtags').value;
  const lowerCaseInput = input.toLowerCase().split(' ');

  const isHashtagRepeat = (new Set(lowerCaseInput).size === lowerCaseInput.length);

  const areAllHashtagsValid = lowerCaseInput.every((elem) => hashtag.test(elem));
  const hashtagCount = input.replace(/[^#]/g, '').length;
  function isHashtagCount () {
    if (hashtagCount <= 5) {
      return true;
    } else {
      return false;
    }
  }
  return isHashtagRepeat && areAllHashtagsValid && isHashtagCount() || input === '';
}

pristine.addValidator(form.querySelector('.text__hashtags'),isHashtagValid);

function isCommentValid() {
  const comment = document.querySelector('.text__description').value;
  return comment.length <= 140;
}

pristine.addValidator(form.querySelector('.text__description'),isCommentValid);


const hideSucsessWindow = () => {
  const success = document.querySelector('.success');
  success.remove();
  window.removeEventListener('keydown', onPopupEscKeydown);
};




const setUserFormSubmit = (onSccess) => {
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const valid = pristine.validate();
  if (valid) {

     const formData = new FormData(evt.target);
  fetch('https://27.javascrt.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
    })
    .then (() => onSccess())
    .catch((err) => {
      console.log(err);
      showAlert();
    });
  } 
});
};

export {setUserFormSubmit, clearHashAndText, hideSucsessWindow};
