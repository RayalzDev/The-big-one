import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { USUARIO, UNUSUARIO } from "../../config/settings";
import useLogeadoContext from "../../Contexts/LogeadoContext";
import Navbar from "../../Components/Navbar";

export default function Perfil() {
  const [usuario, setUsuario] = useState(
     null
  );

  /* const user = useLogeadoContext();

  console.log(user) */

  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };
    await fetch(USUARIO, requestUsuario);
    // setEditando(false);
  }

  function handleInputs(event) {
    setUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
  }

  async function removeUsuario() {
    const requestUsuario = {
      method: "DELETE",

      body: JSON.stringify(usuario),
    };
    await fetch(USUARIO, requestUsuario);
    navigate("/");
  }
  const params = useParams();
  console.log(params)
  useEffect(
    function () {
      async function fetchUsuario() {
        const response = await fetch(`${UNUSUARIO}${params}`);
        const usuario = await response.json();
        setUsuario(usuario);
      }
      fetchUsuario();
    },
    []
  );
  //Para el tema favoritos, llamamos al usuario, sacamos los nombres de las empresas que tenga en favoritos y luego usamos esos
  //nombres para llamar a una empresa con ese nombre y luego lo pintamos en pantalla.

  return (
    <div>
      <h1>Perfil</h1>
      {/* <div>
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
                  type="password"
                  value={usuario.contraseña}
                  onChange={handleInputs}
                  name="contraseña"
                />
                <input
                  type="number"
                  value={usuario.cartera}
                  onChange={handleInputs}
                  name="cartera"
                />
                <button type="submit">Guardar</button>
              </form>
            ) : (
              <>
                <p>Nombre: {usuario.nombre}</p>
                <p>id: {usuario._id}</p>
                <p>Cartera: {usuario.cartera}</p>
                <select>
                  <option>{usuario.favoritos}</option>
                </select>
                <button onClick={() => removeUsuario(usuario.nombre)}>
                  Eliminar
                </button>
                <button onClick={() => setEditando(true)}>Editar</button>
              </>
            )}
          </>
        )}
      </div> */}
              

    </div>
  );
}
