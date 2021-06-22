const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const noticeForm = document.querySelector('.ad-form');

const noticeFormTitle = noticeForm.querySelector('#title');
const noticeFormPrice = noticeForm.querySelector('#price');
const noticeFormAddress = noticeForm.querySelector('#address');
const noticeFormTimein = noticeForm.querySelector('#timein');
const noticeFormTimeout = noticeForm.querySelector('#timeout');
const noticeFormRoomNumber = noticeForm.querySelector('#room_number');
const noticeFormCapacity = noticeForm.querySelector('#capacity');

// Запрещаем пользователь вводить данные
noticeFormAddress.setAttribute('disabled', 'disabled');

// Валидатор заголовка
noticeFormTitle.addEventListener('input', () => {
  const valueLength = noticeFormTitle.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    noticeFormTitle.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    noticeFormTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    noticeFormTitle.setCustomValidity('');
  }

  noticeFormTitle.reportValidity();
});

// Валидатор цены
noticeFormPrice.addEventListener('input', () => {
  const valueInput = noticeFormPrice.value;

  if (valueInput > MAX_PRICE) {
    noticeFormPrice.setCustomValidity(`Цена не может быть больше ${ MAX_PRICE } руб.`);
  } else {
    noticeFormPrice.setCustomValidity('');
  }

  noticeFormPrice.reportValidity();
});

noticeFormTimein.addEventListener('change', () => {
  noticeFormTimeout.value = noticeFormTimein.value;
});

noticeFormTimeout.addEventListener('change', () => {
  noticeFormTimein.value = noticeFormTimeout.value;
});

noticeFormRoomNumber.value = '1';
noticeFormCapacity.value = '1';
noticeFormRoomNumber.addEventListener('change', () => {
  if (noticeFormRoomNumber.value === '1') {
    noticeFormCapacity.value = '1';
    noticeFormCapacity.options[0].disabled = true;
    noticeFormCapacity.options[1].disabled = true;
    noticeFormCapacity.options[2].disabled = false;
    noticeFormCapacity.options[3].disabled = true;
  } else if (noticeFormRoomNumber.value === '2') {
    noticeFormCapacity.value = '2';
    noticeFormCapacity.options[0].disabled = true;
    noticeFormCapacity.options[1].disabled = false;
    noticeFormCapacity.options[2].disabled = false;
    noticeFormCapacity.options[3].disabled = true;
  } else if (noticeFormRoomNumber.value === '3') {
    noticeFormCapacity.value = '3';
    noticeFormCapacity.options[0].disabled = false;
    noticeFormCapacity.options[1].disabled = false;
    noticeFormCapacity.options[2].disabled = false;
    noticeFormCapacity.options[3].disabled = true;
  } else if (noticeFormRoomNumber.value === '100') {
    noticeFormCapacity.value = '0';
    noticeFormCapacity.options[0].disabled = true;
    noticeFormCapacity.options[1].disabled = true;
    noticeFormCapacity.options[2].disabled = true;
    noticeFormCapacity.options[3].disabled = false;
  }
});
