import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';
import { TeamModule } from './team/team.module';
import { ConferenceModule } from './conference/conference.module';
import { ConferenceTeamRelationshipModule } from './conference-team-duration/conference-team-duration.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParseDateMiddleware } from './middleware/parse-date.middleware';
import { RankingModule } from './ranking/ranking.module';
import { PollModule } from './poll/poll.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TeamModule,
    GameModule,
    ConferenceModule,
    ConferenceTeamRelationshipModule,
    RankingModule,
    PollModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParseDateMiddleware)
      .forRoutes(
        { path: 'games', method: RequestMethod.POST },
        { path: 'rankings', method: RequestMethod.POST },
      );
  }
}
