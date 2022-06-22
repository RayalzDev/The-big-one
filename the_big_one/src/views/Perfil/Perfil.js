import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {USUARIO} from "../../config/settings"

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(
    function () {
      async function fetchUsuario() {
        const response = await fetch(USUARIO.replace("<ID>", id));
        const usuario = await response.json();
        setUsuario(usuario);
      }
      fetchUsuario();
    },
    [id]
  );
  //Para el tema favoritos, llamamos al usuario, sacamos los nombres de las empresas que tenga en favoritos y luego usamos esos
  //nombres para llamar a una empresa con ese nombre y luego lo pintamos en pantalla.

  return (
    <div>
      <h1>Perfil</h1>
      <div>
      <h1>usuario profile</h1>
      {usuario && (
        <>
          {editando ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={usuario.nombre}
                onChange={handleInputs}
                name="nombre"
              />
              <input
                type="text"
                value={usuario.apellido}
                onChange={handleInputs}
                name="apellido"
              />
              <input
                type="number"
                value={usuario.edad}
                onChange={handleInputs}
                name="edad"
              />
              <button type="submit">Guardar</button>
            </form>
          ) : (
            <>
              <p>{usuario.nombre}</p>
              <p>{usuario.apellido}</p>
              <p>{usuario.edad}</p>
              <button onClick={() => removeUsuario(usuario.nombre)}>
                Eliminar
              </button>
              <button onClick={() => setEditando(true)}>Editar</button>
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
}
