import { Controller, Get } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from './team.entity';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams(): Promise<Team[]> {
    return this.teamService.getAllTeams();
  }
}
