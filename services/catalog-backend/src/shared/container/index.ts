import { container } from 'tsyringe';

import './providers';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';

import IGenresRepository from '@modules/genres/repositories/IGenresRepository';
import GenresRepository from '@modules/genres/infra/typeorm/repositories/GenresRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IGenresRepository>(
  'GenresRepository',
  GenresRepository,
);
