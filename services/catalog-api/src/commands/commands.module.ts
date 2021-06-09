import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { CategoryRepository } from '@repositories/category/category.repository';
import { ProductRepository } from '@repositories/product/product.repository';
import { FixturesService } from './fixtures/fixtures.service';
import { EsDataSourceService } from '@services/elasticsearch/es-data-source/es-data-source.service';

@Module({
  imports: [ConsoleModule],
  providers: [
    FixturesService,
    EsDataSourceService,
    CategoryRepository,
    ProductRepository,
  ],
})
export class CommandsModule {}
