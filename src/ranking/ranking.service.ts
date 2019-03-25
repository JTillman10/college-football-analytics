import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ranking } from './ranking.entity';
import { Repository } from 'typeorm';
import { NewRanking } from './models/new-ranking.model';
import { TeamService } from 'src/team/team.service';
import { Poll } from 'src/poll/poll.entity';
import { CFBAnalyticsLoggerService } from 'src/logger/logger.service';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private readonly rankingRepository: Repository<Ranking>,
    private readonly teamService: TeamService,
    private readonly cfbAnalyticsLoggerService: CFBAnalyticsLoggerService,
  ) {}

  async getAllGames() {
    return await this.rankingRepository.find();
  }

  async createRankings(
    newRankings: NewRanking[],
    poll: Poll,
  ): Promise<Ranking[]> {
    return newRankings.reduce(async (previousPromise, nextRanking): Promise<
      any
    > => {
      await previousPromise;
      return this.createRanking(nextRanking, poll);
    }, Promise.resolve());
  }

  async createRanking(newRanking: NewRanking, poll: Poll): Promise<Ranking> {
    const team = await this.teamService.getTeamByName(newRanking.teamName);
    if (!team) {
      this.cfbAnalyticsLoggerService.error(
        'Could not find team: ',
        newRanking.teamName,
      );
      return;
    }

    const ranking = new Ranking();
    ranking.firstPlaceVotes = newRanking.firstPlaceVotes;
    ranking.rank = newRanking.rank;
    ranking.team = team;
    ranking.poll = poll;

    return await this.rankingRepository.save(ranking);
  }
}
