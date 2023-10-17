/* eslint-disable guard-for-in, no-restricted-syntax */

const cloneDeep = inObject => {
  let value;
  let key;

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject = Array.isArray(inObject) ? [] : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = cloneDeep(value);
  }

  return outObject;
};

export default cloneDeep;
