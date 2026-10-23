
// uma função para cada rota da API


import api from "./api.js"

// devolve os dados do dono da chave (usado no cabeçalho)
export async function buscarUsuario() {
  const resposta = await api.get("/eu")
  
  return resposta.data 
}

// lista de tipos de chamados (home e formulario)
export async function listarTipos() {
  const resposta = await api.get("/tipos")
  return resposta.data
}


export async function listarLocais() {
  const resposta = await api.get("/locais")
  return resposta.data
}


export async function listarPrioridades() {
  const resposta = await api.get("/prioridades")
  return resposta.data
}


export async function listarChamados(filtros) {
  const resposta = await api.get("/chamados", { params: filtros })
  return resposta.data
}

// busca um chamado específico (usado no detalhe e no formulário)
export async function buscarChamado(id) {
  const resposta = await api.get("/chamados/" + id)
  return resposta.data
}


export async function criarChamado(dados) {
  const resposta = await api.post("/chamados", dados)
  return resposta.data
}


export async function editarChamado(id, dados) {
  const resposta = await api.put("/chamados/" + id, dados)
  return resposta.data
}


export async function excluirChamado(id) {
  const resposta = await api.delete("/chamados/" + id)
  return resposta.data
}


export async function iniciarChamado(id, responsavel) {
  const resposta = await api.patch("/chamados/" + id + "/iniciar", {
    responsavel: responsavel,
  })
  return resposta.data
}


export async function resolverChamado(id, solucao) {
  const resposta = await api.patch("/chamados/" + id + "/resolver", {
    solucao: solucao,
  })
  return resposta.data
}