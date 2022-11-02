const formBtn = document.querySelector('.img-upload__scale');
const smallerBtn = formBtn.querySelector('.scale__control--smaller');
const biggerBtn = formBtn.querySelector('.scale__control--bigger');
const valueBtn = formBtn.querySelector('.scale__control--value');


smallerBtn.addEventListener('click', function() {
    console.log('- нажат');
});


biggerBtn.addEventListener('click', function() {
    console.log('+ нажат');
});
