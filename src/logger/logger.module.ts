import { Module } from '@nestjs/common';
import { CFBAnalyticsLoggerService } from './logger.service';

@Module({
  providers: [CFBAnalyticsLoggerService],
  exports: [CFBAnalyticsLoggerService],
})
export class LoggerModule {}
