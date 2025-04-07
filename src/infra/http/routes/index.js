import { Router } from 'express';
import { movieRoutes } from './movie.routes.js';
import { authRoutes } from './auth.routes.js';

const routes = Router();

routes.use('/movies', movieRoutes);
routes.use('/auth', authRoutes);

export { routes };
