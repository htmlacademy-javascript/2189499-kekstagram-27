
//ФУНКЦИЯ РАНДОМА
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ДЛИНЫ СТРОКИ
const commentLength = (str, maxLength) => str.length < maxLength;

//функция для вызова случайного элемента в массиве

const getRandomElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

export {getRandomElement, getRandomIntInclusive};
