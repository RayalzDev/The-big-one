import { useParams } from "react-router-dom";
import { UNAEMPRESA, EDITUSUARIO } from "../../config/settings";
import { Container, Row, Col, Button, Form } from "react-bootstrap/";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PerfilEmpresa() {
  // Fetch a la empresa

  const params = useParams();
  const { name } = params;
  const empresa = useFetch(UNAEMPRESA.replace("<NAME>", name));

  // Opciones de la gráfica

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: empresa?.name ?? "",
      },
    },
  };

  // Cantidad de "puntos" de la gráfica y nombres

  const labels = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Datos de la gráfica

  const data = {
    labels,
    datasets: [
      {
        label: "Evolucion de bolsa",
        data: labels.map(() => Math.floor(Math.random() * (200 - 100) + 100)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Compra/venta de acciones


 

  //    Manejo de Favoritos

  const { info, setInfo } = useLogeadoContext();

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

  async function Favorito() {
    usuario.favoritos.push(empresa?.name ?? "");
    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };

    usuario._id = info._id;
    setInfo(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }

  async function borrarFavorito() {
    const index = usuario.favoritos.indexOf(empresa?.name ?? "");
    usuario.favoritos.splice(index, 1);
    

    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    };

    usuario._id = info._id;
    setInfo(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }

  return (
    <Container className="p-4 " style={{ height: "100vh", weight: "100vh" }}>
      {empresa && (
        <>
          <Row>
            <Col>
              <h1>{empresa.name}</h1>
              <Line options={options} data={data} />
            </Col>
          </Row>
          <Row className="justify-content-center align-content-center p-4">
            <Col>
              <Form>
                <Button className="bg-info border border-info text-dark">
                  Comprar
                </Button>
                <input type="number"  name="cantidad" />
                <p>{empresa.close}$</p>
              </Form>
            </Col>
            <Col>
              <Form>
                <Button className="bg-info border border-info text-dark">
                  Vender
                </Button>
                <input type="number"  name="cantidad" />
                <p>{empresa.high}$</p>
              </Form>
            </Col>
          </Row>
          <Button
            onClick={Favorito}
            className="bg-info border border-info text-dark justify-content-center "
          >
            Favoritos
          </Button>
          {' '}
          <Button
            onClick={borrarFavorito}
            className="bg-info border border-info text-dark justify-content-center ml-3"
          >
            Borrar Favorito
          </Button>
        </>
      )}
    </Container>
  );
}
