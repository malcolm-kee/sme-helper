/**
 *
 * @typedef {{length: number}} ArrayLike
 * @typedef {ArrayLike.<number, *}
 */

/**
 * @callback generalCallback
 * @param {*} elem
 * @param {number} [index]
 */

/**
 * @returns {Function}
 */
export const compose = (...fns) => (...params) => {
  fns.forEach(fn => {
    if (typeof fn === 'function') fn(...params);
  });
};

/**
 *
 * @param {ArrayLike} arr
 * @param {generalCallback} callBack
 */
export const forEach = (arr, callBack) => {
  for (let x = 0; x < arr.length; x++) {
    callBack(arr[x], x, arr);
  }
};

/**
 *
 * @param {ArrayLike} arr
 * @param {generalCallback} callBack
 */
export const map = (arr, callBack) => {
  let result = [];
  for (let x = 0; x < arr.length; x++) {
    result.push(callBack(arr[x], x, arr));
  }
  return result;
};

export const reduce = (arr, callBack, initialVal) => {
  let acc = initialVal;
  for (let x = 0; x < arr.length; x++) {
    acc = callBack(acc, arr[x], x);
  }
  return acc;
};
