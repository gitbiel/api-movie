export class ListMoviesUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute(id) {
    if (id) {
      const movie = await this.movieRepository.findById(id);
      if (!movie) {
        throw new Error('Filme não encontrado.');
      }

      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
      };
    }

    const movies = await this.movieRepository.findAll();

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
    }));
  }
}
