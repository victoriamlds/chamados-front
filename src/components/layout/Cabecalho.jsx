// Componente Cabecalho: o topo do site, com o nome do sistema e o nome do dono da chave.
// Aparece em todas as telas, porque o App.jsx o coloca fora do <Routes>.

// useState guarda dados que mudam; useEffect executa algo quando a tela abre.
import { useEffect, useState } from "react"
// Importamos SÓ a função de que precisamos do arquivo central da API.
// O caminho "../../" sobe duas pastas (de layout para components, e de components para src).
import { buscarUsuario } from "../../services/chamadosService.js"

function Cabecalho() {
  // Estado "nome": começa com "..." até a API responder.
  const [nome, setNome] = useState("...")

  // useEffect com [] no final: roda UMA vez, quando o componente aparece.
  useEffect(() => {
    // Função async dentro do useEffect (o useEffect em si não pode ser async).
    async function carregarNome() {
      try {
        // Chama a função do arquivo central. Ela faz o GET /eu e devolve os dados.
        const usuario = await buscarUsuario()
        // Guarda o nome no estado; a tela se atualiza sozinha.
        setNome(usuario.nome)
      } catch (erro) {
        // Se der erro (ex: chave inválida), mostramos um aviso no lugar do nome.
        setNome("chave inválida")
      }
    }

    // Chama a função que acabamos de criar.
    carregarNome()
  }, [])

  return (
    <header className="topo">
      <h1>Chamados IFRN</h1>
      <span>Olá, {nome}</span>
    </header>
  )
}

export default Cabecalho