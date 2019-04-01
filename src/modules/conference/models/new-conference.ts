import { IsString } from 'class-validator';

export class NewConference {
  @IsString() readonly name: string;
}
