import { Card, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

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
    "Enero",
    "Febrero",
    "Abril",
    "Junio",
    "Agosto",
    "Octubre",
    "Diciembre",
  ];
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
          
            <Card className="col-5 m-3">
              <Card.Title>
                <b>{item.symbol}</b>
              </Card.Title>
              <Card.Subtitle>{item.name}</Card.Subtitle>
              <Line options={options} data={data} />
              <Card.Body>
                <Row>
                  <Col className="col-6">
                    <Card>
                      <Card.Header>VMA</Card.Header>
                      <Card.Body>{item.high}</Card.Body>
                    </Card>
                  </Col>
                  <Col className="col-6">
                    <Card>
                      <Card.Header>VMB</Card.Header>
                      <Card.Body>{item.low}</Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        );
      })}
    </>
  );
}
