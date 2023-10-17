'use client';

import './index.scss';
import { useQuery } from '@tanstack/react-query';
import { getConfigQueryFn } from '@/services/api/config';

const selectHeaderConfig = appConfig => {
  return appConfig.header;
};

const Header = () => {
  const { data: appConfig } = useQuery({
    queryKey: ['app_config'],
    queryFn: getConfigQueryFn,
  });

  console.log('@header app config:', appConfig);

  if (appConfig === undefined) return 'loading...';

  const headerConfig = selectHeaderConfig(appConfig);

  const {
    backgroundColor,
    color,
  } = headerConfig.styles;

  const headerStyle = {
    backgroundColor,
    color,
  };

  return (
    <header className='header' style={headerStyle}>
      
    </header>
  )
};

export default Header;
