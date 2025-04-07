export class UpdateMovieUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(id, data) {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    return this.movieRepository.update(id, data);
  }
}
