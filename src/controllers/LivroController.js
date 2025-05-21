import {livro, autor} from "../models/modelVal.js";
import NotFound from "../erros/NotFound.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      let {limite = 5, pagina = 1, campoOrdenacao = "_id", ordem = -1} = req.query;
      
      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);
      
      if (limite > 0 && pagina > 0) {
        const livros = await livro.find({}).sort({[campoOrdenacao]: ordem}).skip((pagina - 1) * limite).limit(limite);
        res.status(200).json(livros);
      }
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

  static excluirMultiplosLivros = async (req, res, next) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        throw new ReqErro("É necessário fornecer um array de IDs para exclusão.");
      }

      const resultado = await livro.deleteMany({ _id: { $in: ids } });

      if (resultado.deletedCount === 0) {
        throw new NotFound("Nenhum autor foi encontrado para exclusão.");
      }

      res.status(200).json({
        message: `Foram excluídos ${resultado.deletedCount} autor(es).`,
      });
    } catch (error) {
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBuscar(req.query);

      const livrosResultado = await livro.find({...busca});
      res.status(200).json(livrosResultado);
    } catch (error) {
      next(error);
    }
  };
}

async function processaBuscar(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  return busca;
}

export default LivroController;