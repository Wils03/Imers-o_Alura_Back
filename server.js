import express from "express";

const app = express(); //APP representa servidor
app.listen(3000, () => {
    console.log("servidor escutando");
});

app.get("/api", (req, res) => {
    res.status(200).send("Boas vindas à Imersão!");
});
