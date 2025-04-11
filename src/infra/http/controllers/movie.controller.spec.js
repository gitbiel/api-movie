import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from './movie.controller.js';

import { registerMovieSchema } from './dto/register-movie.schema.js';
import { updateMovieSchema } from './dto/update-movies.schema.js';
import { formatZodErrors } from '../../../core/errors/format-zod-errors.js';

import { makeRegisterMovieUseCase } from '../../factories/register-movies.factory.js';
import { makeListAllMoviesUseCase } from '../../factories/list-all-movies.factory.js';
import { makeGetMovieDetailsUseCase } from '../../factories/get-movie-details.factory.js';
import { makeUpdateMovieUseCase } from '../../factories/update-movies.factory.js';
import { makeDeleteMovieUseCase } from '../../factories/delete-movies.factory.js';


vi.mock('../../factories/register-movies.factory.js', () => ({
  makeRegisterMovieUseCase: vi.fn(),
}));

vi.mock('../../factories/list-all-movies.factory.js', () => ({
  makeListAllMoviesUseCase: vi.fn(),
}));

vi.mock('../../factories/get-movie-details.factory.js', () => ({
  makeGetMovieDetailsUseCase: vi.fn(),
}));

vi.mock('../../factories/update-movies.factory.js', () => ({
  makeUpdateMovieUseCase: vi.fn(),
}));

vi.mock('../../../infra/factories/delete-movies.factory.js', () => ({
  makeDeleteMovieUseCase: vi.fn(),
}));

vi.mock('./dto/register-movie.schema.js', () => ({
  registerMovieSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock('./dto/update-movies.schema.js', () => ({
  updateMovieSchema: {
    safeParse: vi.fn(),
  },
}));

vi.mock('../../../core/errors/format-zod-errors.js', () => ({
  formatZodErrors: vi.fn(),
}));

describe('Movie Controller', () => {
  const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createMovie', () => {
    const mockReq = {
      body: {
        title: 'Interestelar',
        description: 'Um filme sobre espaço e tempo',
        releaseYear: 2014,
      },
    };

    it('deve criar um novo filme com sucesso', async () => {
      registerMovieSchema.safeParse.mockReturnValue({
        success: true,
        data: mockReq.body,
      });

      const mockUseCase = {
        execute: vi.fn().mockResolvedValue({ id: '123', ...mockReq.body }),
      };

      makeRegisterMovieUseCase.mockReturnValue(mockUseCase);

      await createMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ id: '123', ...mockReq.body });
    });

    it('deve retornar erro 400 se a validação falhar', async () => {
      const errors = [{ path: ['title'], message: 'Título obrigatório' }];
      registerMovieSchema.safeParse.mockReturnValue({
        success: false,
        error: { errors },
      });

      formatZodErrors.mockReturnValue(['Título obrigatório']);

      await createMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Erro de validação nos dados enviados.',
        details: ['Título obrigatório'],
      });
    });
  });

  describe('getAllMovies', () => {
    it('deve retornar todos os filmes com sucesso', async () => {
      const mockUseCase = {
        execute: vi.fn().mockResolvedValue([{ id: '1', title: 'Filme A' }]),
      };

      makeListAllMoviesUseCase.mockReturnValue(mockUseCase);

      await getAllMovies({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith([{ id: '1', title: 'Filme A' }]);
    });

    it('deve retornar erro 500 em caso de falha', async () => {
      makeListAllMoviesUseCase.mockImplementation(() => {
        throw new Error('Erro no banco');
      });

      await getAllMovies({}, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro ao listar filmes.' });
    });
  });

  describe('getMovieById', () => {
    const mockReq = { params: { id: '123' } };

    it('deve retornar os detalhes de um filme', async () => {
      const mockUseCase = {
        execute: vi.fn().mockResolvedValue({ id: '123', title: 'Filme A' }),
      };

      makeGetMovieDetailsUseCase.mockReturnValue(mockUseCase);

      await getMovieById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ id: '123', title: 'Filme A' });
    });

    it('deve retornar erro 404 se o filme não existir', async () => {
      const mockUseCase = {
        execute: vi.fn().mockRejectedValue(new Error('Filme não encontrado')),
      };

      makeGetMovieDetailsUseCase.mockReturnValue(mockUseCase);

      await getMovieById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Filme não encontrado' });
    });
  });

  describe('updateMovie', () => {
    const mockReq = {
      params: { id: '123' },
      body: { title: 'Atualizado', description: '...', releaseYear: 2020 },
    };

    it('deve atualizar um filme com sucesso', async () => {
      updateMovieSchema.safeParse.mockReturnValue({
        success: true,
        data: mockReq.body,
      });

      const mockUseCase = {
        execute: vi.fn().mockResolvedValue({ id: '123', ...mockReq.body }),
      };

      makeUpdateMovieUseCase.mockReturnValue(mockUseCase);

      await updateMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ id: '123', ...mockReq.body });
    });

    it('deve retornar erro 400 se a validação falhar', async () => {
      const errors = [{ path: ['title'], message: 'Título obrigatório' }];
      updateMovieSchema.safeParse.mockReturnValue({
        success: false,
        error: { errors },
      });

      formatZodErrors.mockReturnValue(['Título obrigatório']);

      await updateMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Erro de validação nos dados enviados.',
        details: ['Título obrigatório'],
      });
    });

    it('deve retornar erro 404 se o filme não for encontrado', async () => {
      updateMovieSchema.safeParse.mockReturnValue({
        success: true,
        data: mockReq.body,
      });

      const mockUseCase = {
        execute: vi.fn().mockRejectedValue(new Error('Filme não encontrado')),
      };

      makeUpdateMovieUseCase.mockReturnValue(mockUseCase);

      await updateMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Filme não encontrado' });
    });
  });

  describe('deleteMovie', () => {
    const mockReq = { params: { id: '123' } };

    it('deve deletar um filme com sucesso', async () => {
      const mockUseCase = {
        execute: vi.fn().mockResolvedValue(),
      };

      makeDeleteMovieUseCase.mockReturnValue(mockUseCase);

      await deleteMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.send).toHaveBeenCalled();
    });

    it('deve retornar erro 404 se o filme não for encontrado', async () => {
      const mockUseCase = {
        execute: vi.fn().mockRejectedValue(new Error('Filme não encontrado')),
      };

      makeDeleteMovieUseCase.mockReturnValue(mockUseCase);

      await deleteMovie(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Filme não encontrado' });
    });
  });
});
