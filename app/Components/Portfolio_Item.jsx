'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  const [loaded, setLoaded] = useState(false);

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
        {/* shimmer overlay */}
        {!loaded && <div className="shimmer"></div>}

        <img 
          src={image} 
          alt={title} 
          className={`portfolio-image ${loaded ? 'loaded' : ''}`}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <h3 className="portfolio-title">{title}</h3>
      <p className="portfolio-tech">{technologies.join(', ')}</p>
    </Link>
  )
}

export default Portfolio_Item;
