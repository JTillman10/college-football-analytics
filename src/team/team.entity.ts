import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Game } from '../game/game.entity';
import { ConferenceTeamDuration } from '../conference-team-duration/conference-team-duration.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column({ nullable: true }) image: string;
  @Column({ nullable: true }) city: string;
  @Column({ nullable: true }) state: string;
  @OneToMany(type => Game, game => game.homeTeam) homeTeams: Team[];
  @OneToMany(type => Game, game => game.homeTeam) awayTeams: Team[];
  @OneToMany(
    type => ConferenceTeamDuration,
    conferenceTeamDuration => conferenceTeamDuration.team,
  )
  conferenceTeamDurations: ConferenceTeamDuration;
}
