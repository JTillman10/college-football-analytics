import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Conference } from '../conference/conference.entity';
import { Team } from '../team/team.entity';

@Entity('conference_team_relationship')
export class ConferenceTeamRelationship {
  @PrimaryGeneratedColumn() id: number;

  @Column() year: string;

  @ManyToOne(type => Conference, conference => conference.id)
  conference: Conference;

  @ManyToOne(type => Team, team => team.id)
  team: Team;
}
