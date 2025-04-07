import { UpdateMovieUseCase } from '../../domain/application/useCases/update-movie/update-movie.usecase.js';
import { MovieMongoRepository } from '../database/repositories/movie/movie-mongo.repository.js';

export function makeUpdateMovieUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new UpdateMovieUseCase(movieRepository);
}
