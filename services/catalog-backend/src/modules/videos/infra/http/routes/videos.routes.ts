import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import VideosController from '@modules/videos/infra/http/controllers/VideosController';
import UploadVideosController from '../controllers/UploadVideosController';

const videosRouter = Router();
const upload = multer(uploadConfig.multer);
const videosController = new VideosController();
const uploadVideosController = new UploadVideosController();

videosRouter.get('/', videosController.index);
videosRouter.post('/', videosController.create);
videosRouter.patch(
  '/video',
  upload.single('video'),
  uploadVideosController.update,
);

export default videosRouter;
