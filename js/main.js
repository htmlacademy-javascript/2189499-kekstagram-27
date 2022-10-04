// first function random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive();

//second function
let commentLength = (str, maxLength) => str.length < maxLength;

commentLength('kjdsklfjalksdjl', 10);
