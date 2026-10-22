// Formulário usado em DUAS rotas: "/novo" (abrir) e "/editar/:id" (editar).
// A diferença é só se existe "id" na URL ou não.
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
// Funções do arquivo central da API que esta tela usa.
import {
  buscarChamado,
  criarChamado,
  editarChamado,
  listarTipos,
  listarLocais,
  listarPrioridades,
} from "../services/chamadosService.js"
import mensagemErro from "../utils/mensagemErro.js"
// Componentes genéricos usados nesta tela.
import Seletor from "../components/comuns/Seletor.jsx"
import Mensagem from "../components/comuns/Mensagem.jsx"

function Formulario() {
  const { id } = useParams() // em /novo, id é undefined
  const navegar = useNavigate()

  // Boolean(id) vira true se existir id (editando) e false se não existir (novo).
  const estaEditando = Boolean(id)

  // ---------- ESTADOS: um para cada campo ----------
  const [titulo, setTitulo] = useState("")
  const [descricao, setDescricao] = useState("")
  const [tipo, setTipo] = useState("")
  const [local, setLocal] = useState("")
  const [prioridade, setPrioridade] = useState("")
  const [dataAbertura, setDataAbertura] = useState("")

  // Listas para preencher as caixas de seleção.
  const [tipos, setTipos] = useState([])
  const [locais, setLocais] = useState([])
  const [prioridades, setPrioridades] = useState([])

  // Mensagens de erro e de sucesso.
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("")
  // Só começa "carregando" se for edição (precisa buscar os dados do chamado).
  const [carregando, setCarregando] = useState(estaEditando)

  // ---------- CARREGAR AS OPÇÕES DOS SELETORES ----------
  useEffect(() => {
    async function carregarOpcoes() {
      try {
        setTipos(await listarTipos())
        setLocais(await listarLocais())
        setPrioridades(await listarPrioridades())
      } catch (erroRequisicao) {
        setErro("Não foi possível carregar as opções.")
      }
    }
    carregarOpcoes()
  }, [])

  // ---------- SE FOR EDIÇÃO, PREENCHER O FORMULÁRIO ----------
  useEffect(() => {
    // Em /novo não há nada para buscar.
    if (!estaEditando) return

    async function carregarChamado() {
      try {
        // Função do arquivo central: GET /chamados/{id}.
        const chamado = await buscarChamado(id)

        // Resolvido não pode ser editado: avisamos e voltamos para o detalhe.
        if (chamado.status === "resolvido") {
          alert("Chamados resolvidos não podem ser editados.")
          navegar("/chamado/" + id)
          return
        }

        // Colocamos nos campos os dados que já existem.
        setTitulo(chamado.titulo)
        setDescricao(chamado.descricao)
        setTipo(chamado.tipo)
        setLocal(chamado.local)
        setPrioridade(chamado.prioridade)
        setDataAbertura(chamado.data_abertura)
      } catch (erroRequisicao) {
        setErro("Não foi possível carregar o chamado.")
      } finally {
        setCarregando(false)
      }
    }
    carregarChamado()
  }, [id])

  // ---------- ENVIAR O FORMULÁRIO ----------
  async function enviarFormulario(evento) {
    evento.preventDefault() // impede de recarregar a página
    setErro("")
    setSucesso("")

    // Objeto no formato que a API espera.
    const dados = {
      titulo: titulo,
      descricao: descricao,
      tipo: tipo,
      local: local,
      prioridade: prioridade,
      data_abertura: dataAbertura,
    }

    try {
      if (estaEditando) {
        // Função do arquivo central: PUT /chamados/{id} (edita).
        await editarChamado(id, dados)
      } else {
        // Função do arquivo central: POST /chamados (cria).
        await criarChamado(dados)
      }

      setSucesso("Chamado salvo com sucesso!")
      // Espera 1 segundo (1000 ms) para dar tempo de ler a mensagem e volta para a lista.
      setTimeout(() => navegar("/"), 1000)
    } catch (erroRequisicao) {
      // Mostra o motivo que a API explicou (erro 422, por exemplo).
      setErro(mensagemErro(erroRequisicao, "Não foi possível salvar o chamado."))
    }
  }

  if (carregando) return <Mensagem texto="Carregando..." />

  // ---------- TELA ----------
  return (
    <div>
      <h1>{estaEditando ? "Editar chamado" : "Abrir chamado"}</h1>

      <form className="formulario" onSubmit={enviarFormulario}>
        <label>
          Título
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Descrição
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        {/* Os 3 seletores usam o MESMO componente Seletor */}
        <label>
          Tipo
          <Seletor
            titulo="Selecione..."
            valor={tipo}
            opcoes={tipos}
            aoMudar={setTipo}
            obrigatorio={true}
          />
        </label>

        <label>
          Local
          <Seletor
            titulo="Selecione..."
            valor={local}
            opcoes={locais}
            aoMudar={setLocal}
            obrigatorio={true}
          />
        </label>

        <label>
          Prioridade
          <Seletor
            titulo="Selecione..."
            valor={prioridade}
            opcoes={prioridades}
            aoMudar={setPrioridade}
            obrigatorio={true}
          />
        </label>

        <label>
          Data de abertura
          {/* type="date" já entrega a data no formato AAAA-MM-DD que a API quer */}
          <input
            type="date"
            value={dataAbertura}
            onChange={(e) => setDataAbertura(e.target.value)}
            required
          />
        </label>

        {erro && <Mensagem texto={erro} erro={true} />}
        {sucesso && <Mensagem texto={sucesso} />}

        <div className="acoes-detalhe">
          <button type="submit" className="botao botao-principal">
            Salvar
          </button>
          {/* navegar(-1) volta para a tela anterior */}
          <button type="button" className="botao" onClick={() => navegar(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Formulario