import { getPostPelaDescricao, getTodosPosts } from "../models/postsModels.js";

export async function listarPosts(req, res){ 
    const posts = await getTodosPosts(); // Busca todos os posts do banco de dados
    res.status(200).json(posts); // Retorna os posts em formato JSON com status 200 (sucesso)
};

export async function listaPostPorDescricao(req, res){
    const keyword = req.params.keyword;
    const post = await getPostPelaDescricao(keyword);
};