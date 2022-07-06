import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { USUARIO, EDITUSUARIO, UNUSUARIO } from "../../config/settings";
import useFetch from "../../hooks/useFetch";

export default function Perfil() {

  const params = useParams();
  console.log(params);

  const { _id } = params;

  // const aux = useFetch(UNUSUARIO.replace("<ID>", _id));
const aux = JSON.parse(localStorage.getItem("usuario"))



  const [usuario, setUsuario] = useState({
    nombre: aux?.nombre ?? "",
    contraseña: aux?.contraseña ?? "",
    email: aux?.email ?? "",
    foto: aux?.foto ?? "",
    cartera: aux?.cartera ?? 0,
    favoritos: aux?.favoritos ?? [],
    acciones: aux?.acciones ?? [],
    rol: aux?.rol ?? "",
  });
  console.log(aux);

  console.log(usuario);

  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit() {
    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };
    await fetch(EDITUSUARIO.replace("<ID>", aux._id), requestUsuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: usuario._id }),
    };
    await fetch(USUARIO, requestUsuario);
    navigate("/");
  }

  //Para el tema favoritos, llamamos al usuario, sacamos los nombres de las empresas que tenga en favoritos y luego usamos esos
  //nombres para llamar a una empresa con ese nombre y luego lo pintamos en pantalla.

  return (
    <div>
      <h1>Perfil</h1>
      <div>
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
                <p>contraseña: {usuario.contraseña}</p>
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
      </div>
    </div>
  );
}
