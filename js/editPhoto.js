const formBtn = document.querySelector('.img-upload__scale');
const smallerBtn = formBtn.querySelector('.scale__control--smaller');
const biggerBtn = formBtn.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview');
let valueBtn = formBtn.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALW = 100;
const DEFAULT_SCALE = 100;

function scaleImage (value = DEFAULT_SCALE) {
    image.style.transform = `scace(${value / 100})`;
    valueBtn.value = `${value}%`;
};

function OnBiggerButtonClick() {
    const currentValue = parseInt(valueBtn.value, 10);
    let newValue = currentValue + SCALE_STEP;
    if (newValue < MIN_SCALE) {
        newValue = MIN_SCALE;
    }
    return scaleImage(newValue);
};

function onSmallerButtonClick() {
    const currentValue = parseInt(valueBtn.value, 10);
    let newValue = currentValue - SCALE_STEP;
    if (newValue > MIN_SCALE) {
        newValue = MIN_SCALE;
    }
    return scaleImage(newValue);
};

smallerBtn.addEventListener('click', onSmallerButtonClick);


biggerBtn.addEventListener('click', OnBiggerButtonClick);
