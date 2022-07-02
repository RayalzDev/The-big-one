import { Link } from "react-router-dom";
import { LOGIN, REGISTRO, PERFIL } from "../../Routes/paths";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { EMPRESAS, USUARIO } from "../../config/settings";

export default function Home() {
  const [usuario, setUsuario] = useState(null);
  const usuarios = useFetch(USUARIO);
  const empresas = useFetch(EMPRESAS);

  useEffect(
    function () {
      setUsuario(usuarios);
    },
    [usuarios]
  );

  return (
    <div>
      <h1>Home</h1>
      {empresas &&
        empresas.map((empresa) => (
          <div key={empresa._id}>
            <Link to={`/empresa/${empresa.name}`}>
              <p>{empresa.name}</p>
            </Link>
          </div>
        ))}
      <ul>
        <li>
          <Link to={LOGIN}>Login</Link>
        </li>
        <li>
          {usuario &&
            usuario.map((usuario) => (
              <div key={usuario._id}>
                <Link to={PERFIL}>
                  <p>{usuario.nombre}</p>
                </Link>
              </div>
            ))}
        </li>
        <li>
          <Link to={REGISTRO}>Registro</Link>
        </li>
      </ul>
    </div>
  );
}
