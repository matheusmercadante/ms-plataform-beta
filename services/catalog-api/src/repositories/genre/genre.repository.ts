import { Injectable } from '@nestjs/common';

import { BaseRepository } from '@repositories/base.repository';
import { EsDataSourceService } from '@services/elasticsearch/es-data-source/es-data-source.service';
import { Genre, GenreRelations } from '../../models/';

@Injectable()
export class GenreRepository extends BaseRepository<
  Genre,
  typeof Genre.prototype.id,
  GenreRelations
> {
  constructor(dataSource: EsDataSourceService) {
    super(Genre, dataSource);
  }
}
