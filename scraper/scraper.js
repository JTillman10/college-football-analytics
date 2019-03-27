const puppeteer = require('puppeteer');
const argv = require('yargs').argv;

const { scrapeGames, scrapeTeams } = require('./game-scraper');
const { scrapePolls } = require('./polls-scraper');

const getTime = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

const runGameScraper = async () => {
  console.log(getTime());
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
  console.log(getTime());
};

const runPollsScraper = async () => {
  console.log(getTime());
  const getUrl = year =>
    `https://www.sports-reference.com/cfb/years/${year}-polls.html`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // const years = [...Array(1).keys()].map(i => i + 2006);
  const years = [...Array(83).keys()].map(i => i + 1936);
  for (let i = 0; i < years.length; i++) {
    const nextYear = years[i];
    await page.goto(getUrl(nextYear));
    const yearHtml = await page.content();
    await scrapePolls(yearHtml, nextYear);
  }

  await browser.close();
  console.log(getTime());
};

if (argv.games) {
  runGameScraper();
} else if (argv.polls) {
  runPollsScraper();
}
