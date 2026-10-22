// Componente Filtros: campo de busca + as 4 caixas de filtro da tela inicial.
// Ele NÃO guarda nada: quem guarda os valores é a página Home.
// Ele só recebe os valores e as funções de mudança por props.

// O Seletor está na pasta "comuns", que fica ao lado da pasta "chamados" (por isso "../comuns/").
import Seletor from "../comuns/Seletor.jsx"

function Filtros({
  busca, setBusca,
  status, setStatus,
  tipo, setTipo,
  local, setLocal,
  prioridade, setPrioridade,
  tipos, locais, prioridades,
}) {
  return (
    <div>
      {/* Campo de busca por texto */}
      <input
        type="text"
        placeholder="Buscar por título ou descrição..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
        className="campo-busca"
      />

      <div className="filtros">
        {/* Status: as 3 opções são fixas, por isso passamos uma lista pronta */}
        <Seletor
          titulo="Status"
          valor={status}
          opcoes={["aberto", "em andamento", "resolvido"]}
          aoMudar={setStatus}
        />

        {/* Tipo, local e prioridade usam as listas que vieram da API */}
        <Seletor titulo="Tipo" valor={tipo} opcoes={tipos} aoMudar={setTipo} />
        <Seletor titulo="Local" valor={local} opcoes={locais} aoMudar={setLocal} />
        <Seletor
          titulo="Prioridade"
          valor={prioridade}
          opcoes={prioridades}
          aoMudar={setPrioridade}
        />
      </div>
    </div>
  )
}

export default Filtros