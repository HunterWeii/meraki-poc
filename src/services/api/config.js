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

function transformConfig(appConfig) {
  const newConfig = {};
  
  appConfig.forEach(config => {
    const {key, value} = config;
    newConfig[key] = value;
  });

  return newConfig
} 

export const getConfigQueryFn = async () => {
  const config = await getConfig('https://digital-fortress-dev.eco.astro.com.my/dev/config/XdovZqB9Rg/config.json');

  // we can transform our data in server side instead of client side
  return transformConfig(config); 
};