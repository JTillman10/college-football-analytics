import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PollService } from './poll.service';
import { NewPoll } from './models/new-poll.model';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  async savePoll(@Body(new ValidationPipe()) newPolls: NewPoll[]) {
    return await this.pollService.createPolls(newPolls);
  }
}
