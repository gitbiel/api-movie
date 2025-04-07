import express from 'express';
import { routes } from './http/routes/index.js';
import { errorHandler } from './http/middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use('/api', routes); // prefixo para todas as rotas
app.use(errorHandler);

export default app;
