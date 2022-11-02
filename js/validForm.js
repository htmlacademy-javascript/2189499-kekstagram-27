const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(form);

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


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valid = pristine.validate();
  if (valid) {
    console.log('валидна');
  } else {
    console.log('не валидна');
  }
});

