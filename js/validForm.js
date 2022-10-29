

const form = document.getElementById('upload-select-image');
const hashtag = /^#[a-zа-яё0-9\s]{1,19}$/i;
const commentValue = /.{1,140}$/i;
console.log(hashtag.test());
// create the pristine instance
const pristine = new Pristine(form);

function isHashtagValid() {
  const input = document.querySelector('.text__hashtags').value;
  console.log(input);
  // настройки для валидации
  const l = input.split(/\s/);
  console.log(l);
  
  l.forEach((element, index, array) => {
    //вот тут проверили что-то
    console.log(hashtag.test(element));
  });
  return hashtag.test(input) || input === '';
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
