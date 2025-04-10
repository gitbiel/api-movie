import { getMovieDetailsFromOMDb } from '../../../../services/omd-service.js';

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

      const omdbData = await getMovieDetailsFromOMDb(movie.title);

      return {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        externalData: omdbData
          ? {
              poster: omdbData.poster,
              plot: omdbData.plot,
              imdbRating: omdbData.imdbRating,
            }
          : {
              message:
                'Informações complementares não encontradas para este filme.',
            },
      };
    }

    const movies = await this.movieRepository.findAll();

    const moviesWithOmdbData = await Promise.all(
      movies.map(async (movie) => {
        const omdbData = await getMovieDetailsFromOMDb(movie.title);

        return {
          id: movie.id,
          title: movie.title,
          description: movie.description,
          releaseYear: movie.releaseYear,
          externalData: omdbData
            ? {
                poster: omdbData.poster,
                plot: omdbData.plot,
                imdbRating: omdbData.imdbRating,
              }
            : {
                message:
                  'Informações complementares não encontradas para este filme.',
              },
        };
      })
    );

    return moviesWithOmdbData;
  }
}
