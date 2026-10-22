// App.jsx: o "mapa" do site. Diz qual tela aparece para cada endereço.
import { Routes, Route } from "react-router-dom"
// O Cabecalho agora está em components/layout.
import Cabecalho from "./components/layout/Cabecalho.jsx"
import Home from "./pages/Home.jsx"
import Detalhe from "./pages/Detalhe.jsx"
import Formulario from "./pages/Formulario.jsx"

function App() {
  return (
    <div className="pagina">
      {/* O Cabecalho fica FORA do <Routes>, então aparece em todas as telas */}
      <Cabecalho />

      {/* Routes escolhe qual Route combina com o endereço atual */}
      <Routes>
        {/* Tela inicial */}
        <Route path="/" element={<Home />} />
        {/* ":id" é a parte variável: /chamado/3, /chamado/7... */}
        <Route path="/chamado/:id" element={<Detalhe />} />
        {/* Abrir chamado novo */}
        <Route path="/novo" element={<Formulario />} />
        {/* O MESMO Formulario, agora para editar */}
        <Route path="/editar/:id" element={<Formulario />} />
      </Routes>
    </div>
  )
}

export default App