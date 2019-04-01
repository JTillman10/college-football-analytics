import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Conference } from '../conference/conference.entity';
import { Team } from '../team/team.entity';

@Entity('conference_team_duration')
export class ConferenceTeamDuration {
  @PrimaryGeneratedColumn() id: number;

  @Column() startYear: string;
  @Column({ nullable: true }) endYear: string;

  @ManyToOne(type => Conference, conference => conference.id)
  conference: Conference;

  @ManyToOne(type => Team, team => team.id)
  team: Team;
}
