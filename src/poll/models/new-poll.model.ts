import { IsString, IsNumber, IsDate, IsArray } from 'class-validator';
import { NewRanking } from '../../ranking/models/new-ranking.model';

export class NewPoll {
  @IsArray() readonly rankings: NewRanking[];
  @IsDate() readonly date: Date;
  @IsNumber() week: number;
  @IsString() type: string;
  @IsNumber() year: number;
}
