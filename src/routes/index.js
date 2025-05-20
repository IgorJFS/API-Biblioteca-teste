import express from "express";
import livro from "./livrosRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Curso de Node" });
  });

  app.use(express.json(), livro, autores);
};

export default routes;