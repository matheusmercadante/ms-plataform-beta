import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Video from '../infra/typeorm/entities/Video';
import IVideosRepository from '../repositories/IVideosRepository';

interface Request {
  title: string;
  description: string;
  year_launched: number;
  opened: boolean;
}

@injectable()
class CreateVideoservice {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
  ) {}

  public async execute({
    title,
    description,
    year_launched,
    opened,
  }: Request): Promise<Video> {
    const findVideoInSameName = await this.videosRepository.findByTitle(title);

    if (findVideoInSameName) {
      throw new AppError('This video is already named');
    }

    const Video = await this.videosRepository.create({
      title,
      description,
      year_launched,
      opened,
    });

    return Video;
  }
}

export default CreateVideoservice;
