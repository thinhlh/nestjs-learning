import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";

export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request URL: ', req.url);
        next();
    }
}