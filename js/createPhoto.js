
import {NAMES, MESSAGES, DESCRIPTION, PHOTO_NUMBER_ELEMENTS} from './data.js'
import {getRandomElement, getRandomIntInclusive} from './utils.js';
//функция для создания photo
const createPhoto = () => ({

    id: getRandomIntInclusive(1, 25),
    url: `photos/${getRandomIntInclusive(1, 25)}.jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomIntInclusive(15, 200),
    comments: {
      id: getRandomIntInclusive(1, 200),
      avatar:` img/avatar-${getRandomIntInclusive(0, 6)}.svg`,
      message: getRandomElement(MESSAGES),
      name:getRandomElement(NAMES),
    },
  });
  
  
  //СОЗДАНИЕ МАССИВА ИЗ N ЭЛЕМЕНТОВ
  const photo = Array.from({length:PHOTO_NUMBER_ELEMENTS}, createPhoto);

  export {photo}