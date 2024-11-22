import express from "express"; // Importa o módulo Express para criar o servidor
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do servidor Express

routes(app);

app.listen(3000, () => { // Configura o servidor para ouvir na porta 3000
    console.log("servidor escutando"); // Mensagem de confirmação ao iniciar o servidor
});