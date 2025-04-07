import express from 'express';
import movieController from './http/controllers/movie.controller.js';
import { errorHandler } from './http/middlewares/error-handler.js';

const app = express();

app.use(express.json());
app.use('/movies', movieController);
app.use(errorHandler);

export default app;
