import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryService from '@modules/categories/services/CreateCategoryService';

class CategoriesController {
  public async index() {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, is_active } = request.body;

    const categoriesRepository = container.resolve(CreateCategoryService);

    const category = await categoriesRepository.execute({
      name,
      description,
      is_active,
    });

    return response.json(category);
  }
}

export default CategoriesController;
