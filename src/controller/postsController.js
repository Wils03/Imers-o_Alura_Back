import { getPostPelaDescricao, getTodosPosts, criarPost} from "../models/postsModels.js";

export async function listarPosts(req, res){ 
    const posts = await getTodosPosts(); // Busca todos os posts do banco de dados
    res.status(200).json(posts); // Retorna os posts em formato JSON com status 200 (sucesso)
};

export async function listaPostPorDescricao(req, res){
    const keyword = req.params.keyword;
    const post = await getPostPelaDescricao(keyword);
    res.status(200).json(post); // Retorna os posts em formato JSON com status 200 (sucesso)
};

export async function postarNovoPost(req, res){
    const novaPostagem = req.body;
    try{
        const postCriado = await criarPost(novaPostagem);
        res.status(200).json(postCriado)
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"ERRO": "Falha na requisição"});
    };
};
export async function uploadImagem(req, res){
    const novaPostagem = req.body;
    try{
        const postCriado = await criarPost(novaPostagem);
        res.status(200).json(postCriado)
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"ERRO": "Falha na requisição"});
    };
};