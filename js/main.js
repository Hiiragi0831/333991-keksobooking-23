import {buttonClearForms, disabledNoticeForms, disabledFormMapFilters} from './state-form.js';
import {validateForm} from './notice-form-validation.js';
import {getMap} from './map.js';
import {setUserFormSubmit} from './form-submit.js';

disabledNoticeForms();
disabledFormMapFilters();
getMap();
validateForm();
setUserFormSubmit();
buttonClearForms();
