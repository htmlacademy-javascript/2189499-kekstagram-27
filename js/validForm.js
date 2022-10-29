

const form = document.getElementById('upload-select-image');

// create the pristine instance
const pristine = new Pristine(form);

function isHashtagValid(value) {
  return value.length >= 2 && value.length <= 50;
};

pristine.addValidator(form.querySelector('#upload-file'),isHashtagValid,
  'От 2 до 50 символов');


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



// const form = document.querySelector('.img-upload__form');

// // create the pristine instance
// const pristine = new Pristine (form);
// // check if the form is valid



// const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

// function isHashtagValid(value) {
//   return value.length >= 2 && value.length <= 50;
// };

// pristine.addValidator(form.querySelector('#upload-file'),isHashtagValid,
//   'От 2 до 50 символов'
// );


// form.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const valid = pristine.validate();
//   if (valid) {
//     console.log('валидна');
//   } else {
//     console.log('нет');
//   };
// });
