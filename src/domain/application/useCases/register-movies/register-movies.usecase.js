import { randomUUID } from 'node:crypto';

export class RegisterMovieUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute({ title, description, releaseYear }) {
    if (!title || !description || !releaseYear) {
      throw new Error('Título, Descrição e Ano são obrigatórios');
    }

    const id = randomUUID();

    return this.movieRepository.create({
      id,
      title,
      description,
      releaseYear,
    });
  }
}
