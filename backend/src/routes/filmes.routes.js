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
  if (!req.body) {
    return res.status(400).json({ erro: "Envie os dados do filme no corpo da requisição" });
  }

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

router.put("/filmes/:id", (req, res) => {
  const {id} = req.params;
  if (!req.body) {
    return res.status(400).json({ erro: "Envie os dados do filme no corpo da requisição" });
  }
  const{
    titulo,
    genero,
    data_estreia,
    imagem_url,
    observacao
  } = req.body;
  const sql = `
    UPDATE filmes
    SET titulo = ?, genero = ?, data_estreia = ?, imagem_url = ?, observacao = ?
    WHERE id = ?
  `;
   
   db.run(
    sql, 
    [titulo,genero, data_estreia, imagem_url, observacao,id],
    function (err){
      if (err){
        return res.status(500).json({erro: "Erro ao editar filme"});
      }
      if (this.changes === 0) {
        return res.status(404).json({ erro: "Filme não encontrado" });
      }
      res.json({mensagem:"Filme editado com sucesso"});
    }
   );
});

router.get("/filmes/:id", (req,res)=>{
  const {id} = req.params;
  db.get("SELECT * FROM filmes WHERE id = ?", [id], (err,row)=>{
    if (err){
      return res.status(500).json({erro: "Erro ao buscar filme"})
    } 
    if (!row){
      return res.status(404).json({erro: "Filme não encontrado"})
    }
    res.json(row);
   }); 
});

router.delete("/filmes/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM filmes WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ erro: "Erro ao deletar filme" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json({ mensagem: "Filme deletado com sucesso" });
  });
});


router.patch("/filmes/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `
    UPDATE filmes
    SET status = ?
    WHERE id = ?
  `;

  db.run(sql, [status, id], function (err) {
    if (err) {
      return res.status(500).json({ erro: "Erro ao alterar status" });
    }

    res.json({ mensagem: "Status alterado com sucesso" });
  });
});

module.exports = router;

module.exports = router;
