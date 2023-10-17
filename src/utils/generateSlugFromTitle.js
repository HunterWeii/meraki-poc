/**
 *  generateSlugFromTitle.js
 *  This file converts article title to a partof url slug
 */

import { utils } from '@/variants';
import cleanTitle from '@/utils/cleanTitle';
const { alphanumericRegex } = utils;

const generateSlugFromTitle = (title = '') => {
  const maxLength = 100;
  const separator = '-';

  const removeSeparatorLiteralRegex = new RegExp(
    `^\\${separator}+|\\${separator}+$`,
    'g',
  );

  // Removing common words from title for creating shorter & more meaningful slug
  const cleanedTitle = cleanTitle(title);

  return (
    cleanedTitle
      .split('')
      // Only allow alphanumeric characters (should include Multilingual characters)
      .filter((char) => !!char.match(alphanumericRegex))
      .join('')
      // Replace space with separator
      .replace(/\s+/g, separator)
      .replace(removeSeparatorLiteralRegex, '')
      // Trim total length for better SEO ranking
      .trim(0, maxLength)
      .toLowerCase()
  );
};

export default generateSlugFromTitle;
