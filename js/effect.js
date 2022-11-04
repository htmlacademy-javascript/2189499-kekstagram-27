const form = document.querySelector('.img-upload__form');
const image = document.querySelector('.img-upload__form img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');


const EFFECTS = [
  //оригинал
  {
    name: 'none',
    min: 0,
    max: 100,
    step:1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 100,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  //марвин
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  //фобос
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  //зной
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];
let choosenEffect = DEFAULT_EFFECT;

const isDefault = () => choosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choosenEffect.min,
      max: choosenEffect.max,
    },
    step: choosenEffect.step,
    start: choosenEffect.max,
  });

  if (isDefault()) {
    sliderElement.classList.add('hidden');
  }
};


const onRadioChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  choosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  console.log(choosenEffect);
  updateSlider();
};

const onSliederUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${choosenEffect.style}(${sliderValue}${choosenEffect.unit})`;
  console.log(image.style.filter);
  image.classList.add(`effect__preview--${choosenEffect.name}`);
  effectLevel.value = sliderValue;
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

form.addEventListener('change', onRadioChange);
sliderElement.noUiSlider.on('update', onSliederUpdate);
