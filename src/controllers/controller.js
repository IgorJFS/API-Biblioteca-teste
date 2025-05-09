import livro from '../models/livro.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: 'Livro cadastrado com sucesso!', livro: novoLivro });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default LivroController;