import mongoose from "mongoose";
import ErrorBase from "../erros/ErroBase.js";
import ReqErro from "../erros/ReqErro.js";
import ErroValidation from "../erros/ValidationError.js";
import NotFound from "../erros/NotFound.js";

function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new ReqErro().enviarResposta(res);
  } else if(erro instanceof mongoose.Error.ValidationError) {
    new ErroValidation(erro).enviarResposta(res);
  } else if(erro instanceof NotFound) {
    erro.enviarResposta(res);
  } else { 
    new ErrorBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
// manipuladorDeErros é um middleware de tratamento de erros para uma aplicação Express.