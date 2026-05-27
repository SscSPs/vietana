import React, { useState } from 'react';
import './FAQ.css';

const FAQS = [
  { q: 'Is a visa required for Indian citizens?', a: 'Yes, but it is easy! Most Indian travelers can get an e-visa online within 3-4 working days. We provide full assistance for this.' },
  { q: 'Are there many vegetarian food options in Vietnam?', a: 'Absolutely! Vietnam has a rich Buddhist tradition, which means "Quán Chay" (vegetarian restaurants) are everywhere. We also curate a list of Indian restaurants across all major cities.' },
  { q: 'What is the best time to visit Vietnam?', a: 'Vietnam is a long country, so there is always somewhere with good weather. Generally, Spring (Feb-Apr) and Autumn (Aug-Oct) are great for the whole country.' },
  { q: 'Can I use Indian currency in Vietnam?', a: 'No, you should use Vietnamese Dong (VND) or US Dollars (USD). We recommend carrying some USD and withdrawing VND from local ATMs upon arrival.' },
  { q: 'Do people speak English in Vietnam?', a: 'In major tourist areas, yes. However, having a local support team like VIETANA makes things much smoother, especially in hidden gems.' }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenExp] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section">
      <div className="sh r">
        <span className="lbl">Common Queries</span>
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="faq-container r">
        {FAQS.map((faq, i) => (
          <div key={i} className={`faq-item ${openIdx === i ? 'o' : ''}`} onClick={() => setOpenExp(openIdx === i ? null : i)}>
            <div className="faq-q">
              <span>{faq.q}</span>
              <div className="faq-icon"></div>
            </div>
            <div className="faq-a">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
