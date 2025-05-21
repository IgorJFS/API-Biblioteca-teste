import autor from "../models/Autor.js";
import NotFound from "../erros/NotFound.js";

class AutorController {

  static  listarAutores = async(req, res, next) => {
    try {
      const autores = await autor.find({});
      res.status(200).json(autores);
    } catch (error) {
      next(error);
    }
  };

  static  listarAutorPorId = async(req, res, next) => {
    try {
      const id = req.params.id;


      const autorResultado = await autor.findById(id);

      if (autorResultado !== null) {
        return res.status(200).json(autorResultado);
      }
      return next(new NotFound("ID do autor não encontrado"));
      
    } catch (error) {
      next(error);
    }
  };

  static  cadastrarAutor = async(req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "autor cadastrado com sucesso!", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  };


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static  excluirAutor = async(req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autor.findById(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor excluído com sucesso!" });
      } else {
        return next(new NotFound("ID do autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;