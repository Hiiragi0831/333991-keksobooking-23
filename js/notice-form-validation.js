const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;
const MAX_ROOMS = '100';
const MIN_CAPACITY = '0';

const noticeForm = document.querySelector('.ad-form');

const noticeFormTitle = noticeForm.querySelector('#title');
const noticeFormPrice = noticeForm.querySelector('#price');
const noticeFormAddress = noticeForm.querySelector('#address');
const noticeFormTimein = noticeForm.querySelector('#timein');
const noticeFormTimeout = noticeForm.querySelector('#timeout');
const noticeFormRoomNumber = noticeForm.querySelector('#room_number');
const noticeFormCapacity = noticeForm.querySelector('#capacity');
const noticeFormType = noticeForm.querySelector('#type');

let minPrice = 0;

function setDisabledAddress() {
  noticeFormAddress.setAttribute('readonly', 'readonly');
}

function setValidateTitle() {
  noticeFormTitle.addEventListener('input', () => {
    const valueLength = noticeFormTitle.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      noticeFormTitle.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      noticeFormTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
    } else {
      noticeFormTitle.setCustomValidity('');
    }
    noticeFormTitle.reportValidity();
  });
}

function setValidatePrice() {
  noticeFormPrice.addEventListener('input', () => {
    const valueInput = noticeFormPrice.value;

    if (valueInput > MAX_PRICE) {
      noticeFormPrice.setCustomValidity(`Цена не может быть больше ${MAX_PRICE} руб.`);
    } else if (valueInput < minPrice) {
      noticeFormPrice.setCustomValidity(`Цена не может быть меньше ${minPrice} руб.`);
    } else {
      noticeFormPrice.setCustomValidity('');
    }
    noticeFormPrice.reportValidity();
  });
}

function setSynchronizationTimeinTimeout() {
  noticeFormTimeout.value = noticeFormTimein.value;
  noticeFormTimein.addEventListener('change', () => {
    noticeFormTimeout.value = noticeFormTimein.value;
  });
  noticeFormTimeout.addEventListener('change', () => {
    noticeFormTimein.value = noticeFormTimeout.value;
  });
}

function setSynchronizationRoomCapacity() {

  function setReport(roomsReport, capacityReport) {
    noticeFormRoomNumber.setCustomValidity(roomsReport);
    noticeFormCapacity.setCustomValidity(capacityReport);
  }

  function setConditionsReview() {
    if (noticeFormRoomNumber.value === MAX_ROOMS && noticeFormCapacity.value !== MIN_CAPACITY) {
      setReport('Это помещение не для гостей', '');
    } else if (noticeFormCapacity.value === MIN_CAPACITY && noticeFormRoomNumber.value !== MAX_ROOMS) {
      setReport('', 'Выберите не менее одного гостя');
    } else if (noticeFormCapacity.value > noticeFormRoomNumber.value) {
      setReport('', 'Число гостей не должно превышать число комнат.');
    } else {
      setReport('', '');
    }
    noticeFormRoomNumber.reportValidity();
    noticeFormCapacity.reportValidity();
  }

  noticeFormRoomNumber.addEventListener('input', () => {
    setConditionsReview();
  });
  noticeFormCapacity.addEventListener('input', () => {
    setConditionsReview();
  });
  setConditionsReview();
}

function setMinPrice() {
  function validate() {
    if (noticeFormType.value === 'bungalow') {
      minPrice = 0;
    } else if (noticeFormType.value === 'flat') {
      minPrice = 1000;
    } else if (noticeFormType.value === 'hotel') {
      minPrice = 3000;
    } else if (noticeFormType.value === 'house') {
      minPrice = 5000;
    } else if (noticeFormType.value === 'palace') {
      minPrice = 10000;
    }
  }

  noticeFormType.addEventListener('change', validate);
  validate();
}

function validateForm() {
  setDisabledAddress();
  setValidateTitle();
  setValidatePrice();
  setSynchronizationTimeinTimeout();
  setSynchronizationRoomCapacity();
  setMinPrice();
}

export {validateForm};
