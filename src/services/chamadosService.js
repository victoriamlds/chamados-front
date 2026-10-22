// ARQUIVO CENTRAL DA API.
// Aqui fica UMA função para cada rota da API.
// As telas e os componentes não usam o "api" diretamente: eles chamam as funções deste arquivo.
// Vantagem: se o professor perguntar "onde a API é chamada?", a resposta é: AQUI.

// Importamos o "api": o Axios já configurado, com o endereço e a chave X-API-Key.
import api from "./api.js"

// "export" na frente de cada função permite que outros arquivos a importem pelo nome.
// Nenhuma função aqui tem try/catch: se der erro, ele "sobe" até quem chamou a função,
// e lá (na tela ou no componente) o catch trata o erro.

// ---------- USUÁRIO ----------

// GET /eu -> devolve os dados do dono da chave (usado no Cabecalho).
export async function buscarUsuario() {
  const resposta = await api.get("/eu")
  // resposta.data são os dados que a API devolveu. Devolvemos só eles.
  return resposta.data
}

// ---------- LISTAS PARA AS CAIXAS DE SELEÇÃO ----------

// GET /tipos -> lista de tipos de chamado (usado na Home e no Formulario).
export async function listarTipos() {
  const resposta = await api.get("/tipos")
  return resposta.data
}

// GET /locais -> lista de locais.
export async function listarLocais() {
  const resposta = await api.get("/locais")
  return resposta.data
}

// GET /prioridades -> lista de prioridades.
export async function listarPrioridades() {
  const resposta = await api.get("/prioridades")
  return resposta.data
}

// ---------- CHAMADOS ----------

// GET /chamados -> lista os chamados (usado na Home).
// "filtros" é um objeto como { busca: "luz", status: "aberto" }.
// O Axios transforma esse objeto em ?busca=luz&status=aberto na URL.
export async function listarChamados(filtros) {
  const resposta = await api.get("/chamados", { params: filtros })
  return resposta.data
}

// GET /chamados/{id} -> busca UM chamado (usado na Detalhe e no Formulario).
export async function buscarChamado(id) {
  const resposta = await api.get("/chamados/" + id)
  return resposta.data
}

// POST /chamados -> cria um chamado novo (usado no Formulario).
// "dados" é o objeto com titulo, descricao, tipo, local, prioridade e data_abertura.
export async function criarChamado(dados) {
  const resposta = await api.post("/chamados", dados)
  return resposta.data
}

// PUT /chamados/{id} -> edita um chamado que já existe (usado no Formulario).
export async function editarChamado(id, dados) {
  const resposta = await api.put("/chamados/" + id, dados)
  return resposta.data
}

// DELETE /chamados/{id} -> exclui um chamado (usado na Detalhe).
export async function excluirChamado(id) {
  const resposta = await api.delete("/chamados/" + id)
  return resposta.data
}

// PATCH /chamados/{id}/iniciar -> aberto vira "em andamento" (usado no ProximaEtapa).
// O corpo da requisição é { responsavel: "nome" }.
export async function iniciarChamado(id, responsavel) {
  const resposta = await api.patch("/chamados/" + id + "/iniciar", {
    responsavel: responsavel,
  })
  return resposta.data
}

// PATCH /chamados/{id}/resolver -> "em andamento" vira resolvido (usado no ProximaEtapa).
// O corpo da requisição é { solucao: "texto" }.
export async function resolverChamado(id, solucao) {
  const resposta = await api.patch("/chamados/" + id + "/resolver", {
    solucao: solucao,
  })
  return resposta.data
}