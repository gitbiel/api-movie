export class GetMovieDetailsUseCase {
  constructor(movieRepository, getMovieDetails) {
    this.movieRepository = movieRepository;
    this.getMovieDetails = getMovieDetails;
  }

  async execute(id) {
    const movie = await this.movieRepository.findById(id);
    if (!movie) throw new Error('Filme não encontrado.');

    const omdbData = await this.getMovieDetails(movie.title);

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
      externalData: omdbData
        ? omdbData
        : { message: 'Informações complementares não encontradas para este filme.' },
    };
  }
}
