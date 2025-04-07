import { Router } from 'express';
import { registerMovieSchema } from './dto/register-movie.schema.js';
import { updateMovieSchema } from '../controllers/dto/update-movies.schema.js'
import { makeRegisterMovieUseCase } from '../../factories/register-movies.factory.js';
import { makeListMoviesUseCase } from '../../factories/list-movies.factory.js';
import { formatZodErrors } from '../../../core/errors/format-zod-errors.js';
import { makeDeleteMovieUseCase } from '../../../infra/factories/delete-movies.factory.js';
import { makeUpdateMovieUseCase } from '../../factories/update-movies.factory.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const result = registerMovieSchema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = formatZodErrors(result.error.errors);
      return res.status(400).json({
        error: 'Erro de validação nos dados enviados.',
        details: formattedErrors,
      });
    }

    const registerMovieUseCase = makeRegisterMovieUseCase();
    const movie = await registerMovieUseCase.execute(result.data);

    return res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const listMoviesUseCase = makeListMoviesUseCase();
    const movies = await listMoviesUseCase.execute();

    return res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao listar filmes.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovieUseCase = makeDeleteMovieUseCase();
    await deleteMovieUseCase.execute(id);

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const listMoviesUseCase = makeListMoviesUseCase();
    const movie = await listMoviesUseCase.execute(id);

    return res.status(200).json(movie);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
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

    const updateMovieUseCase = makeUpdateMovieUseCase();
    const updatedMovie = await updateMovieUseCase.execute(id, result.data);

    return res.status(200).json(updatedMovie);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err.message });
  }
});

export default router;
