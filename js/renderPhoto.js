


const showComment = (comments) => {
  // Место для коментариев 
  const socialComments = document.querySelector('.social__comments');
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

  btn.addEventListener('click', () => {
    const currentPage = ++commentPage;
    if (currentPage === maxPages) {
      btn.classList.add('hidden');
    }
    renderComments(commentPage);
  });

  let counterIndex = 1;
  comments.forEach((element, index) => {

    if (index) {
      counterIndex++;
    }

  });
  if (counterIndex <= 5) {
    socialCommentCount.classList.add('hidden');
    btn.classList.add('hidden');
  } else {
    socialCommentCount.classList.remove('hidden');
    socialCommentCountNumber.textContent = counterIndex;
    btn.classList.remove('hidden');
  }

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