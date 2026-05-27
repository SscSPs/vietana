import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AIPlanner from './components/AIPlanner';

const WHATSAPP_DEFAULT = "https://wa.me/919953294543?text=Hi%20VIETANA%2C%20I%27d%20like%20to%20plan%20my%20Vietnam%20trip!";

export default function App() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [vnTime, setVnTime] = useState('--:--');
  const [vnDate, setVnDate] = useState('---');
  const [inTime, setInTime] = useState('--:--');
  const [inDate, setInDate] = useState('---');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const btt = document.getElementById('btt');
      if (btt) {
        if (window.scrollY > 700) btt.classList.add('show');
        else btt.classList.remove('show');
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      const now = new Date();
      const fmt = (tz: string) => {
        const d = new Date(now.toLocaleString('en-US', { timeZone: tz }));
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return {
          time: `${h}:${m}`,
          date: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`
        };
      };
      const vn = fmt('Asia/Ho_Chi_Minh');
      const ind = fmt('Asia/Kolkata');
      setVnTime(vn.time); setVnDate(vn.date);
      setInTime(ind.time); setInDate(ind.date);
    }, 1000);

    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearInterval(slideTimer);
    };
  }, []);

  return (
    <div className="app-container">
      <div id="pg" style={{ width: scrolled ? '100%' : '0%' }}></div>
      <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* FLOATING AI ORB */}
      <div id="ai-orb" onClick={() => setIsPlannerOpen(true)}>
        <div className="orb-label">AI PLANNER</div>
        <div className="orb-core"></div>
        <div className="orb-glow"></div>
        <div className="orb-sparkle">✨</div>
      </div>

      {/* NAV */}
      <nav id="nav" className={scrolled ? 'glassy' : ''}>
        <a href="#" className="nl" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img src="/vietana_logo.png" style={{ height: '45px' }} alt="Vietana Logo" />
          VIETANA
        </a>
        <ul className="nlinks">
          <li><a href="#services">Services</a></li>
          <li><a href="#packages">Packages</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); setIsPlannerOpen(true); }}>AI Planner</a></li>
          <li><a href="#food">Food</a></li>
          <li><a href="#hidden">Experiences</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>About</a></li>
          <li><a href="#" onClick={(e) => e.preventDefault()}>Contact</a></li>
          <li><a href={WHATSAPP_DEFAULT} className="ncta" target="_blank">Plan My Trip</a></li>
        </ul>
        <div className="nav-right">
          <div className={`hbg ${mobileMenuOpen ? 'o' : ''}`} id="ham" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mob" className={mobileMenuOpen ? 'o' : ''}>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
        <a href="#" onClick={() => { setMobileMenuOpen(false); setIsPlannerOpen(true); }}>AI Planner</a>
        <a href="#food" onClick={() => setMobileMenuOpen(false)}>Food</a>
        <a href="#hidden" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
        <div className="mdv"></div>
        <a href="https://wa.me/919953294543" style={{ color: 'var(--gold)' }} target="_blank">💬 +91 9953294543</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-slides">
          {[
            'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1920&q=90',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=90',
            'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1920&q=90'
          ].map((url, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${currentSlide === idx ? 'active' : ''}`} 
              style={{ backgroundImage: `url('${url}')` }}
            ></div>
          ))}
        </div>
        <div className="hv1"></div>
        <div className="hv2"></div>
        <div className="h-particles lanterns"></div>
        <div className="hcontent">
          <div className="hey">
            <div className="hd"></div>
            <span>India–Vietnam Travel Experts · Ho Chi Minh City</span>
          </div>
          <h1 className="hh1">
            Feel <em style={{ color: 'var(--blue)' }}>Vietnam</em>,
            <span className="b" style={{ color: 'var(--gold3)' }}>Your Way 🇻🇳</span>
          </h1>
          <p className="hero-tagline">Travel Gets Better with VIETANA</p>
          <p className="hsub">Vietnam made easy for Indian travelers — from visas and hotels to hidden places, food experiences and local support.</p>
          <div className="hbtns">
            <a href={WHATSAPP_DEFAULT} className="bwa" target="_blank">💬 Plan My Trip — India</a>
            <a href="#" className="bgh" onClick={(e) => e.preventDefault()}>✦ Discover Vietnam</a>
          </div>
        </div>
        <div className="hero-dots">
          {[0, 1, 2].map(i => (
            <div key={i} className={`hero-dot ${currentSlide === i ? 'active' : ''}`} onClick={() => setCurrentSlide(i)}></div>
          ))}
        </div>
        <div className="hbot">
          <div className="hscroll"><div className="hsl"></div><span>Scroll to explore</span></div>
          <div className="live-clocks">
            <div className="lc-card">
              <span className="lc-flag">🇻🇳</span>
              <span className="lc-city">Ho Chi Minh City</span>
              <span className="lc-time">{vnTime}</span>
              <span className="lc-date">{vnDate}</span>
            </div>
            <div className="lc-card">
              <span className="lc-flag">🇮🇳</span>
              <span className="lc-city">New Delhi</span>
              <span className="lc-time">{inTime}</span>
              <span className="lc-date">{inDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="sg-ghost">WE HANDLE IT</div>
        <div className="sh r in">
          <span className="lbl">We Handle Everything</span>
          <h2>From Visa to Your<br />Last Dinner</h2>
        </div>
        <div className="srvg">
          {[
            { ico: '📋', t: 'Visa Assistance', d: 'Fast Vietnam e-visa processing. Step-by-step guidance.' },
            { ico: '🗺️', t: 'Custom Planning', d: 'Your itinerary, your pace. Fully personalized.' },
            { ico: '🚗', t: 'Airport Pickup', d: 'Comfortable AC vehicle ready when you land.' },
            { ico: '🏨', t: 'Hotel Booking', d: 'Budget gems to luxury stays vetted for Indians.' },
            { ico: '📶', t: 'SIM & Essentials', d: 'eSIM, local SIM, Grab setup, and maps help.' },
            { ico: '🎫', t: 'Tickets & Guides', d: 'Book Ba Na Hills, Ha Long Cruise before landing.' },
            { ico: '🍛', t: 'Food Support', d: 'Indian & Vietnamese dining recommendations.' },
            { ico: '✨', t: 'Tailored Experiences', d: 'Honeymoon, nightlife, and hidden gems.' },
            { ico: '🛡️', t: 'Local Support', d: 'Hindi & English support available anytime.' }
          ].map((s, i) => (
            <div key={i} className="sc r in">
              <div className="sc-ico">{s.ico}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divl"></div>

      {/* PACKAGES */}
      <section id="packages">
        <div className="sh r in">
          <span className="lbl">Our Packages</span>
          <h2>Inspiration, Not Fixed Products</h2>
          <p>Every package is a starting point. We customize everything around your travel style.</p>
        </div>
        <div className="pkg-g">
          {[
            { t: 'Best Heritage Sites', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/World%20heritage%20sites%20Vietnam%20travel_0.jpg', b: 'Culture & History', d: 'Explore UNESCO attractions.' },
            { t: 'Adventure Trails', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Adventure%20itinerary%20Vietnam.jpg', b: 'Thrills', d: 'Exciting outdoor experiences.' },
            { t: 'Couples’ Retreat', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Romantic%20getaway%20Vietnam.jpg', b: 'Romantic', d: 'Timeless romantic getaways.' },
            { t: 'Coast and Islands', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Vietnam%20beach%20holiday.jpg', b: 'Beaches', d: 'Soak up the sun.' },
            { t: 'Family Vacation', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Family%20holiday%20in%20Vietnam.jpg', b: 'All Ages', d: 'Nature and culture for all ages.' },
            { t: 'Green Getaway', img: 'https://image.vietnam.travel/sites/default/files/styles/large/public/2021-04/Green%20travel%20ideas%20Vietnam.jpg', b: 'Eco-Tourism', d: 'Pristine, sustainable travel.' }
          ].map((p, i) => (
            <div key={i} className="pc r in">
              <div className="pc-img" style={{ backgroundImage: `url('${p.img}')` }}></div>
              <div className="pc-fog"></div>
              <div className="pc-flare"></div>
              <div className="pc-body">
                <span className="pc-badge">{p.b}</span>
                <h3>{p.t}</h3>
                <p className="pc-price" style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>{p.d}</p>
                <button className="pc-cta">Customize Trip <span className="pca-arr">→</span></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI PLANNER MODAL */}
      <AnimatePresence>
        {isPlannerOpen && (
          <AIPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
        )}
      </AnimatePresence>

      <footer id="contact">
        <div className="fi">
          <div className="fb">
            <span className="flo">VIETANA</span>
            <span className="ft">Premium India-Vietnam Travel</span>
            <span className="fs">© 2026 Vietana Travel. Built for Indian Travelers.</span>
          </div>
          <ul className="fnav">
            <li><a href="#services">Services</a></li>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#food">Food</a></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>About</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
