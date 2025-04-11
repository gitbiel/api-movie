import { registerMovieSchema } from './dto/register-movie.schema.js';
import { updateMovieSchema } from './dto/update-movies.schema.js';
import { formatZodErrors } from '../../../core/errors/format-zod-errors.js';

import { makeRegisterMovieUseCase } from '../../factories/register-movies.factory.js';
import { makeListAllMoviesUseCase } from '../../factories/list-all-movies.factory.js';
import { makeGetMovieDetailsUseCase } from '../../factories/get-movie-details.factory.js';
import { makeDeleteMovieUseCase } from '../../../infra/factories/delete-movies.factory.js';
import { makeUpdateMovieUseCase } from '../../factories/update-movies.factory.js';

export async function createMovie(req, res) {
  try {
    const result = registerMovieSchema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = formatZodErrors(result.error.errors);
      return res.status(400).json({
        error: 'Erro de validação nos dados enviados.',
        details: formattedErrors,
      });
    }

    const useCase = makeRegisterMovieUseCase();
    const movie = await useCase.execute(result.data);

    return res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}

export async function getAllMovies(_req, res) {
  try {
    const useCase = makeListAllMoviesUseCase();
    const movies = await useCase.execute();
    return res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar filmes.' });
  }
}

export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const useCase = makeGetMovieDetailsUseCase();
    const movie = await useCase.execute(id);
    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
}


export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const result = updateMovieSchema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = formatZodErrors(result.error.errors);
      return res.status(400).json({
        error: 'Erro de validação nos dados enviados.',
        details: formattedErrors,
      });
    }

    const useCase = makeUpdateMovieUseCase();
    const updatedMovie = await useCase.execute(id, result.data);
    return res.status(200).json(updatedMovie);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const useCase = makeDeleteMovieUseCase();
    await useCase.execute(id);
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
}
