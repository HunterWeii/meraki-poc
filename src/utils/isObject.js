const isObject = obj => {
  const type = typeof obj;
  return (
    obj !== null &&
    type === 'object' &&
    obj.constructor.toString().indexOf('Array') === -1
  );
};

export default isObject;
