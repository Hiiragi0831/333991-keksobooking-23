import {TOKYO_LAT, TOKYO_LNG} from './map.js';

const noticeForm = document.querySelector('.ad-form');
const noticeFormInputs = noticeForm.querySelectorAll('input');
const noticeFormSelects = noticeForm.querySelectorAll('select');
const noticeFormTextarea = noticeForm.querySelector('#description');
const noticeFormButtons = noticeForm.querySelectorAll('button');
const noticeFormAddress = noticeForm.querySelector('#address');
const buttonFormReset = document.querySelector('.ad-form__reset');

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const mapFiltersInputs = mapFilters.querySelectorAll('input');

function disabledItems (items) {
  for (let i = 0; i < items.length; i++) {
    items[i].disabled = true;
  }
}
function unDisabledItems (items) {
  for (let i = 0; i < items.length; i++) {
    items[i].disabled = false;
  }
}
function disabledFormMapFilters () {
  mapFilters.classList.add('map__filters--disabled');
  disabledItems(mapFiltersSelects);
  disabledItems(mapFiltersInputs);
}

function disabledNoticeForms () {
  noticeForm.classList.add('ad-form--disabled');
  disabledItems(noticeFormInputs);
  disabledItems(noticeFormSelects);
  noticeFormTextarea.disabled = true;
  disabledItems(noticeFormButtons);
}

function unDisabledFormMapFilters () {
  mapFilters.classList.remove('map__filters--disabled');
  unDisabledItems(mapFiltersSelects);
  unDisabledItems(mapFiltersInputs);
}

function unDisabledNoticeForms () {
  noticeForm.classList.remove('ad-form--disabled');
  unDisabledItems(noticeFormInputs);
  unDisabledItems(noticeFormSelects);
  noticeFormTextarea.disabled = false;
  unDisabledItems(noticeFormButtons);
  noticeFormAddress.setAttribute('readonly', 'readonly');
}

function clearForms () {
  document.querySelector('.ad-form__reset').click();
}

function buttonClearForms () {
  buttonFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    noticeForm.reset();
    mapFilters.reset();
    noticeFormAddress.value = `${TOKYO_LAT}, ${TOKYO_LNG}`;
  });
}

export {clearForms, buttonClearForms, disabledNoticeForms, disabledFormMapFilters, unDisabledFormMapFilters, unDisabledNoticeForms};
