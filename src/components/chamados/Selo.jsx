// Componente Selo: mostra uma etiqueta colorida com um texto.

function Selo({ valor, tipo }) {
  
  let classe = ""

  if (tipo === "status") {
   
    classe = "selo-" + valor.toLowerCase().replace(" ", "-")
  } else {
    
    classe = "selo-prioridade-" + valor.toLowerCase()
  }

 
  return <span className={"selo " + classe}>{valor}</span>
}

export default Selo