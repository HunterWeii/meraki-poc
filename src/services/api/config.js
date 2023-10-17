export const getConfig = async (path, key) => {
  try {
    const response = await fetch(path);
    const config = await response.json();
    console.log('@header', config.response.config);
    // console.log('@footer')
    return config.response.config;
  } catch (err) {}
};
