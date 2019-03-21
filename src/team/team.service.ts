import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';

import { Game } from '../game/game.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
  ) {}

  async getTeamById(id: number): Promise<Team> {
    return await this.teamRepository.findOne({ id });
  }

  async getTeamByName(name: string): Promise<Team> {
    return await this.teamRepository.findOne({ name });
  }

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.find();
  }

  async getAllGamesForTeamById(teamId: number): Promise<Game[]> {
    const team = await this.getTeamById(teamId);
    return await this.gameRepository.find({
      where: [{ homeTeam: team }, { awayTeam: team }],
    });
  }

  async getGamesByDateForTeamById(
    teamId: number,
    filterCritera,
  ): Promise<Game[]> {
    const team = await this.getTeamById(teamId);
    return await this.gameRepository.find({
      where: [{ homeTeam: team }, { awayTeam: team }],
    });
  }

  async create(name: string): Promise<Team> {
    const newTeam = new Team();
    newTeam.name = name;
    return await this.teamRepository.save(newTeam);
  }
}
