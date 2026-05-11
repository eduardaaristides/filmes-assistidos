const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../filmes.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Erro ao conectar banco", err);
  } else {
    console.log("Banco conectado");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS filmes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      genero TEXT,
      data_estreia TEXT,
      imagem_url TEXT,
      status TEXT DEFAULT 'quero_assistir',
      observacao TEXT
    )
  `);
});

module.exports = db;