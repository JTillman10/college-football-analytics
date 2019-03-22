import { IsString } from 'class-validator';

export class NewConferenceTeamRelationship {
  @IsString() year: string;
  @IsString() conferenceName: string;
  @IsString() teamName: string;
}
