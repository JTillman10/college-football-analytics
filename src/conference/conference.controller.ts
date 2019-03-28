import { Controller, Get } from '@nestjs/common';

import { apiPrefix } from '..//config';

import { Conference } from './conference.entity';
import { ConferenceService } from './conference.service';

@Controller(`${apiPrefix}/conferences`)
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Get()
  async getConference(): Promise<Conference[]> {
    return await this.conferenceService.getAllConference();
  }
}
