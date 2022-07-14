import { useParams } from "react-router-dom";
import { UNAEMPRESA, EDITUSUARIO } from "../../config/settings";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Stack,
} from "react-bootstrap/";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useLogeadoContext } from "../../Contexts/LogeadoContext";
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

export default function PerfilEmpresa() {
  // Traemos Info del Context
  const { info, setInfo } = useLogeadoContext();

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

  // Seteo del usuario auxiliar

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

  //    Manejo de Favoritos

  async function Favorito(name) {
    setInfo((usuario) => ({
      ...usuario,
      favoritos: [...usuario.favoritos, name],
    }));

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
    const currentFavoritos = info.favoritos.filter(
      (favorito) => favorito !== item
    );

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

  // Compra/venta de acciones

  const [cantidad, setCantidad] = useState(Number(0));
  const [cantidadCompra, setCantidadCompra] = useState(Number(0));
  const [cantidadVenta, setCantidadVenta] = useState(Number(0));
  const indexAux = usuario.acciones.findIndex(
    (item) => item.nombre === empresa?.name
  );

  const datoEmpresa = info.acciones.find(
    (x) => x.nombre === empresa?.name ?? ""
  );

  function handlecantidad(e) {
    setCantidad(e.target.value);
  }
  function handleComprarCantidad(e) {
    setCantidadCompra(Number(e.target.value));
  }

  function handleVenderCantidad(e) {
    setCantidadVenta(Number(e.target.value));
  }

  // Vender acciones
  async function vender(e) {
    e.preventDefault();

    const venta = {
      nombre: empresa?.name ?? "",
      cantidad: Number(cantidadVenta),
    };

    if (
      datoEmpresa?.nombre === empresa.name &&
      datoEmpresa?.cantidad >= cantidadVenta
    ) {
      const fondoActual =
        Number(usuario.cartera) + empresa.high * Number(cantidadVenta);

      const index = usuario.acciones.findIndex(
        (item) => item.nombre === empresa?.name
      );

      usuario.acciones[index].cantidad -= cantidadVenta;
      usuario.cartera = fondoActual;

      if (usuario.acciones[index].cantidad === 0) {
        usuario.acciones.splice(index, 1);
      }

      const { _id, ...rest } = usuario;

      const requestUsuario = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      };

      usuario._id = info._id;

      localStorage.setItem("usuario", JSON.stringify(usuario));

      const response = await fetch(
        EDITUSUARIO.replace("<ID>", info._id),
        requestUsuario
      );
      const data = await response.json();

      setInfo(data);
      setCantidadVenta(0);
    } else {
      alert("No tienes activos para vender!!");
    }
  }

  //  Comprar acciones

  async function comprar(e) {
    e.preventDefault();

    const compra = {
      nombre: empresa?.name ?? "",
      cantidad: Number(cantidadCompra),
    };

    if (
      usuario.cartera >= empresa.high * cantidadCompra &&
      cantidadCompra > 0
    ) {
      const fondoActual =
        Number(usuario.cartera) - empresa.high * cantidadCompra;

      usuario.cartera = fondoActual;

      if (datoEmpresa) {
        const index = usuario.acciones.findIndex(
          (item) => item.nombre === empresa?.name
        );

        usuario.acciones[index].cantidad += cantidadCompra;
      } else {
        usuario.acciones.push(compra);
      }

      const { _id, ...rest } = usuario;

      const requestUsuario = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      };

      usuario._id = info._id;

      localStorage.setItem("usuario", JSON.stringify(usuario));

      const response = await fetch(
        EDITUSUARIO.replace("<ID>", info._id),
        requestUsuario
      );

      const data = await response.json();
      console.log(data);

      setInfo(data);
      setCantidadCompra(0);
    } else {
      alert("No puedes comprar esa cantidad, prueba a cambiarla");
    }
  }

  return (
    <Container fluid>
      {empresa && (
        <>
          <Row>
            <Col className="col-4 acciones p-4">
              <div>
                <h3>Activos: {usuario.acciones[indexAux]?.cantidad ?? 0}</h3>
                <h3 className="mb-4">Fondos: {usuario.cartera} $</h3>
              </div>

              <h5 className="mb-2">Precio de Compra: {empresa.high}$</h5>
              <Form onSubmit={comprar} className="mb-3">
                <input
                  className="rounded mb-1 me-2"
                  type="number"
                  name="cantidad"
                  onChange={handleComprarCantidad}
                  value={cantidadCompra}
                />

                <Button
                  className="bg-success border border-success text-light"
                  type="submit"
                >
                  Comprar
                </Button>
              </Form>

              <h5 className="mb-2">Precio de Venta: {empresa.low}$</h5>

              <Form onSubmit={vender}>
                <input
                  className="me-2 rounded mb-1"
                  type="number"
                  name="cantidad"
                  onChange={handleVenderCantidad}
                  value={cantidadVenta}
                />
                <Button
                  className="bg-success border border-success text-light"
                  type="submit"
                >
                  Vender
                </Button>
              </Form>
            </Col>
            <Col className="col-8 p-4">
              <h1 className="d-flex justify-content-center">{empresa.name}</h1>
              <Line options={options} data={data} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
