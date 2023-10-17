'use client';

import { useQuery } from '@tanstack/react-query';
import { getConfigQueryFn } from '@/services/api/config';
import './index.scss';

const selectFooterConfig = appConfig => {
  return appConfig.footer;
};

const Footer = () => {
  const { data: appConfig } = useQuery({
    queryKey: ['app_config'],
    queryFn: getConfigQueryFn,
  });

  console.log('@footer app config:', appConfig);

  if (appConfig === undefined) return 'loading...';

  const footerConfig = selectFooterConfig(appConfig);

  const {
    backgroundColor,
    color,
  } = footerConfig.styles;

  const footerStyle = {
    backgroundColor,
    color,
  };

  return (
    <footer className='footer' style={footerStyle}>

    </footer>
  );
};

export default Footer;
