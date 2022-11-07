import './createPhoto.js';
import { photo } from './createPhoto.js';
import './miniatures.js';
import './renderPhoto.js';
import './uploadImage.js';
import './validForm.js';
import './editPhoto.js';
import './effect.js';

fetch ('https://27.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });