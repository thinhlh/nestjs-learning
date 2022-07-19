import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  providers: [AppService],
  controllers: [AppController],
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true, // Should set to false for production
  }), BookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "", method: RequestMethod.ALL }, { path: "", method: RequestMethod.GET }) // This is optional. The object passed can be the path with the method.

  }
}
