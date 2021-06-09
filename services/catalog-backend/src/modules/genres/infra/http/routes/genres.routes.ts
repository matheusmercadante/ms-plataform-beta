import { Router } from 'express';

import GenresController from '@modules/genres/infra/http/controllers/GenresController';

const genresRouter = Router();
const genresController = new GenresController();

genresRouter.get('/', genresController.index);
genresRouter.post('/', genresController.create);

export default genresRouter;
