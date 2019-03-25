import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RankingService } from './ranking.service';
import { Ranking } from './ranking.entity';
import { TeamModule } from '../team/team.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking]), TeamModule, LoggerModule],
  providers: [RankingService],
  exports: [RankingService],
})
export class RankingModule {}
