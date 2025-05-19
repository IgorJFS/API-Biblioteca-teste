import express from 'express';
import axios from 'axios';
import connectToDB from './config/dbConnect.js';
import routes from './routes/index.js';

const conexao = await connectToDB();
conexao.on('error', console.error.bind(console, 'Erro de conexão:'));
conexao.once('open', () => {
    console.log('Banco de dados conectado com sucesso!');
}
);

conexao.once("open", () => {
    console.log('Banco de dados conectado com sucesso!');
});

const app = express();
routes(app);


app.delete('/livros/:id', (req, res) => {
    const livro = buscaLivro(req.params.id);
    if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado' });
    }
    livros.splice(livros.indexOf(livro), 1);
    res.status(200).send('Livro removido com sucesso!');
});


app.get('/cursos', async (req, res) => {
    try {
        const response = await axios.get('https://680dc92dc47cb8074d912ed5.mockapi.io/api/cursos');
        const cursos = response.data;
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
});

export default app;

