/**
 * Performs a deep merge of objects and returns new object.
 * Does not modify objects (immutable) and arrays
 * Successive objects passed as arguments will have higher precedence
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */

import isObject from './isObject';

const mergeDeep = (...objects) =>
  objects.filter(isObject).reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      /* eslint-disable no-param-reassign */
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = oVal;
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});

export default mergeDeep;
