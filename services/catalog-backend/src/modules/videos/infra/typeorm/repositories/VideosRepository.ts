import { getRepository, Repository } from 'typeorm';

import Video from '../entities/Video';
import ICreateVideoDTO from '@modules/videos/dtos/ICreateVideoDTO';
import IVideosRepository from '@modules/videos/repositories/IVideosRepository';

class VideosRepository implements IVideosRepository {
  private ormRepository: Repository<Video>;

  constructor() {
    this.ormRepository = getRepository(Video);
  }

  public async findById(video_id: string): Promise<Video | undefined> {
    const video = await this.ormRepository.findOne(video_id);

    return video;
  }

  public async findByTitle(name: string): Promise<Video | undefined> {
    const video = await this.ormRepository.findOne({
      where: { name },
    });

    return video || undefined;
  }

  public async create({
    title,
    description,
    opened,
    year_launched,
  }: ICreateVideoDTO): Promise<Video> {
    const video = this.ormRepository.create({
      title,
      description,
      opened,
      year_launched,
    });

    await this.ormRepository.save(video);

    return video;
  }

  public async save(video: Video): Promise<Video> {
    return this.ormRepository.save(video);
  }
}

export default VideosRepository;
