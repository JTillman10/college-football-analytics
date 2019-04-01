import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConferenceModule } from './modules/conference/conference.module';
import { ConferenceTeamRelationshipModule } from './modules/conference-team-duration/conference-team-duration.module';
import { GameModule } from './modules/game/game.module';
import { LoggerModule } from './logger/logger.module';
import { ParseDateMiddleware } from './middleware/parse-date.middleware';
import { PollModule } from './modules/poll/poll.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { TeamModule } from './modules/team/team.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
        { path: 'polls', method: RequestMethod.POST },
      );
  }
}
