import { Category } from '../../models/category.model';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@repositories/base.repository';
import { EsDataSourceService } from '@services/elasticsearch/es-data-source/es-data-source.service';

@Injectable()
export class CategoryRepository extends BaseRepository<
  Category,
  typeof Category.prototype.id
> {
  constructor(dataSource: EsDataSourceService) {
    super(Category, dataSource);
  }
}
