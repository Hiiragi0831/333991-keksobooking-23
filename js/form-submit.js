import {sendData} from './api.js';
import {messageError, messageSuccess} from './modal.js';
import {clickClearForm} from './state-form.js';

const noticeForm = document.querySelector('.ad-form');

function setUserFormSubmit () {
  noticeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        messageSuccess('Ваше объявление успешно размещено!');
        clickClearForm();
      },
      () => messageError('Ошибка размещения объявления. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
}

export {setUserFormSubmit};
