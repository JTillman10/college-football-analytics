const $ = require('cheerio');
const axios = require('axios');

const correctTeam = team => {
  if (team === 'Pitt') {
    return 'Pittsburgh';
  } else if (team === 'Ole Miss') {
    return 'Mississippi';
  } else if (team === 'UTEP') {
    return 'Texas-El Paso';
  } else if (team === 'UCF') {
    return 'Central Florida';
  } else if (team === 'Southwestern (TX)') {
    return 'Southwestern (Texas)';
  } else if (team === 'Louisiana State') {
    return 'LSU';
  } else if (team === 'Southern California') {
    return 'USC';
  } else {
    return team;
  }
};

const scrapePolls = async (html, year) => {
  console.log('Scraping ', year);
  const polls = [];

  const rows = $(html)
    .find('#all_ap')
    .find('table tbody')
    .find('tr');

  let currentWeek, poll;

  $(rows)
    .not('.thead')
    .each((rowIndex, row) => {
      const week = parseInt(
        $(row)
          .find('th')
          .first()
          .text(),
      );

      if (week !== currentWeek) {
        currentWeek = week;
        if (poll) {
          polls.push(poll);
        }
        let date = $(row)
          .find('td')
          .first()
          .text();
        if (!['Final', 'Preseason'].includes(date)) {
          const month = parseInt(date.split('-')[1]);
          const day = parseInt(date.split('-')[2]);
          date = `${month}/${day}/${year}`;
        } else {
          date = null;
        }

        poll = {
          week,
          date,
          year,
          type: 'AP Poll',
          rankings: [],
        };
      }

      const rank = parseInt($($(row).find('td')[1]).text());
      let teamName =
        $($(row).find('td')[2]).find('a').length > 0
          ? $($(row).find('td')[2])
              .find('a')
              .text()
          : $($(row).find('td')[2]).text();

      teamName = correctTeam(teamName);

      poll.rankings.unshift({
        rank,
        teamName,
      });
      // get other data
    });
  polls.push(poll);

  const week1Date = new Date(polls[polls.length - 2].date);
  week1Date.setTime(week1Date.getTime() - 7 * (1000 * 60 * 60 * 24 * 1));
  polls[polls.length - 1].date = `${week1Date.getMonth() +
    1}/${week1Date.getDate()}/${year}`;

  // console.log(polls);

  await axios
    .post('http://localhost:3000/api/polls', polls)
    .then(rankings => console.log(`Successfully created the rankings`))
    .catch(err => console.log('Rankings creation with error', err));
};

module.exports = {
  scrapePolls,
};
