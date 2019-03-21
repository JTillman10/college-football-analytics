import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './game/game.module';
import { TeamModule } from './team/team.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), TeamModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
