import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeORMError } from "typeorm";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { Book } from "./entities/book";
import { Tag } from "./entities/tags";

@Module({
    imports: [TypeOrmModule.forFeature([Book, Tag, Event])],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookService] // Book service need to be exported
})
export class BookModule {

}