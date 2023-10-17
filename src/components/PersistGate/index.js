'use client';

import useStore from '@/services/store/zustand';
import { useEffect } from 'react';

const PersistGate = ({ config: propConfig }) => {
  const setConfig = useStore((state) => state?.setConfig);

  useEffect(() => {
    setConfig(propConfig);
  }, [setConfig]);

  return <></>;
};

export default PersistGate;
