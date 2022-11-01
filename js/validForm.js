

const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const commentValue = /.{1,140}$/i;
const pristine = new Pristine(form);

function isHashtagValid(ret) {

  const input = document.querySelector('.text__hashtags').value;


  let areAllHashtagsValid;
  const arrayOfInput = input.split(' ');
  arrayOfInput.forEach(element => {
    areAllHashtagsValid = hashtag.test(element);
    ret = areAllHashtagsValid;
  });


  // eslint-disable-next-line no-unused-expressions
  const hashtagCount = input.replace(/[^#]/g, '').length;

  function isHashtagCount () {
    if (hashtagCount <= 5) {
      return true;
    } else {
      return false;
    };
};

  return (ret || input === '' ) && isHashtagCount();
};

pristine.addValidator(form.querySelector('.text__hashtags'),isHashtagValid);


// function isCommentValid() {
//   const comment = document.querySelector('.text__description').value;
//   console.log(comment);
//   return comment <= 140;
// };

// pristine.addValidator(form.querySelector('.text__description'),isCommentValid);


form.addEventListener('submit', (e) => {
  e.preventDefault();
  // check if the form is valid
  const valid = pristine.validate(); // returns true or false

  if (valid) {
    console.log('валидна');
  } else {
    console.log('не валидна');
  };
});

