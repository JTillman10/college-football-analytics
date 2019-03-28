import { Controller, Body, Post } from '@nestjs/common';

import { apiPrefix } from '../config';

import { ConferenceTeamDuration } from './conference-team-duration.entity';
import { ConferenceTeamDurationService } from './conference-team-duration.service';
import { NewConferenceTeamDuration } from './models/new-conference-team-duration';

@Controller(`${apiPrefix}/conferenceTeamDurations`)
export class ConferenceTeamDurationController {
  constructor(
    private readonly conferenceTeamDurationService: ConferenceTeamDurationService,
  ) {}

  @Post()
  async createConferenceTeamDuration(
    @Body() newConferenceTeamDurations: NewConferenceTeamDuration[],
  ): Promise<ConferenceTeamDuration[]> {
    return await this.conferenceTeamDurationService.createConferenceTeamDurations(
      newConferenceTeamDurations,
    );
  }
}
