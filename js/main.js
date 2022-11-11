import './createPhoto.js';
// import { photo } from './createPhoto.js';
import './miniatures.js';
import './renderPhoto.js';
import './uploadImage.js';
import './validForm.js';
import './editPhoto.js';
import './effect.js';
import { renderSimilarList } from './miniatures.js';

const SIMILAR_WIZARD_COUNT = 10;
const imgUploadSelectImage = document.getElementById('upload-select-image');
const idErrorMessage = document.getElementById('error-message');
console.log(imgUploadSelectImage);
fetch ('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    renderSimilarList(data.slice(0, SIMILAR_WIZARD_COUNT));
  })
  .catch(() => {
    imgUploadSelectImage.classList.add('hidden');
    idErrorMessage.classList.remove('hidden');
    document.querySelector('.error-messgae__button').addEventListener('click', () => {
      location.reload();
    });
  });


