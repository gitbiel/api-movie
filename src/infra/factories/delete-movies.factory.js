import { DeleteMovieUseCase } from '../../domain/application/useCases/delete-movies/delete-movies.usecase.js';
import { MovieMongoRepository } from '../database/repositories/movie/movie-mongo.repository.js';

export function makeDeleteMovieUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new DeleteMovieUseCase(movieRepository);
}
