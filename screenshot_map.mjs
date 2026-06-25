import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  
  console.log("Navigating to local server...");
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  
  // Click the Map button in the navbar
  console.log("Clicking map button...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const mapBtn = buttons.find(b => b.textContent && b.textContent.includes('Map'));
    if(mapBtn) mapBtn.click();
  });
  
  // Wait for map modal to animate in
  await new Promise(r => setTimeout(r, 2000));
  
  // Hover over the first destination
  console.log("Hovering over destination...");
  await page.mouse.move(720, 450); // Move mouse roughly to center
  // Actually let's just trigger hover directly if possible or move around
  await page.mouse.move(700, 300);
  await new Promise(r => setTimeout(r, 1000));
  await page.mouse.move(700, 200);
  await new Promise(r => setTimeout(r, 1000));

  console.log("Taking screenshot...");
  await page.screenshot({ path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/vector_map_screenshot.png' });
  
  await browser.close();
})();
