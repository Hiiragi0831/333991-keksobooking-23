import {getOffers} from './data.js';
import {genereteDomElements} from './dom-generate.js';
import {disabledForm, unDisabledForm} from './state-form.js';
import {validateForm} from './notice-form-validation.js';

const SIMILAR_OFFER_COUNT = 10;
genereteDomElements(getOffers(SIMILAR_OFFER_COUNT));
disabledForm();
setTimeout(unDisabledForm, 2000);
validateForm();
