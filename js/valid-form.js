import {isEscButton} from './utils.js';
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
    hideSucsessWindow();
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
  return comment.length <= 140;
};

pristine.addValidator(form.querySelector('.text__description'),isCommentValid, 'comment invalid');


function hideSucsessWindow() {
  const success = document.querySelector('.success');
  success.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
}


// ошибка при загрузке изображени
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
        .catch(() => {
          showErrorSendPhoto();
        });
    }
  });
};

export {setUserFormSubmit, clearHashAndText, hideSucsessWindow};
