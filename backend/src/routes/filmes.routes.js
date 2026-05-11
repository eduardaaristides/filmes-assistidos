const express = require("express");
const db = require("../database/database");

const router = express.Router();

router.get("/filmes", (req, res) => {
  db.all("SELECT * FROM filmes", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: "Erro ao buscar filmes" });
    }

    res.json(rows);
  });
});

router.post("/filmes", (req, res) => {
  const {
    titulo,
    genero,
    data_estreia,
    imagem_url,
    observacao
  } = req.body;

  const sql = `
    INSERT INTO filmes (
      titulo,
      genero,
      data_estreia,
      imagem_url,
      observacao
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      titulo,
      genero,
      data_estreia,
      imagem_url,
      observacao
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          erro: "Erro ao cadastrar filme"
        });
      }

      res.status(201).json({
        mensagem: "Filme cadastrado com sucesso",
        id: this.lastID
      });
    }
  );
});
module.exports = router;