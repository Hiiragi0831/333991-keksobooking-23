import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, getRandomElements, getAvatarUrls} from './utils.js';

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
const LOCATION_LAT_MIN = 35.65000;
const LOCATION_LAT_MAX = 35.70000;
const LOCATION_DIGITS = 5;
const LOCATION_LNG_MIN = 35.65000;
const LOCATION_LNG_MAX = 35.70000;

function getOffers(count) {
  const offers = [];
  const avatarUrls = getAvatarUrls(count);
  function createOffer() {
    const author = {
      avatar: avatarUrls(),
    };
    const location = {
      lat: getRandomPositiveFloat(LOCATION_LAT_MIN, LOCATION_LAT_MAX, LOCATION_DIGITS),
      lng: getRandomPositiveFloat(LOCATION_LNG_MIN, LOCATION_LNG_MAX, LOCATION_DIGITS),
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
  for (let i = 0; i < count; i++) {
    offers.push(createOffer());
  }
  return offers;
}
export {getOffers};
