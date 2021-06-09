import Category from '@modules/categories/infra/typeorm/entities/Category';

interface CreateGenreDTO {
  name: string;
  is_active: boolean;
  categories: Category[];
}

export default CreateGenreDTO;
