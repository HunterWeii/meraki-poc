/**
 *  cleanTitle.js
 *
 *  Function to remove common words from title
 */
import commonWordsRegex from '@/utils/commonWordsRegex';

export const separator = '-';

const cleanTitle = (title = '') => {
  if (typeof title !== 'string') return title;

  return title.toLowerCase().replace(commonWordsRegex, '');
};

export default cleanTitle;
