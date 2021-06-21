const cardTemplate = document.querySelector('#card').content;
const template = cardTemplate.querySelector('.popup');

const content = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();
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

function genereteDomElements(offers) {
  for (let i = 0; i < offers.length; i++) {
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
    const modifiers = offers[i].offer.features.map((feature) => `popup__feature--${feature}`);

    if (offers[i].offer.title) {
      popupTitle.textContent = offers[i].offer.title;
    } else {
      hideElement(popupTitle);
    }
    if (offers[i].offer.address) {
      popupTextAddress.textContent = offers[i].offer.address;
    } else {
      hideElement(popupTitle);
    }
    if (offers[i].offer.price) {
      popupTextPrice.textContent = `${offers[i].offer.price} ₽/ночь`;
    } else {
      hideElement(popupTextPrice);
    }
    if (offers[i].offer.rooms && offers[i].offer.guests) {
      popupTextCapacity.textContent = `${offers[i].offer.rooms} комнаты для  ${offers[i].offer.guests} гостей`;
    } else {
      hideElement(popupTextCapacity);
    }
    if (offers[i].offer.checkin && offers[i].offer.checkout) {
      popupTextTime.textContent = `Заезд после ${offers[i].offer.checkin}, выезд до ${offers[i].offer.checkout}`;
    } else {
      hideElement(popupTextTime);
    }
    if (offers[i].offer.description) {
      popupDescription.textContent = offers[i].offer.description;
    } else {
      hideElement(popupDescription);
    }
    if (offers[i].author.avatar) {
      popupAvatar.src = offers[i].author.avatar;
    } else {
      hideElement(popupAvatar);
    }
    if (offers[i].offer.type) {
      popupType.textContent = placeTypeMapping[offers[i].offer.type];
    } else {
      hideElement(popupType);
    }
    popupPhotos.innerHTML = '';
    if (offers[i].offer.photos) {
      popupPhotos.appendChild(generateImgElements(offers[i].offer.photos));
    } else {
      hideElement(popupPhotos);
    }
    if (offers[i].offer.features) {
      popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
    } else {
      hideElement(popupFeatures);
    }
    fragment.appendChild(element); // Складываем созданные элементы в "коробочку"
  }
  content.appendChild(fragment); // И только в конце отрисовываем всё из "коробочки"
}

export {genereteDomElements};
