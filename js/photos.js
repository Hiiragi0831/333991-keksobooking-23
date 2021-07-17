const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserHeader = document.querySelector('.ad-form__field input[type=file]');
const previewHeader = document.querySelector('.ad-form-header__preview');

const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo');

function getFilePreview(fileChooser, preview) {
  fileChooser.addEventListener('change', () => {
    const img = document.createElement('img');
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        img.width = 40;
        img.height = 44;
        img.src = String(reader.result);

        preview.innerHTML = '';
        preview.classList.add('ad-form__file-preview');
        preview.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  });
}

function getFilesPreview() {
  getFilePreview(fileChooserHeader, previewHeader);
  getFilePreview(fileChooserPhoto, previewPhoto);
}

export {getFilesPreview};
