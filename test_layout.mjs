import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:4175', { waitUntil: 'networkidle0' });
  
  const layoutInfo = await page.evaluate(() => {
    const rightCol = document.querySelector('.lg\\:w-\\[320px\\]');
    const leftCol = document.querySelector('.flex-1.min-w-0');
    const container = leftCol.parentElement;
    
    return {
      rightColRect: rightCol ? rightCol.getBoundingClientRect() : null,
      leftColRect: leftCol ? leftCol.getBoundingClientRect() : null,
      containerRect: container ? container.getBoundingClientRect() : null,
      windowWidth: window.innerWidth
    };
  });
  
  console.log(JSON.stringify(layoutInfo, null, 2));
  await browser.close();
})();
