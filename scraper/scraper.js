const puppeteer = require('puppeteer');

const { scrapeGames } = require('./game-scraper');
// get all links

(async () => {
  const browser = await puppeteer.launch();
  // loop through all links
  const url = 'http://www.jhowell.net/cf/scores/Alabama.htm';

  // if name doesn't exist, add to Team

  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();

  scrapeGames(html, 'Alabama');

  await browser.close();
})();
