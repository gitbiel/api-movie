import { ZodError } from 'zod';

export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    const formatted = err.errors.map((e) => e.message);
    return res.status(400).json({
      error: 'Erro de validação.',
      details: formatted,
    });
  }

  console.error(err);

  return res.status(500).json({
    error: 'Erro interno do servidor.',
  });
}
