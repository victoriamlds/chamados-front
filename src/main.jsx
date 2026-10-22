// Este é o primeiro arquivo que roda quando o site abre. Ele "planta" o
// componente App dentro da página HTML e ativa o sistema de rotas,
// que permite ter várias telas: "/", "/chamado/5", "/novo", etc.

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"

// Procura no index.html a div com id="root" e desenha o React dentro dela.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter precisa envolver o App inteiro para as rotas funcionarem */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)