const cardTemplate = document.querySelector('#card').content;
const template = cardTemplate.querySelector('.popup');

const placeTypeMapping = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function hideElement (element) {
  element.hidden = true; // normalize.css:78 display none без !important; Соответственно style.css:779 важнее и по этому display: block;
  element.style.display = 'none'; // задал стиль через js
}

function generateImgElements (images) {
  if (images.length === 0) {
    return false;
  }
  const image = document.createDocumentFragment();
  for (let i = 0; i <= images.length - 1; i++) {
    const img = document.createElement('img');
    img.setAttribute('width', 40);
    img.setAttribute('height', 40);
    img.classList.add('popup__photo');
    img.src = images[i];
    image.appendChild(img);
  }
  return image;
}

function generateDomElements(offers) {
  const element = template.cloneNode(true);
  const popupTitle = element.querySelector('.popup__title');
  const popupTextAddress = element.querySelector('.popup__text--address');
  const popupTextPrice = element.querySelector('.popup__text--price');
  const popupTextCapacity = element.querySelector('.popup__text--capacity');
  const popupTextTime = element.querySelector('.popup__text--time');
  const popupDescription = element.querySelector('.popup__description');
  const popupAvatar = element.querySelector('.popup__avatar');
  const popupType = element.querySelector('.popup__type');
  const popupPhotos = element.querySelector('.popup__photos');
  const popupFeatures = element.querySelector('.popup__features');

  if (offers.offer.title) {
    popupTitle.textContent = offers.offer.title;
  } else {
    hideElement(popupTitle);
  }
  if (offers.offer.address) {
    popupTextAddress.textContent = offers.offer.address;
  } else {
    hideElement(popupTitle);
  }
  if (offers.offer.price) {
    popupTextPrice.textContent = `${offers.offer.price} ₽/ночь`;
  } else {
    hideElement(popupTextPrice);
  }
  if (offers.offer.rooms && offers.offer.guests) {
    popupTextCapacity.textContent = `${offers.offer.rooms} комнаты для  ${offers.offer.guests} гостей`;
  } else {
    hideElement(popupTextCapacity);
  }
  if (offers.offer.checkin && offers.offer.checkout) {
    popupTextTime.textContent = `Заезд после ${offers.offer.checkin}, выезд до ${offers.offer.checkout}`;
  } else {
    hideElement(popupTextTime);
  }
  if (offers.offer.description) {
    popupDescription.textContent = offers.offer.description;
  } else {
    hideElement(popupDescription);
  }
  if (offers.author.avatar) {
    popupAvatar.src = offers.author.avatar;
  } else {
    hideElement(popupAvatar);
  }
  if (offers.offer.type) {
    popupType.textContent = placeTypeMapping[offers.offer.type];
  } else {
    hideElement(popupType);
  }
  popupPhotos.innerHTML = '';
  if (offers.offer.photos) {
    popupPhotos.appendChild(generateImgElements(offers.offer.photos));
  } else {
    hideElement(popupPhotos);
  }
  if (offers.offer.features) {
    const modifiers = offers.offer.features.map((feature) => `popup__feature--${feature}`);
    popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    hideElement(popupFeatures);
  }
  return element;
}

export {generateDomElements};
