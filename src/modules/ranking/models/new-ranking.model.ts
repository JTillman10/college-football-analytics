import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class NewRanking {
  @IsString() readonly teamName: string;
  @IsNumber() rank: number;
  // @IsDate() readonly date: Date;
  // @IsNumber() week: number;
  @IsNumber() @IsOptional() firstPlaceVotes: number;
  // @IsString() type: string;
}
