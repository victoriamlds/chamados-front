// Esta função NÃO é um componente. É só uma função comum que ajuda a pegar
// o texto do erro que a API devolve. Assim não repetimos esse código em vários lugares.

// "erro" é o erro que o Axios nos entrega quando uma requisição falha.
// "mensagemPadrao" é o texto que usamos se a API não explicar o motivo.
function mensagemErro(erro, mensagemPadrao) {
  // A API coloca o motivo do erro em erro.response.data.detail.
  // O "?." (interrogação + ponto) significa: "se response existir, continue;
  // se não existir, devolva undefined em vez de quebrar o programa".
  const detalhe = erro.response?.data?.detail

  // Se o detalhe for um texto, devolvemos ele (é o motivo vindo da API).
  if (typeof detalhe === "string") {
    return detalhe
  }

  // Se não veio texto nenhum, devolvemos a mensagem padrão.
  return mensagemPadrao
}

// Exporta a função para outros arquivos poderem importar.
export default mensagemErro