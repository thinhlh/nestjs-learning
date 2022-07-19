import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BookService } from './book/book.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
