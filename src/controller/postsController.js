import { getPostPelaDescricao, getTodosPosts, criarPost} from "../models/postsModels.js";
// Importa as funções necessárias do modelo de posts

import fs from "fs";
// Importa o sistema de arquivos (fs) para manipulação de arquivos

export async function listarPosts(req, res){ 
    const posts = await getTodosPosts(); // Busca todos os posts do banco de dados
    res.status(200).json(posts); // Retorna os posts em formato JSON com status 200 (sucesso)
};

export async function listaPostPorDescricao(req, res){
    const keyword = req.params.keyword; // Obtém a palavra-chave dos parâmetros da URL
    const post = await getPostPelaDescricao(keyword); // Busca posts que correspondem à palavra-chave
    res.status(200).json(post); // Retorna os posts em formato JSON com status 200 (sucesso)
};

export async function postarNovoPost(req, res){
    const novaPostagem = req.body; // Obtém os dados do novo post do corpo da requisição
    try{
        const postCriado = await criarPost(novaPostagem); // Cria um novo post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado com status 200 (sucesso)
    }catch(erro){
        console.error(erro.message); // Loga o erro no console
        res.status(500).json({"ERRO": "Falha na requisição"}); // Retorna uma mensagem de erro com status 500 (falha no servidor)
    };
};

export async function uploadImagem(req, res){
    const novaPostagem = {
        descricao: "", // Descrição vazia para a nova postagem
        imgUrl: req.file.originalname, // Obtém o nome original do arquivo enviado
        alt: "" // Texto alternativo vazio
    };
    try{
        const postCriado = await criarPost(novaPostagem); // Cria uma nova postagem no banco de dados
        const extensao = req.file.mimetype === "imagem/png" ? "png" : "jpg"; // Define a extensão do arquivo baseado no tipo MIME
        const imagemAtualizada = `uploads/${postCriado.insertedId}.${extensao}`; // Cria o caminho atualizado do arquivo
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo enviado
        res.status(200).json(postCriado); // Retorna a postagem criada com status 200 (sucesso)
    }catch(erro){
        console.error(erro.message); // Loga o erro no console
        res.status(500).json({"ERRO": "Falha na requisição"}); // Retorna uma mensagem de erro com status 500 (falha no servidor)
    };
};
