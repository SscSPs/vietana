import React from 'react';
import './About.css';

const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=800&q=80', t: 'Indian family in Hoi An' },
  { img: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80', t: 'Exploring Ha Long Bay' },
  { img: 'https://images.unsplash.com/photo-1504457047772-27faf1c005b7?w=800&q=80', t: 'Sunrise in Mu Cang Chai' },
  { img: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80', t: 'Coffee culture in HCMC' },
  { img: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80', t: 'Rice fields of Sapa' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="sh r">
        <span className="lbl">The VIETANA Story</span>
        <h2>Created for Indian Travelers<br />by Locals who Care</h2>
      </div>

      <div className="about-gallery r">
        <div className="ag-track">
          {[...GALLERY, ...GALLERY].map((item, i) => (
            <div key={i} className="ag-item">
              <div className="ag-img" style={{ backgroundImage: `url(${item.img})` }}></div>
              <div className="ag-overlay">
                <span>{item.t}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-content r">
        <div className="ac-grid">
          <div className="ac-card">
            <h3>Our Mission</h3>
            <p>To make Vietnam the most accessible and loved destination for Indian travelers, bridge cultures, and create lifelong memories.</p>
          </div>
          <div className="ac-card">
            <h3>Local Expertise</h3>
            <p>Based in Ho Chi Minh City, our team understands both Indian preferences and Vietnamese culture perfectly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
