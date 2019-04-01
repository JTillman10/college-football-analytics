import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Team } from '../team/team.entity';
import { Poll } from '../poll/poll.entity';

@Entity('ranking')
export class Ranking {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => Team, team => team.id) team: Team;
  @ManyToOne(type => Poll, poll => poll.id) poll: Poll;
  // @Column({ nullable: true }) firstPlaceVotes: number;
  @Column() rank: number;
}
