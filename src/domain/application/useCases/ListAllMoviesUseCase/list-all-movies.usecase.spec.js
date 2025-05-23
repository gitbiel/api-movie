import { describe, it, expect } from 'vitest';
import { ListAllMoviesUseCase } from './list-all-movies.usecase';
import { InMemoryMovieRepository } from '../../repositories/in-memory-movie.repository';

describe('ListAllMoviesUseCase', () => {
  it('deve listar todos os filmes cadastrados', async () => {
    const repository = new InMemoryMovieRepository();

    await repository.create({
      title: 'Interestelar',
      description: 'Exploração espacial',
      releaseYear: 2014,
    });

    await repository.create({
      title: 'Oppenheimer',
      description: 'Criador da bomba atômica',
      releaseYear: 2023,
    });

    const useCase = new ListAllMoviesUseCase(repository);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Interestelar');
    expect(result[1].title).toBe('Oppenheimer');
  });
});
