// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки
  return Number(result.toFixed(digits));
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Number(Math.floor(result));
}

/**
 *  Функция генерирует случайную длину массива и случайные значения из входящего массива
 * @param elements Массив
 * @returns {[]}
 */
function getRandomElements(elements) {
  //Копируем входящий массив
  const elementsCopy = [...elements];
  //Генерируем случайную длину массива
  const randomLength = getRandomPositiveInteger(1, elementsCopy.length);
  // создаем пустой массив который будем записывать результаты
  const resultElements = [];

  for (let i = 0; i < randomLength; i++) {
    // Записываем в переменную случайное значение из массива
    const index = getRandomPositiveInteger(0, elementsCopy.length - 1);
    //Записываем её в созданный массив
    resultElements.push(elementsCopy[index]);
    //Удаляем случайный элемент из скопированного массива
    elementsCopy.splice(index, 1);
  }
  return resultElements;
}

/**
 * Функция возвращает случайный элемент массива
 * @param elements
 * @returns {*}
 */
function getRandomArrayElement(elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

/**
 * Функция для генерации ссылок
 * @param count Количество ссылок
 * @returns {function(): string}
 */
function getAvatarUrls(count) {
  const numbers = [];
  for (let i = 1; i <= count; i++) {
    //Заполняем массив числами
    numbers.push(i);
  }
  return function() {
    //Берем случайный элемент массива
    const index = getRandomPositiveInteger(0, numbers.length -1);
    //присваиваем число переменной
    const number = numbers[index];
    //Проверяем, если он меньше 10 до приписываем ему 0 перед числом 05, 06 и т.д.
    const userIndex = number < 10 ? `0${number}` : number;
    //удаляем случайный элемент из массива
    numbers.splice(index, 1);
    //возвращаем сгенерированный url со случайным числом
    return `img/avatars/user${userIndex}.png`;
  };
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getRandomElements, getAvatarUrls};
