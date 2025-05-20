import express from "express";
import connectToDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexaoDB = await connectToDB();
conexaoDB.on("error", console.error.bind(console, "Erro de conexão:"));
conexaoDB.once("open", () => {
  console.log("Banco de dados conectado com sucesso!");
}
);

const app = express();
routes(app);

app.use(manipuladorDeErros);

export default app;

