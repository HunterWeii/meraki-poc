const capitalizeAll = s => {
  if (typeof s !== 'string') return '';

  return s
    .toLowerCase()
    .split(' ')
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
};

export default capitalizeAll;
