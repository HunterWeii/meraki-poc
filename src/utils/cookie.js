/* eslint-disable no-param-reassign */
/* istanbul ignore file */
import Cookies from 'js-cookie';
import getCurrentMainDomain from '@/utils/getCurrentMainDomain';

export function set({
  name = '',
  value = '',
  minutes,
  base64Encoded = false,
  secure = false,
  sameSite = null,
}) {
  const now = new Date();
  now.setTime(now.getTime() + minutes * 60 * 1000);
  if (base64Encoded) {
    value = btoa(value);
  }

  const currentMainDomain = getCurrentMainDomain();

  if (currentMainDomain) {
    Cookies.set(name, value, {
      expires: now,
      domain: currentMainDomain,
      path: `/${secure ? ';Secure' : ''}`,
      secure,
      sameSite,
    });
  } else {
    Cookies.set(name, value, {
      expires: now,
      path: `/${secure ? ';Secure' : ''}`,
      secure,
      sameSite,
    });
  }
}

export function get(name, base64Encoded) {
  let value = Cookies.get(name);
  if (value && base64Encoded) {
    value = atob(value);
  }
  return value;
}

export function remove(name) {
  const currentMainDomain = getCurrentMainDomain();

  if (currentMainDomain) {
    Cookies.remove(name, {
      domain: currentMainDomain,
      path: '/',
    });
  } else {
    Cookies.remove(name, {
      path: '/',
    });
  }
}
