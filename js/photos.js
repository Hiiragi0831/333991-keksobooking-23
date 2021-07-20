const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserHeader = document.querySelector('.ad-form__field input[type=file]');
const previewHeader = document.querySelector('.ad-form-header__preview');

const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

function previewFile(fileChooser, preview) {
  const img = document.createElement('img');
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.src = String(reader.result);

      preview.innerHTML = '';
      preview.classList.add('ad-form__file-preview');
      preview.appendChild(img);
    });

    reader.readAsDataURL(file);
    fileChooser.setCustomValidity('');
  } else {
    fileChooser.setCustomValidity('Файл должен быть картинкой (jpg, jpeg, png)');
  }
  fileChooser.reportValidity();
}

function previewFiles() {
  fileChooserHeader.addEventListener('change', () => {
    previewFile(fileChooserHeader, previewHeader);
  });
  fileChooserPhoto.addEventListener('change', () => {
    previewFile(fileChooserPhoto, previewPhoto);
  });
}

export {previewFiles};
