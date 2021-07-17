const body = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const successTemplateClass = successTemplate.querySelector('.success');

const errorTemplate = document.querySelector('#error').content;
const errorTemplateClass = errorTemplate.querySelector('.error');

function removeElement(id) {
  const elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

function messageMapError(message) {
  const map = document.querySelector('.map');
  const modal = document.createElement('div');
  const paragraph = document.createElement('p');

  modal.setAttribute('id', 'modal-error');
  map.appendChild(modal);
  modal.appendChild(paragraph);
  modal.classList.add('map-error');
  paragraph.textContent = message;
  setTimeout(removeElement, 1500, 'modal-error');
}

function escapeEvent(element) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      element.remove();
    }
  }, {once: true});
}

function messageClose(element) {
  element.addEventListener('click', () => {
    element.remove();
  });
  document.removeEventListener('keydown', escapeEvent);
}

function messageError(text) {
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

function messageSuccess(text) {
  const element = successTemplateClass.cloneNode(true);
  const messageTitle = element.querySelector('.success__message');

  messageTitle.textContent = text;
  body.appendChild(element);

  document.addEventListener('keydown', escapeEvent);
  messageClose(element);
  escapeEvent(element);
}

export {messageMapError, messageError, messageSuccess};


