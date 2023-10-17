/* eslint-disable no-unused-expressions,camelcase */

import { settings } from '@/variants';
import deepMergeObject from '@/utils/deepMergeObject';
import capitalize from '@/utils/capitalize';
import capitalizeAll from '@/utils/capitalizeAll';

export const pushGAClickNextArticle = ({
  event = 'content_click',
  list_type = 'Load Full Article',
  content_type = 'Article',
  content_title,
  content_id,
  content_category,
  list_position,
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event,
      list_type,
      content_type,
      content_title,
      content_id,
      content_category: capitalize(content_category) || 'none',
      list_position,
    });
};

export const pushGAScrollNextArticle = ({
  event = 'scroll_position',
  list_type = 'Scroll Next Article',
  content_type = 'Article',
  content_title = 'none',
  content_id = 'none',
  content_category,
  list_position,
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event,
      list_type,
      content_type,
      content_title,
      content_id,
      content_category: capitalize(content_category) || 'none',
      list_position,
    });
};

export const pushGAContentList = ({
  event = 'content_click',
  list_type = 'none',
  list_variant,
  content_type,
  content_title = 'none',
  content_id = 'none',
  content_category,
  content_author = 'none',
  content_sp = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event,
      list_type,
      ...(list_variant && { list_variant }),
      content_type: capitalizeAll(content_type) || 'none',
      content_title,
      content_id,
      content_category: capitalizeAll(content_category) || 'none',
      content_author,
      content_sp,
    });
};

export const pushGALinkClick = ({
  event,
  list_type,
  content_type,
  content_title,
  content_id,
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event: event || '',
      list_type: list_type || '',
      content_type: capitalizeAll(content_type) || 'none',
      content_title: content_title || '',
      content_id: content_id || '',
    });
};

export const pushGAContentClick = ({
  list_type = 'none',
  list_variant,
  content_type,
  content_title = 'none',
  content_id = 'none',
  content_category,
  content_author = 'none',
  content_sp = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event: 'content_click',
      list_type,
      ...(list_variant && { list_variant }),
      content_type: capitalizeAll(content_type) || 'none',
      content_title,
      content_id,
      content_category: capitalizeAll(content_category) || 'none',
      content_author,
      content_sp,
    });
};

const pushGAPageview = ({
  page_site = capitalize(process.env && process.env.VARIANT) || 'Awani',
  page_language = 'Malay',
  page_type = 'Show Details Page',
  page_content_type,
  page_content_title = 'none',
  page_content_id = 'none',
  page_content_category,
  page_content_author = 'none',
  page_content_sp = 'none',
  page_content_topics = 'none',
  page_content_genre = 'none',
  page_content_date = 'none',
  page_content_length = 'none',
  load_from_position = null,
}) =>
  window &&
  window.dataLayer &&
  window.dataLayer.push({
    event: 'pageview',
    page_site,
    page_language,
    page_type,
    page_content_type: capitalizeAll(page_content_type) || 'none',
    page_content_title,
    page_content_id,
    page_content_category: capitalizeAll(page_content_category) || 'none',
    page_content_author,
    page_content_sp,
    page_content_topics,
    page_content_genre,
    page_content_date,
    page_content_length,
    load_from_position,
  });

export const pushGASocialShareEvent = ({
  list_type = 'none',
  content_title = 'none',
  content_id = 'none',
  social_method = 'none',
  social_link = 'none',
}) =>
  window &&
  window.dataLayer &&
  window.dataLayer.push({
    event: 'content_share',
    content_type: 'Social Share',
    list_type,
    content_title,
    content_id,
    social_method,
    social_link,
  });

export const pushShowMoreButtonClick = ({
  list_type = 'none',
  list_variant,
  content_title = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event: 'navigation',
      content_type: 'View More',
      list_type,
      ...(list_variant && { list_variant }),
      content_title,
    });
};

export const pushShowMoreLinkClick = ({
  list_type = 'none',
  list_variant,
  content_title = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event: 'navigation',
      content_type: 'View All',
      list_type,
      ...(list_variant && { list_variant }),
      content_title,
    });
};

/**
 * Data Layer Push For Navigation Event
 * @param params additionalParams { list_type : '', list_variant:'', ... }
 */
export const pushNavigation = (
  params = {
    list_type: 'none',
    list_variant: 'none',
    content_type: 'none',
    content_title: 'none',
    content_id: 'none',
  },
) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event: 'navigation',
      ...params,
    });
};

export const pushVideoEvent = ({
  event = 'livePlayerEvent',
  list_type = 'Live TV Breaker Widget',
  player_action = 'Play', // Play|Stop|Complete
  content_id = 'none', // 'video id',
  content_title = 'none', // 'video title',
  content_duration = 0, // 'duration when the video started should be 0 when the video first started',
  content_type = 'none',
  playReason = 'none', // auto play ( if video auto play when user lands on the page) / interaction (if user click on play control) / interaction on docking (if user click play on docking)',
  content_category = 'none', // 'Content Category or Category/Subcategory. Set to (none) if not applicable',
  content_author = 'none', // 'Content Author Name. Set to (none) if not applicable',
  content_sp = 'none', // 'Content Sponsor Name. Set to (none) if not applicable',
  content_section = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      event,
      list_type,
      player_action,
      content_id,
      content_title,
      content_duration,
      content_type,
      playReason,
      content_category,
      content_author,
      content_sp,
      content_section,
    });
};

