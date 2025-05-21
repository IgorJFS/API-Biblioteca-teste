import ReqErro from "./ReqErro.js";

class ErroValidation extends ReqErro {
  constructor(erro) {
    const mensagensErros = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensErros}`);
  }
}

export default ErroValidation;