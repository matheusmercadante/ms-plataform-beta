import { getRepository, Repository } from 'typeorm';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findById(id: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { id },
    });

    return findCategory || undefined;
  }

  public async findByIds(ids: string[]): Promise<Category[] | undefined> {
    const findCategories = await this.ormRepository.findByIds(ids);

    return findCategories || undefined;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: { name },
    });

    return findCategory || undefined;
  }

  public async create({
    name,
    description,
    is_active,
  }: ICreateCategoryDTO): Promise<Category> {
    const createCategory = this.ormRepository.create({
      name,
      description,
      is_active,
    });

    await this.ormRepository.save(createCategory);

    return createCategory;
  }
}

export default CategoriesRepository;
