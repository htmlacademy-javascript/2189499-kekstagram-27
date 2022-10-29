import './uploadImage.js';

const form = document.getElementById('upload-select-image');

// create the pristine instance
const pristine = new Pristine(form);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // check if the form is valid
  const valid = pristine.validate(); // returns true or false
  if (valid) {
    console.log('форма валидна');
  } else {
    console.log('форма не валидна');
  };
});

