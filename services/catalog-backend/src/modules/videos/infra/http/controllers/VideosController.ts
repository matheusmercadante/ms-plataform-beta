import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVideosService from '@modules/videos/services/CreateVideosService';

class VideosController {
  public async index() {}

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, year_launched, opened } = request.body;

    const videosRepository = container.resolve(CreateVideosService);

    const video = await videosRepository.execute({
      title,
      description,
      year_launched,
      opened,
    });

    return response.json(video);
  }
}

export default VideosController;
