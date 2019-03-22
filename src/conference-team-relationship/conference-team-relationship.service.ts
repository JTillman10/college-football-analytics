import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConferenceTeamRelationship } from './conference-team-relationship.entity';
import { Repository } from 'typeorm';
import { NewConferenceTeamRelationship } from './models/new-conference-team-relationship';
import { ConferenceService } from 'src/conference/conference.service';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class ConferenceTeamRelationshipService {
  constructor(
    @InjectRepository(ConferenceTeamRelationship)
    private readonly conferenceTeamRelationshipsRepository: Repository<
      ConferenceTeamRelationship
    >,
    private readonly conferenceService: ConferenceService,
    private readonly teamService: TeamService,
  ) {}

  async getConferenceTeamRelationshipsForTeam(): Promise<
    ConferenceTeamRelationship[]
  > {
    return await this.conferenceTeamRelationshipsRepository.find();
  }

  async createConferenceTeamRelationship(
    newConferenceTeamRelationship: NewConferenceTeamRelationship,
  ): Promise<ConferenceTeamRelationship> {
    const conferenceTeamRelationship = new ConferenceTeamRelationship();

    conferenceTeamRelationship.year = newConferenceTeamRelationship.year;

    let conferenceName = await this.conferenceService.getConferenceByName(
      newConferenceTeamRelationship.conferenceName,
    );

    if (!conferenceName) {
      conferenceName = await this.conferenceService.createConference({
        name: newConferenceTeamRelationship.conferenceName,
      });
    }

    let teamName = await this.teamService.getTeamByName(
      newConferenceTeamRelationship.teamName,
    );

    if (!teamName) {
      teamName = await this.teamService.create(
        newConferenceTeamRelationship.teamName,
      );
    }

    conferenceTeamRelationship.conference = conferenceName;
    conferenceTeamRelationship.team = teamName;

    return await this.conferenceTeamRelationshipsRepository.save(
      conferenceTeamRelationship,
    );
  }
}
