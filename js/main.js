/**
 *
 * @param min Число 1
 * @param max Число 2
 * @returns {number} Целое число из диапазона "от...до"
 */
function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (min - max + 1) + max);
}
getRandomInteger(50, 2);

/**
 *
 * @param min Число 1
 * @param max Число 2
 * @param col Количество знаков после запятой
 * @returns {string} Число с плавающей точкой из диапазона "от...до" с указанным "количеством знаков после запятой"
 */
function getRandomNum(min, max, col) {
  const randomNum = Math.random() * (min - max + 1) + max;
  return randomNum.toFixed(col);
}
getRandomNum(1.1, 1.2, 4);
