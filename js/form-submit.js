import {sendData} from './api.js';
import {messageError, messageSuccess} from './modal.js';

const noticeForm = document.querySelector('.ad-form');

function setUserFormSubmit () {
  noticeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => messageSuccess('Ваше объявление успешно размещено!'),
      () => messageError('Ошибка размещения объявления. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
}

export {setUserFormSubmit};
