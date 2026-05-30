const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // 1. Screenshot Hero section
  const heroElement = await page.$('#hero');
  if (heroElement) {
    await heroElement.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/hero_ui_fixed.png' });
  }

  // 2. Open Contact Modal and Screenshot
  const contactLinks = await page.$$('a[href="#contact"]');
  if (contactLinks.length > 0) {
    await contactLinks[0].click();
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/contact_ui_fixed.png' });
  }

  await browser.close();
})();
