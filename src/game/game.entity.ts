import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => Team, homeTeam => homeTeam.id) homeTeam: Team;
  @ManyToOne(type => Team, awayTeam => awayTeam.id) awayTeam: Team;
  @Column() homeTeamScore: number;
  @Column() awayTeamScore: number;
  @Column() date: Date;
  @Column({ nullable: true }) type: string;
  @Column({ nullable: true }) location: string;
  @Column() conferenceGame: boolean;
}
