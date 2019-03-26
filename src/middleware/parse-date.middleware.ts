import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ParseDateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.body) {
      req.body.forEach(item => {
        item.date = new Date(item.date);
      });
    }

    next();
  }
}
