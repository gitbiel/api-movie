import { GetMovieDetailsUseCase } from '../../domain/application/useCases/GetMovieDetailsUseCase/get-movie-details.usecase.js';
import { MovieMongoRepository } from '../database/repositories/movie/movie-mongo.repository.js';
import { getMovieDetailsFromOMDb } from '../../services/omd-service.js';

export function makeGetMovieDetailsUseCase() {
  const movieRepository = new MovieMongoRepository();
  return new GetMovieDetailsUseCase(movieRepository, getMovieDetailsFromOMDb);
}
