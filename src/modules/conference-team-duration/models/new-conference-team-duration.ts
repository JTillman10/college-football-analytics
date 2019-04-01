import { IsString, IsOptional } from 'class-validator';

export class NewConferenceTeamDuration {
  @IsString() startYear: string;
  @IsString() @IsOptional() endYear: string;
  @IsString() conferenceName: string;
  @IsString() teamName: string;
}
