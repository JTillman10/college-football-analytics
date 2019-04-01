import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Query,
  Get,
} from '@nestjs/common';

import { apiPrefix } from '../../config';

import { PollService } from './poll.service';
import { NewPoll } from './models/new-poll.model';
import { Poll } from './poll.entity';

@Controller(`${apiPrefix}/polls`)
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get()
  async getPoll(
    @Query('year') year: number,
    @Query('type') type: string,
    @Query('week') week: number,
  ): Promise<Poll | Poll[]> {
    if (week) {
      return await this.pollService.getPollByWeek(week, type, year);
    } else {
      return await this.pollService.getPollsByYear(type, year);
    }
  }

  @Post()
  async savePoll(@Body(new ValidationPipe()) newPolls: NewPoll[]) {
    return await this.pollService.createPolls(newPolls);
  }
}
