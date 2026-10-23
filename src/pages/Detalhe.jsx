// mostra todos os campos do chamado, os botões Editar e Excluir, e a próxima etapa do atendimento.
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { buscarChamado, excluirChamado } from "../services/chamadosService.js"
import mensagemErro from "../utils/mensagemErro.js"
import Selo from "../components/chamados/Selo.jsx"
import ConfirmaExclusao from "../components/chamados/ConfirmaExclusao.jsx"
import ProximaEtapa from "../components/chamados/ProximaEtapa.jsx"
import Mensagem from "../components/comuns/Mensagem.jsx"

function Detalhe() {
  
  const { id } = useParams()
  
  const navegar = useNavigate()

  //ESTADOS
  const [chamado, setChamado] = useState(null) // dados do chamado
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState("")
  const [confirmando, setConfirmando] = useState(false)// Mensagem de sucesso/erro depois de uma ação.
  const [mensagemAcao, setMensagemAcao] = useState("")

  //  BUSCAR O CHAMADO
  // Função separada porque também a chamamos depois de iniciar/resolver.
  async function carregarChamado() {
    try {
      
      const dados = await buscarChamado(id)
      setChamado(dados)
    } catch (erroRequisicao) {
      setErro("Não foi possível carregar este chamado.")
    } finally {
      setCarregando(false)
    }
  }

  // Roda quando a tela abre (e se o id da URL mudar).
  useEffect(() => {
    carregarChamado()
  }, [id])

  // EXCLUIR
  // Só é chamada quando a pessoa confirma na caixa "Tem certeza?".
  async function confirmarExclusao() {
    try {
     
      await excluirChamado(id)
      navegar("/") 
    } catch (erroRequisicao) {
      setConfirmando(false)
      setMensagemAcao(mensagemErro(erroRequisicao, "Não foi possível excluir."))
    }
  }

  // TELA 
  // Enquanto carrega, ou se deu erro, mostramos só a mensagem.
  if (carregando) return <Mensagem texto="Carregando..." />
  if (erro) return <Mensagem texto={erro} erro={true} />

  return (
    <div>
      <Link to="/" className="link-voltar">
        ← Voltar
      </Link>

      <div className="cabecalho-detalhe">
        <h1>{chamado.titulo}</h1>
        <Selo valor={chamado.status} tipo="status" />
        <Selo valor={chamado.prioridade} tipo="prioridade" />
      </div>

      {/* dl/dt/dd é uma lista de "nome: valor" */}
      <dl className="campos-detalhe">
        <dt>Descrição:</dt>
        <dd>{chamado.descricao}</dd>

        <dt>Tipo:</dt>
        <dd>{chamado.tipo}</dd>

        <dt>Local:</dt>
        <dd>{chamado.local}</dd>

        <dt>Aberto em:</dt>
        <dd>{chamado.data_abertura}</dd>

        <dt>Responsável:</dt>
        {/* Se não tiver responsável ainda, mostra "-" */}
        <dd>{chamado.responsavel || "-"}</dd>

        <dt>Solução:</dt>
        <dd>{chamado.solucao || "-"}</dd>
      </dl>

      <div className="acoes-detalhe">
        {/* Resolvido não pode ser editado: só mostramos Editar se NÃO for resolvido */}
        {chamado.status !== "resolvido" && (
          <Link to={"/editar/" + chamado.id} className="botao">
            Editar
          </Link>
        )}
        {/* Clicar em Excluir só abre a confirmação, ainda não exclui */}
        <button
          className="botao botao-perigo"
          onClick={() => setConfirmando(true)}
        >
          Excluir
        </button>
      </div>

      {/* Se confirmando for true, mostra a caixa de confirmação */}
      {confirmando && (
        <ConfirmaExclusao
          aoConfirmar={confirmarExclusao}
          aoCancelar={() => setConfirmando(false)}
        />
      )}

      {/* Componente que decide sozinho qual formulário mostrar (iniciar ou resolver) */}
      <ProximaEtapa
        chamado={chamado}
        aoAvisar={setMensagemAcao}
        aoAtualizar={carregarChamado}
      />

      {mensagemAcao && <Mensagem texto={mensagemAcao} />}
    </div>
  )
}

export default Detalhe