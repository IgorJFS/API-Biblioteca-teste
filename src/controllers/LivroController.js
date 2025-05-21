import livro from "../models/livro.js";
import autor from "../models/Autor.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const livros = await livro.find({});
      res.status(200).json(livros);
    } catch (error) {
      next(error);
    };
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado === null) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      res.status(200).json(livroEncontrado);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let novoLivro = new livro(req.body);

      const livroResultado = await novoLivro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (error) {
      next(error);
    }
  };


  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  };

  static listarLivrosPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;