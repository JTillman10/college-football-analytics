import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ParseDateMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.body) {
      req.body.forEach(game => {
        game.date = new Date(game.date);
      });
    }

    next();
  }
}
