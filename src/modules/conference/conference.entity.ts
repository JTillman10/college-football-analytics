import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ConferenceTeamDuration } from '../conference-team-duration/conference-team-duration.entity';

@Entity('conference')
export class Conference {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(
    type => ConferenceTeamDuration,
    conferenceTeamDuration => conferenceTeamDuration.conference,
  )
  conferenceTeamDurations: ConferenceTeamDuration;
}
