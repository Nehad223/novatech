import React from 'react'
import Navbar from '../Components/Navbar.jsx';
import Portfilio_Items from '../Components/Portfilio_Items.jsx'
import './Portfolio.css';
const Portfolio = () => {
  return (
    <div>
      <Navbar/>
      <div className='container Portfilio'>
          <h1>Our Portfolio</h1>
      </div>
      <Portfilio_Items type="portfolio"/>
      <div className='space'></div>
    
    
      
    </div>
  )
}

export default Portfolio

