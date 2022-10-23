import { similarPhoto } from "./miniatures.js";
const pictures = document.querySelectorAll('.picture');
 
const arrayOfPictures = Array.from(pictures);
console.log(arrayOfPictures);
const bigPicture = document.querySelector('.big-picture');

arrayOfPictures.forEach((element, index) => {
    element.addEventListener('click', function() {
    //скрываем класс hiden 
    bigPicture.classList.remove('hidden');

    //находим src картинки 
    const bigPictureImg = document.querySelector('.big-picture__img')
    .querySelector('img');

    //добавляем картинку 
    bigPictureImg.src = similarPhoto[index].url;

    //находим лайк
    const pictureSocial = document.querySelector('.big-picture__social');
    const likesCount = pictureSocial.querySelector('.likes-count');
    
    
    //изменяем значение лайков
    likesCount.textContent = similarPhoto[index].likes;


    //ищем коментарии socialComments
    const commentsCount = document.querySelector('.comments-count');
    
    
    // изменяем коментарии 
    commentsCount.textContent = similarPhoto[index].comments.id;
    

    //ищем внутренние коментарии(fullPhoto)
    const socialComments = document.querySelector('.social__comments').querySelectorAll('li');
    console.log(socialComments);
    socialComments.forEach((element, index) => {
        element.querySelector('.social__picture').src = similarPhoto[index].comments.avatar;
        element.querySelector('.social__picture').alt = similarPhoto[index].comments.name;
        element.querySelector('.social__text').textContent = similarPhoto[index].comments.message;

    });
    //ищем описание 
    const socialCaption = pictureSocial.querySelector('.social__caption');
    socialCaption.textContent = similarPhoto[index].description
    console.log(socialCaption);

    //добавляем body класс modal-open
    const body = document.querySelector('body');
    body.classList.add('modal-open');

    // скрываем коментарии после открытия 
    const socialCommentCount = document.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');

    document.querySelector('.comments-loader').classList.add('hidden');

    });
}) ;

// закрытие окна при помощи крестика 
const closeBtn = document.querySelector('#picture-cancel');
closeBtn.addEventListener('click', function() {
    bigPicture.classList.add('hidden');
});
window.addEventListener('keydown', function(enevt) {
if (event.keyCode === 27) {
    bigPicture.classList.add('hidden');
    };
});





    
    
    
















