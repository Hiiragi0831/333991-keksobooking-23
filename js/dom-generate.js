const cardTemplate = document.querySelector('#card').content;
const template = cardTemplate.querySelector('.popup');

const content = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();
const placeTypeMaping = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

function hideBlock (block) {
  block.remove();
  // если сделать block.hidden то стили мешаются и блок все равно светится, но по заданию я не могу вмешиватся в шаблон
}

function generateImg (array) {
  if (array.length === 0) {
    return false;
  }
  const images = document.createDocumentFragment();
  for (let i = 0; i <= array.length - 1; i++) {
    const img = document.createElement('img');
    img.setAttribute('width', 40);
    img.setAttribute('height', 40);
    img.classList.add('popup__photo');
    img.src = array[i];
    images.appendChild(img);
  }
  return images;
}

function genereteDomElements(array) {
  for (let i = 0; i < array.length; i++) {
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
    const modifiers = array[i].offer.features.map((feature) => `popup__feature--${feature}`);

    popupTitle.textContent = array[i].offer.title || hideBlock(popupTitle);
    popupTextAddress.textContent = array[i].offer.address || hideBlock(popupTextAddress);
    popupTextPrice.textContent = `${array[i].offer.price} ₽/ночь` || hideBlock(popupTextPrice);
    popupTextCapacity.textContent = `${array[i].offer.rooms} комнаты для  ${array[i].offer.guests} гостей` || hideBlock(popupTextCapacity);
    popupTextTime.textContent = `Заезд после ${array[i].offer.checkin}, выезд до ${array[i].offer.checkout}` || hideBlock(popupTextTime);
    popupDescription.textContent = array[i].offer.description || hideBlock(popupDescription);
    popupAvatar.src = array[i].author.avatar || hideBlock(popupAvatar);

    popupType.textContent = placeTypeMaping[array[i].offer.type] || hideBlock(popupType);
    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(generateImg(array[i].offer.photos) || hideBlock(popupPhotos));
    popupFeatures.querySelectorAll('.popup__feature').forEach((item) => {
      const modfier = item.classList[1];
      if (!modifiers.includes(modfier)) {
        item.remove();
      }
    });

    fragment.appendChild(element); // Складываем созданные элементы в "коробочку"
  }
  content.appendChild(fragment); // И только в конце отрисовываем всё из "коробочки"
}

export {genereteDomElements};
