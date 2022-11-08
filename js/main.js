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

fetch ('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      alert('error 200-299');
    }
  })
  .then((data) => {
    renderSimilarList(data.slice(0, SIMILAR_WIZARD_COUNT))
  })
  .catch(() => alert('error url in fetch'));


