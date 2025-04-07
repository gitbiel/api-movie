import { RegisterMovieUseCase } from '../../domain/application/useCases/register-movies/register-movies.usecase.js';
import { MovieMongoRepository } from '../../infra/database/repositories/movie/movie-mongo.repository.js';

export function makeRegisterMovieUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new RegisterMovieUseCase(movieRepository);
}
