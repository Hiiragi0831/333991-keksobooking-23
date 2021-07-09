import {unDisabledForm} from './state-form.js';
import {genereteDomElements} from './dom-generate.js';

const inputAddress = document.querySelector('#address');
const buttonFormReset = document.querySelector('.ad-form__reset');


function getMap (points) {
  const map = L.map('map-canvas')
    // После загрузки открываем формы
    .on('load', () => {
      unDisabledForm();
    })
    // Выставляем центр карты, на данный момент это центр Токио
    .setView({
      lat: 35.68283,
      lng: 139.75947,
    }, 12);

  // Добавляем на карту копирайт
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // Иконка для главной точки
  const mapAddressPinIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  // Добавляем иконку на карту и выставляем центр Токио
  const markerAddress = L.marker(
    {
      lat: 35.68283,
      lng: 139.75947,
    },
    {
      icon: mapAddressPinIcon,
      draggable: true,
    },
  );
  markerAddress.addTo(map);

  // Присваиваем координаты главной метки
  inputAddress.value = `${markerAddress._latlng.lat.toFixed(5)}, ${markerAddress._latlng.lng.toFixed(5)}`;

  // Возвращаем карту и метку к начальным значениям
  buttonFormReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    markerAddress.setLatLng({
      lat: 35.68283,
      lng: 139.75947,
    });

    map.setView({
      lat: 35.68283,
      lng: 139.75947,
    }, 12);
    inputAddress.value = `${markerAddress._latlng.lat.toFixed(5)}, ${markerAddress._latlng.lng.toFixed(5)}`;
  });

  // Слушаем событие перемешения и присваиваем новые координаты
  markerAddress.on('dragend', (event) => {
    const latLng = event.target.getLatLng();
    inputAddress.value = `${latLng.lat.toFixed(5)}, ${latLng.lng.toFixed(5)}`;
  });

  // Создаем слой для маркеров
  const markerGroup = L.layerGroup().addTo(map);

  // Генерируем точку на карте с описанием
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

  if (points) {
    points.forEach((point) => {
      createMarker(point);
    });
  }

}

export {getMap};
