/**
 * This utility creates a Memoized function
 * @param {function} fnToMemoize: pass in the function that needs to be memoized
 */
/* eslint-disable func-names */

// To create a Property name from the arguments passed to the function
const constructPropertyFromArgs = function(fnToMemoize, args) {
  let propToCheck = [];
  propToCheck = propToCheck.concat(fnToMemoize.name, args);
  return propToCheck.join('|'); // A delimiter to join args
};

const memoize = function(fnToMemoize) {
  const memoizedCache = {}; // A closeure Object
  return function(...args) {
    const propToCheck = constructPropertyFromArgs(fnToMemoize, args);
    if (!memoizedCache[propToCheck]) {
      memoizedCache[propToCheck] = fnToMemoize(...args);
    }
    return memoizedCache[propToCheck];
  };
};

export default memoize;
