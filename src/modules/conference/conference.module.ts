import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConferenceController } from './conference.controller';
import { Conference } from './conference.entity';
import { ConferenceService } from './conference.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conference])],
  controllers: [ConferenceController],
  providers: [ConferenceService],
  exports: [ConferenceService],
})
export class ConferenceModule {}
