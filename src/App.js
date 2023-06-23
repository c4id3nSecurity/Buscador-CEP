import { FiSearch } from "react-icons/fi";
import { useState } from "react";

import './styles.css';
import api from "./api/api";

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState("");

  async function handleSearch() {
    if (input === "") {
      alert("Informe um CEP!!!");
    }

    try{
      const resposta = await api.get(`${input}/json`);
      setCep(resposta.data);    

    } catch {
      alert("CEP inválido!!!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>  
        </main>
      )}
    
    </div>
  );
}

export default App;
