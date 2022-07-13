import { useParams } from "react-router-dom";
import { UNAEMPRESA, EDITUSUARIO } from "../../config/settings";
import { Container, Row, Col, Button, Form } from "react-bootstrap/";
import useFetch from "../../hooks/useFetch";
import { useState,useEffect } from "react";
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
  const { info, setInfo } = useLogeadoContext();
  // Fetch a la empresa

  const { name } = useParams();
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

  const [cantidadCompra, setCantidadCompra] = useState("");
  const [cantidadVenta, setCantidadVenta] = useState("");
  const [currentUser,setCurrentUser] = useState(info)
  const [usuarioActualizado, setUsuarioActualizado] = useState(null);

  const datoEmpresa = info.acciones.find(
    (x) => x.nombre === empresa?.name ?? ""
  );



    setCurrentUser(user =>{ 
      const currentAcciones = user.acciones.map(obj => {
        if(obj.name === empresa.name){
          return {...obj,cantidad: obj.cantidad + cantidadCompra}
        }
        return obj;
      })

      return
      ({...user, acciones: currentAcciones,
    cartera: user.cartera - ( empresa?.high * Number(cantidadCompra))})})
    setUsuarioActualizado(currentUser);


  function handleComprarCantidad(e) {
    setCantidadCompra(e.target.value);
  }

  console.log(usuarioActualizado)

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
      const fondoActual = usuario.cartera + empresa.high * cantidadVenta;

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
      } else {
        setUsuario((usuario) => ({
          ...usuario,
          cartera: fondoActual,
          acciones: [...usuario.acciones, { nombre: empresa.name, cantidadVenta }],
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
    e.preventDefault();
    const currentAcciones = info.acciones.map(obj => {
      if(obj.name === empresa.name){
        return {...obj,cantidad: obj.cantidad + cantidadCompra}
      }
      return obj;
    })

    const currentCartera = info.cartera - (empresa.high * cantidadCompra)

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
      
    
  }
  return (
    <Container className="p-4 " style={{ height: "100vh", weight: "100vh" }}>
      {empresa && (
        <>
          <Row>
            <Col>
              <h1 className="d-flex justify-content-center">{empresa.name}</h1>
              <div>
                <p>Activos: {datoEmpresa?.cantidad ?? 0}</p>
                <p>Fondos: {usuario.cartera}</p>
              </div>
              {usuarioActualizado && (
                <div>
                  <p>Activos: {usuarioActualizado.acciones[0]?.cantidad}</p>
                  <p>Fondos: {usuarioActualizado.cartera}</p>
                </div>
              )}
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
                  name="cantidadComprar"
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
                  name="cantidadVender"
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
