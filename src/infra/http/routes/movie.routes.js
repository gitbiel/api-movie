import { Router } from 'express';

import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from '../controllers/movie.controller.js';

const movieRoutes = Router();

movieRoutes.post('/', createMovie);
movieRoutes.get('/', getAllMovies);
movieRoutes.get('/:id', getMovieById);
movieRoutes.put('/:id', updateMovie);
movieRoutes.delete('/:id', deleteMovie);

export { movieRoutes };
