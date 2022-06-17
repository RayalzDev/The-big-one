import { Link } from "react-router-dom";
import { LOGIN, PERFIL, REGISTRO } from "../../Routes/paths";
import {useState} from "react";

export default function Home() {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre:"",
    contraseña:"",
    foto: "",
    cartera:5,
    favoritos:"",
    acciones:"",
    activo:true,
    rol:"usuario"
  });
  return (
    <div>
      <h1>Home</h1>
    


      <ul>
        <li>
          <Link to={LOGIN}>Login</Link>
        </li>
        <li>
          <Link to={PERFIL}>Perfil</Link>
        </li>
        <li>
          <Link to={REGISTRO}>Registro</Link>
        </li>
      </ul>
    </div>
  );
}
