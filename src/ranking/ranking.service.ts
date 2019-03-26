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

  async getRanking(team, rank, poll) {
    return await this.rankingRepository.find({ where: { team, rank, poll } });
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
    if (!team && !['LSU', 'Brigham Young'].includes(newRanking.teamName)) {
      this.cfbAnalyticsLoggerService.error(
        'Could not find team: ',
        newRanking.teamName,
      );
      return;
    }

    if (team && poll.id) {
      const savedRanking = await this.getRanking(team, newRanking.rank, poll);
    }

    const ranking = new Ranking();
    ranking.rank = newRanking.rank;
    ranking.team = team;
    ranking.poll = poll;

    return await this.rankingRepository.save(ranking);
  }
}
