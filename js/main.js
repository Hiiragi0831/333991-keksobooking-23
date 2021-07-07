import {clearForm, disabledForm} from './state-form.js';
import {validateForm} from './notice-form-validation.js';
import {getMap} from './map.js';
import {getData} from './api.js';
import {messageMapError} from './modal.js';
import {setUserFormSubmit} from './form-submit.js';

disabledForm();
getData(
  (points) => {
    getMap(points);
  },
  (err) => {
    messageMapError(err);
    getMap();
  });
validateForm();
setUserFormSubmit();
clearForm();

