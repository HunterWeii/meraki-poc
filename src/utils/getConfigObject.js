/**
 *
 *  Utility methods to get specific config object by config key
 */
/* eslint-disable prefer-destructuring */
import checkNestedObject from '@/utils/checkNestedObject';

function getConfigObject(config, key) {
  let desiredConfig = null;

  // NOTE: selectedKey is a key will be use to modify the value later on (immutable)
  let selectedKey = '';

  if (!key || !config) {
    return null;
  }

  const isArrayConfig = Array.isArray(config);

  if (!isArrayConfig) {
    return null;
  }

  const keyArray = key.split('.').filter(Boolean);

  if (keyArray && keyArray.length) {
    const [parentKey, ...restKeys] = keyArray;

    const parentConfig = config.find((i) => i.key === parentKey);

    if (parentConfig) {
      const configValue = parentConfig.value;

      if (restKeys && restKeys.length) {
        if (restKeys.length > 1) {
          // NOTE: selecting last key
          selectedKey = restKeys.slice(-1)[0];
          restKeys.pop();

          desiredConfig = checkNestedObject(
            configValue,
            restKeys.join('.'),
            null,
          );
        } else {
          selectedKey = restKeys[0];
          desiredConfig = configValue;
        }
      } else {
        selectedKey = 'value';
        desiredConfig = parentConfig;
      }
    }
  }

  return {
    desiredConfig,
    selectedKey,
  };
}

export default getConfigObject;
