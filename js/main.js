/**
 *
 * @param min Число 1
 * @param max Число 2
 * @returns {number} Целое число из диапазона "от...до"
 */
function getRandomInteger(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Число не может быть отрицательным');
  }
  if (min > max) {
    throw new Error('Первое значение больше второго');
  }
  return Math.floor(min + Math.random() * (max + 1 - min));
}
getRandomInteger(1, 3);
/**
 *
 * @param min Число 1
 * @param max Число 2
 * @param fractionDigits Количество знаков после запятой
 * @returns {number} Число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
 */
function getRandomNumber(min, max, fractionDigits) {
  if (min < 0 || max < 0) {
    throw new Error('Число не может быть отрицательным');
  }
  if (min > max) {
    throw new Error('Первое значение больше второго');
  }
  const randomNumber = min + Math.random() * (max - min);
  return Number(randomNumber.toFixed(fractionDigits));
}
getRandomNumber(1.1, 1.2, 4);
