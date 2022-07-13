import { useParams } from "react-router-dom";
import { UNAEMPRESA, EDITUSUARIO } from "../../config/settings";
import { Container, Row, Col, Button, Form } from "react-bootstrap/";
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

  //    Manejo de Favoritos

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
    const { _id, ...rest } = usuario;

    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    };

    usuario._id = info._id;
    setInfo(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }

  async function borrarFavorito() {
    const index = usuario.favoritos.indexOf(empresa?.name ?? "");
    usuario.favoritos.splice(index, 1);

    const { _id, ...rest } = usuario;

    const requestUsuario = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest),
    };

    usuario._id = info._id;
    setInfo(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
  }

  // Compra/venta de acciones

  const [cantidad, setCantidad] = useState(Number(0));
  const [cantidadCompra, setCantidadCompra] = useState(Number(0));
  const [cantidadVenta, setCantidadVenta] = useState(Number(0));
  const indexAux = usuario.acciones.findIndex((item) => item.nombre === empresa?.name);

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
    setCantidadVenta(e.target.value);
  }

  // Vender acciones
  async function vender(e) {
    e.preventDefault();
    const { _id, ...rest } = usuario;

    if (
      datoEmpresa?.nombre === empresa.name &&
      datoEmpresa?.cantidad >= cantidadVenta
    ) {
      const fondoActual =
        usuario.cartera + empresa.high * Number(cantidadVenta);

      datoEmpresa.cantidad = datoEmpresa.cantidad - cantidadVenta;

      console.log(fondoActual);

      if (datoEmpresa.cantidad === 0) {
        const index = usuario.acciones.indexOf(
          info.acciones.find((x) => x.nombre === empresa?.name ?? "")
        );

        usuario.acciones.splice(index, 1);
        setUsuario((usuario) => ({
          ...usuario,
          cartera: fondoActual,
        }));
      }

      const requestUsuario = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      };

      usuario._id = info._id;
      setInfo(usuario);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      await fetch(EDITUSUARIO.replace("<ID>", info._id), requestUsuario);
    } else {
      alert("No tienes activos para vender!!");
    }
  }
  //  Comprar acciones

  async function comprar(e) {
    const compra = {
      nombre: empresa?.name ?? "",
      cantidad: Number(cantidadCompra),
    };

    e.preventDefault();

    if (
      usuario.cartera >= empresa.high * cantidadCompra &&
      cantidadCompra > 0
    ) {
      const fondoActual = usuario.cartera - empresa.high * cantidadCompra;

      usuario.cartera = fondoActual;

      if (datoEmpresa) {
        const index = usuario.acciones.findIndex(
          (item) => item.nombre === empresa?.name
        );

        usuario.acciones[index].cantidad += cantidadCompra;

      } else {

        usuario.acciones.push(compra);

      }

      //  setUsuario((usuario) => ({
      //   ...usuario,
      //   cartera: fondoActual,
      // }));

      // console.log(usuario)
      //  setUsuario((usuario) => ({
      //   ...rest,
      //   acciones: [...usuario.acciones, compra ],
      // }));

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
    <Container className="p-4 " style={{ height: "100vh", weight: "100vh" }}>
      {empresa && (
        <>
          <Row>
            <Col>
              <h1 className="d-flex justify-content-center">{empresa.name}</h1>
              <div>
                <p>Activos: {usuario.acciones[indexAux].cantidad ?? 0}</p> 
                <p>Fondos: {usuario.cartera} $</p>
              </div>
              <Line options={options} data={data} />
            </Col>
          </Row>
          <Row className="justify-content-center align-content-center p-4">
            <Col>
              <Form onSubmit={comprar}>
                <Button
                  className="bg-info border border-info text-dark"
                  type="submit"
                >
                  Comprar
                </Button>
                <input
                  type="number"
                  name="cantidad"
                  onChange={handleComprarCantidad}
                  value={cantidadCompra}
                />
                <p>{empresa.high}$</p>
              </Form>
            </Col>
            <Col>
              <Form onSubmit={vender}>
                <Button
                  className="bg-info border border-info text-dark"
                  type="submit"
                >
                  Vender
                </Button>
                <input
                  type="number"
                  name="cantidad"
                  onChange={handleVenderCantidad}
                  value={cantidadVenta}
                />
                <p>{empresa.high}$</p>
              </Form>
            </Col>
          </Row>
          {usuario.favoritos.includes(empresa.name) ? (
            <Button
              onClick={borrarFavorito}
              className="bg-info border border-info text-dark justify-content-center ml-3"
            >
              Borrar Favorito
            </Button>
          ) : (
            <Button
              onClick={Favorito}
              className="bg-info border border-info text-dark justify-content-center "
            >
              Favoritos
            </Button>
          )}
        </>
      )}
    </Container>
  );
}
