import { atom, selector } from 'recoil';

export const configState = atom({
  key: 'configState',
  default: [{}],
});

export const pagesState = selector({
  key: 'pagesState',
  get: ({ get }) => {
    const config = get(configState);
    return config.filter((i) => i.key === 'pages');
  },
});
