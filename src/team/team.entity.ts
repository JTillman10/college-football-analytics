import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team')
export class Team {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
  @Column() image: string;
  @Column() conference: string;
  @Column() city: string;
  @Column() state: string;
}
