import { IsArray, IsString } from "class-validator";

export class CreateBookDTO {

    @IsString()
    readonly title: string;

    @IsString()
    readonly author: string;

    @IsString({ each: true })
    readonly tags: string[];
}
