import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { Poll } from './poll.entity';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Poll]), RankingModule],
  providers: [PollService],
  controllers: [PollController],
  exports: [PollService],
})
export class PollModule {}
