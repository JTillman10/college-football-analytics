import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class NewGame {
  @IsString() readonly homeTeamName: string;
  @IsString() readonly awayTeamName: string;
  @IsNumber() readonly homeTeamScore: number;
  @IsNumber() readonly awayTeamScore: number;
  @IsNumber() readonly year: number;
  @IsNumber() readonly month: number;
  @IsNumber() readonly day: number;
  @IsString() @IsOptional() readonly type: string;
  @IsString() @IsOptional() readonly location: string;
  @IsBoolean() readonly conferenceGame: boolean;
}
