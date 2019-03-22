import { Controller, Get, Body, Post } from '@nestjs/common';
import { ConferenceTeamRelationshipService } from './conference-team-relationship.service';
import { ConferenceTeamRelationship } from './conference-team-relationship.entity';
import { NewConferenceTeamRelationship } from './models/new-conference-team-relationship';

@Controller('conferenceTeamRelationship')
export class ConferenceTeamRelationshipController {
  constructor(
    private readonly conferenceTeamRelationshipService: ConferenceTeamRelationshipService,
  ) {}

  @Get()
  async getConferenceTeamRelationshipsForTeam(): Promise<
    ConferenceTeamRelationship[]
  > {
    return await this.conferenceTeamRelationshipService.getConferenceTeamRelationshipsForTeam();
  }

  @Post()
  async createConferenceTeamRelationship(
    @Body() newConferenceTeamRelationship: NewConferenceTeamRelationship,
  ): Promise<ConferenceTeamRelationship> {
    return await this.conferenceTeamRelationshipService.createConferenceTeamRelationship(
      newConferenceTeamRelationship,
    );
  }
}
