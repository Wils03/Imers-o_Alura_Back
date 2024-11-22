import express from "express"
import { listaPostPorDescricao, listarPosts } from "../controller/postsController.js";

const routes = (app) => {
    app.use(express.json()); // Configura o servidor para converter requisições e respostas em JSON

    app.get("/posts", listarPosts); 
    app.get("/posts/search/:keyword", listaPostPorDescricao);
};

export default routes;