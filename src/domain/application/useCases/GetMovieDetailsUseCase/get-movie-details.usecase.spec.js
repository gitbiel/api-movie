import { describe, it, expect } from 'vitest';
import { GetMovieDetailsUseCase } from './get-movie-details.usecase';
import { InMemoryMovieRepository } from '../../repositories/in-memory-movie.repository';

describe('GetMovieDetailsUseCase', () => {
  it('deve retornar os detalhes de um filme com dados da OMDb', async () => {
    const repository = new InMemoryMovieRepository();
    const fakeOmdbService = async () => ({
      poster: 'poster.jpg',
      plot: 'Sinopse fake',
      imdbRating: '8.7',
    });

    const movie = await repository.create({
      title: 'Matrix',
      description: 'Realidade simulada',
      releaseYear: 1999,
    });

    const useCase = new GetMovieDetailsUseCase(repository, fakeOmdbService);
    const result = await useCase.execute(movie.id);

    expect(result.title).toBe('Matrix');
    expect(result.externalData.imdbRating).toBe('8.7');
  });

  it('deve retornar erro se o filme não for encontrado', async () => {
    const repository = new InMemoryMovieRepository();
    const fakeOmdbService = async () => null;

    const useCase = new GetMovieDetailsUseCase(repository, fakeOmdbService);

    await expect(useCase.execute('999')).rejects.toThrow('Filme não encontrado.');
  });
});
