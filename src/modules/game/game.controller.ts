import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';

import { apiPrefix } from '../../config';

import { GameService } from './game.service';
import { NewGame } from './models/new-game.model';
import { Game } from './game.entity';

@Controller(`${apiPrefix}/games`)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':gameId')
  async getAllGames(@Param('gameId') gameId: number): Promise<Game> {
    return await this.gameService.getGameById(gameId);
  }

  @Post()
  async saveGame(
    @Body(new ValidationPipe()) newGames: NewGame[],
  ): Promise<Game[]> {
    return await this.gameService.createGames(newGames);
  }
}
