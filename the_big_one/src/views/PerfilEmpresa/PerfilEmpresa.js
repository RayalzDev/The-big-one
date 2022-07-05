import { useParams } from "react-router-dom";
import { UNAEMPRESA } from "../../config/settings";
import { Accordion } from "react-bootstrap/";
import useFetch from "../../hooks/useFetch";

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
  const params = useParams();
  console.log(params);
  const { name } = params;
  const empresa = useFetch(UNAEMPRESA.replace("<NAME>", name));
  console.log(empresa);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  
  const data = {
    labels,
    datasets: [
      {
        label: "Evolucion de bolsa",
        data: labels.map(() => Math.floor(Math.random() * 150)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      {empresa && (
        <>
          <h1>{empresa.name}</h1>
          <Line options={options} data={data} />
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
