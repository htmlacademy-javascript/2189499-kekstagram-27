import { isEscButton } from './utils.js';

const uploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscButton(evt)) {
    evt.preventDefault();
    closeUploadPhoto();
  }
};

function openUploadPhoto(evt) {
  evt.preventDefault();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}


function closeUploadPhoto() {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
}


//открытие окна
uploadFile.addEventListener('change', openUploadPhoto);
//закрытие окна при помощи Х
imgUploadCancel.addEventListener('click', closeUploadPhoto);


