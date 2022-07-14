import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import PerfilEmpresa from "./views/PerfilEmpresa";
import { PERFIL, AUX, LAYOUT, EMPRESA, HOME, MARKET } from "./Routes/paths";
import Layout from "./Components/Layout";
import Marketplace from "./views/Marketplace"
import LogeadoContextProvider from "./Contexts/LogeadoContext";
import EmpresasContextProvider from "./Contexts/EmpresasContext";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <LogeadoContextProvider>
      <EmpresasContextProvider>
        <BrowserRouter className="bg-secondary">
          <Routes>
            <Route path={LAYOUT} element={<Layout />}>
              <Route index element={<Login />} />
              <Route path={HOME} element={<Home />} />
              <Route path={MARKET} element={<Marketplace/>}></Route>
              <Route path={PERFIL} element={<Perfil />} />
              <Route path={AUX} element={<Home />} />
              <Route path={EMPRESA} element={<PerfilEmpresa />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </EmpresasContextProvider>
    </LogeadoContextProvider>
  );
}

export default App;
