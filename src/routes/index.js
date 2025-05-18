import express from 'express';
import livro from './livrosRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ title: 'Curso de Node' });
  });

  app.use(express.json(), livro);
}

export default routes;