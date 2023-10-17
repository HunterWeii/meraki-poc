'use client';

import { RecoilRoot } from 'recoil';

const RecoilRootWrapper = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
