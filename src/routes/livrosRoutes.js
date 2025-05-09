import express from 'express';
import LivroController from '../controllers/controller';

const routes = express.Router();

routes.get('/livros', LivroController.listarLivros);