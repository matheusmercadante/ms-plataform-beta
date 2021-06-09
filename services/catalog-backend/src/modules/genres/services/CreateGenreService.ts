import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Genre from '../infra/typeorm/entities/Genre';
import IGenresRepository from '../repositories/IGenresRepository';

interface Request {
  name: string;
  is_active: boolean;
  categories: string[];
}

@injectable()
class CreateGenreService {
  constructor(
    @inject('GenresRepository')
    private genresRepository: IGenresRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    is_active,
    categories,
  }: Request): Promise<Genre> {
    const findGenreInSameName = await this.genresRepository.findByName(name);

    if (findGenreInSameName) {
      throw new AppError('This genre is already named');
    }

    if (categories.length === 0) {
      throw new AppError(`To create a genre, need one or more category`);
    }

    const existCategories = await this.categoriesRepository.findByIds(
      categories,
    );

    if (existCategories?.length !== categories.length) {
      throw new AppError(`Some category does not exist`);
    }

    const genre = await this.genresRepository.create({
      name,
      is_active,
      categories: existCategories,
    });

    return genre;

    // if (categories) {
    //   const existCategories = await this.categoriesRepository.findByIds(
    //     categories,
    //   );

    //   if (existCategories?.length !== categories.length) {
    //     throw new AppError(`Some category does not exist`);
    //   }

    //   const genre = await this.genresRepository.create({
    //     name,
    //     is_active,
    //     categories: existCategories,
    //   });

    //   return genre;
    // }

    // const genre = await this.genresRepository.create({
    //   name,
    //   is_active,
    // });

    // return genre;
  }
}

export default CreateGenreService;
