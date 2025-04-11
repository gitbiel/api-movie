import jwt from 'jsonwebtoken';

export function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const userIdDecoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = userIdDecoded; 
    next();
  } catch (err) {
    console.error('Erro ao verificar o token:', err);
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}

