import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Importa função para conectar ao banco de dados

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão do ambiente

const db = conexao.db("imersao-instabyte");
// Acessa o banco de dados "imersao-instabyte"

const colecao = db.collection("posts");
// Seleciona a coleção "posts"

export async function getTodosPosts() {
    // Função assíncrona para buscar todos os posts do banco de dados
    return colecao.find().toArray();
    // Retorna todos os documentos da coleção como um array
};

// Função para buscar post pela descrição, insensível a maiúsculas/minúsculas
export async function getPostPelaDescricao(palavraChave) {
    // Busca documentos onde a descrição contém a palavra-chave (insensível a maiúsculas/minúsculas)
    return colecao.find({ descricao: { $regex: palavraChave, $options: "i" } }).toArray();
    // O $regex cria uma expressão regular para buscar a palavra-chave e $options: "i" torna a busca insensível a maiúsculas/minúsculas
    // Então, { descricao: { $regex: keywordLower, $options: "i" } } procura pelo texto keywordLower em descricao, sem diferenciar maiúsculas de minúsculas.
};

// Define uma função assíncrona chamada criarPost que recebe um parâmetro chamado "conteudo"
export async function criarPost(conteudo) {
    return colecao.insertOne(conteudo);
    // Insere o "conteudo" na coleção e retorna o resultado da inserção
};

export async function atualizarPost(id, conteudo) {
    console.log(id)
    const objID = ObjectId.createFromHexString(id);
    console.log (objID);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:conteudo});
};

