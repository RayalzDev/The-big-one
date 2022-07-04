import { Link } from "react-router-dom";
import { LOGIN, REGISTRO, PERFIL } from "../../Routes/paths";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { EMPRESAS, USUARIO } from "../../config/settings";
import {Accordion} from "react-bootstrap/"

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
            
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{empresa.name}</Accordion.Header>
                  <Accordion.Body>
                    Apertura: {empresa.open} Cierre: {empresa.close}
                    <br></br>
                    Mas alto: {empresa.high} Mas bajo: {empresa.low}
                    <br></br>
                    <Link to={`/empresa/${empresa.name}`}>Mas info</Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            
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
      </ul>
    </div>
  );
}
