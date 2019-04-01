import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { Game } from '../game/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), TypeOrmModule.forFeature([Game])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
