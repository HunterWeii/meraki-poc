'use client';
import { useQuery } from '@tanstack/react-query';
import './index.scss';
import useStore from '@/services/store/zustand';

const Footer = () => {
  const config = useStore((state) => state.config);
  const footerConfig = config?.filter((i) => i.key === 'footer').pop().value
    .navigation.items;

  return (
    <div className="footer">
      {footerConfig?.map((i) => (
        <span key={i.link}>{i.title}</span>
      ))}
    </div>
  );
};

export default Footer;
