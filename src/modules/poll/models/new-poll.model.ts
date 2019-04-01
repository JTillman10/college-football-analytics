import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  IsOptional,
} from 'class-validator';
import { NewRanking } from '../../ranking/models/new-ranking.model';

export class NewPoll {
  @IsArray() readonly rankings: NewRanking[];
  @IsDate() @IsOptional() readonly date: Date;
  @IsNumber() week: number;
  @IsString() type: string;
  @IsNumber() year: number;
}
