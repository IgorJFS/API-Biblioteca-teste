import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: {type: String},
  titulo: {type: String, required: [true, "O título do livro é obrigatório"]},
  editora: {type: String, required: [true, "A editora do livro é obrigatória"],
    enum: { 
      values: ["Casa do Código", "Alura"],
      message: "A editora {VALUE} não é válida"
    }
  },
  preco: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 0;
      },
      message: "O preço do livro deve ser maior ou igual a zero. Valor fornecido: {VALUE}"
    }
  },
  paginas: {
    type: Number, 
    min: [10, "Numero de Páginas deve estar entre 10 e 1000. Valor fornecido: {VALUE}"], 
    max: [1000, "Numero de Páginas deve estar entre 10 e 1000. Valor fornecido: {VALUE}"]
  },
  autor: {type: mongoose.Schema.Types.ObjectId, 
    ref: "autores", 
    required: [true, "O(a) autor(a) é obrigatório"]
  },
}, 
{versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;