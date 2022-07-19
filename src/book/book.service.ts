import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { title } from "process";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";
import { Event } from "src/event/entities/event.entity";
import { Connection, DataSource, Repository } from "typeorm";
import { CreateBookDTO } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book";
import { Tag } from "./entities/tags";

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>,

        private readonly dataSource: DataSource,
    ) { }

    async create(createBookDTO: CreateBookDTO) {

        const tags = await Promise.all(createBookDTO.tags.map((title) => this.preloadTagByTitle(title)));

        const book = this.bookRepository.create({
            ...createBookDTO,
            tags: tags,
        })

        return this.bookRepository.save(book);
    }

    findAll(query: PaginationQueryDto): Promise<Book[]> {
        return this.bookRepository.find({
            relations: ['tags'],
            take: query.limit,
            skip: query.offset,
        });
    }

    async findOne(id: string): Promise<Book> {
        const book = this.bookRepository.findOneBy({ id });
        if (book === null) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async update(updateBookDTO: UpdateBookDto): Promise<Book> {

        const tags = updateBookDTO && await Promise.all(updateBookDTO.tags.map((title) => this.preloadTagByTitle(title)));

        // Get the object book or undefined if none. Then update the object from the update book DTO.
        const book = await this.bookRepository.preload({
            id: updateBookDTO.id,
            ...updateBookDTO,
            tags: tags,
        });

        if (!book) {
            // Do something to update
            throw new NotFoundException('Book not found');
        }
        return this.bookRepository.save(book);
    }

    async delete(id: string) {
        const book = await this.findOne(id);
        return this.bookRepository.remove(book);
    }

    // create or get an existing tag by title
    async preloadTagByTitle(title: string): Promise<Tag> {
        const existingTag = await this.tagRepository.findOneBy({
            title
        });

        if (existingTag) {
            return existingTag;
        } else {
            return this.tagRepository.create({ title });
        }
    }

    async recommendBook(book: Book) {
        await this.dataSource.transaction(async (entityManager) => {
            book.reccomendation++;
            entityManager.save(book);

            const event = new Event();

            event.name = "recommend_book";
            event.type = "book";
            event.payload = { coffeeId: book.id };

            entityManager.save(event)
        })
    }
}