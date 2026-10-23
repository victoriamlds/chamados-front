// Componente Mensagem: mostra um texto de aviso na tela.

function Mensagem({ texto, erro }) {
  
  return <p className={erro ? "mensagem erro" : "mensagem"}>{texto}</p>
}

export default Mensagem