import { ListAllMoviesUseCase } from '../../domain/application/useCases/ListAllMoviesUseCase/list-all-movies.usecase.js';
import { MovieMongoRepository } from '../database/repositories/movie/movie-mongo.repository.js';

export function makeListAllMoviesUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new ListAllMoviesUseCase(movieRepository);
}
