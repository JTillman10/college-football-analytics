import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConferenceTeamDurationController } from './conference-team-duration.controller';
import { ConferenceTeamDurationService } from './conference-team-duration.service';
import { ConferenceTeamDuration } from './conference-team-duration.entity';
import { TeamModule } from '../team/team.module';
import { ConferenceModule } from '../conference/conference.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConferenceTeamDuration]),
    TeamModule,
    ConferenceModule,
  ],
  controllers: [ConferenceTeamDurationController],
  providers: [ConferenceTeamDurationService],
  exports: [ConferenceTeamDurationService],
})
export class ConferenceTeamRelationshipModule {}
