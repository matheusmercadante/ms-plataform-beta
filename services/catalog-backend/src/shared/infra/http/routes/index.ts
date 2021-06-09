import { Router } from 'express';

import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import genresRouter from '@modules/genres/infra/http/routes/genres.routes';
import videosRouter from '@modules/videos/infra/http/routes/videos.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/genres', genresRouter);
routes.use('/videos', videosRouter);

export default routes;
