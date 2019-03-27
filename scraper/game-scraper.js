const $ = require('cheerio');
const axios = require('axios');

const correctTeam = team => {
  if (team[0] === '+') {
    team = team.substring(1);
  }

  team = team.trim();

  if (team === 'Miami (Florida)') {
    return 'Miami (FL)';
  } else if (team === 'Miami (Ohio)') {
    return 'Miami (OH)';
  } else if (team === 'BYU') {
    return 'Brigham Young';
  } else if (team === 'Southern California') {
    return 'USC';
  } else if (team === 'Mississippi') {
    return 'Mississippi';
  } else if (team === 'Southern Methodist') {
    return 'SMU';
  } else if (team === 'UCF') {
    return 'Central Florida';
  } else if (team === 'UTEP') {
    return 'Texas-El Paso';
  } else if (team === 'Carnegie Tech') {
    return 'Carnegie Mellon';
  } else if (team === `St. Mary's`) {
    return `Saint Mary's (CA)`;
  } else if (team === `St. Mary's Pre-Flight`) {
    return `Saint Mary's (CA) Pre-Flight`;
  } else if (team === 'Norman NAS') {
    return 'Norman Naval Air Station';
    // } else if (team === 'Southwestern (Texas)') {
    //   return 'Southwestern (TX)';
  } else if (team === 'Catawba') {
    return 'Catawba College';
    // } else if (team === 'Second Air Force') {
    //   return 'Second Air Force (Colorado)';
  } else if (team === 'Morris Field') {
    return 'Third Air Force';
  } else {
    return team;
  }
};

const scrapeGames = async (html, team) => {
  team = correctTeam(team);
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
            const nonFBS = $(columns[2]).find('a').length > 0 ? false : true;
            let opponent = nonFBS
              ? $(columns[2])
                  .text()
                  .split(' (non-IA)')[0]
              : $(columns[2])
                  .find('a')
                  .text()
                  .replace('*', '');
            const conferenceGame =
              $(columns[2])
                .text()
                .charAt(0) === '*';
            const home = nuetralLocation
              ? team < opponent
              : $(columns[1]).text() === 'vs.';

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

            // if (opponent === 'Miami') {
            //   opponent = 'Miami (OH)';
            //   type = 'Non FBS';
            // } else if (opponent === 'Southwestern') {
            //   opponent = 'Southwestern (TX)';
            //   type = 'Non FBS';
            // }

            opponent = correctTeam(opponent);

            games.push({
              homeTeamName: home ? team : opponent,
              homeTeamScore: home ? teamScore : opponentScore,
              awayTeamName: home ? opponent : team,
              awayTeamScore: home ? opponentScore : teamScore,
              date: `${month}/${day}/${month === 1 ? year + 1 : year}`,
              conferenceGame,
              type,
              location: nuetralLocation ? nuetralLocation : null,
            });
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

  console.log('Creating for', team);

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
