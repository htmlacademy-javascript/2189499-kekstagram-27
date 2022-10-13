import {getRandomElement, getRandomIntInclusive} from './utils.js';
const NAMES = [
  'Андрей',
  'Игорь',
  'Миша',
  'Костя',
  'Саша',
  'Даша',
  'Оля',
  'Аня',
  'Юля',
  'Лена',
  'Таня',
  'Кекс',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  '«Хотелось бы пожелать доброго утра, но когда утро было добрым». 😠',
  '«Как я себя чувствую, когда нет кофе? ДЕПРЕССО.» 😩',
  '«Позвони мне, позвони.» 🤳😊',
  '«Правда ранит, наденьте беруши или купите бинт.» 💊💉🤕',
  '«Самый лучший день.»',
  '«Чужая душа — потёмки, а своя ещё темнее.» 😈👹',
  '«Думаю…Я много думаю». 😜',
];

const PHOTO_NUMBER_ELEMENTS = 25;

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
console.log(photo);
