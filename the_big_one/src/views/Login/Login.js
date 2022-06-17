import { Link } from "react-router-dom";
import { HOME, REGISTRO } from "../../Routes/paths";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to={HOME}>A home</Link>
      <Link to={REGISTRO}>Registrarse</Link>
    </div>
  );
}
