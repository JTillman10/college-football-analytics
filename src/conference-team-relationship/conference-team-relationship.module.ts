import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConferenceTeamRelationshipController } from './conference-team-relationship.controller';
import { ConferenceTeamRelationshipService } from './conference-team-relationship.service';
import { ConferenceTeamRelationship } from './conference-team-relationship.entity';
import { TeamModule } from '../team/team.module';
import { ConferenceModule } from '../conference/conference.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConferenceTeamRelationship]),
    TeamModule,
    ConferenceModule,
  ],
  controllers: [ConferenceTeamRelationshipController],
  providers: [ConferenceTeamRelationshipService],
  exports: [ConferenceTeamRelationshipService],
})
export class ConferenceTeamRelationshipModule {}
