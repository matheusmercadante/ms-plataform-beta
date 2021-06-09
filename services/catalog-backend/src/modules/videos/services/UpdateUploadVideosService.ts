import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVideosRepository from '../repositories/IVideosRepository';
import Video from '../infra/typeorm/entities/Video';

interface Request {
  video_id: string;
  videoFilename: string;
}

@injectable()
class UpdateUploadVideosService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ video_id, videoFilename }: Request): Promise<Video> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('This video not exists');
    }

    if (video.video) {
      await this.storageProvider.deleteFile(video.video);
    }

    const filename = await this.storageProvider.saveFile(videoFilename);

    video.video = filename;

    await this.videosRepository.save(video);

    return video;
  }
}

export default UpdateUploadVideosService;
