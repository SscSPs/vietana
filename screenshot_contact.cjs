const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Click the "Contact" link in the navbar
  await page.evaluate(() => {
    const contactLinks = Array.from(document.querySelectorAll('a')).filter(a => a.href.includes('#contact'));
    if (contactLinks.length > 0) {
      contactLinks[0].click();
    }
  });

  // Wait for modal animation
  await new Promise(r => setTimeout(r, 1000));
  
  // Click the second pin to ensure it switches
  await page.mouse.click(350, 450); // rough guess of a point in the map to maybe click a pin or just load tiles
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/contact_map_modal.png' });
  
  await browser.close();
})();
