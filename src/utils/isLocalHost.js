/**
 * Check for localhost environment
 */

const isLocalHost = () => {
  // Check for 'window.location'
  if (!window || !window.location) {
    return true;
  }

  // Check for localhost environment
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === ''
  ) {
    return true;
  }

  return false;
};

export default isLocalHost;
