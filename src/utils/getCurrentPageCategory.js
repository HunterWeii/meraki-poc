import { settings } from '@/variants';
import getCategoryByKey from './getCategoryByKey';

const { config } = settings;
const { CATEGORIES, VIDEO_FEATURED, VIDEO_TERKINI } = config;

const hasSubpath = (path) => /rojakdaily/.test(path);

export default function getCurrentPageCategory(path) {
  let currentPageCategory = null;
  try {
    /* eslint-disable no-restricted-globals */

    // Get the video category from the first index of pathname
    // If the category slug has subpath then include it
    const currentCategorySlug = hasSubpath(path)
      ? path.split('/').slice(1, 3).join('/')
      : path.split('/')[1];

    const categoryIndex = CATEGORIES.findIndex(
      (category) =>
        category.video_url === currentCategorySlug ||
        category.url === currentCategorySlug ||
        category.photo_url === currentCategorySlug,
    );
    if (categoryIndex > -1) {
      currentPageCategory = CATEGORIES[categoryIndex];
    }
    return currentPageCategory;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return currentPageCategory;
}

/**
 * Gets the Category details based on either the categoryTag(more accurate) or path(less accurate method)
 * @param {Object} category - category name or path
 * @param {Object} category.path - category from URL location's path
 * @param {Object} category.categoryTag - category tag
 */
export function getRightRailsVideoCategory({ path = '', categoryTag = '' }) {
  let rightRailsVideoCategory = null;

  try {
    // Fetch category details based on categorie's 'tag'
    if (categoryTag) {
      rightRailsVideoCategory = getCategoryByKey(categoryTag, 'tag');
      // return rightRailsVideoCategory;
    } else if (path) {
      // Fetch category details based on URL path
      const currentPageCategory = getCurrentPageCategory(path);

      if (
        currentPageCategory &&
        currentPageCategory.video_id === VIDEO_FEATURED.id
      ) {
        const categoryToFetchIndex = CATEGORIES.findIndex(
          (category) => category.video_id === VIDEO_TERKINI.id,
        );
        // if (categoryToFetchIndex > -1) {
        rightRailsVideoCategory = CATEGORIES[categoryToFetchIndex];
        // }
      } else {
        const categoryToFetchIndex = CATEGORIES.findIndex(
          (category) => category.video_id === VIDEO_FEATURED.id,
        );
        // if (categoryToFetchIndex > -1) {
        rightRailsVideoCategory = CATEGORIES[categoryToFetchIndex];
        // }
      }
      // return rightRailsVideoCategory;
    } else {
      // Error
      throw new Error('no category parameters passed');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    // return false;
  }

  return rightRailsVideoCategory;
}
