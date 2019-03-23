import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { NewGame } from './models/new-game.model';
import { TeamService } from '../team/team.service';

@Injectable()
export class GameService {
  constructor(
    private readonly teamService: TeamService,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  async getAllGames() {
    return await this.gameRepository.find();
  }

  async createGames(newGames: NewGame[]): Promise<Game[]> {
    return newGames.reduce(async (previousPromise, nextGame): Promise<any> => {
      await previousPromise;
      return this.createGame(nextGame);
    }, Promise.resolve());
  }

  async createGame(newGame: NewGame): Promise<Game> {
    // TODO heck if game exists

    let homeTeam = await this.teamService.getTeamByName(newGame.homeTeamName);
    let awayTeam = await this.teamService.getTeamByName(newGame.awayTeamName);

    if (homeTeam && awayTeam) {
      if (
        await this.gameRepository.findOne({
          where: { homeTeam, awayTeam, date: newGame.date },
        })
      ) {
        return;
      }
    }

    const game = new Game();
    if (!homeTeam) {
      await this.teamService.create(newGame.homeTeamName);
      homeTeam = await this.teamService.getTeamByName(newGame.homeTeamName);
    }

    if (!awayTeam) {
      await this.teamService.create(newGame.awayTeamName);
      awayTeam = await this.teamService.getTeamByName(newGame.awayTeamName);
    }

    game.homeTeam = homeTeam;
    game.awayTeam = awayTeam;
    game.homeTeamScore = newGame.homeTeamScore;
    game.awayTeamScore = newGame.awayTeamScore;
    game.date = newGame.date;
    game.type = newGame.type;
    game.conferenceGame = newGame.conferenceGame;
    game.location = newGame.location;

    return await this.gameRepository.save(game);
  }
}
