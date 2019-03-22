import { Controller, Get, Body, Post } from '@nestjs/common';
import { ConferenceTeamDurationService } from './conference-team-duration.service';
import { ConferenceTeamDuration } from './conference-team-duration.entity';
import { NewConferenceTeamDuration } from './models/new-conference-team-duration';

@Controller('conferenceTeamDurations')
export class ConferenceTeamDurationController {
  constructor(
    private readonly conferenceTeamDurationService: ConferenceTeamDurationService,
  ) {}

  // @Get()
  // async getConferenceTeamDurationsForTeam(): Promise<
  //   ConferenceTeamDuration[]
  // > {
  //   return await this.conferenceTeamDurationService.getConferenceTeamDurationsForTeam();
  // }

  @Post()
  async createConferenceTeamDuration(
    @Body() newConferenceTeamDurations: NewConferenceTeamDuration[],
  ): Promise<ConferenceTeamDuration[]> {
    return await this.conferenceTeamDurationService.createConferenceTeamDurations(
      newConferenceTeamDurations,
    );
  }
}
