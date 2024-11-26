import express from "express";
// Importa o framework Express para criar a aplicação web
import multer from "multer";
// Importa o Multer para lidar com uploads de arquivos
import { listaPostPorDescricao, listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";
// Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucecessStatus: 200
};

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Define o diretório para armazenar as imagens
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});
  
// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });
// Configura o Multer com o armazenamento definido

const routes = (app) => {
  // Define as rotas usando o objeto Express app
  app.use(express.json());
  // Permite que o servidor interprete corpos de requisições no formato JSON
  app.use(cors(corsOptions));
  
  app.get("/posts", listarPosts);
  // Rota para recuperar uma lista de todos os posts

  app.post("/posts", postarNovoPost);
  // Rota para criar um novo post

  app.get("/posts/search/:keyword", listaPostPorDescricao);
  // Rota para buscar posts por descrição usando uma palavra-chave

  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Rota para upload de imagens, assumindo uma única imagem chamada "imagem"

  app.put("/upload/:id", atualizarNovoPost);

};

export default routes;
// Exporta as rotas para serem usadas em outros arquivos
