/**
 *  getLanguageFromLocale.js
 *
 *  Function to return the Language from locale
 */

import { settings } from '@/variants';

const getLanguageFromLocale = (
  locale = settings.config.DEFAULT_SITE_LANGUAGE,
) => {
  if (locale === null) {
    return '';
  }

  switch (locale.toLowerCase()) {
    case 'en':
      return 'English';
    case 'zh':
      return 'Chinese';
    case 'ta':
      return 'Tamil';
    case 'bm':
    case 'ms':
    default:
      return 'Malay';
  }
};

export const getLanguageCodeFromLocale = (
  locale = settings.config.DEFAULT_SITE_LANGUAGE,
) => {
  if (locale === null) {
    return '';
  }

  switch (locale.toLowerCase()) {
    case 'bm':
      return 'ms';
    case 'ms':
      return 'ms';
    default:
      return locale.toLowerCase();
  }
};

export default getLanguageFromLocale;
