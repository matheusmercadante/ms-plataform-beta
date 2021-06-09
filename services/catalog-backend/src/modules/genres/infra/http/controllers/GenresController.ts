import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGenreService from '@modules/genres/services/CreateGenreService';

class GenresController {
  public async index() {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, is_active, categories } = request.body;

    const genresRepository = container.resolve(CreateGenreService);

    const genre = await genresRepository.execute({
      name,
      is_active,
      categories,
    });

    return response.json(genre);
  }
}

export default GenresController;
