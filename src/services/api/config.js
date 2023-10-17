export const getConfig = async (path, key) => {
  try {
    const response = await fetch(path);
    const config = await response.json();
    if (key) {
      return config.response.config.filter((i) => i.key === key).pop().value
        .navigation.items;
    }
    return config.response.config;
  } catch (err) {}
};
