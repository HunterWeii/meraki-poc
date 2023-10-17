/* eslint-disable no-param-reassign */
/* istanbul ignore file */
import isLocalHost from '@/utils/isLocalHost';

const getCurrentMainDomain = () => {
  const windowHostname = window && window.location && window.location.hostname;

  // For localhost, or Awani, return hostname
  if (isLocalHost() || windowHostname.includes('astroawani.com')) {
    return windowHostname;
  }

  // For dev/stg sites, return shared domain
  if (windowHostname.includes('eco.astro')) {
    const firstDotIndex = windowHostname.indexOf('.');
    const mainDomain = windowHostname.substring(firstDotIndex + 1);
    return `.${mainDomain}`;
  }
  // For production sites, return either last 2 or 3 blocks
  if (windowHostname.includes('.my')) {
    return `.${windowHostname.split('.').slice(-3).join('.')}`;
  }
  return `.${windowHostname.split('.').slice(-2).join('.')}`;
};

export default getCurrentMainDomain;
