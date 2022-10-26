import { similarPhoto } from './miniatures.js';
import { isEscKeydow } from './utils.js' 
const pictures = document.querySelectorAll('.picture');
const arrayOfPictures = Array.from(pictures);
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const pictureSocial = document.querySelector('.big-picture__social');
const likesCount = pictureSocial.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments').querySelectorAll('li');
const socialCaption = pictureSocial.querySelector('.social__caption');
const closeBtn = document.querySelector('#picture-cancel');
arrayOfPictures.forEach((element, index) => {
  element.addEventListener('click', () => {

    bigPicture.classList.remove('hidden');

    //добавляем картинку
    bigPictureImg.src = similarPhoto[index].url;

    //изменяем значение лайков
    likesCount.textContent = similarPhoto[index].likes;

    // изменяем коментарии
    commentsCount.textContent = similarPhoto[index].comments.id;

    socialComments.forEach((comment, index) => {
      comment.querySelector('.social__picture').src = similarPhoto[index].comments.avatar;
      comment.querySelector('.social__picture').alt = similarPhoto[index].comments.name;
      comment.querySelector('.social__text').textContent = similarPhoto[index].comments.message;

    });

    socialCaption.textContent = similarPhoto[index].description;

    //добавляем body класс modal-open
    document.body.classList.add('modal-open');

    // скрываем коментарии после открытия
    const socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');

    document.querySelector('.comments-loader').classList.add('hidden');
  });
}) ;

// закрытие окна при помощи крестика
closeBtn.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

window.addEventListener('keydown', (evt) => {
  if (isEscKeydow) {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };
});
