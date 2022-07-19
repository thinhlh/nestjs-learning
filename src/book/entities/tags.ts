import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @ManyToMany(type => Book, book => book.tags)
    books: Book[];
}