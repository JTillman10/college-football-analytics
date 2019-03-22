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

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TeamModule,
    GameModule,
    ConferenceModule,
    ConferenceTeamRelationshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ParseDateMiddleware)
      .forRoutes({ path: 'games', method: RequestMethod.POST });
  }
}
