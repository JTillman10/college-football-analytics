import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';
import { Game } from '../game/game.entity';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams(): Promise<Team[]> {
    return await this.teamService.getAllTeams();
  }

  @Get(':teamId/games')
  async getAllGamesForTeamById(
    @Param('teamId') teamId: number,
  ): Promise<Game[]> {
    return await this.teamService.getAllGamesForTeamById(teamId);
  }

  @Post('teamId/games')
  async getGamesByDateForTeamById(
    @Param('teamId') teamId: number,
    @Body() filterCriteria,
  ): Promise<Game[]> {
    return await this.teamService.getGamesByDateForTeamById(
      teamId,
      filterCriteria,
    );
  }
}
