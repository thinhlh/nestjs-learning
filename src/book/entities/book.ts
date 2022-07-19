import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags";

@Entity()
export class Book {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column({ default: 0 })
    reccomendation: number

    @JoinTable({ name: "book_tag" })
    @ManyToMany(
        type => Tag,
        tag => tag.books,
        {
            cascade: true, // This will add a new Tag if not exists in the database 
        }
    )
    tags: Tag[];
}