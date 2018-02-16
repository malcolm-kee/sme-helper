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
 * @param {Function[]} fns
 * @returns {undefined}
 */
export const compose = (...fns) => () => {
  fns.forEach(fn => {
    if (typeof fn === 'function') fn();
  });
};

/**
 *
 * @param {ArrayLike} arr
 * @param {generalCallback} callBack
 */
export const forEach = (arr, callBack) => {
  for (let x = 0; x < arr.length; x++) {
    callBack(arr[x], x);
  }
};

/**
 *
 * @param {ArrayLike} arr
 * @param {generalCallback} callBack
 */
export const map = (arr, callBack) => {
  for (let x = 0; x < arr.length; x++) {
    return callBack(arr[x], x);
  }
};

export const reduce = (arr, callBack, initialVal) => {
  let acc = initialVal;
  for (let x = 0; x < arr.length; x++) {
    acc = callBack(acc, arr[x], x);
  }
  return acc;
};
