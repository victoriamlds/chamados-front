// Este arquivo tem UMA única responsabilidade: criar a "ligação"
// com a API e deixar pronta para ser usada em qualquer tela do sistema.

import axios from "axios"

// axios.create() cria uma "instância" do axios já configurada,
// para não precisar repetir essas opções em toda chamada.
const api = axios.create({
  // baseURL: o endereço da API. Assim escrevemos só a parte final,
  // como "/chamados", em vez do endereço inteiro toda vez.
  baseURL: "https://api-chamados.jefersonqueiroga.com.br",

  // headers: informações extras que vão junto de toda requisição.
  headers: {
    // A API exige essa chave neste cabeçalho para saber quem está pedindo.
    // import.meta.env.VITE_API_KEY lê o valor escrito no arquivo .env.
    "X-API-Key": import.meta.env.VITE_API_KEY,
  },
})

// Exportamos "api" para as páginas poderem importar e usar, por exemplo:
// api.get("/chamados")
export default api