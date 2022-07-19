import { PartialType } from "@nestjs/mapped-types";
import { Book } from "../entities/book";
import { CreateBookDTO } from "./create-book.dto";

export class UpdateBookDto extends PartialType(CreateBookDTO) {
    id: string;
}