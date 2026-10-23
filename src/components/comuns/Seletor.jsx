// Componente Seletor: uma caixa de seleção (<select>) que serve para qualquer lista.

function Seletor({ titulo, valor, opcoes, aoMudar, obrigatorio }) {
  return (
    
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