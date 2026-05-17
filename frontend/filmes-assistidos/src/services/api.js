import App from "../App";




const API_URL = "http://localhost:3000";

export async  function buscarFilmes(){
    const resposta = await fetch(`${API_URL}/filmes`);
    const dados = await resposta.json()
    return dados;
}

export async function criarFilme(filme) {
   const resposta = await fetch(`${API_URL}/filmes`,{
    method: "POST",
    headers:{
        "content-Type": "application/json"
    },
    body: json.stringify(filme)
   });
   const dados = await resposta.json
   return dados; 
}

export async function editarFilme(id, filme) {
  const resposta = await fetch(`${API_URL}/filmes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(filme)
  });

  const dados = await resposta.json();

  return dados;
}

export async function alterarStatusFilme(id,status) {
    const resposta = await fetch (`${API_URL}/filmes/${id}/status`,{
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(status)
    });
    const dados = await resposta.json();
    return dados;
}

export async function excluirFilme(id) {
  const resposta = await fetch(`${API_URL}/filmes/${id}`, {
    method: "DELETE"
  });

  const dados = await resposta.json();

  return dados;
}