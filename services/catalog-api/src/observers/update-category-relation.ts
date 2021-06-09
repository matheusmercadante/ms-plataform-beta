import { lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { repository } from '@loopback/repository';
import { CategoryRepository } from '@repositories/category/category.repository';
import { GenreRepository } from '@repositories/genre/genre.repository';

@lifeCycleObserver('')
class UpdateCategoryRelationObserver implements LifeCycleObserver {
  constructor(
    @repository(CategoryRepository)
    private categoryRepo: CategoryRepository,
    @repository(GenreRepository)
    private genreRepo: GenreRepository,
  ) {}

  async start(): Promise<void> {
    this.categoryRepo.modelClass.observe(
      'after save',
      async ({ where, data, isNewInstance }) => {
        if (isNewInstance) {
          return;
        }

        await this.genreRepo.updateRelation('categories', data);
      },
    );
  }

  async stop(): Promise<void> {}
}

export default UpdateCategoryRelationObserver;
