const body = document.querySelector('body');

const successTemplate = document.querySelector('#success').content;
const successTemplateClass = successTemplate.querySelector('.success');

const errorTemplate = document.querySelector('#error').content;
const errorTemplateClass = errorTemplate.querySelector('.error');

function removeElement(id) {
  const elem = document.getElementById(id);
  return elem.parentNode.removeChild(elem);
}

function mapErrorMessage(message) {
  const map = document.querySelector('.map');
  const modal = document.createElement('div');
  const paragraph = document.createElement('p');

  modal.setAttribute('id', 'modal-error');
  modal.classList.add('map-error');
  paragraph.textContent = message;
  map.appendChild(modal);
  modal.appendChild(paragraph);
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

function closeMessage(element) {
  element.addEventListener('click', () => {
    element.remove();
  });
  document.removeEventListener('keydown', escapeEvent);
}

function errorMessage(text) {
  const element = errorTemplateClass.cloneNode(true);
  const messageTitle = element.querySelector('.error__message');
  const messageButton = element.querySelector('.error__button');

  messageTitle.textContent = text;
  body.appendChild(element);

  messageButton.addEventListener('click', () => {
    element.remove();
  });

  document.addEventListener('keydown', escapeEvent);
  closeMessage(element);
  escapeEvent(element);
}

function successMessage(text) {
  const element = successTemplateClass.cloneNode(true);
  const messageTitle = element.querySelector('.success__message');

  messageTitle.textContent = text;
  body.appendChild(element);

  document.addEventListener('keydown', escapeEvent);
  closeMessage(element);
  escapeEvent(element);
}

export {mapErrorMessage, errorMessage, successMessage};


