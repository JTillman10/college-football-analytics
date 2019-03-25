import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

export class NewGame {
  @IsString() readonly homeTeamName: string;
  @IsString() readonly awayTeamName: string;
  @IsNumber() readonly homeTeamScore: number;
  @IsNumber() readonly awayTeamScore: number;
  @IsDate() readonly date: Date;
  // @IsDateString() readonly date: Date;
  @IsString() @IsOptional() readonly type: string;
  @IsString() @IsOptional() readonly location: string;
  @IsBoolean() readonly conferenceGame: boolean;
}
