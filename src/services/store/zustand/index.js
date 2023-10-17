import { create } from 'zustand';

const mockPath =
  'https://digital-fortress-dev.eco.astro.com.my/dev/config/XdovZqB9Rg/config.json';

const useStore = create((set) => ({
  mockPath: mockPath,
  config: {},
  fetchConfig: async (mockPath) => {
    console.log('@test');
    const response = await fetch(mockPath);
    set({ config: await response.json() });
  },
}));

export default useStore;
