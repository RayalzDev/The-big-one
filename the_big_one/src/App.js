import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Registro from "./views/Registro";
import { HOME, LOGIN, REGISTRO, PERFIL } from "./Routes/paths";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTRO} element={<Registro />} />
        <Route path={PERFIL} element={<Perfil />} />
      </Routes>
      ddd
    </BrowserRouter>
  );
}

export default App;
