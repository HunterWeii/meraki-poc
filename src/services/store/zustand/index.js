import { create } from 'zustand';

const mockPath =
  'https://digital-fortress-dev.eco.astro.com.my/dev/config/XdovZqB9Rg/config.json';

const useStore = create((set) => ({
  path: mockPath,
  config: null,
  fetchConfig: async (path) => {
    const response = await fetch(path);
    set({ config: await response.json() });
  },
  setConfig: (config) => {
    set({ config });
  },
}));

export default useStore;
