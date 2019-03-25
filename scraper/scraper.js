const puppeteer = require('puppeteer');
const argv = require('yargs').argv;

const { scrapeGames, scrapeTeams } = require('./game-scraper');
const { scrapePolls, scrapeYears } = require('./polls-scraper');

const runGameScraper = async () => {
  const baseUrl = 'http://www.jhowell.net/cf/scores/';
  const mainPageUrl = 'http://www.jhowell.net/cf/scores/byName.htm';

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
};

const runPollsScraper = async () => {
  const baseUrl = `https://en.wikipedia.org/`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://en.wikipedia.org/wiki/List_of_NCAA_college_football_rankings',
  );
  const yearsHtml = await page.content();

  // const years = [...Array(82).keys()].map(i => i + 2005);
  // const years = [...Array(82).keys()].map(i => i + 1936);
  const years = scrapeYears(yearsHtml);
  for (let i = 0; i < years.length; i++) {
    const nextYear = years[i];
    await page.goto(`${baseUrl}${nextYear.link}`);
    const yearHtml = await page.content();
    await scrapePolls(yearHtml, nextYear.year);
  }

  await browser.close();
};

if (argv.games) {
  runGameScraper();
} else if (argv.polls) {
  runPollsScraper();
}
