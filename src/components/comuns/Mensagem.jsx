// Componente Mensagem: mostra um texto de aviso na tela.
// Props:
//   texto -> o que vai ser escrito
//   erro  -> se for true, o texto aparece em vermelho
function Mensagem({ texto, erro }) {
  // Se erro for true, usa as classes "mensagem erro"; senão, só "mensagem".
  return <p className={erro ? "mensagem erro" : "mensagem"}>{texto}</p>
}

export default Mensagem