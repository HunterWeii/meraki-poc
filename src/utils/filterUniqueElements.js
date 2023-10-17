export const filterUniqueElements = (array, ...keys) => {
  const idMap = {};
  const retArr = [];
  array.forEach(element => {
    const objKey = `${keys.map(key => element[key])}`;
    if (!idMap[objKey]) {
      retArr.push(element);
    }
    idMap[objKey] = true;
  });
  return retArr;
};
