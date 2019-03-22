import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConferenceTeamDuration } from 'src/conference-team-duration/conference-team-duration.entity';

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
