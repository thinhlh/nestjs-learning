import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, Redirect, Req, Request, Res } from "@nestjs/common";
import { Response } from "express";
import { Book } from "./entities/book";
import { BookService } from "./book.service";
import { UpdateBookDto } from "./dto/update-book.dto";
import { CreateBookDTO } from "./dto/create-book.dto";
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";


@Controller('/common')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Get("/ping/:id") // Router
  // @Redirect("https://www.google.com", 302) // Redirect to Google
  @HttpCode(HttpStatus.OK) // Status code response
  async ping(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateBookDTO,
    @Query('isSort', ParseBoolPipe) isSort: boolean,
    @Param('id', ParseIntPipe) id: number
  ): Promise<any> {
    req // Request
    res // Response => Must be handle either by using express or fastify. If this field is declared, response must be handled
    body // Body
    isSort // Query
    id // Param
    console.log(id); // Param with name
    res.json({ data: body });
  }

  @Get("/books")
  async findBooks(@Query() query: PaginationQueryDto): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post("/book")
  async createBook(@Body() bookDTO: CreateBookDTO): Promise<Book> {
    return this.bookService.create(bookDTO);
  }

  @Patch("/book/:id")
  async updateBook(@Body() updateBookDTO: UpdateBookDto, @Param('id') id: string): Promise<Book> {
    updateBookDTO.id = id;
    return this.bookService.update(updateBookDTO);
  }

  @Delete("/book/:id")
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.delete(id);
  }
}

