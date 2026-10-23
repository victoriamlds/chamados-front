// Página inicial ("/"): busca, filtros e lista de chamados.
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// Funções do arquivo central da API que esta tela usa.
import {
  listarChamados,
  listarTipos,
  listarLocais,
  listarPrioridades,
} from "../services/chamadosService.js"
// Componentes usados nesta tela (cada um na sua pasta).
import Filtros from "../components/chamados/Filtros.jsx"
import CardChamado from "../components/chamados/CardChamado.jsx"
import Mensagem from "../components/comuns/Mensagem.jsx"

function Home() {
  
  // Lista de chamados que veio da API.
  const [chamados, setChamados] = useState([])
  // Controlam as mensagens de "carregando" e de erro.
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")

  // Valor da busca e de cada filtro. Vazio "" significa "sem filtro".
  const [busca, setBusca] = useState("")
  const [status, setStatus] = useState("")
  const [tipo, setTipo] = useState("")
  const [local, setLocal] = useState("")
  const [prioridade, setPrioridade] = useState("")

  // Listas que vêm da API para preencher as caixas de seleção.
  const [tipos, setTipos] = useState([])
  const [locais, setLocais] = useState([])
  const [prioridades, setPrioridades] = useState([])

  // ---------- CARREGAR AS OPÇÕES DOS FILTROS (uma vez só) ----------
  useEffect(() => {
    async function carregarOpcoes() {
      try {
        // Cada função do arquivo central faz um GET e devolve a lista.
        setTipos(await listarTipos())
        setLocais(await listarLocais())
        setPrioridades(await listarPrioridades())
      } catch (erroRequisicao) {
        setErro("Não foi possível carregar. Verifique sua chave.")
      }
    }
    carregarOpcoes()
  }, []) // [] = roda só quando a tela abre

  // ---------- CARREGAR A LISTA DE CHAMADOS ----------
  // Roda quando a tela abre E sempre que a busca ou algum filtro mudar.
  useEffect(() => {
    async function carregarChamados() {
      setCarregando(true)
      setErro("")
      try {
        // Montamos um objeto só com os filtros preenchidos.
        const filtros = {}
        if (busca) filtros.busca = busca
        if (status) filtros.status = status
        if (tipo) filtros.tipo = tipo
        if (local) filtros.local = local
        if (prioridade) filtros.prioridade = prioridade

        // Função do arquivo central: faz o GET /chamados com esses filtros.
        const lista = await listarChamados(filtros)
        setChamados(lista)
      } catch (erroRequisicao) {
        setErro("Não foi possível carregar. Verifique sua chave.")
      } finally {
        // finally roda sempre (deu certo ou errado): termina o "carregando".
        setCarregando(false)
      }
    }
    carregarChamados()
  }, [busca, status, tipo, local, prioridade])

  // ---------- TELA ----------
  return (
    <div>
      <div className="barra-acoes">
        <h2>Chamados</h2>
        <Link to="/novo" className="botao botao-principal">
          + Abrir chamado
        </Link>
      </div>

      {/* Componente Filtros: entregamos os valores e as funções que mudam eles */}
      <Filtros
        busca={busca} setBusca={setBusca}
        status={status} setStatus={setStatus}
        tipo={tipo} setTipo={setTipo}
        local={local} setLocal={setLocal}
        prioridade={prioridade} setPrioridade={setPrioridade}
        tipos={tipos} locais={locais} prioridades={prioridades}
      />

      {/* Só UMA destas situações aparece por vez */}
      {carregando && <Mensagem texto="Carregando chamados..." />}

      {!carregando && erro && <Mensagem texto={erro} erro={true} />}

      {!carregando && !erro && chamados.length === 0 && (
        <Mensagem texto="Nenhum chamado encontrado." />
      )}

      {!carregando && !erro && chamados.length > 0 && (
        <ul className="lista-chamados">
          {/* Para cada chamado, criamos um CardChamado */}
          {chamados.map((chamado) => (
            <li key={chamado.id}>
              <CardChamado chamado={chamado} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Home