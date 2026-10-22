// Componente Selo: mostra uma etiqueta colorida com um texto.
// Props:
//   valor -> o texto a mostrar (ex: "aberto", "alta")
//   tipo  -> "status" ou "prioridade" (decide qual cor usar)
function Selo({ valor, tipo }) {
  // Variável que vai guardar o nome da classe CSS (que define a cor).
  let classe = ""

  if (tipo === "status") {
    // Para status, trocamos o espaço por hífen: "em andamento" vira "em-andamento",
    // porque nome de classe CSS não pode ter espaço.
    classe = "selo-" + valor.toLowerCase().replace(" ", "-")
  } else {
    // Para prioridade, o nome da classe fica: selo-prioridade-alta, etc.
    classe = "selo-prioridade-" + valor.toLowerCase()
  }

  // Devolve um <span> com duas classes: "selo" (formato) e a classe da cor.
  return <span className={"selo " + classe}>{valor}</span>
}

export default Selo