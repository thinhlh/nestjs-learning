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
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: process.env.STAGE === 'development' ? true : false, // Should set to false for production
  }), BookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: "", method: RequestMethod.ALL },
        { path: "", method: RequestMethod.GET }
      ) // This is optional. The object passed can be the path with the method.

  }
}
