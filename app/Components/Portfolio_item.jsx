'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Portfilio_photo from './Portfilio_photo';

const Portfolio_item = ({ img, text,type }) => {
  const router = useRouter();

  const handleClick = () => {

    router.push(`/${type}/${text}`);
  };

  return (
    <div
      className="Portfolio_item cursor-pointer transition hover:scale-105"
      onClick={handleClick}
    >
      <Portfilio_photo img={img} />
      <h2 className="mt-2 text-center font-semibold">{text}</h2>
    </div>
  );
};

export default Portfolio_item;

