import { debounce, isEscButton } from './utils.js';
import { photosFromServer } from './sendPhoto.js';
const templatePhoto = document.querySelector('#picture').content.querySelector('.picture'); //темплейт
const listPictures = document.querySelector('.pictures'); //куда вставляем
const pictureSocial = document.querySelector('.big-picture__social');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img').querySelector('img');
const likesCount = pictureSocial.querySelector('.likes-count');
const closeBtn = document.querySelector('#picture-cancel');
//получаем значение колличества комментариев в верстке
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentCountNumber = socialCommentCount.querySelector('.comments-count');
const array = [];
const similarListFragment = document.createDocumentFragment();
const commentsOnPage = document.querySelector('.comments-on-page');

//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hidePhoto();
  }
};


//функция для нажатия случайные
const randBtn = document.getElementById('filter-random');
const createRandPhoto = () => {
  const PHOTO_RAN__COUNT = 10;
  const arrayPhotosRand = photosFromServer.sort(() => .5 - Math.random()).slice(0,PHOTO_RAN__COUNT);
  document.querySelectorAll('.picture')
    .forEach((photo) => {
      photo.remove();
    });
  renderSimilarList(arrayPhotosRand);
};

const onCangeRand = debounce(createRandPhoto, 500);

randBtn.addEventListener('click', () => {
  onCangeRand();
});
// }


//функция для нажатия на обсуждаемые
const popularBtn = document.getElementById('filter-discussed');
const createPopularBtn = () => {
  const arrayPhotos = photosFromServer.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
  document.querySelectorAll('.picture')
    .forEach((photo) => {
      photo.remove();
    });
  renderSimilarList(arrayPhotos);
};

const onCangePopular = debounce(createPopularBtn, 500);
popularBtn.addEventListener('click', () => {
  onCangePopular();
});


//функция удаления класа modal-open и скрытие через класс hiden
function hidePhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.getElementById('comments-list').innerHTML = '';
}


const showComment = (comments) => {
  // Место для коментариев
  const socialComments = document.querySelector('.social__comments');
  const btn = document.querySelector('.social__comments-loader');
  let commentPage = 0;
  const perChunks = 5;
  const maxPages = Math.ceil(comments.length / perChunks);
  //указали количество комментариев общее
  socialCommentCountNumber.textContent = comments.length;

  const commentChunks = comments.reduce((resultArray, item, index) => {

    if (index % 5 === 0) {
      resultArray.push([]);
    }
    resultArray[resultArray.length - 1].push(item);
    return resultArray;
  }, []);


  const renderCommentsCount = (page) => {
    const commentsShow = commentChunks.slice(0, page + 1).reduce((allComments, chunks) => allComments.concat(chunks), []).length;

    commentsOnPage.textContent = commentsShow;

    if ((commentsShow < 5) || (comments.length == commentsShow)) {
      btn.classList.add('hidden');
    } else {
      btn.classList.remove('hidden');
    }

  };


  const renderComments = (page) => {
    commentChunks[page].forEach((elem, index, array) => {
      const commentTemplate = comment.content.cloneNode(true);
      commentTemplate.querySelector('.social__picture').src = elem.avatar;
      commentTemplate.querySelector('.social__picture').alt = elem.name;
      commentTemplate.querySelector('.social__text').textContent = elem.message;
      socialComments.append(commentTemplate);
    });

  };


  renderComments(commentPage);
  renderCommentsCount(commentPage);


  btn.addEventListener('click', () => {
    commentPage++;
    renderComments(commentPage);
    renderCommentsCount(commentPage);
  });


};

const showPhoto = (photo) => {
  photo.forEach(({url, comments, likes}) => {

    const photoElement = templatePhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    listPictures.appendChild(photoElement);

    photoElement.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      //добавляем body класс modal-open
      document.body.classList.add('modal-open');

      document.addEventListener('keydown', onPopupEscKeydown);


      //добавляем картинку
      bigPictureImg.src = url;

      //изменяем значение лайков
      likesCount.textContent = likes;

      showComment(comments);

      array.push(photoElement);

    });

    listPictures.appendChild(similarListFragment);
  });
};

const renderSimilarList = (imagePhoto) => {
  showPhoto(imagePhoto);
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


