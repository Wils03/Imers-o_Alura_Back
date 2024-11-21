import express from "express";

const app = express(); //APP representa servidor
app.use(express.json()); // servidor converte tudo em JSON e devolve

app.listen(3000, () => {
    console.log("servidor escutando");
});

const posts = [ // base de dados
    {
        id: 1,
        descricao: "Foto teste",
        imagem: "https://placecats.com/mille/300/150"
    },
    {
        id: 2,
        descricao: "Passeio na praia",
        imagem: "https://placebeach.com/450/300"
    },
    {
        id: 3,
        descricao: "Aventura nas montanhas",
        imagem: "https://placemountains.com/600/400"
    },
    {
        id: 4,
        descricao: "Jantar romântico",
        imagem: "https://placerestaurant.com/400/300"
    },
    {
        id: 5,
        descricao: "Paisagem urbana",
        imagem: "https://placecity.com/500/350"
    }
];

// Função para buscar post por ID
function buscarPostPorID(id) {
    return posts.find((post) => post.id === Number(id));
}

// Função para buscar post pela descrição, insensível a maiúsculas/minúsculas
function buscarPostPelaDescricao(palavraChave) {
    const keywordLower = palavraChave.toLowerCase();
    return posts.filter((post) => post.descricao.toLowerCase().includes(keywordLower));
}

// Rota para obter todos os posts
app.get("/posts", (req, res) => { 
    res.status(200).json(posts);
});

// Rota para obter post por ID
app.get("/posts/:id", (req, res) => { 
    const post = buscarPostPorID(req.params.id);
    res.status(200).json(post);
});

// Rota para buscar post por palavra-chave na descrição
app.get("/posts/search/:keyword", (req, res) => { 
    const keyword = req.params.keyword;
    console.log(`Buscando por palavra-chave: ${keyword}`);
    const post = buscarPostPelaDescricao(keyword);
    res.status(200).json(post);
});

