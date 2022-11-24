const PHOTO_RAN__COUNT = 10;
const PHOTO_FRACTION = 5;
const TIME_DELAY = 500;
import { debounce, isEscButton } from './utils.js';
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
const commentsOnPage = document.querySelector('.comments-on-page');
//классы для активности
const sortByPopularBtn = document.getElementById('filter-discussed');
const sortByRandandBtn = document.getElementById('filter-random');
const sortByDeafultBtn = document.getElementById('filter-default');
const hashContent = document.querySelector('.text__hashtags');
const commentContent = document.querySelector('.text__description');
const showMoreCommentsBtn = document.querySelector('.social__comments-loader');
//ESC
const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    hidePhoto();
  }
};

const showComment = (comments) => {
  // Место для коментариев
  const socialComments = document.querySelector('.social__comments');
  let commentPage = 0;
  //указали количество комментариев общее
  socialCommentCountNumber.textContent = comments.length;

  const commentChunks = comments.reduce((resultArray, item, index) => {
    if (index % PHOTO_FRACTION === 0) {
      resultArray.push([]);
    }
    resultArray[resultArray.length - 1].push(item);
    return resultArray;
  }, []);


  const renderCommentsCount = (page) => {
    const commentsShow = commentChunks.slice(0, page + 1).reduce((allComments, chunks) => allComments.concat(chunks), []).length;

    commentsOnPage.textContent = commentsShow;

    if ((commentsShow < PHOTO_FRACTION) || (comments.length === commentsShow)) {
      showMoreCommentsBtn.classList.add('hidden');
    } else {
      showMoreCommentsBtn.classList.remove('hidden');
    }

  };


  const renderComments = (page) => {
    const similarCommentListFragment = document.createDocumentFragment();
    commentChunks[page].forEach((elem) => {
      const commentTemplate = document.getElementById('comment');
      const commentTemplateCopy = commentTemplate.content.cloneNode(true);
      commentTemplateCopy.querySelector('.social__picture').src = elem.avatar;
      commentTemplateCopy.querySelector('.social__picture').alt = elem.name;
      commentTemplateCopy.querySelector('.social__text').textContent = elem.message;
      similarCommentListFragment.append(commentTemplateCopy);
    });
    socialComments.appendChild(similarCommentListFragment);
  };


  renderComments(commentPage);
  renderCommentsCount(commentPage);

  const commentRender = () => {
    commentPage++;
    renderComments(commentPage);
    renderCommentsCount(commentPage);
  };

  showMoreCommentsBtn.addEventListener('click', commentRender);


  // закрытие окна при помощи крестика
  closeBtn.addEventListener('click', () => {
    hidePhoto();
    showMoreCommentsBtn.removeEventListener('click', commentRender);
  });

};


const showPhoto = (photo) => {
  const similarListPhotoFragment = document.createDocumentFragment();
  photo
    .forEach(({url, comments, likes}) => {

      const photoElement = templatePhoto.cloneNode(true);
      photoElement.querySelector('.picture__img').src = url;
      photoElement.querySelector('.picture__comments').textContent = comments.length;
      photoElement.querySelector('.picture__likes').textContent = likes;
      similarListPhotoFragment.appendChild(photoElement);

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


      });

    });
  listPictures.appendChild(similarListPhotoFragment);
};

const renderSimilarList = (imagePhoto) => {
  showPhoto(imagePhoto);
};


//функция для очистки картинок
const removePictures = () => {
  document.querySelectorAll('.picture')
    .forEach((photo) => {
      photo.remove();
    });
};

//функция для по умолчанию
const addDefaultBtnListener = (photos) => {
  const createDeafultBtnHandler = () => {
    sortByDeafultBtn.classList.add('img-filters__button--active');
    sortByPopularBtn.classList.remove('img-filters__button--active');
    sortByRandandBtn.classList.remove('img-filters__button--active');
    const usual = photos.sort((a, b) => a.id > b.id ? 1 : -1);
    removePictures();
    renderSimilarList(usual);
  };

  const delayRequestUsual = debounce(createDeafultBtnHandler, TIME_DELAY);

  sortByDeafultBtn.addEventListener('click', () => {

    delayRequestUsual();
  });
};


//функция для нажатия случайные
const addRandBtnListener = (photos) => {
  const createRandBtnHandler = () => {
    sortByRandandBtn.classList.add('img-filters__button--active');
    sortByPopularBtn.classList.remove('img-filters__button--active');
    sortByDeafultBtn.classList.remove('img-filters__button--active');
    const arrayPhotosRand = photos.sort(() => .5 - Math.random()).slice(0,PHOTO_RAN__COUNT);
    removePictures();
    renderSimilarList(arrayPhotosRand);
  };

  const delayRequestRand = debounce(createRandBtnHandler, TIME_DELAY);

  sortByRandandBtn.addEventListener('click', () => {

    delayRequestRand();
  });
};

//функция для нажатия на обсуждаемые
const addPopularBtnListener = (photos) => {
  const createPopularBtnHandler = () => {
    sortByPopularBtn.classList.add('img-filters__button--active');
    sortByRandandBtn.classList.remove('img-filters__button--active');
    sortByDeafultBtn.classList.remove('img-filters__button--active');
    const arrayPhotos = photos.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
    removePictures();
    renderSimilarList(arrayPhotos);
  };

  const delayRequestPopular = debounce(createPopularBtnHandler, TIME_DELAY);
  sortByPopularBtn.addEventListener('click', () => {

    delayRequestPopular();
  });
};


//функция удаления класа modal-open и скрытие через класс hiden
function hidePhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.getElementById('comments-list').innerHTML = '';
  // showMoreCommentsBtn.removeEventListener('click');
}


//если фокус на инпуте хештега
hashContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//если фокус на инпуте комментария
commentContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

export {renderSimilarList, addDefaultBtnListener, addRandBtnListener, addPopularBtnListener};


