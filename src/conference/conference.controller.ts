import { Controller, Get } from '@nestjs/common';
import { ConferenceService } from './conference.service';
import { Conference } from './conference.entity';

@Controller('conferences')
export class ConferenceController {
  constructor(private readonly conferenceService: ConferenceService) {}

  @Get()
  async getConference(): Promise<Conference[]> {
    return await this.conferenceService.getAllConference();
  }
}
