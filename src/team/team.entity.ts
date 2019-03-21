import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Game } from 'src/game/game.entity';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column({ nullable: true }) image: string;
  @Column({ nullable: true }) city: string;
  @Column({ nullable: true }) state: string;
  @OneToMany(type => Game, game => game.homeTeam) homeTeams: Team[];
  @OneToMany(type => Game, game => game.homeTeam) awayTeams: Team[];
}
