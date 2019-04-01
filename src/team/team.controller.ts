import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';

import { apiPrefix } from '../config';

import { TeamService } from './team.service';
import { Team } from './team.entity';
import { Game } from '../game/game.entity';
import { DateFilterCriteria } from './models/date-filter-criteria';

@Controller(`${apiPrefix}/teams`)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAllTeams();
  }

  @Post()
  async createTeams(@Body() names: string[]): Promise<Team[]> {
    return await this.teamService.createTeams(names);
  }

  @Get(':teamId/games')
  async getGamesByDateForTeamById(
    @Param('teamId') teamId: number,
    @Query('start') start: string,
    @Query('end') end: string,
  ): Promise<Game[]> {
    return await this.teamService.getGamesByDateForTeamById(teamId, start, end);
  }
}
