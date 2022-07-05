import { Link } from "react-router-dom";
import { LOGIN } from "../../Routes/paths";
import useFetch from "../../hooks/useFetch";
import { EMPRESAS } from "../../config/settings";
import { Accordion } from "react-bootstrap/";



export default function Home() {
  const empresas = useFetch(EMPRESAS);

  

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
      </ul>
    </div>
  );
}
