export function formatZodErrors(errors) {
  return errors.map((err) => {
    if (err.message) return err.message;

    const field = err.path?.[0] || 'campo desconhecido';

    switch (err.code) {
      case 'invalid_type':
        return `O campo "${field}" está com o tipo inválido (esperado: ${err.expected})`;
      case 'too_small':
        return `O campo "${field}" está muito curto`;
      case 'too_big':
        return `O campo "${field}" excede o tamanho permitido`;
      default:
        return `Erro no campo "${field}"`;
    }
  });
}
