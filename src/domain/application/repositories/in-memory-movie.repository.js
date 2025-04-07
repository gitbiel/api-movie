import { MovieRepository } from './movie-repository';

export class InMemoryMovieRepository extends MovieRepository {
  constructor() {
    super();
    this.movies = [];
  }

  async create(movieData) {
    const newMovie = {
      id: String(this.movies.length + 1),
      ...movieData,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  async findById(id) {
    return this.movies.find(movie => movie.id === id) || null;
  }

  async findAll() {
    return this.movies;
  }

  async update(id, movieData) {
    const index = this.movies.findIndex(movie => movie.id === id);
    if (index === -1) return null;

    this.movies[index] = {
      ...this.movies[index],
      ...movieData,
    };

    return this.movies[index];
  }

  async delete(id) {
    const index = this.movies.findIndex(movie => movie.id === id);
    if (index === -1) return false;

    this.movies.splice(index, 1);
    return true;
  }
}
