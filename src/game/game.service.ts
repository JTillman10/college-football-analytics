import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { CommonTeamService } from '../common/common-team/common-team.service';
import { NewGame } from './models/new-game.model';
import { TeamService } from '../team/team.service';

@Injectable()
export class GameService {
  constructor(
    private readonly teamService: TeamService,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>, // private readonly commonTeamService: CommonTeamService,
  ) {}

  async create(newGame: NewGame): Promise<Game> {
    const game = new Game();
    let homeTeam = await this.teamService.getTeamByName(newGame.homeTeamName);

    if (!homeTeam) {
      await this.teamService.create(newGame.homeTeamName);
      homeTeam = await this.teamService.getTeamByName(newGame.homeTeamName);
    }

    let awayTeam = await this.teamService.getTeamByName(newGame.awayTeamName);

    if (!awayTeam) {
      await this.teamService.create(newGame.awayTeamName);
      awayTeam = await this.teamService.getTeamByName(newGame.homeTeamName);
    }

    game.homeTeam = homeTeam;
    game.awayTeam = awayTeam;
    game.homeTeamScore = newGame.homeTeamScore;
    game.awayTeamScore = newGame.awayTeamScore;
    game.year = newGame.year;
    game.month = newGame.month;
    game.day = newGame.day;
    game.type = newGame.type;
    game.conferenceGame = newGame.conferenceGame;
    game.location = newGame.location;

    return await this.gameRepository.save(game);
  }
}
