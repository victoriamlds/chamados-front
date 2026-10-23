// Componente ProximaEtapa: mostra SÓ a ação que vale para o status atual:

import { useState } from "react"
import { iniciarChamado, resolverChamado } from "../../services/chamadosService.js"
import mensagemErro from "../../utils/mensagemErro.js"

function ProximaEtapa({ chamado, aoAvisar, aoAtualizar }) {
  const [responsavel, setResponsavel] = useState("")
  const [solucao, setSolucao] = useState("")

 
  async function aoIniciar(evento) {
    
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