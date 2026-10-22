// Componente Seletor: uma caixa de seleção (<select>) que serve para qualquer lista.
// Ele recebe 5 props (informações) de quem o usa:
//   titulo      -> texto da primeira opção (ex: "Tipo" ou "Selecione...")
//   valor       -> a opção que está escolhida agora
//   opcoes      -> a lista de opções (ex: ["elétrica", "hidráulica"])
//   aoMudar     -> função que será chamada quando a pessoa escolher outra opção
//   obrigatorio -> true se a escolha for obrigatória (usado no formulário)
function Seletor({ titulo, valor, opcoes, aoMudar, obrigatorio }) {
  return (
    // value: mostra a opção escolhida. required: obriga a escolher.
    // onChange: quando mudar, chama aoMudar entregando o novo valor escolhido.
    <select
      value={valor}
      onChange={(evento) => aoMudar(evento.target.value)}
      required={obrigatorio}
    >
      {/* Primeira opção, com valor vazio: significa "nenhuma escolha" */}
      <option value="">{titulo}</option>

      {/* .map() percorre a lista e cria uma <option> para cada item.
          "key" é um identificador único que o React exige em listas. */}
      {opcoes.map((opcao) => (
        <option key={opcao} value={opcao}>
          {opcao}
        </option>
      ))}
    </select>
  )
}

// Exporta para poder ser usado em outros arquivos.
export default Seletor