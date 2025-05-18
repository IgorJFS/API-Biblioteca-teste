import express from 'express';
import LivroController from '../controllers/controller.js';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);

export default routes;