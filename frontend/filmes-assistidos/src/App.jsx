import { useEffect, useState } from "react";
import { buscarFilmes } from "./services/api";
import FilmeForm from "./componets/FilmeForm";

function App() {
  const [filmes, setFilmes] = useState([]);

  async function carregarFilmes() {
    try {
      const dados = await buscarFilmes();
      setFilmes(dados);
    } catch (err) {
      console.log("Erro ao buscar filmes:", err);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <div>
      <h1>Filmes Assistidos</h1>
      <FilmeForm/>

      {filmes.map((filme) => (
        <div key={filme.id}>
          <h2>{filme.titulo}</h2>
          <p>{filme.genero}</p>
          <p>{filme.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;