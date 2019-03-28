import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conference } from './conference.entity';
import { NewConference } from './models/new-conference';

@Injectable()
export class ConferenceService {
  constructor(
    @InjectRepository(Conference)
    private readonly conferenceRepository: Repository<Conference>,
  ) {}

  async getAllConference(): Promise<Conference[]> {
    return await this.conferenceRepository.find();
  }

  async getConferenceByName(name: string): Promise<Conference> {
    return await this.conferenceRepository.findOne({ where: { name } });
  }

  async createConference(newConference: NewConference): Promise<Conference> {
    return await this.conferenceRepository.save(newConference);
  }
}
