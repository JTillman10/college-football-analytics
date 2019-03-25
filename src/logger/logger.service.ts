import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class CFBAnalyticsLoggerService extends Logger {}
