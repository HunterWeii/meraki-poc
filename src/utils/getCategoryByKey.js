import { settings } from '@/variants';
import memoize from '@/utils/getMemoizeFunction';

/* Utilities */
import generateSlugFromTitle from '@/utils/generateSlugFromTitle';
import isEmpty from '@/utils/isEmpty';

const { config } = settings;

/*
  Function to get the category object from value and key comparator
 */
const getCategoryByKey = memoize(function getCategoryByKey(
  value = '',
  key,
  language = '',
  returnDefaultCategory = true,
  defaultCategoryId,
  type = 'ARTICLE',
  currentConfig = config,
) {
  try {
    const searchValue = `${value}`.toLowerCase().replace('/', '');

    // Use specific language category or else use default category
    let categories;
    if (language === 'en' && currentConfig.ENGLISH_CATEGORIES) {
      categories = currentConfig.ENGLISH_CATEGORIES;
    } else if (language === 'bm' && currentConfig.MALAY_CATEGORIES) {
      categories = currentConfig.MALAY_CATEGORIES;
    } else {
      categories = currentConfig.CATEGORIES;
    }

    let map = categories.find((category) => {
      let keys = category[key || 'tag'];

      // keys can be an array or string.
      // Example:- ['politics','current affair'] or 'politics'

      if (keys && Array.isArray(keys)) {
        return keys
          .map((i) => `${i}`) // Convert to string
          .map(
            (i) =>
              (i.toLowerCase && i.toLowerCase()) ||
              /* istanbul ignore next line */
              i,
          )
          .includes(searchValue);
      }

      // Convert to string
      keys = `${keys}`;
      return keys && keys.toLowerCase && keys.toLowerCase() === searchValue;
    });

    // Returning fallback category
    if (returnDefaultCategory && (!map || Object.keys(map).length === 0)) {
      map = getDefaultCategoryFallback(defaultCategoryId, categories, type);
    }
    return map;
  } catch {
    // Returning fallback category
    return getDefaultCategoryFallback(
      defaultCategoryId,
      currentConfig.CATEGORIES,
      type,
    );
  }
});

export default getCategoryByKey;

/*
  Function to return default category fallback
  Remember to define DEFAULT_ARTICLE_CATEGORY and DEFAULT_VIDEO_CATEGORY in variants -> settings -> category, and export it into config
*/
function getDefaultCategoryFallback(defaultCategoryId, categories, type) {
  if (defaultCategoryId) {
    return categories.find((category) => category.id === defaultCategoryId);
  }

  if (type === 'ARTICLE') {
    return config.DEFAULT_ARTICLE_CATEGORY;
  }

  return config.DEFAULT_VIDEO_CATEGORY;
}

/*
  Function to generate the item url from category object
 */
export function generateURLFromCategory({ category, title, id, type }) {
  try {
    const titleSlug = generateSlugFromTitle(title);

    if (type === 'VIDEO') return `/${category.video_url}/${titleSlug}-${id}`;
    if (type === 'ALBUM') return `/${category.photo_url}/${titleSlug}-${id}`;
    return `/${category.url}/${titleSlug}-${id}`;
  } catch {
    return '#';
  }
}

export function extractCategoryFromTags(tags) {
  try {
    const sfvTags = tags.find((tag) => tag.ns === 'Category');
    if (sfvTags) return sfvTags.value.toLowerCase();
    return tags
      .find((keyname) => keyname.includes('Category'))
      .replace('Category:category=', '')
      .toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Get category from url
 */
export function getCategoryFromURL() {
  const currentPath = window.location.pathname;
  const regex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9_@./#&+-]+$');
  let isDetailsPage = false;
  const splitCategoryPath = currentPath.split('/');
  const categoryPathLength = splitCategoryPath.length;
  if (categoryPathLength > 1) {
    isDetailsPage = regex.test(splitCategoryPath[categoryPathLength - 1]);
  }
  const categoryPath = isDetailsPage ? currentPath.split('/')[1] : currentPath;

  const articleCategory = getCategoryByKey(categoryPath, 'url', null, false);
  const videoCatogery = getCategoryByKey(
    categoryPath,
    'video_url',
    null,
    false,
  );
  const videoDiscoveryCatogery = getCategoryByKey(
    categoryPath,
    'video_discovery_url',
    null,
    false,
  );
  const topicCategory = getCategoryByKey(
    categoryPath,
    'topic_url',
    null,
    false,
  );
  const resultFixtureCategory = getCategoryByKey(
    categoryPath,
    'result_and_fixtures_url',
    null,
    false,
  );

  const widgetCategory = getCategoryByKey(
    categoryPath,
    'widgets_url',
    null,
    false,
  );

  return {
    category:
      topicCategory ||
      videoCatogery ||
      videoDiscoveryCatogery ||
      articleCategory ||
      resultFixtureCategory ||
      widgetCategory,
    categoryPath,
    isArticleDetailsPage:
      !isEmpty(articleCategory) &&
      currentPath.split('/').length > 2 &&
      articleCategory.pageListingType !== 'video',
    isVideoDetailsPage:
      !isEmpty(videoCatogery) && currentPath.split('/').length > 2,
  };
}
