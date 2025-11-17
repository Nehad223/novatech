import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import './Contact.css';
import Contact_Body from '../Components/Contact_Body.jsx';
const Contact = () => {
  return (
    <div>
<Navbar/>
   <div className='contact container'>
    <h1>Get in Tech</h1>
    <p>تواصل معنا الآن</p>
   </div>
   <Contact_Body/>
   <div className='space'></div>
    </div>
  )
}

export default Contact
