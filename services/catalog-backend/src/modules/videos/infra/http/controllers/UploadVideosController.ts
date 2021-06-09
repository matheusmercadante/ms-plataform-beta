import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUploadVideosService from '@modules/videos/services/UpdateUploadVideosService';

class UploadVideosController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { video_id, videoFilename } = request.body;
    const updateVideo = container.resolve(UpdateUploadVideosService);

    const video = await updateVideo.execute({
      video_id,
      videoFilename,
    });

    return response.json(classToClass(video));
  }
}

export default UploadVideosController;
