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
const similarListFragment = document.createDocumentFragment();
const commentsOnPage = document.querySelector('.comments-on-page');
//классы для активности
const sortByPopularBtn = document.getElementById('filter-discussed');
const sortByRandandBtn = document.getElementById('filter-random');
const sortByDeafultBtn = document.getElementById('filter-default');
const hashContent = document.querySelector('.text__hashtags');
const commentContent = document.querySelector('.text__description');

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
  const showMoreCommentsBtn = document.querySelector('.social__comments-loader');
  let commentPage = 0;
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

    if ((commentsShow < 5) || (comments.length === commentsShow)) {
      showMoreCommentsBtn.classList.add('hidden');
    } else {
      showMoreCommentsBtn.classList.remove('hidden');
    }

  };


  const renderComments = (page) => {
    commentChunks[page].forEach((elem) => {
      const commentTemplate = document.getElementById('comment');
      const commentTemplateCopy = commentTemplate.content.cloneNode(true);
      commentTemplateCopy.querySelector('.social__picture').src = elem.avatar;
      commentTemplateCopy.querySelector('.social__picture').alt = elem.name;
      commentTemplateCopy.querySelector('.social__text').textContent = elem.message;
      socialComments.append(commentTemplateCopy);
    });

  };


  renderComments(commentPage);
  renderCommentsCount(commentPage);


  showMoreCommentsBtn.addEventListener('click', () => {
    commentPage++;
    renderComments(commentPage);
    renderCommentsCount(commentPage);
  });


};


const showPhoto = (photo) => {
  photo
    .forEach(({url, comments, likes}) => {

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


      });

      listPictures.appendChild(similarListFragment);
    });
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

    const usual = photos.sort((a, b) => a.id > b.id ? 1 : -1);
    removePictures();
    renderSimilarList(usual);
  };

  const delayRequestUsual = debounce(createDeafultBtnHandler, 500);

  sortByDeafultBtn.addEventListener('click', () => {
    sortByDeafultBtn.classList.add('img-filters__button--active');
    sortByPopularBtn.classList.remove('img-filters__button--active');
    sortByRandandBtn.classList.remove('img-filters__button--active');
    delayRequestUsual();
  });
};


//функция для нажатия случайные
const addRandBtnListener = (photos) => {
  const createRandBtnHandler = () => {

    const PHOTO_RAN__COUNT = 10;
    const arrayPhotosRand = photos.sort(() => .5 - Math.random()).slice(0,PHOTO_RAN__COUNT);
    removePictures();
    renderSimilarList(arrayPhotosRand);
  };

  const delayRequestRand = debounce(createRandBtnHandler, 500);

  sortByRandandBtn.addEventListener('click', () => {
    sortByRandandBtn.classList.add('img-filters__button--active');
    sortByPopularBtn.classList.remove('img-filters__button--active');
    sortByDeafultBtn.classList.remove('img-filters__button--active');
    delayRequestRand();
  });
};

//функция для нажатия на обсуждаемые
const addPopularBtnListener = (photos) => {
  const createPopularBtnHandler = () => {

    const arrayPhotos = photos.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1);
    removePictures();
    renderSimilarList(arrayPhotos);
  };

  const delayRequestPopular = debounce(createPopularBtnHandler, 500);
  sortByPopularBtn.addEventListener('click', () => {
    sortByPopularBtn.classList.add('img-filters__button--active');
    sortByRandandBtn.classList.remove('img-filters__button--active');
    sortByDeafultBtn.classList.remove('img-filters__button--active');
    delayRequestPopular();
  });
};


//функция удаления класа modal-open и скрытие через класс hiden
function hidePhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.getElementById('comments-list').innerHTML = '';
}


// закрытие окна при помощи крестика
closeBtn.addEventListener('click', () => {
  hidePhoto();
});

//если фокус на инпуте хештега
hashContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//если фокус на инпуте комментария
commentContent.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

export {renderSimilarList, addDefaultBtnListener, addRandBtnListener, addPopularBtnListener};


