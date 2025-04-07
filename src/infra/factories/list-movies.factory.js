import { ListMoviesUseCase } from '../../domain/application/useCases/list-movies/list-movies.usecase.js';
import { MovieMongoRepository } from '../../infra/database/repositories/movie/movie-mongo.repository.js';


export function makeListMoviesUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new ListMoviesUseCase(movieRepository);
}
