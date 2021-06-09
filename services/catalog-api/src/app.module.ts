import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ElasticsearchModule } from '@services/elasticsearch/elasticsearch.module';
import { CommandsModule } from './commands/commands.module';

import { ProductController, CategoryController } from './controllers';

import { CategoryRepository, ProductRepository } from './repositories';

import { CategoriesDefaultInterceptor } from './interceptors/categories-default.interceptor';
import { SearchController } from './controllers/search/search.controller';
import { RabbitmqModule } from '@services/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule,
    RabbitmqModule,
    CommandsModule,
  ],
  // controllers: [CategoryController, ProductController, SearchController],
  controllers: [],
  providers: [
    CategoryRepository,
    ProductRepository,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CategoriesDefaultInterceptor,
    // },
  ],
})
export class AppModule {}
