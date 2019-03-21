import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './game.entity';
import { NewGame } from './models/new-game.model';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  async saveGame(@Body(new ValidationPipe()) newGame: NewGame) {
    return await this.gameService.create(newGame);
  }
}
