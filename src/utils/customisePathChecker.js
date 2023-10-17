/**
 *
 *  Utility methods for path matcher
 */

/* Utilities */
function customisePathChecker(customizeConfig, path) {
  const pathName = path && path.toLowerCase();

  const customConfigs = [];

  /* istanbul ignore else */
  if (customizeConfig && Array.isArray(customizeConfig)) {
    customizeConfig.forEach(item => {
      item.links.forEach(link => {
        const splitedLinkPaths = link && link.split('/');
        // if * is not present then exact match the url
        /* istanbul ignore else */
        if (splitedLinkPaths.includes('*')) {
          splitedLinkPaths.pop();
          /* istanbul ignore else */
          if (pathName.indexOf(splitedLinkPaths.join('/')) !== -1) {
            customConfigs.push(item.customizations);
          }
        } else if (pathName === `/${link}`) {
          // link should be exact match
          customConfigs.push(item.customizations);
        }
      });
    });
  }
  return customConfigs;
}

export default customisePathChecker;
