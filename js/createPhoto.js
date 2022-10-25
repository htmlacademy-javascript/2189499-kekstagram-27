import {NAMES, MESSAGES, DESCRIPTION, PHOTO_NUMBER_ELEMENTS} from './data.js';
import {getRandomElement, getRandomIntInclusive} from './utils.js';


//функция для индивидуальных значений
function createRandomIdFromRange(min, max) {
  const previousValues = [];
  return function() {
    let currentValue = getRandomIntInclusive(min, max);
    if (currentValue > (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const id = createRandomIdFromRange(1, 25);
const url = createRandomIdFromRange(1, 25);

//функция для создания photo
const createPhoto = () => ({

  id: id(),
  url: `photos/${url()}.jpg`,
  description: getRandomElement(DESCRIPTION),
  likes: getRandomIntInclusive(15, 200),
  comments: {
    id: getRandomIntInclusive(1, 200),
    avatar:` img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: getRandomElement(MESSAGES),
    name:getRandomElement(NAMES),
  },
});

//СОЗДАНИЕ МАССИВА ИЗ N ЭЛЕМЕНТОВ
const photo = (count) => Array.from({length:count}, createPhoto);
export {photo};
