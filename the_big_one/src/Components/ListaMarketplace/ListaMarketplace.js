import { Card, Row, Col, Button } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";
import {EDITUSUARIO} from "../../config/settings"
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ListaFavoritos({ lista }) {
  const { info, setInfo } = useLogeadoContext();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = [
    "1er Trimestre",
    "2º Trimestre",
    "3er Trimestre",
    "4º Trimestre",
  ];

  

  // Manejo de Favoritos

  async function añadirFavorito(name) {

    setInfo((usuario) => ({ ...usuario, favoritos: [...usuario.favoritos, name] }));

    const { _id, ...rest } = info;

    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    };

  
    localStorage.setItem("usuario", JSON.stringify(info));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }
  
  async function borrarFavorito(item) {

    const currentFavoritos = info.favoritos.filter(favorito => favorito !== item)

    setInfo((usuario) => ({ ...usuario, favoritos: currentFavoritos }));


    const { _id, ...rest } = info;

    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    };

    
    localStorage.setItem("usuario", JSON.stringify(info));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }

  

  return (
    <>
      {lista.map((item, index) => {
        const data = {
          labels,
          datasets: [
            {
              label: "Evolucion de bolsa",
              data: labels.map(() =>
                Math.floor(Math.random() * (200 - 100) + 100)
              ),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };
        return (
          <Card className="col-3 m-2 shadow">
            <Card.Title className="pt-2">
              <b>{item.symbol}</b>
            </Card.Title>
            <Card.Subtitle>{item.name}</Card.Subtitle>
            <Line options={options} data={data} />
            <Card.Body>
              <Row>
                <Col className="col-6">
                  <Card>
                    <Card.Header>Valor más alto</Card.Header>
                    <Card.Body>{item.high}</Card.Body>
                  </Card>
                </Col>
                <Col className="col-6">
                  <Card>
                    <Card.Header>Valor más bajo</Card.Header>
                    <Card.Body>{item.low}</Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Link to={`/empresa/${item.name}`}>
                    <Button>Ver detalles</Button>
                  </Link>
                </Col>
                <Col className="text-end">
                  {info?.favoritos.includes(item.name) ? (
                    <Button
                      className="btn-danger"
                      title="Eliminar de Favoritos"
                      onClick={()=>borrarFavorito(item.name)}
                    >
                      <i class="bi bi-star-fill"></i>
                    </Button>
                  ) : (
                    <Button className="btn-danger" title="Añadir a Favoritos" onClick={()=>añadirFavorito(item.name)}>
                      <i class="bi bi-star"></i>
                    </Button>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}
