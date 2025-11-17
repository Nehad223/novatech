'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar';
import './Port.css';
import Portfolio_Item from '../../Components/Portfolio_Item';

export default function PortfolioTypePage() {
  const { type } = useParams();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const getApiType = (type) => {
    switch (type?.toLowerCase()) {
      case 'application':
      case 'applications':
        return 'application';
      case 'websites':
      case 'website':
        return 'website';
      case 'telegram%20bot':
      case 'telegrambot':
        return 'telegrambot';
      case 'ai%20models':
      case 'aimodel':
        return 'aimodel';
      default:
        return 'website'; 
    }
  };

  const apiType = getApiType(type);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://novatech66.pythonanywhere.com/projects/projects/${apiType}/`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب البيانات:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [apiType]);

  const renderContent = () => {
    switch (apiType) {
      case 'application':
        return 'Applications';
      case 'website':
        return 'Websites';
      case 'telegrambot':
        return 'Telegram Bots';
      case 'aimodel':
        return 'AI Models';
      default:
        return '';
    }
  };


  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className='container Port_Body'>
        <span>Portfolio - {renderContent()}</span>
        <p>Explore NovaTech's projects in {renderContent()}</p>

        <div className="Search_Box">
          <img src="/search.png" alt="search icon" />
          <input
            placeholder="ابحث عن مشروع"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='Portfolio_Items container'>
          {loading ? (
            <p>جاري تحميل المشاريع...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((proj) => (
              <Portfolio_Item
                key={proj.id}
                id={proj.id}
                image={proj.photosUrls[0] || '/Logo.avif'}
                images={proj.photosUrls}
                githubUrl={proj.githubUrl}
                experienceUrl={proj.experienceUrl}
                shortDiscription={proj.shortDiscription}
                longDiscription={proj.longDiscription}
                title={proj.name}
                technologies={proj.tags}
              />
            ))
          ) : (
            <p>لا يوجد مشاريع مطابقة.</p>
          )}
        </div>
      </div>
    </div>
  );
}
