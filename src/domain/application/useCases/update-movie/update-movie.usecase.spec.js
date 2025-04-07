import { describe, it, expect } from 'vitest';
import { UpdateMovieUseCase } from './update-movie.usecase';
import { InMemoryMovieRepository } from '../../repositories/in-memory-movie.repository';

describe('UpdateMovieUseCase', () => {
  it('deve atualizar os dados de um filme existente', async () => {
    const repository = new InMemoryMovieRepository();

    const createdMovie = await repository.create({
      title: 'Filme Antigo',
      description: 'Descrição antiga',
      releaseYear: 2000,
    });

    const useCase = new UpdateMovieUseCase(repository);

    const updatedData = {
      title: 'Filme Atualizado',
      description: 'Descrição nova',
      releaseYear: 2024,
    };

    const result = await useCase.execute(createdMovie.id, updatedData);

    expect(result.title).toBe('Filme Atualizado');
    expect(result.description).toBe('Descrição nova');
    expect(result.releaseYear).toBe(2024);
  });

  it('deve lançar erro ao tentar atualizar um filme inexistente', async () => {
    const repository = new InMemoryMovieRepository();
    const useCase = new UpdateMovieUseCase(repository);

    await expect(() =>
      useCase.execute('999', {
        title: 'Inexistente',
      })
    ).rejects.toThrowError('Filme não encontrado');
  });
});
