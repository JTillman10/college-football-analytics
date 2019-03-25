import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConferenceTeamDuration } from './conference-team-duration.entity';
import { Repository } from 'typeorm';
import { NewConferenceTeamDuration } from './models/new-conference-team-duration';
import { ConferenceService } from 'src/conference/conference.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class ConferenceTeamDurationService {
  constructor(
    @InjectRepository(ConferenceTeamDuration)
    private readonly conferenceTeamDurationRepository: Repository<
      ConferenceTeamDuration
    >,
    private readonly conferenceService: ConferenceService,
    private readonly teamService: TeamService,
  ) {}

  async getConferenceTeamDurationsForTeam(): Promise<ConferenceTeamDuration[]> {
    return await this.conferenceTeamDurationRepository.find();
  }

  async createConferenceTeamDurations(
    newConferenceTeamDuration: NewConferenceTeamDuration[],
  ): Promise<ConferenceTeamDuration[]> {
    return newConferenceTeamDuration.reduce(
      async (previousPromise, nextConferenceTeamDuration): Promise<any> => {
        await previousPromise;
        return this.createConferenceTeamDuration(nextConferenceTeamDuration);
      },
      Promise.resolve(),
    );
  }

  async createConferenceTeamDuration(
    newConferenceTeamDuration: NewConferenceTeamDuration,
  ): Promise<ConferenceTeamDuration> {
    const conferenceTeamDuration = new ConferenceTeamDuration();

    conferenceTeamDuration.startYear = newConferenceTeamDuration.startYear;
    conferenceTeamDuration.endYear = newConferenceTeamDuration.endYear;

    let conferenceName = await this.conferenceService.getConferenceByName(
      newConferenceTeamDuration.conferenceName,
    );

    if (!conferenceName) {
      conferenceName = await this.conferenceService.createConference({
        name: newConferenceTeamDuration.conferenceName,
      });
    }

    let teamName = await this.teamService.getTeamByName(
      newConferenceTeamDuration.teamName,
    );

    if (!teamName) {
      teamName = await this.teamService.createTeam(
        newConferenceTeamDuration.teamName,
      );
    }

    conferenceTeamDuration.conference = conferenceName;
    conferenceTeamDuration.team = teamName;

    return await this.conferenceTeamDurationRepository.save(
      conferenceTeamDuration,
    );
  }
}
