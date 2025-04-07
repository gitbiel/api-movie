export class DeleteMovieUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(id) {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    await this.movieRepository.delete(id);
  }
}
