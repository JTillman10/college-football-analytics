import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './team/team.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
