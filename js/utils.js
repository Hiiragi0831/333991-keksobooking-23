import {getRandomPositiveInteger} from '/js/utils/get-random-positive-integer.js';
import {getRandomPositiveFloat} from '/js/utils/get-random-positive-float.js';
import {TITLE_OFFER, PLACEMENT_TYPE, CHECKIN_TIME, CHECKOUT_TIME, FEATURES_OF_THE_PLACE, OFFER_PHOTOS, PRICE_OF_PLACE_MIN, PRICE_OF_PLACE_MAX, ROMS_MIN, ROMS_MAX, GUEST_MIN, GUEST_MAX, DESCRIPTION_OFFER, SIMILAR_OFFER_COUNT} from './data.js';

function getAvatarUrls(count) {
  const numbers = [];
  for (let i = 1; i <= count; i++) {
    numbers.push(i);
  }
  return function() {
    const index = getRandomPositiveInteger(0, numbers.length -1);
    const number = numbers[index];
    const userIndex = number < 10 ? `0${number}` : number;
    numbers.splice(index, 1);
    return `img/avatars/user${userIndex}.png`;
  };
}
const avatarUrls = getAvatarUrls(SIMILAR_OFFER_COUNT);

function getRandomElements(elements) {
  const elementsCopy = [...elements];
  const randomLength = getRandomPositiveInteger(1, elementsCopy.length);
  const resultElements = [];

  for (let i = 0; i < randomLength; i++) {
    const index = getRandomPositiveInteger(0, elementsCopy.length - 1);
    resultElements.push(elementsCopy[index]);
    elementsCopy.splice(index, 1);
  }
  return resultElements;
}

function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function demoItems() {
  const author = {
    avatar: avatarUrls(),
  };
  const location = {
    lat: getRandomPositiveFloat(35.65000, 35.70000,5),
    lng: getRandomPositiveFloat(139.70000,139.80000, 5),
  };
  const offer = {
    title: TITLE_OFFER,
    address: [location.lat, location.lng],
    price: getRandomPositiveInteger(PRICE_OF_PLACE_MIN, PRICE_OF_PLACE_MAX),
    type: getRandomArrayElement(PLACEMENT_TYPE),
    rooms: getRandomPositiveInteger(ROMS_MIN, ROMS_MAX),
    guests: getRandomPositiveInteger(GUEST_MIN, GUEST_MAX),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: getRandomElements(FEATURES_OF_THE_PLACE),
    description: DESCRIPTION_OFFER,
    photos: getRandomElements(OFFER_PHOTOS),
  };
  return {location, offer, author};
}

function getOffers(count) {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push(demoItems());
  }
  return offers;
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getOffers, demoItems, getRandomArrayElement, avatarUrls, getRandomElements};
