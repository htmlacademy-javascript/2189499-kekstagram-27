import { similarPhoto } from './miniatures.js';
import { isEscButton } from './utils.js';
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


//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hidePhoto();
  };
};

//функция удаления класа modal-open и скрытие через класс hiden
function hidePhoto() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};


//функция для показа окна
function showPhoto(element,index) {
  
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

  //---
  document.addEventListener('keydown', onPopupEscKeydown);
};

arrayOfPictures.forEach((element, index) => {
  element.addEventListener('click', (evt) => {
    showPhoto(element,index);
  });
});

// закрытие окна при помощи крестика
closeBtn.addEventListener('click', () => {
  hidePhoto();
});

//если фокус на инпуте хештега
const hashContent = document.querySelector('.text__hashtags');
hashContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//если фокус на инпуте комментария
const commentContent = document.querySelector('.text__description');
commentContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
