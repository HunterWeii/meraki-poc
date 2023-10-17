/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* istanbul ignore file */
import layoutLogic from 'containers/Device/layoutOptions';
import {
  IS_MOBILE_LAYOUT,
  IS_TABLET_LAYOUT,
  IS_DESKTOP_LAYOUT,
} from 'containers/Device/constants';
import { settings } from 'variants';
import AesEncryption from 'aes-encryption';

export const getFallbackSizeMaping = allSizes =>
  allSizes.reduce((acc, { width, height }) => {
    if (window.innerWidth > width) {
      acc.push([width, height]);
    }
    return acc;
  }, []);

export const isSlotAlreadyExist = divId => {
  let isExist = false;
  const googletag = googletag || window.googletag || { cmd: [] };

  try {
    googletag.cmd.push(() => {
      const existingSlots = googletag.pubads().getSlots();

      const existingAd = existingSlots.find(ad => {
        const adId = ad && ad.getSlotElementId ? ad.getSlotElementId() : '';
        return adId === divId;
      });

      if (existingAd) {
        isExist = true;
      }
    });
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }

  return isExist;
};

export const addPageLeveltargets = targets => {
  const googletag = googletag || window.googletag || { cmd: [] };

  try {
    if (targets && targets.length) {
      targets.forEach(target => {
        if (target) {
          googletag
            .pubads()
            .setTargeting(
              target.key && target.key.toLowerCase(),
              target.value && target.value.toLowerCase(),
            );
        }
      });
    }
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const declareSlot = ({
  path,
  divId,
  sizeMapping,
  targets,
  adsTrackingOption,
  ulmId,
}) => {
  let slot = null;
  const googletag = googletag || window.googletag || { cmd: [] };
  const dataLayer = dataLayer || window.dataLayer || [];
  const { config = {} } = settings;
  const GOOGLE_ANALYTICS_ID = config.GAID;
  const aes = new AesEncryption();
  // This code below for handling sending client id process to google dashboard
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', GOOGLE_ANALYTICS_ID, { send_page_view: false });
  function retrievingClientID() {
    return new Promise(resolve => {
      gtag('get', GOOGLE_ANALYTICS_ID, 'client_id', resolve);
    });
  }
  async function sendGamTag() {
    try {
      const clientID = await retrievingClientID();
      aes.setSecretKey(
        'E82AEA64286BC798EDF1FCFF25B4984EC3736A8907D2610BC46A5E24E939DECD',
      );
      const encrypted = aes.encrypt(clientID);
      googletag.pubads().setPublisherProvidedId(encrypted);
      googletag.pubads().setTargeting('client_id', clientID);
      googletag.pubads().setTargeting('ulm_id', ulmId);
    } catch (err) {
      // 👇️ catch the error here and do nothing when there's no client id
      // console.log(err); // 👉️ "Something went wrong"
    }
  }
  // This code above for handling sending client id process to google dashboard

  try {
    let definedMapping = [];
    const allSizes = [];
    if (sizeMapping && googletag.sizeMapping) {
      /* eslint-disable array-callback-return */
      // mapping = googletag.sizeMapping();
      definedMapping = googletag.sizeMapping();
      const mobileSizeAdSizes = [];
      const tabletSizeAdSizes = [];
      const desktopSizeAdSizes = [];

      Object.keys(sizeMapping).map(keys => {
        const width = parseInt(sizeMapping[keys].split(',')[0], 10);
        const height = parseInt(sizeMapping[keys].split(',')[1], 10);

        if (
          keys < layoutLogic[IS_MOBILE_LAYOUT][0].resolutionLessThan &&
          window.innerWidth >= width
        ) {
          mobileSizeAdSizes.push([width, height]);
        } else if (
          keys < layoutLogic[IS_TABLET_LAYOUT][0].resolutionLessThan &&
          window.innerWidth >= width
        ) {
          tabletSizeAdSizes.push([width, height]);
        } else if (window.innerWidth >= width) {
          desktopSizeAdSizes.push([width, height]);
        }
        allSizes.push({ width, height });
        // mapping.addSize([parseInt(keys, 10), height], [width, height]);
      });
      // size mapping will be only 3 dimensions
      // 0 - 599, 600 - 959, 960 - infinity
      // as a specific range will accept mutiple dimension options
      // so it can cover more advertisement impressions
      if (mobileSizeAdSizes.length) {
        definedMapping.addSize(
          // 0 - 599
          [layoutLogic[IS_MOBILE_LAYOUT][0].resolutionGreaterThan || 0, 10],
          mobileSizeAdSizes,
        );
      } else {
        definedMapping.addSize(
          // 0 - 599
          [layoutLogic[IS_MOBILE_LAYOUT][0].resolutionGreaterThan || 0, 10],
          getFallbackSizeMaping(allSizes),
        );
      }
      if (tabletSizeAdSizes.length) {
        definedMapping.addSize(
          // 600 - 959
          [layoutLogic[IS_TABLET_LAYOUT][0].resolutionGreaterThan, 10],
          tabletSizeAdSizes,
        );
      } else {
        definedMapping.addSize(
          // 0 - 599
          [layoutLogic[IS_TABLET_LAYOUT][0].resolutionGreaterThan || 0, 10],
          getFallbackSizeMaping(allSizes),
        );
      }
      if (desktopSizeAdSizes.length) {
        definedMapping.addSize(
          // 960 - infinity
          [layoutLogic[IS_DESKTOP_LAYOUT][0].resolutionGreaterThan, 10],
          desktopSizeAdSizes,
        );
      } else {
        definedMapping.addSize(
          // 0 - 599
          [layoutLogic[IS_DESKTOP_LAYOUT][0].resolutionGreaterThan || 0, 10],
          getFallbackSizeMaping(allSizes),
        );
      }

      definedMapping = definedMapping.build();
      // mapping = mapping.build();
      // console.log('mapping', definedMapping);
    }
    if (window.googletag && googletag.apiReady) {
      if (isSlotAlreadyExist(divId)) {
        return null;
      }
      googletag.cmd.push(() => {
        if (targets && targets.length) {
          addPageLeveltargets(targets);
        }

        slot = googletag.defineSlot(
          path,
          // [parseInt(size[0], 10), parseInt(size[1], 10)],
          definedMapping.reduce((acc, item) => {
            acc = acc.concat(item[1]);
            return acc;
          }, []),
          divId,
        );
        if (slot) {
          slot.defineSizeMapping(definedMapping).addService(googletag.pubads());
          googletag.pubads().collapseEmptyDivs();
          googletag.pubads().enableSingleRequest();
          if (adsTrackingOption === true) {
            sendGamTag();
          }
          googletag.enableServices();
          googletag.display(divId);
        }
      });
    }
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
  return slot;
};

export const declareOutOfPageSlot = ({ divId, path, targets }) => {
  let slot = null;
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    if (isSlotAlreadyExist(divId)) {
      return null;
    }

    googletag.cmd.push(() => {
      if (targets && targets.length) {
        addPageLeveltargets(targets);
      }

      slot = googletag.defineOutOfPageSlot(path, divId);
      if (slot) {
        slot.addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
        googletag.display(divId);
      }
    });
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
  return slot;
};

export const destroyAllSlots = () => {
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    googletag.destroySlots();
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const destroySlot = slot => {
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    googletag.destroySlots(slot);
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const refreshAdSlots = slot => {
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    if (googletag.pubadsReady) {
      googletag.pubads().refresh([slot]);
    }
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const refreshAllSlots = () => {
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    if (googletag.pubadsReady) {
      googletag.pubads().refresh();
    }
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const clearAllAdTargets = () => {
  const googletag = googletag || window.googletag || { cmd: [] };
  try {
    if (googletag.pubadsReady) {
      googletag.pubads().clearTargeting();
    }
  } catch (error) {
    console.log(error);
    googletag.cmd = [];
  }
};

export const checkValidSlots = (callback, adsConfig) => {
  /* eslint-disable no-unused-expressions */
  const googletag = googletag || window.googletag || { cmd: [] };

  const pubAdsRef =
    (googletag && googletag.pubads && googletag.pubads()) || undefined;

  if (
    typeof pubAdsRef !== 'undefined' &&
    typeof pubAdsRef.addEventListener === 'function'
  ) {
    pubAdsRef.addEventListener('slotRenderEnded', event => {
      if (event.slot.getSlotElementId() === adsConfig.divId) {
        callback(!event.isEmpty);
      }
    });
  }
};
