import { describe, it, expect } from 'vitest';
import { DeleteMovieUseCase } from './delete-movies.usecase';
import { InMemoryMovieRepository } from '../../repositories/in-memory-movie.repository';

describe('DeleteMovieUseCase', () => {
  it('deve deletar um filme existente', async () => {
    const repository = new InMemoryMovieRepository();

    const createdMovie = await repository.create({
      title: 'Pra ser apagado',
      description: 'Esse vai sumir',
      releaseYear: 2022,
    });

    const useCase = new DeleteMovieUseCase(repository);

    await useCase.execute(createdMovie.id);

    const allMovies = await repository.findAll();
    expect(allMovies).toHaveLength(0);
  });

  it('deve lançar erro ao tentar deletar um filme inexistente', async () => {
    const repository = new InMemoryMovieRepository();
    const useCase = new DeleteMovieUseCase(repository);

    await expect(() =>
      useCase.execute('999')
    ).rejects.toThrowError('Filme não encontrado');
  });
});
