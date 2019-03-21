const $ = require('cheerio');

const scrapeGames = (html, team) => {
  const games = [];

  $('table', html).each((tableIndex, table) => {
    if (tableIndex >= 1) {
      $('tr', table).each((rowIndex, row) => {
        let year, conference;
        if (rowIndex === 0) {
          year = $('a', row)
            .text()
            .split('-')[0];
          year = parseInt(year);
          conference = $('a', row)
            .text()
            .split('(')[1]
            .split(')')[0];

          // call service for conference
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
            const home = nuetralLocation || $(columns[1]) === 'vs.';
            const opponent = $(columns[2])
              .find('a')
              .text()
              .replace('*', '');
            const conferenceGame =
              $(columns[2])
                .find('a')
                .text()
                .charAt(0) === '*';
            const teamScore = $(columns[4]).text();
            const opponentScore = $(columns[5]).text();

            // TODO add type for non I-A games

            games.push({
              homeTeamName: home ? team : opponent,
              homeTeamScore: home ? teamScore : opponentScore,
              awayTeamName: home ? opponent : team,
              awayTeamScore: home ? opponentScore : teamScore,
              year: month === 1 ? year + 1 : year,
              month,
              day,
              conferenceGame,
              type: $(columns[7]) ? $(columns[7]).text() : null,
              location: nuetralLocation ? nuetralLocation : null,
            });
          }
        }
      });
    }
  });

  console.log(games.length);
};

module.exports = {
  scrapeGames,
};
