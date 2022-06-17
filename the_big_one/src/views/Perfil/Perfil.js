import { Link } from "react-router-dom";
import { HOME } from "../../Routes/paths";

export default function Perfil() {
  return (
    <div>
      <h1>Perfil</h1>
      <Link to={HOME}>A home</Link>
    </div>
  );
}
