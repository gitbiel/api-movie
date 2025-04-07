import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterMovieUseCase } from './register-movies.usecase.js';
import { InMemoryMovieRepository } from '../../repositories/in-memory-movie.repository.js';

let useCase;

describe('RegisterMovieUseCase', () => {
  beforeEach(() => {
    const repo = new InMemoryMovieRepository();
    useCase = new RegisterMovieUseCase(repo);
  });

  it('deve registrar um filme com sucesso', async () => {
    const movieData = {
      title: 'Matrix',
      description: 'Um hacker descobre a verdade sobre a realidade.',
      releaseYear: 1999,
    };

    const result = await useCase.execute(movieData);

    expect(result).toMatchObject(movieData);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('string');
  });
});
