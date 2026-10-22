// Componente ConfirmaExclusao: a caixinha "Tem certeza que deseja excluir?".
// Props:
//   aoConfirmar -> função chamada quando clicar em "Excluir"
//   aoCancelar  -> função chamada quando clicar em "Cancelar"
function ConfirmaExclusao({ aoConfirmar, aoCancelar }) {
  return (
    <div className="caixa-confirmacao">
      <p>Tem certeza que deseja excluir este chamado?</p>
      <button className="botao botao-perigo" onClick={aoConfirmar}>
        Excluir
      </button>
      <button className="botao" onClick={aoCancelar}>
        Cancelar
      </button>
    </div>
  )
}

export default ConfirmaExclusao