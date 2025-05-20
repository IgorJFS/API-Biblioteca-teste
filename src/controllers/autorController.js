import { autor } from "../models/Autor.js";

class AutorController {

  static  listarAutores = async(req, res) => {
    try {
      const autores = await autor.find({});
      res.status(200).json(autores);
    } catch (error) {
      res.status(500).json({ message: `${error.message} falha na requisição`});
    }
  };

  static  listarAutorPorId = async(req, res, next) => {
    try {
      const id = req.params.id;


      const autorResultado = await autor.findById(id);

      if (autorResultado !== null) {
        return res.status(200).json(autorResultado);
      }
      return res.status(404).json({ message: "autor não encontrado" });
      
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


  static  atualizarAutor = async(req, res, next) => {
    try {
      const id = req.params.id;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static  excluirAutor = async(req, res, next) => {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;