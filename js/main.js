import {getRandomPositiveInteger} from '/js/utils/get-random-positive-integer.js';
import {getRandomPositiveFloat} from '/js/utils/get-random-positive-float.js';

const PLACEMENT_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_OF_THE_PLACE = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const PRICE_OF_PLACE_MIN = 1000;
const PRICE_OF_PLACE_MAX = 100000;
const ROMS_MIN = 1;
const ROMS_MAX = 8;
const GUEST_MIN = 1;
const GUEST_MAX = 5;
const DESCRIPTION_OFFER = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet blanditiis debitis dignissimos, distinctio expedita fugit, magni minima mollitia, nam nisi numquam odit officia quod saepe vero voluptatem? Cumque, voluptatem?';
const TITLE_OFFER = 'Lorem ipsum dolor sit amet';
const SIMILAR_OFFER_COUNT = 10;

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

function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

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

function demoItems() {
  const locations = {
    lat: getRandomPositiveFloat(35.65000, 35.70000,5),
    lng: getRandomPositiveFloat(139.70000,139.80000, 5),
  };
  const offer = {
    title: TITLE_OFFER,
    address: [locations.lat, locations.lng],
    price: getRandomPositiveInteger(PRICE_OF_PLACE_MIN, PRICE_OF_PLACE_MAX),
    type: getRandomArrayElement(PLACEMENT_TYPE),
    rooms: getRandomPositiveInteger(ROMS_MIN, ROMS_MAX),
    guests: getRandomPositiveInteger(GUEST_MIN, GUEST_MAX),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: getRandomElements(FEATURES_OF_THE_PLACE),
    description: DESCRIPTION_OFFER,
    photos: getRandomArrayElement(OFFER_PHOTOS),
  };
  const author = {
    avatar: avatarUrls(),
  };
  return {locations, offer, author};
}

function getOffers(count) {
  const offers = [];
  for (let i = 0; i < count; i++) {
    offers.push(demoItems());
  }
  return offers;
}

console.log(getOffers(SIMILAR_OFFER_COUNT));
