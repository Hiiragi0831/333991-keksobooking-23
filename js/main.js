import { getRandomPositiveInteger } from '/js/utils/get-random-positive-integer.js';
import { getRandomPositiveFloat } from '/js/utils/get-random-positive-float.js';

/**
 * Функция для генерации url адресов для аватарок
 * @param num число для генерации количества url
 * @returns {[]} Возвращает массив в виде img/avatars/user{num}.png (img/avatars/user05.png)
 */
function getAvatarUrls (num) {
  let urlsAvatar = [];
  for (let i = 1; i <= num; i++) {
    let number = i;
    if (number < 10) {
      number = `0${  number}`;
    }
    const url = `img/avatars/user${  number  }.png`;
    urlsAvatar = urlsAvatar.concat(url);
  }
  return urlsAvatar;
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const PLACEMENT_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_OF_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const TIME_OF_CHECKOUT = [
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

function getFeatures (features){
  let featuresItems = [];
  // Получаем случайное длину значений
  const randomLenght = getRandomPositiveInteger(0, features.length - 1);
  // Проверяем, соответствует ли массив длине случайного значения
  if (featuresItems.length < randomLenght) {
    for (let i = 0; i <= randomLenght; i++) {
      //Получаем случайное значение из массива
      const lengthOfFeatures = getRandomArrayElement(features);
      // Проверяем содержит ли массив дублирующий элемент
      if (featuresItems.includes(lengthOfFeatures)) {
        featuresItems;
      } else {
        featuresItems = featuresItems.concat(lengthOfFeatures);
      }
    }
  }
  return featuresItems;
}

const PFOTOS_OF_OFFER = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const PRICE_OF_PLACE_START = 1000;
const PRICE_OF_PLACE_END = 100000;
const ROMS_START = 1;
const ROMS_END = 8;
const GUEST_START = 1;
const GUEST_END = 1;
const DESCRIPTION_OFFER = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet blanditiis debitis dignissimos, distinctio expedita fugit, magni minima mollitia, nam nisi numquam odit officia quod saepe vero voluptatem? Cumque, voluptatem?';
const TITLE_OFFER = 'Lorem ipsum dolor sit amet';
const SIMILAR_OFFER_COUNT = 10;

const lat = () => getRandomPositiveFloat(35.65000, 35.70000,5);
const lng = () => getRandomPositiveFloat(139.70000,139.80000, 5);

const demoItems = () => {
  const locations = {
    lat: lat(),
    lng: lng(),
  };
  const ofers = {
    title: TITLE_OFFER,
    address: [locations.lat, locations.lng],
    price: getRandomPositiveInteger(PRICE_OF_PLACE_START, PRICE_OF_PLACE_END),
    type: getRandomArrayElement(PLACEMENT_TYPE),
    rooms: getRandomPositiveInteger(ROMS_START, ROMS_END),
    guests: getRandomPositiveInteger(GUEST_START, GUEST_END),
    checkin: getRandomArrayElement(TIME_OF_CHECKIN),
    checkout: getRandomArrayElement(TIME_OF_CHECKOUT),
    features: getFeatures(FEATURES_OF_THE_PLACE),
    description: DESCRIPTION_OFFER,
    photos: getRandomArrayElement(PFOTOS_OF_OFFER),
  };
  const authors = {
    avatar: getRandomArrayElement(getAvatarUrls(10)),
  };
  return {locations, ofers, authors};
};

const similarDemoItems = new Array(SIMILAR_OFFER_COUNT).fill(null).map(() => demoItems());

console.log(similarDemoItems);
