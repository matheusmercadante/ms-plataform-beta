import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@repositories/base.repository';
import { EsDataSourceService } from '@services/elasticsearch/es-data-source/es-data-source.service';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductRepository extends BaseRepository<
  Product,
  typeof Product.prototype.id
> {
  constructor(dataSource: EsDataSourceService) {
    super(Product, dataSource);
  }
}
