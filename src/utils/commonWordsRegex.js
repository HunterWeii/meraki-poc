/**
 *  commonWordsRegex.js
 *
 *  Returns a regex for common english words, useful for filtering out common words from a sentence
 */

export const commonWords = [
  '\\ba',
  'an',
  'as',
  'at',
  'before',
  'but',
  'by',
  'for',
  'from',
  'is',
  'in',
  'into',
  'like',
  'of',
  'off',
  'on',
  'onto',
  'per',
  'since',
  'than',
  'the',
  'this',
  'that',
  'to',
  'up',
  'via',
  'with',
];

const commonWordsRegex = new RegExp(commonWords.join('\\b|\\b'), 'g');

export default commonWordsRegex;
