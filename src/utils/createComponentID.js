/* eslint-disable no-unused-expressions */
/* istanbul ignore file */
/**
 * Returns an id based on the arguments used for automation testing purposes
 */

import { settings } from '@/variants';

const { config = {} } = settings;
const {
  COMPONENT_IDS = {
    attribute: 'data-id',
    enable: false,
    prefix: '',
    separator: '-',
    makeLowerCase: true,
  },
} = config;

const createComponentID = ({
  prefix = '', // optional
  page = '', // optional
  module = '', // optional
  component = '', // optional
  componentPosition = '', // optional
  subComponent = '', // optional
  subComponentPosition = '', // optional
  item = '', // optional
  subItem = '', // optional
  index, // optional
} = {}) => {
  let id = '';

  // Flag for enabling automation id's
  if (!COMPONENT_IDS.enable) {
    return null;
  }

  id += prefix || COMPONENT_IDS.prefix;
  page && (id += `${COMPONENT_IDS.separator + page}`);
  module && (id += `${COMPONENT_IDS.separator + module}`);
  component && (id += `${COMPONENT_IDS.separator + component}`);
  componentPosition && (id += `${COMPONENT_IDS.separator + componentPosition}`);
  subComponent && (id += `${COMPONENT_IDS.separator + subComponent}`);
  subComponentPosition &&
    (id += `${COMPONENT_IDS.separator + subComponentPosition}`);
  item && (id += `${COMPONENT_IDS.separator + item}`);
  subItem && (id += `${COMPONENT_IDS.separator + subItem}`);
  index && (id += `${COMPONENT_IDS.separator + index}`);

  return {
    [COMPONENT_IDS.attribute]: (COMPONENT_IDS.makeLowerCase
      ? id.toLowerCase()
      : id
    )
      .replace(
        // Makes sure that ids dont end up with separator on the extremes
        new RegExp(
          `^${COMPONENT_IDS.separator}+|${COMPONENT_IDS.separator}+$`,
          'g',
        ),
        '',
      )
      .replace(/\s/g, ''),
  };
};

export default createComponentID;
