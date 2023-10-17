'use client';

import './index.scss';

const Footer = ({ data }) => {
  return (
    <div className="footer">
      {data.map((i) => (
        <span key={i.link}>{i.title}</span>
      ))}
    </div>
  );
};

export default Footer;
