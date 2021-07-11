import {debounce} from './utils.js';

const SIMILAR_MARKER_COUNT = 10;
const formFilter = document.querySelector('.map__filters');
const buttonFormReset = document.querySelector('.ad-form__reset');

function getAdvertisementPriceValue (currentPrice) {
  if (0 < currentPrice && currentPrice < 10000) {
    return 'low';
  }

  if (9999 < currentPrice && currentPrice < 50000) {
    return 'middle';
  }

  if (49999 < currentPrice) {
    return 'high';
  }
}

function getMarkerRank (advertisement) {
  const housingType = formFilter.querySelector('#housing-type');
  const housingPrice = formFilter.querySelector('#housing-price');
  const housingRooms = formFilter.querySelector('#housing-rooms');
  const housingGuests = formFilter.querySelector('#housing-guests');
  const selectedBoxes = formFilter.querySelectorAll('#housing-features input:checked');
  const selectedFeatures = Array.from(selectedBoxes).map((box) => box.value);

  let rank = 0;

  if (advertisement.offer.type === housingType.value) {
    rank += 1;
  }
  if (getAdvertisementPriceValue(advertisement.offer.price) === housingPrice.value) {
    rank += 1;
  }
  if (advertisement.offer.rooms === housingRooms.value) {
    rank += 1;
  }
  if (advertisement.offer.guests === housingGuests.value) {
    rank += 1;
  }
  for (const selectedFeature of selectedFeatures) {
    if (advertisement.offer.features && advertisement.offer.features.some( (value) => value === selectedFeature)) {
      rank += 1;
    }
  }

  return rank;
}

function compareMarkers (advertisementA, advertisementB) {
  const rankA = getMarkerRank(advertisementA);
  const rankB = getMarkerRank(advertisementB);

  return rankB - rankA;
}

function renderSimilarList (similarAdvertisement) {
  let array = similarAdvertisement;
  array = array.slice();
  array = array.sort(compareMarkers);
  array = array.slice(0, SIMILAR_MARKER_COUNT);

  return array;
}

function formFilterChange (cb) {
  formFilter.addEventListener('change', debounce(() => {
    cb();
  }));
}

function buttonFilterReset (cb) {
  buttonFormReset.addEventListener('click', debounce(() => {
    cb();
  }));
}

export {renderSimilarList, formFilterChange, buttonFilterReset};
