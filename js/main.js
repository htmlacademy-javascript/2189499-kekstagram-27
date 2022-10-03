// first function random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive();

//second function
function commentLength (str, maxLength) {
  if ( str.length > maxLength) {
    return true;
  }
  return false;
}
commentLength('kjdsklfjalksdjl', 10);
