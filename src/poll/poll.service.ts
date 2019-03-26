import { Injectable } from '@nestjs/common';
import { RankingService } from '../ranking/ranking.service';
import { NewPoll } from './models/new-poll.model';
import { Poll } from './poll.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
    private readonly rankingService: RankingService,
  ) {}

  async getPollByDate(week, date, type, year): Promise<Poll> {
    return await this.pollRepository.findOne({ where: { week, date, type } });
  }

  async createPolls(newPolls: NewPoll[]): Promise<Poll[]> {
    return newPolls.reduce(async (previousPromise, nextPoll): Promise<any> => {
      await previousPromise;
      return this.createPoll(nextPoll);
    }, Promise.resolve());
  }

  async createPoll(newPoll: NewPoll): Promise<Poll> {
    let poll = await this.getPollByDate(
      newPoll.week,
      newPoll.date,
      newPoll.type,
      newPoll.year,
    );

    if (!poll) {
      poll = new Poll();

      poll.date = newPoll.date;
      poll.type = newPoll.type;
      poll.week = newPoll.week;
      poll.year = newPoll.year;

      poll = await this.pollRepository.save(poll);
    }

    await this.rankingService.createRankings(newPoll.rankings, poll);

    return await this.getPollByDate(
      newPoll.week,
      newPoll.date,
      newPoll.type,
      newPoll.year,
    );
  }
}
