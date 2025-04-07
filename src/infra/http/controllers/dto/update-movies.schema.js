import { z } from 'zod';

const MIN_RELEASE_YEAR = 1888;
const MAX_RELEASE_YEAR = new Date().getFullYear() + 5;

export const updateMovieSchema = z.object({
  title: z
    .string({
      required_error: 'O campo "title" é obrigatório.',
      invalid_type_error: 'O campo "title" deve ser uma string.',
    })
    .min(1, 'O campo "title" não pode estar vazio.')
    .refine((val) => val.trim().length > 0, {
      message: 'O campo "title" não pode conter apenas espaços.',
    })
    .refine((val) => !/^\s/.test(val), {
      message: 'O campo "title" não pode começar com espaços.',
    }),

  description: z
    .string({
      required_error: 'O campo "description" é obrigatório.',
      invalid_type_error: 'O campo "description" deve ser uma string.',
    })
    .min(1, 'O campo "description" não pode estar vazio.')
    .refine((val) => val.trim().length > 0, {
      message: 'O campo "description" não pode conter apenas espaços.',
    })
    .refine((val) => !/^\s/.test(val), {
      message: 'O campo "description" não pode começar com espaços.',
    }),

  releaseYear: z
    .number({
      required_error: 'O campo "releaseYear" é obrigatório.',
      invalid_type_error: 'O campo "releaseYear" deve ser um número.',
    })
    .int('O campo "releaseYear" deve ser um número inteiro.')
    .gte(
      MIN_RELEASE_YEAR,
      `O campo "releaseYear" deve ser maior ou igual a ${MIN_RELEASE_YEAR}.`
    )
    .lte(
      MAX_RELEASE_YEAR,
      `O campo "releaseYear" não pode ultrapassar o ano ${MAX_RELEASE_YEAR}.`
    ),
});
