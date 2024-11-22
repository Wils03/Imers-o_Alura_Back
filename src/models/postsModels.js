import conectarAoBanco from "../config/dbConfig.js";
// Importa função para conectar ao banco de dados

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Conecta ao banco de dados usando a string de conexão do ambiente

const db = conexao.db("imersao-instabyte"); // Acessa o banco de dados "imersao-instabyte"
const colecao = db.collection("posts"); // Seleciona a coleção "posts"

export async function getTodosPosts(){
// Função assíncrona para buscar todos os posts do banco de dados
    return colecao.find().toArray(); // Retorna todos os documentos da coleção como um array
};

// Função para buscar post por ID
function buscarPostPorID(id) {
    return colecao.find((post) => post.id === Number(id)); // Retorna o post com o ID correspondente
}

// Função para buscar post pela descrição, insensível a maiúsculas/minúsculas
export async function getPostPelaDescricao(palavraChave) {
    const keywordLower = palavraChave.toLowerCase(); // Converte a palavra-chave para minúsculas
    return colecao.find((post) => post.descricao.toLowerCase().includes(keywordLower)); // Retorna posts que contêm a palavra-chave na descrição
}
