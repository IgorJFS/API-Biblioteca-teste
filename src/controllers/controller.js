import livro from '../models/livro.js';

class LivroController {

    static async listarLivros(req, res) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} falha na requisição`});
        }
    }

        static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} falha na requisição do livro`});
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


            static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Livro atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} falha na atualização do livro`});
        }
    }

    static async excluirLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: 'Livro excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} falha na exclusão do livro`});
        }
    }
}

export default LivroController;