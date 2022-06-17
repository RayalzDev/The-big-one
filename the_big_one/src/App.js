import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Perfil from "./views/Perfil";
import Registro from "./views/Registro";
import { HOME, LOGIN, REGISTRO, PERFIL, AUX } from "./Routes/paths";
import Navbar from "./Components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTRO} element={<Registro />} />
        <Route path={PERFIL} element={<Perfil />} />
        <Route path={AUX} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
