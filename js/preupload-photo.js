const FILE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
const uploadPhotoBtn = document.getElementById('upload-file');
const previewPhoto = document.querySelector('.img-upload__preview img');


uploadPhotoBtn.addEventListener('change', () => {
  const file = uploadPhotoBtn.files[0];
  const matches = FILE_TYPES.includes(file.type);
  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
});


