// Componente ProximaEtapa: mostra SÓ a ação que vale para o status atual:
//   aberto        -> formulário para INICIAR (pede o responsável)
//   em andamento  -> formulário para RESOLVER (pede a solução)
//   resolvido     -> não mostra nada
// Props:
//   chamado      -> os dados do chamado
//   aoAvisar     -> função para mostrar uma mensagem na tela (sucesso ou erro)
//   aoAtualizar  -> função para recarregar o chamado depois da ação
import { useState } from "react"
// Funções do arquivo central da API (PATCH iniciar e PATCH resolver).
import { iniciarChamado, resolverChamado } from "../../services/chamadosService.js"
// Função auxiliar que pega o motivo do erro vindo da API (está na pasta utils).
import mensagemErro from "../../utils/mensagemErro.js"

function ProximaEtapa({ chamado, aoAvisar, aoAtualizar }) {
  // Guardam o que a pessoa digita nos dois campos.
  const [responsavel, setResponsavel] = useState("")
  const [solucao, setSolucao] = useState("")

  // Chamada quando o formulário de INICIAR é enviado.
  async function aoIniciar(evento) {
    // Impede o navegador de recarregar a página ao enviar o formulário.
    evento.preventDefault()
    try {
      // Função do arquivo central: faz o PATCH /chamados/{id}/iniciar.
      await iniciarChamado(chamado.id, responsavel)
      aoAvisar("Atendimento iniciado com sucesso.")
      aoAtualizar() // recarrega o chamado para mostrar o novo status
    } catch (erro) {
      // Mostra o motivo que a API mandou, ou a mensagem padrão.
      aoAvisar(mensagemErro(erro, "Não foi possível iniciar o atendimento."))
    }
  }

  // Chamada quando o formulário de RESOLVER é enviado.
  async function aoResolver(evento) {
    evento.preventDefault()
    try {
      // Função do arquivo central: faz o PATCH /chamados/{id}/resolver.
      await resolverChamado(chamado.id, solucao)
      aoAvisar("Chamado resolvido com sucesso.")
      aoAtualizar()
    } catch (erro) {
      aoAvisar(mensagemErro(erro, "Não foi possível resolver o chamado."))
    }
  }

  // Se o chamado está ABERTO, mostra o formulário de iniciar.
  if (chamado.status === "aberto") {
    return (
      <form className="formulario-etapa" onSubmit={aoIniciar}>
        <h3>Próxima etapa: iniciar atendimento</h3>
        <label>
          Responsável
          <input
            type="text"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="botao botao-principal">
          Iniciar
        </button>
      </form>
    )
  }

  // Se está EM ANDAMENTO, mostra o formulário de resolver.
  if (chamado.status === "em andamento") {
    return (
      <form className="formulario-etapa" onSubmit={aoResolver}>
        <h3>Próxima etapa: resolver chamado</h3>
        <label>
          Solução
          <textarea
            value={solucao}
            onChange={(e) => setSolucao(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="botao botao-principal">
          Resolver
        </button>
      </form>
    )
  }

  // Se está resolvido, não há próxima etapa: não mostra nada.
  return null
}

export default ProximaEtapa