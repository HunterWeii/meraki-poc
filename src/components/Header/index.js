'use client';
import './index.scss';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import useStore from '@/services/store/zustand';

const Header = () => {
  const config = useStore((state) => state?.config);
  console.log('@config', config);
  const headerConfig = config?.filter((i) => i.key === 'header').pop().value
    .navigation.items;

  return (
    <div className="header">
      {headerConfig?.map((i) => (
        <Link key={i.title} href={i.link}>
          <span>{i.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Header;
