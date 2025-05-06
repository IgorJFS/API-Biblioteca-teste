import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const livros = [
    { id: 1, titulo: 'O Senhor dos Anéis' },
    { id: 2, titulo: 'O Hobbit' },
    { id: 3, titulo: 'Harry Potter e a Pedra Filosofal' },
]

function buscaLivro(id) {
    return livros.find(livro => livro.id === Number(id));
}  


app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.get('/livros/:id', (req, res) => {
    const livro = buscaLivro(req.params.id);
    if (!livro) {
        return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.status(200).json(livro);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro adicionado com sucesso!');
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