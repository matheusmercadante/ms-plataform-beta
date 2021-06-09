import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '@modules/categories/infra/typeorm/entities/Category';

interface CategoriesRepository {
  findById(id: string): Promise<Category | undefined>;
  findByIds(ids: string[]): Promise<Category[] | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
}

export default CategoriesRepository;
