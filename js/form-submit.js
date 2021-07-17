import {sendData} from './api.js';
import {errorMessage, successMessage} from './modal.js';
import {clearForms} from './state-form.js';

const noticeForm = document.querySelector('.ad-form');

function setUserFormSubmit() {
  noticeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        successMessage('Ваше объявление успешно размещено!');
        clearForms();
      },
      () => errorMessage('Ошибка размещения объявления. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
}

export {setUserFormSubmit};
