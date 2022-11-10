// import {photo} from './createPhoto.js';

const templatePhoto = document.querySelector('#picture').content.querySelector('.picture'); //темплейт
const listPictures = document.querySelector('.pictures'); //куда вставляем

const pictureSocial = document.querySelector('.big-picture__social');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = pictureSocial.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments').querySelectorAll('li');
const closeBtn = document.querySelector('#picture-cancel');


import { isEscButton } from './utils.js';
//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hidePhoto();
  }
};

//функция удаления класа modal-open и скрытие через класс hiden
function hidePhoto() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}


const array = [];
// const similarPhoto = photo(8);
const renderSimilarList = (imagePhoto) => {
  const similarListFragment = document.createDocumentFragment();

  imagePhoto.forEach(({url, comments, likes}) => {
    const photoElement = templatePhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.id;
    photoElement.querySelector('.picture__likes').textContent = likes;
    listPictures.appendChild(photoElement);

    photoElement.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');

      //добавляем картинку
      bigPictureImg.src = url;

      //изменяем значение лайков
      likesCount.textContent = likes;

      //добавляем body класс modal-open
      document.body.classList.add('modal-open');


      document.addEventListener('keydown', onPopupEscKeydown);


      //получаем значение колличества комментариев в верстке
      
      
      const socialCommentCount = document.querySelector('.social__comment-count');
      const socialCommentCountNumber = socialCommentCount.querySelector('.comments-count');




      // Место для коментариев 
      const socialComments = document.querySelector('.social__comments');
      const commentTemplate = document.querySelector('#comment');
      const btn = document.querySelector('.social__comments-loader');
      let commentPage = 0;
      const perChunks = 5; 
      const maxPages = Math.ceil(comments.length / perChunks);

      const commentChunks = comments.reduce((resultArray, item, index) => {
        if (index % 5 === 0) {
          resultArray.push([]);
        }
        resultArray[resultArray.length - 1].push(item);
        return resultArray;
      }, []);

      console.log(commentChunks);



      const renderComments = (page) => {
        page = 
        commentChunks[page].forEach((elem, index, array) => {
          console.log(elem)
          const commentTemplate = comment.content.cloneNode(true);
        commentTemplate.querySelector('.social__picture').src = elem.avatar;
        commentTemplate.querySelector('.social__picture').alt = elem.name;
        commentTemplate.querySelector('.social__text').textContent = elem.message;
        socialComments.append(commentTemplate);
        });
        
      };

      renderComments(commentPage);
      
      btn.addEventListener('click', () => {
        commentPage++;
        renderComments(commentPage);
      });




      let counterIndex = 1;
      comments.forEach((element, index) => {
      
      
        
        // console.log(element);
        // console.log(index);
        if (index) {
          counterIndex++;
        }
      
     

      });
      if (counterIndex <= 5) {
        socialCommentCount.classList.add('hidden');
      } else {
        socialCommentCount.classList.remove('hidden');
        socialCommentCountNumber.textContent = counterIndex;
      }
      //отрсовываем колличество коментариев
      
      
      
      // console.log(comments[0].length);
      // const socialCommentCount = document.querySelector('.social__comment-count');
      // socialCommentCount = 
      // commentsCount.textContent = comments;
      // socialComments.forEach((comment, index, a) => {
      //   comment.querySelector('.social__picture').src = comments[index].avatar;
      //   comment.querySelector('.social__picture').alt = comments[index].name;
      //   comment.querySelector('.social__text').textContent = comments[index].message;
      //   console.log(comments[index].message);
      //   console.log(comments);
      // });

      // // скрываем коментарии после открытия
      // const socialCommentCount = document.querySelector('.social__comment-count');
      // // socialCommentCount.classList.add('hidden');
    });


    array.push(photoElement);
  });
  listPictures.appendChild(similarListFragment);
};

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

export {renderSimilarList};


