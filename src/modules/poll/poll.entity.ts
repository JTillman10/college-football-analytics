import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ranking } from '../ranking/ranking.entity';

@Entity('poll')
export class Poll {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany(type => Ranking, ranking => ranking.id) rankings: Ranking[];
  @Column() type: string;
  @Column({ nullable: true }) date: Date;
  @Column() week: number;
  @Column() year: number;
}
