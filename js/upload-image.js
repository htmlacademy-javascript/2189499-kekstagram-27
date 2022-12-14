import { isEscButton } from './utils.js';
import { resetScale } from './edit-photo.js';
import { resetModalWindow } from './effect.js';
const uploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');


const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    onCloseUploadPhoto();
  }
};

const onOpenUploadPhoto = (evt) => {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};


function onCloseUploadPhoto() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  resetScale();
  resetModalWindow();
  document.removeEventListener('keydown', onPopupEscKeydown);
}


//открытие окна
uploadFile.addEventListener('change', onOpenUploadPhoto);
//закрытие окна при помощи Х
imgUploadCancel.addEventListener('click', onCloseUploadPhoto);


export {onOpenUploadPhoto, onCloseUploadPhoto};
