import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Registro from "./views/Registro";
import PerfilEmpresa from "./views/PerfilEmpresa";
import { LOGIN, REGISTRO, PERFIL, AUX, LAYOUT, EMPRESA } from "./Routes/paths";
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={LAYOUT} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={REGISTRO} element={<Registro />} />
          <Route path={PERFIL} element={<Perfil />} />
          <Route path={AUX} element={<Home />} />
          <Route path={EMPRESA} element={<PerfilEmpresa />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
