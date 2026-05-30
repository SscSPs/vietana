const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log("Navigating to http://localhost:3000/");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  
  console.log("Scrolling to #food section");
  await page.evaluate(() => {
    const foodSection = document.getElementById('food');
    if (foodSection) {
      foodSection.scrollIntoView();
    }
  });
  
  // Wait a moment for animations/parallax to settle
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("Taking screenshot...");
  await page.screenshot({ 
    path: '/Users/chayansoni/.gemini/antigravity/brain/cc9fcb16-f5e7-4da1-8050-652de549fdb8/food_section_screenshot.png' 
  });
  
  await browser.close();
  console.log("Done.");
})();