/**
 * Push GA Article Detail Paeg
 * @param title Page Title
 * @param articleId Article ID
 * @param articleCategory Article Category
 * @param date Article Publish Date YYYY-MM-DD
 * @param articleLength Article length
 * @param tags Article Tags
 * @param author Article Authoe
 * @param sponser
 * @param language my,en,ta,zh
 */
export const pushGAArticleDetailEvent = ({
  title,
  articleId,
  category,
  date,
  articleLength,
  tags = [],
  metaTags = undefined,
  author = settings.config.DEFAULT_AUTHOR,
  sponser = 'none',
  language,
}) => {
  let languageValue = settings.config.ANALYTICS_SITE_LANGUAGE;
  /* istanbul ignore else */
  if (language) {
    if (language === 'ms') {
      languageValue = 'Malay';
    } else if (language === 'en') {
      languageValue = 'English';
    } else if (language === 'ta') {
      languageValue = 'Tamil';
    } /* istanbul ignore next */ else if (language === 'zh') {
      languageValue = 'Chinese';
    }
  }
  /* istanbul ignore else */
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page_site: settings.config.ANALYTICS_SITE_NAME,
      page_language: languageValue,
      page_type: 'Article Details Page',
      page_content_type: 'Article',
      page_content_title: title,
      page_content_id: articleId,
      page_content_category: category ? category.tag : 'none',
      page_content_author: author,
      page_content_sp: sponser,
      page_content_topics: tags.join(','),
      page_content_genre: 'none',
      page_content_date: date, // 'YYYY-MM-DD',
      page_content_length: articleLength,
      tags: metaTags,
    });
  }
};

export const pushGAContentRead = ({
  title,
  articleId,
  category,
  authorsText,
  listVariant,
  listType = 'Article Details',
}) => {
  /* istanbul ignore else */
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: 'content_read',
      list_type: listType,
      content_type: 'Article',
      content_title: title,
      content_id: articleId,
      content_category: category,
      content_author: authorsText,
      'list-variant': listVariant,
      content_sp: 'none',
    });
  }
};

export const pushGAPhotoView = (
  list_type = 'Photo Gallery Details',
  list_position = 0,
  content_type = 'Photo',
  content_title,
  content_id,
  content_category,
  content_author = 'none',
  content_sp = 'none',
) => {
  /* istanbul ignore else */
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: 'photo_view',
      list_type,
      list_position,
      content_type,
      content_title,
      content_id,
      content_category,
      content_author,
      content_sp,
    });
  }
};

export const pushGALoadMore = ({
  event = 'navigation',
  list_type = 'Content Listing',
  list_variant = 'none',
  content_type = 'View More',
  content_title = 'none',
}) => {
  /* istanbul ignore else */
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event,
      list_type,
      list_variant,
      content_type,
      content_title,
    });
  }
};

export const pushWebVitals = ({ name, delta, id }) => {
  /* istanbul ignore else */
  if (window && window.dataLayer) {
    window.dataLayer.push({
      event: 'web-vitals',
      event_category: 'Web Vitals',
      event_action: name,
      // Google Analytics metrics must be integers, so the value is rounded.
      // For CLS the value is first multiplied by 1000 for greater precision
      // (note: increase the multiplier for greater precision if needed).
      event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      // The `id` value will be unique to the current page load. When sending
      // multiple values from the same page (e.g. for CLS), Google Analytics can
      // compute a total by grouping on this ID (note: requires `eventLabel` to
      // be a dimension in your report).
      event_label: id,
    });
  }
};

export const pushDmGAEvent = ({
  player_type = 'Dailymotion',
  event = 'playerEvent',
  application_id = 'awani',
  player_action = 'Play',
  player_timer = 0,
  content_type = 'Video',
  content_title = 'none',
  content_id = 'none',
  content_category = 'none',
  content_author = 'none',
  content_sp = 'NA',
  content_topics = 'NA',
  content_genre = 'NA',
  content_date = 'none',
  content_duration = 0,
  content_caption = 'none',
  content_quality = 'none',
  content_fullscreen = 'none',
  content_volume = 'none',
  content_speed = 'none',
  content_cast = 'none',
}) => {
  window &&
    window.dataLayer &&
    window.dataLayer.push({
      player_type,
      event,
      application_id,
      player_action,
      player_timer,
      content_type,
      content_title,
      content_id,
      content_category,
      content_author,
      content_sp,
      content_topics,
      content_genre,
      content_date,
      content_duration,
      content_caption,
      content_quality,
      content_fullscreen,
      content_volume,
      content_speed,
      content_cast,
    });
};

export const pushGAHomePage = (customGAEventParams) => {
  const homeGAEventparams = {
    event: 'pageview',
    page_site: settings.config.ANALYTICS_SITE_NAME,
    page_language: settings.config.ANALYTICS_SITE_LANGUAGE,
    page_type: 'Home Page',
    page_content_type: 'Home',
  };

  const combineGAEventParams = deepMergeObject(
    homeGAEventparams,
    customGAEventParams,
  );

  return (
    window &&
    window.dataLayer &&
    window.dataLayer.push({ ...combineGAEventParams })
  );
};

export default pushGAPageview;
