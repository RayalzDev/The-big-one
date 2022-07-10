import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import PerfilEmpresa from "./views/PerfilEmpresa";
import { PERFIL, AUX, LAYOUT, EMPRESA, HOME } from "./Routes/paths";
import Layout from "./Components/Layout";
import LogeadoContextProvider from "./Contexts/LogeadoContext";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <LogeadoContextProvider>
      <BrowserRouter className="bg-secondary">
        <Routes>
          <Route path={LAYOUT}  element={<Layout />}>
            <Route index element={<Login />} />
            <Route path={HOME} element={<Home />} />
            <Route path={PERFIL} element={<Perfil />} />
            <Route path={AUX} element={<Home />} />
            <Route path={EMPRESA} element={<PerfilEmpresa />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </LogeadoContextProvider>
  );
}

export default App;
