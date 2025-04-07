import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/login', (req, res) => {
  res.json({ message: 'Login ainda não implementado 😅' });
});

export { authRoutes };
