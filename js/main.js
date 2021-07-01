import {getOffers} from './data.js';
import {disabledForm} from './state-form.js';
import {validateForm} from './notice-form-validation.js';
import {getMap} from './map.js';

const SIMILAR_OFFER_COUNT = 10;
disabledForm();
getMap(getOffers(SIMILAR_OFFER_COUNT));
validateForm();
