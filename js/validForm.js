

const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const commentValue = /.{1,140}$/i;
console.log(hashtag.test());
// create the pristine instance
const pristine = new Pristine(form);

function isHashtagValid(ret) {

  const input = document.querySelector('.text__hashtags').value;
  let b;
  const arrayOfInput = input.split(/\s/);
  arrayOfInput.forEach(element => {
    b = hashtag.test(element);
    ret = b;
  });
  return ret || input === '';
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

