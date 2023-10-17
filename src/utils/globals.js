/**
 *  Sets Global Application values
 */
/* eslint-disable no-unused-expressions, no-underscore-dangle */

const GLOBAL_KEY = 'APPLICATION_GLOBALS';

export const setGlobals = (global = {}) => {
  /* istanbul ignore next */
  if (!window) {
    return false;
  }
  // Setting global values
  window[GLOBAL_KEY] = global;

  return true;
};

const getGlobal = (val = '') => window[GLOBAL_KEY] && window[GLOBAL_KEY][val];

export default getGlobal;
