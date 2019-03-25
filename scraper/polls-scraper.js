const $ = require('cheerio');
const axios = require('axios');

const months = [
  '',
  'Jan',
  '',
  '',
  '',
  '',
  '',
  '',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const scrapePolls = async (html, year) => {
  console.log('Scraping ', year);
  const rankings = [];

  let table;
  // get h2, keep looking at next until find table or element with table child
  if (
    $(html)
      .find('#AP_Poll')
      .parent()
      .nextUntil('table').length > 0
  ) {
    table = $(html)
      .find('#AP_Poll')
      .parent()
      .nextUntil('table')
      .next();
  } else if (
    $(html)
      .find('#AP_Poll')
      .parent()
      .next('table').length > 0
  ) {
    table = $(html)
      .find('#AP_Poll')
      .parent()
      .next('table')[0];
  } else {
    $(html)
      .find('#AP_Poll')
      .parent()
      .nextAll('div')
      .each((i, el) => {
        if ($(el).has('table')) {
          table = $(el).find('table')[0];
          return;
        }
      });
  }

  const rows = $(table)
    .find('tr')
    .slice(0, -2);

  rows
    .first()
    .find('th')
    .each((i, col) => {
      if ($(col).html() !== '') {
        const week = $(col)
          .html()
          .split('<br>')[0]
          .split('Week ')[1];
        const date = $(col)
          .html()
          .split('<br>')[1]
          .split('<')[0];
        rankings.push({
          year,
          week: week === 'Preseason' ? 1 : parseInt(week),
          date: date
            ? `${months.indexOf(date.split(' ')[0])}/${date.split(' ')[1]}`
            : null,
          rankings: [],
        });
      }
    });

  if (!rankings[0].date) {
    const week0Date = new Date(rankings[1].date);
    week0Date.setTime(week0Date.getTime() - 7 * (1000 * 60 * 60 * 24 * 1));
    rankings[0].date = `${week0Date.getMonth()}/${week0Date.getDate()}`;
  }

  rows.slice(1, rows.length).each((rowIndex, row) => {
    const rankNumber = $(row)
      .find('th')
      .text()
      .split('.')[0];
    if (parseInt(rankNumber) !== NaN && rankNumber !== '') {
      const columns = $(row).find('td');
      columns.each((columnIndex, column) => {
        const rank = {
          rank: parseInt(rankNumber),
          team: $(column)
            .text()
            .split('(')[0],
          firstPlaceVotes: null,
          type: 'AP',
        };

        if ($(column).find('i').length > 0) {
          try {
            rank.firstPlaceVotes = parseInt(
              $(column)
                .find('i')
                .text()
                .split('(')[1]
                .split(')')[0],
            );
          } catch (e) {
            console.log(e);
          }
        }

        rankings[columnIndex].rankings.push(rank);
      });
    }
  });
  // await axios
  //   .post('http://localhost:3000/polls', rankings)
  //   .then(rankings => console.log(`Successfully created the rankings`))
  //   .catch(err => console.log('Rankings creation with error', err));
};

scrapeYears = html => {
  const links = [];

  const table = $(html).find('#mw-content-text > div > table:nth-child(8)');
  $(table)
    .find('tr')
    .each((i, el) => {
      const col = $(el).find('td')[0];
      if (col) {
        links.push({
          year: $(col)
            .text()
            .split('\n')[0],
          link: $(col)
            .find('a')
            .attr('href'),
        });
      }
    });

  return links;
};

module.exports = {
  scrapePolls,
  scrapeYears,
};
