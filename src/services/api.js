// criaar ligações com a API, para não precisar repetir o endereço e a chave em cada requisição. 

import axios from "axios"

const api = axios.create({
  
  baseURL: "https://api-chamados.jefersonqueiroga.com.br",

  
  headers: {
    
    "X-API-Key": import.meta.env.VITE_API_KEY,
  },
})


export default api