import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ConferenceTeamRelationship } from 'src/conference-team-relationship/conference-team-relationship.entity';

@Entity('conference')
export class Conference {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(
    type => ConferenceTeamRelationship,
    conferenceTeamRelationship => conferenceTeamRelationship.conference,
  )
  conferenceTeamRelationships: ConferenceTeamRelationship;
}
