import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UNAEMPRESA } from "../../config/settings";
import {Accordion} from "react-bootstrap/"
export default function PerfilEmpresa() {
  const [empresa, setEmpresa] = useState(null);
  const params = useParams();
  console.log(params);
  const { name } = params;

  useEffect(
    function () {
      async function fetchEmpresa() {
        const response = await fetch(UNAEMPRESA.replace("<NAME>", name));
        const respuesta = await response.json();
        console.log(respuesta);
        setEmpresa(respuesta);
      }
      fetchEmpresa();
    },
    [name]
  );
  console.log(empresa);

  return (
    <div>
      {empresa && (
        <>
          <h1>{empresa.name}</h1>

          <p>{empresa.open}</p>
          <p>{empresa.close}</p>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{empresa.name}</Accordion.Header>
              <Accordion.Body>
              Apertura: {empresa.open} Cierre: {empresa.close}
              <br></br>
              Mas alto: {empresa.high} Mas bajo: {empresa.low}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </div>
  );
}
