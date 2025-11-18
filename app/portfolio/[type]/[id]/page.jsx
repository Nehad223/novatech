'use client';

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '../../../Components/Navbar';
import './Item.css';
import Carusel from '../../../Components/Carusel';
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const { id } = useParams(); 
  const [item, setItem] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('selectedPortfolio');
    if (stored) {
      setItem(JSON.parse(stored));
    }
  }, []);

  if (!item) {
    return (
      <div className="container" style={{ padding: '40px', textAlign: 'center' }}>
        <Navbar />
        <h2>⚠️ لا توجد بيانات، الرجاء العودة واختيار مشروع من جديد.</h2>
      </div>
    );
  }
  

  return (
    <div>
      <Navbar/>
      <div className='Inner_Item container'>
        <div className='Inner1'>
          <div className='part1'>
            <h1>{item.title}</h1>
            <p>{item.shortDiscription}</p>
            {item.experienceUrl && (
              <button onClick={() => window.open(item.experienceUrl, '_blank')}>Live Demo</button>
            )}
          </div>
          <div>
            <h3>Project Details</h3>
            <p>{item.longDiscription}</p>
          </div>
        </div>

        <div className='Inner2'>
          <Carusel images={item.images}/>
          <h1 className='mt-4'>Tech Stack</h1>
          <div className='Tech_Stack mb-4'>
            {item.technologies?.map((tech, index) => (
              <button key={index}>{tech}</button>
            ))}
          </div>
          <div className='buttons'>
            {item.githubUrl && (
              <button 
                className='Github_Btn mb-2'
                onClick={() => window.open(item.githubUrl, '_blank')}
              >
                <span>
                  <img className='img_Btn' src="/github_Btn.avif" alt="GitHub"/>
                </span>
                <span>View Code On GitHub</span>
              </button>
            )}
            <button className='Contact_Btn' onClick={() => router.push('/start')} >Contact Us About this Project</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
