import { DynamicModule, Inject, Injectable, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { async } from "rxjs";
import { ConnectionOptions } from "tls";
import { createConnection, DataSource, DataSourceOptions, TypeORMError } from "typeorm";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { Book } from "./entities/book";
import { Tag } from "./entities/tags";


export class MockBookService { }

export class ConfigService { }
export class DevConfigService { }
export class ProdConfigService { }

@Injectable()
export class SampleFactoryProvider {
    create(): string[] {
        return ['Kotonoha no niwa', '5cm/s'];
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Book, Tag, Event])],
    controllers: [BookController],
    providers: [
        BookService, {
            provide: "PUBLISHERS",
            useValue: ["NPM", "KD"]
        },
        {
            provide: BookService,
            useValue: new MockBookService()
        }, {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevConfigService : ProdConfigService
        },
        SampleFactoryProvider,
        {
            inject: [SampleFactoryProvider],
            provide: 'SAMPLE_FACTORY_PROVIDER',
            async useFactory(sampleFactoryProvider: SampleFactoryProvider) {
                return sampleFactoryProvider.create()
            },
        }
    ],
    exports: [BookService] // Book service need to be exported
})
export class BookModule {

}

@Module({})
export class SampleDynamicModule {
    static register(options: DataSourceOptions): DynamicModule {
        return {
            module: SampleDynamicModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: new DataSource(options)
                }
            ]
        }
    }
}