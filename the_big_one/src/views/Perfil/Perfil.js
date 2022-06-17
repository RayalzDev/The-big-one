import { Link } from "react-router-dom";
import { HOME } from "../../Routes/paths";

export default function Perfil() {

//Para el tema favoritos, llamamos al usuario, sacamos los nombres de las empresas que tenga en favoritos y luego usamos esos 
//nombres para llamar a una empresa con ese nombre y luego lo pintamos en pantalla.

  return (
    <div>
      <h1>Perfil</h1>
      <Link to={HOME}>A home</Link>
    </div>
  );
}
