import {isEscButton} from './utils.js';
import { onCloseUploadPhoto } from './upload-image.js';
const VALID_COMMENT_LENGTH = 140;
const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form,
  {
    classTo:'img-upload__field-wrapper',
    errorClass:'invalid-form-pristine',
    errorTextParent:'img-upload__field-wrapper',
  },
);

//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    onHideSucsessWindow();
  }
};

const clearHashAndText = () => {
  const inputHash = document.querySelector('.text__hashtags');
  inputHash.value = '';
  const comment = document.querySelector('.text__description');
  comment.value = '';
};


const isHashtagValid = () => {
  const input = document.querySelector('.text__hashtags').value;
  const lowerCaseInput = input.toLowerCase().split(' ');
  const isHashtagRepeat = (new Set(lowerCaseInput).size === lowerCaseInput.length);
  const areAllHashtagsValid = lowerCaseInput.every((elem) => hashtag.test(elem));
  const hashtagCount = input.replace(/[^#]/g, '').length;
  const isHashtagCount = hashtagCount <= 5;
  return isHashtagRepeat && areAllHashtagsValid && isHashtagCount || input === '';
};

pristine.addValidator(form.querySelector('.text__hashtags'),isHashtagValid, 'hashtag invalid');

const isCommentValid = () => {
  const comment = document.querySelector('.text__description').value;
  return comment.length <= VALID_COMMENT_LENGTH;
};

pristine.addValidator(form.querySelector('.text__description'),isCommentValid, 'comment invalid');


function onHideSucsessWindow() {
  const success = document.querySelector('.success');
  success.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}


// ошибка при загрузке изображения
const showErrorSendPhoto = () => {
  const errorTemplate = document.getElementById('error');
  const errorMessage = errorTemplate.content.cloneNode(true);
  document.body.append(errorMessage);
  const errorBtn = document.querySelector('.error__button');
  errorBtn.addEventListener('click', () =>{
    const errorWindow = document.querySelector('.error');
    errorWindow.remove();
  });
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const valid = pristine.validate();
    if (valid) {

      const formData = new FormData(evt.target);
      fetch('https://27.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        })
        .then (() => onSuccess())
        .then (() => onCloseUploadPhoto())
        .catch(() => {
          showErrorSendPhoto();
        });
    }
  });
};

export {setUserFormSubmit, clearHashAndText, onHideSucsessWindow};
