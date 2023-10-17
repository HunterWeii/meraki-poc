'use client';

import { getConfig } from '@/services/api/config';
import './index.scss';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const Header = ({ data }) => {
  const query = useQuery({
    queryKey: ['config'],
    queryFn: () =>
      getConfig(
        'https://digital-fortress-dev.eco.astro.com.my/dev/config/XdovZqB9Rg/config.json',
      ),
    initialData: data,
  });

  console.log('@query data', query.data);

  return (
    <div className="header">
      {query.data.map((i) => (
        <Link key={i.title} href={i.link}>
          <span>{i.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Header;
