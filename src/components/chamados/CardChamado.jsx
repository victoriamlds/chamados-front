// Componente CardChamado: UM item da lista de chamados.

// Link troca de tela sem recarregar a página.
import { Link } from "react-router-dom"
// Reaproveitamos o componente Selo dentro deste componente.
import Selo from "./Selo.jsx"

function CardChamado({ chamado }) {
  return (
    
    <Link to={"/chamado/" + chamado.id} className="item-chamado">
      <span className="titulo-item">{chamado.titulo}</span>
      <Selo valor={chamado.status} tipo="status" />
      <Selo valor={chamado.prioridade} tipo="prioridade" />
    </Link>
  )
}

export default CardChamado