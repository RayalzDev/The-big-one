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
        text: empresa?.name ?? '',
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
    "Diciembre"
  ];
  
  // Datos de la gráfica

  const data = {
    labels,
    datasets: [
      {
        label: "Evolucion de bolsa",
        data: labels.map(() => Math.floor(Math.random() * (200 - 100) + 100 )),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Compra de acciones

// function comprar (cantidad, precio){

//   const total = cantidad * precio

//   if (usuario.cartera >= total ){
//     usuario.cartera - total;
//     const requestUsuario = {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(usuario.cartera, usuario),
//     };
//     await fetch(EDITUSUARIO.replace("<ID>", _id), requestUsuario);
//      localStorage.setItem("usuario", JSON.stringify(usuario ));
//      setEditando(false);
//   }
//   }
// }


  // Venta de acciones 

// function vender (cantidad, precio)


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
