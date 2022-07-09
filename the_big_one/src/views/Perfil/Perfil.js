import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { USUARIO, EDITUSUARIO, UNUSUARIO } from "../../config/settings";
import useFetch from "../../hooks/useFetch";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";

export default function Perfil() {
  const { info, setInfo } = useLogeadoContext();

  const params = useParams();
  const { _id } = params;

  const aux = JSON.parse(localStorage.getItem("usuario"));

  //  const {id, ...rest} = info

  const [usuario, setUsuario] = useState({
    nombre: info?.nombre ?? "",
    contraseña: info?.contraseña ?? "",
    email: info?.email ?? "",
    foto: info?.foto ?? "",
    cartera: info?.cartera ?? 0,
    favoritos: info?.favoritos ?? [],
    acciones: info?.acciones ?? [],
    rol: info?.rol ?? "",
  });
  console.log(info);

  console.log(usuario);

  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit() {
    
    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };
    usuario._id = info._id;

    localStorage.setItem("usuario", JSON.stringify( usuario ));
    await fetch(EDITUSUARIO.replace("<ID>", _id), requestUsuario);
    setInfo(usuario);

    setEditando(false);
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
                  type="number"
                  value={usuario.cartera}
                  onChange={handleInputs}
                  name="cartera"
                />
                <button type="submit">Guardar</button>
              </form>
            ) : (
              <>
                <p>Nombre: {info.nombre}</p>
                <p>contraseña: {info.contraseña}</p>
                <p>Cartera: {info.cartera}</p>
                <select>
                  <option>{info.favoritos}</option>
                </select>
                <button onClick={() => removeUsuario(info.nombre)}>
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
