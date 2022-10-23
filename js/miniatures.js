import {photo} from './createPhoto.js';

const templatePhoto = document.querySelector('#picture').content.querySelector('.picture'); //темплейт
const listPictures = document.querySelector('.pictures'); //куда вставляем


const similarPhoto = photo(8);

const similarListFragment = document.createDocumentFragment();

similarPhoto.forEach(({url, comments, likes}) => {
    const photoElement = templatePhoto.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.id; 
    photoElement.querySelector('.picture__likes').textContent = likes;
    listPictures.appendChild(photoElement);
    });

listPictures.appendChild(similarListFragment);



