import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';

import { apiPrefix } from '../config';

import { GameService } from './game.service';
import { NewGame } from './models/new-game.model';

@Controller(`${apiPrefix}/games`)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getAllGames() {
    return await this.gameService.getAllGames();
  }

  @Post()
  async saveGame(@Body(new ValidationPipe()) newGames: NewGame[]) {
    return await this.gameService.createGames(newGames);
  }
}
