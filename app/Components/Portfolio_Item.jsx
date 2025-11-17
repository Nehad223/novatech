'use client';

import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation';

const Portfolio_Item = ({ 
  id, 
  image, 
  title, 
  technologies, 
  images, 
  longDiscription, 
  shortDiscription, 
  githubUrl, 
  experienceUrl 
}) => {

  const { type } = useParams(); 

  const handleClick = () => {
    const data = {
      id,
      image,
      title,
      technologies,
      images,
      longDiscription,
      shortDiscription,
      githubUrl,
      experienceUrl
    };
    sessionStorage.setItem('selectedPortfolio', JSON.stringify(data));
  };

  return (
    <Link 
      href={`${type}/${id}`} 
      className="portfolio-item block"
      onClick={handleClick}
    >
      <div className="portfolio-image-container">
        <img src={image} alt={title} className="portfolio-image" />
      </div>
      <h3 className="portfolio-title">{title}</h3>
      <p className="portfolio-tech">{technologies.join(', ')}</p>
    </Link>
  )
}

export default Portfolio_Item
