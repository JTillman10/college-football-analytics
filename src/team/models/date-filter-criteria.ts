import { IsDate, IsOptional } from 'class-validator';

export class DateFilterCriteria {
  @IsDate() @IsOptional() readonly start: Date;
  @IsDate() @IsOptional() readonly end: Date;
}
