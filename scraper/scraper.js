const puppeteer = require('puppeteer');

const { scrapeGames, scrapeTeams } = require('./game-scraper');

const baseUrl = 'http://www.jhowell.net/cf/scores/';
const mainPageUrl = 'http://www.jhowell.net/cf/scores/byName.htm';

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(mainPageUrl);
  const mainHtml = await page.content();

  const teams = scrapeTeams(mainHtml);

  for (let i = 0; i < teams.length; i++) {
    const nextTeam = teams[i];
    await page.goto(`${baseUrl}${nextTeam.href}`);
    const teamHtml = await page.content();
    await scrapeGames(teamHtml, nextTeam.team);
  }

  await browser.close();
})();
