const body = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const successTemplateClass = successTemplate.querySelector('.success');

const errorTemplate = document.querySelector('#error').content;
const errorTemplateClass = errorTemplate.querySelector('.error');

function removeElement(id) {
  const elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

function messageMapError (message) {
  const map = document.querySelector('.map');
  const modal = document.createElement('div');
  const paragraph = document.createElement('p');

  modal.setAttribute('id','modal-error');
  map.appendChild(modal);
  modal.appendChild(paragraph);
  modal.style.width='100%';
  modal.style.height='100%';
  modal.style.background='#353535';
  modal.style.color='#ffffff';
  modal.style.textAlign='center';
  modal.style.position='absolute';
  modal.style.top='0';
  modal.style.left='0';
  modal.style.zIndex='9999';
  modal.style.display='flex';
  modal.style.alignItems='center';
  modal.style.justifyContent='center';
  modal.style.opacity='0.8';
  paragraph.textContent = message;
  setTimeout(removeElement,1500, 'modal-error');
}


// Слушаем Esc
function escapeEvent (element) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      element.remove();
    }
  }, {once: true});
}

// Удаляем сообщение если произвольно кликнули на экран и удаляем прослушку ESC
function messageClose (element) {
  element.addEventListener('click', () => {
    element.remove();
  });
  document.removeEventListener('keydown', escapeEvent);
}

// Показываем сообщение об ошибке
function messageError (text) {
  const element = errorTemplateClass.cloneNode(true);
  const messageTitle = element.querySelector('.error__message');
  const messageButton = element.querySelector('.error__button');

  messageTitle.textContent = text;
  body.appendChild(element);

  messageButton.addEventListener('click', () => {
    element.remove();
  });

  document.addEventListener('keydown', escapeEvent);
  messageClose(element);
  escapeEvent(element);
}

// Показываем сообщение об успехе
function messageSuccess (text) {
  const element = successTemplateClass.cloneNode(true);
  const messageTitle = element.querySelector('.success__message');

  messageTitle.textContent = text;
  body.appendChild(element);

  document.addEventListener('keydown', escapeEvent);
  messageClose(element);
  escapeEvent(element);
}

export {messageMapError, messageError, messageSuccess};


