import {unDisabledFormMapFilters, unDisabledNoticeForms} from './state-form.js';
import {genereteDomElements} from './dom-generate.js';
import {getData} from './api.js';
import {buttonFilterReset, formFilterChange, renderSimilarList} from './similar-list.js';
import {messageMapError} from './modal.js';

const inputAddress = document.querySelector('#address');
const buttonFormReset = document.querySelector('.ad-form__reset');

const TOKYO_LAT = 35.68283;
const TOKYO_LNG = 139.75947;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

function createMarker (point) {
  const {lat, lng} = point.location;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      genereteDomElements(point),
      {
        keepInView: true,
      },
    );
}

function addMarkers (points) {
  if (points) {
    points.forEach((point) => {
      createMarker(point);
    });
  }
}

function clearMarkers () {
  markerGroup.clearLayers();
}

function getMap () {
  map.on('load', () => {
    unDisabledNoticeForms();
    getData(
      (points) => {
        addMarkers(renderSimilarList(points));
        unDisabledFormMapFilters();
        formFilterChange(() => {
          clearMarkers();
          addMarkers(renderSimilarList(points));
        });
        buttonFilterReset(() => {
          clearMarkers();
          addMarkers(renderSimilarList(points));
        });
      },
      (err) => {
        messageMapError(err);
      });
  });
  map.setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mapAddressPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const markerAddress = L.marker(
    {
      lat: TOKYO_LAT,
      lng: TOKYO_LNG,
    },
    {
      icon: mapAddressPinIcon,
      draggable: true,
    },
  );
  markerAddress.addTo(map);

  inputAddress.value = `${TOKYO_LAT}, ${TOKYO_LNG}`;

  buttonFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    markerAddress.setLatLng({
      lat: TOKYO_LAT,
      lng: TOKYO_LNG,
    });

    map.setView({
      lat: TOKYO_LAT,
      lng: TOKYO_LNG,
    }, 12);

    inputAddress.value = `${TOKYO_LAT}, ${TOKYO_LNG}`;
  });

  markerAddress.on('dragend', (event) => {
    const latLng = event.target.getLatLng();
    inputAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });
}

export {getMap, TOKYO_LAT, TOKYO_LNG};
