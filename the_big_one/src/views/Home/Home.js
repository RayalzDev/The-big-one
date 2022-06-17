import { Link } from "react-router-dom";
import { LOGIN, PERFIL, REGISTRO } from "../../Routes/paths";

export default function Home() {
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
