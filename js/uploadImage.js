import { isEscButton } from './utils.js'

const uploadFile = document.getElementById('upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');


const openUploadPhoto = function(evt) {
    evt.preventDefault();
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
};


const closeUploadPhoto = function() {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';
};


//открытие окна
uploadFile.addEventListener('change', openUploadPhoto);
//закрытие окна при помощи Х
imgUploadCancel.addEventListener('click', closeUploadPhoto);

//закртие окна при помощи клавиши ESC
window.addEventListener('keydown', (evt)=> {
    if (isEscButton) {
        closeUploadPhoto();     
    }
});