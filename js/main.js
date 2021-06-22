import {getOffers} from './data.js';
import {genereteDomElements} from './dom-generate.js';
import './notice-form-validation.js';

const SIMILAR_OFFER_COUNT = 10;
genereteDomElements(getOffers(SIMILAR_OFFER_COUNT));
