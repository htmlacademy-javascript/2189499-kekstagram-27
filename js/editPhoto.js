const formBtn = document.querySelector('.img-upload__scale');
const smallerBtn = formBtn.querySelector('.scale__control--smaller');
const biggerBtn = formBtn.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview img');
let valueBtn = formBtn.querySelector('.scale__control--value');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

function scaleImage (value = DEFAULT_SCALE) {
    image.style.transform = `scale(${value / 100})`;
    console.log(image.style.transform);
    valueBtn.value = `${value}%`;
};

function OnBiggerButtonClick() {
    const currentValue = parseInt(valueBtn.value, 10);
    let newValue = currentValue + SCALE_STEP;
    if (newValue > MAX_SCALE) {
        newValue = MAX_SCALE;
    }
    return scaleImage(newValue);
};

function onSmallerButtonClick() {
    const currentValue = parseInt(valueBtn.value, 10);
    let newValue = currentValue - SCALE_STEP;
    if (newValue < MIN_SCALE) {
        newValue = MIN_SCALE;
    }
    return scaleImage(newValue);
};

function resetScale() {
    return scaleImage(DEFAULT_SCALE);
};

smallerBtn.addEventListener('click', onSmallerButtonClick);


biggerBtn.addEventListener('click', OnBiggerButtonClick);

export {resetScale}