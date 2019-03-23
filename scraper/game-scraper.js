const $ = require('cheerio');
const axios = require('axios');

const scrapeGames = async (html, team) => {
  const games = [],
    conferences = [];

  $('table', html).each((tableIndex, table) => {
    if (tableIndex >= 1) {
      let year;
      $('tr', table).each((rowIndex, row) => {
        let conference;
        if (rowIndex === 0) {
          year = $('a', row)
            .text()
            .split('-')[0];
          year = parseInt(year);
          conference = $('a', row)
            .text()
            .split('(')[1]
            .split(')')[0];

          conferences.unshift({
            year,
            conferenceName: conference,
            teamName: team,
          });
        } else {
          const columns = $('td', row);
          const date = $(columns[0]).text();
          const day = parseInt(date.split('/')[1]);
          const month = parseInt(date.split('/')[0]);

          if (month && day) {
            const nuetralLocation = $(columns[6])
              ? $(columns[6])
                  .text()
                  .split('@ ')[1]
              : null;
            const home = nuetralLocation || $(columns[1]).text() === 'vs.';
            const nonFBS = $(columns[2]).find('a').length > 0 ? false : true;
            const opponent = nonFBS
              ? $(columns[2])
                  .text()
                  .split(' (')[0]
              : $(columns[2])
                  .find('a')
                  .text()
                  .replace('*', '');
            const conferenceGame =
              $(columns[2])
                .text()
                .charAt(0) === '*';

            const teamScore = $(columns[4]).text();
            const opponentScore = $(columns[5]).text();

            let type;
            if (nonFBS) {
              type = 'Non FBS';
            }

            if (columns[7]) {
              type = $(columns[7]).text();
            }

            if (!type && nuetralLocation) {
              type = 'Nuetral Site';
            }

            const newGame = {
              homeTeamName: home ? team : opponent,
              homeTeamScore: home ? teamScore : opponentScore,
              awayTeamName: home ? opponent : team,
              awayTeamScore: home ? opponentScore : teamScore,
              date: `${month}/${day}/${month === 1 ? year + 1 : year}`,
              conferenceGame,
              type,
              location: nuetralLocation ? nuetralLocation : null,
            };

            if (
              month.toString() === '11' &&
              day.toString() === '24' &&
              year.toString() === '2018'
            ) {
              games.push(newGame);
            }

            // games.push({
            //   homeTeamName: home ? team : opponent,
            //   homeTeamScore: home ? teamScore : opponentScore,
            //   awayTeamName: home ? opponent : team,
            //   awayTeamScore: home ? opponentScore : teamScore,
            //   date: `${month}/${day}/${month === 1 ? year + 1 : year}`,
            //   conferenceGame,
            //   type,
            //   location: nuetralLocation ? nuetralLocation : null,
            // });
          }
        }
      });
    }
  });

  let conferenceChanges = [];
  let currentConferenceName;

  conferences.forEach(c => {
    if (c.conferenceName !== currentConferenceName) {
      const endYear = (parseInt(c.year) - 1).toString();
      if (conferenceChanges.length > 0) {
        conferenceChanges[conferenceChanges.length - 1].endYear = endYear;
      }

      const startYear = (parseInt(endYear) + 1).toString();
      currentConferenceName = c.conferenceName;
      conferenceChanges.push({
        startYear,
        conferenceName: c.conferenceName,
        teamName: team,
      });
    }
  });

  console.log('Creating for ', team);

  await axios
    .post('http://localhost:3000/conferenceTeamDurations', conferenceChanges)
    .then(response =>
      console.log(`Created ${conferenceChanges.length} conference durations`),
    )
    .catch(err => console.log('Conference request failed with error', err));

  await axios
    .post('http://localhost:3000/games', games)
    .then(response => console.log(`Created ${games.length} games`))
    .catch(err => console.log('Game request failed with error', err));

  console.log('');
};

const scrapeTeams = html => {
  const teams = [];
  $('[align=left]', html)
    .find('a')
    .each((i, link) => {
      const href = $(link).attr('href');
      const team = $(link)
        .text()
        .split('(')[0];
      teams.push({
        team,
        href,
      });
    });
  return teams;
};

module.exports = {
  scrapeGames,
  scrapeTeams,
};
