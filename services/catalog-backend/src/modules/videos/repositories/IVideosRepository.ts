import Video from '@modules/videos/infra/typeorm/entities/Video';
import ICreateVideoDTO from '@modules/videos/dtos/ICreateVideoDTO';

interface VideosRepository {
  findById(video_id: string): Promise<Video | undefined>;
  findByTitle(title: string): Promise<Video | undefined>;
  create(data: ICreateVideoDTO): Promise<Video>;
  save(video: Video): Promise<Video>;
}

export default VideosRepository;
