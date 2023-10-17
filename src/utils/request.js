/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-cycle */
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */

import * as cookies from '@/utils/cookie';
/* Eco Components */
import { settings } from '@/variants';
const { endpoints, CONSTANTS } = settings;

const crypto = require('crypto');
let startSessionPromise = null;
let startSessionPromiseStatus = 'notSent';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function parseText(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.text();
}

/**
 * Extract Data from standard response
 */
function extractData(res) {
  /* istanbul ignore next */
  if (res && res.response) {
    return res.response;
  }

  return res;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response, url, options) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // 400
  // if (response.status === 400) {
  //   // return Promise.reject(response);
  // }

  if (
    response.status === 401 ||
    response.status === 403 ||
    response.name === 'TypeError'
  ) {
    if (url !== endpoints.createSession) {
      return new Promise((resolve, rejects) => {
        createSession()
          .then(
            () => {
              const headers = {
                method: options.method || 'GET',
                headers: { Authorization: cookies.get('token', true) },
              };
              fetch(url, headers).then(resolve).catch(rejects);
            },
            () => {
              rejects(response);
            },
          )
          .catch(rejects);
      });
    }
  }
  return response;
}

export const createSession = () => {
  const requestURL = endpoints.createSession;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const authToken = crypto
    .createHash('sha256')
    .update(`${timestamp}_${process.env.REACT_APP_SECRET_KEY}`, 'utf-8')
    .digest('base64');

  const headers = {
    method: 'POST',
    headers: {
      Client: process.env.REACT_APP_CLIENT_NAME,
      timestamp,
      'Auth-Token': authToken,
      'Device-Id': cookies.get(CONSTANTS.COOKIES.UUID, true),
      'Content-Type': 'application/json',
    },
  };

  if (startSessionPromiseStatus === 'pending') {
    return startSessionPromise;
  }
  if (startSessionPromiseStatus === 'resolved') {
    return Promise.resolve();
  }
  startSessionPromiseStatus = 'pending';
  startSessionPromise = request(requestURL, headers).then(
    ({ token, refreshToken }) => {
      startSessionPromise = null;
      startSessionPromiseStatus = 'resolved';
      // Set Token to Cookie
      cookies.set({
        name: CONSTANTS.COOKIES.TOKEN,
        value: token,
        minutes: CONSTANTS.COOKIES.DEFAULT_COOKIE_EXPIRY_MINS,
        base64Encoded: true,
        secure: true,
        sameSite: 'strict',
      });

      // Set Refresh Token to Cookie
      cookies.set({
        name: CONSTANTS.COOKIES.REFRESH_TOKEN,
        value: refreshToken,
        minutes: CONSTANTS.COOKIES.DEFAULT_COOKIE_EXPIRY_MINS,
        base64Encoded: true,
        secure: true,
        sameSite: 'strict',
      });
      /**
       * setting startSessionPromiseStatus
       * as notSent after a while
       * after getting a valid token
       */
      /* istanbul ignore next */
      setTimeout(() => {
        startSessionPromiseStatus = 'notSent';
      }, 3000);
    },
  );
  return startSessionPromise;
};

const checkError = (response) => {
  if (response && response.errors && response.errors.length) {
    const error = new Error('response error');
    error.data = JSON.stringify(response.errors);
    throw new Error(response.errors[0].errorTitle || 'Something went wrong!');
  }

  if (response?.statusCode === 404) {
    throw new Error(response);
  }
  return response;
};

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(fetchUrl, options, formatOption = {}) {
  const { extractDefaultResponse = true, isPlainTextResponse = false } =
    formatOption || {};

  const url = fetchUrl;
  return fetch(url, options)
    .then((data) => checkStatus(data, url, options))
    .then(isPlainTextResponse ? parseText : parseJSON)
    .then(extractDefaultResponse ? extractData : (i) => i)
    .then((data) => checkError(data, url));
}
