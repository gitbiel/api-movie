export class ListAllMoviesUseCase {
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async execute() {
    return this.movieRepository.findAll();
  }
}
