import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameModule } from '../game/game.module';

import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { Game } from 'src/game/game.entity';
import { CommonTeamModule } from '../common/common-team/common-team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([Game]),
    // CommonTeamModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
