import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EDITUSUARIO } from "../../config/settings";
import elonMuskImage from "../../assets/images/elon.jpg";
import cacaImage from "../../assets/images/caca.jpg";
import euroImage from "../../assets/images/euro.jpg";
import sojaImage from "../../assets/images/soja.jpg";
import ListaFavoritos from "../../Components/ListaFavoritos";
import { useEmpresasContext } from "../../Contexts/EmpresasContext";
import {MARKET} from "../../Routes/paths"

import {
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Carousel,
} from "react-bootstrap/";
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

export default function Home() {
  const { info, setInfo } = useLogeadoContext();
  const { listaEmpresas } = useEmpresasContext();

  const listaFavoritos = listaEmpresas.filter((item) =>
    info.favoritos.includes(item.name)
  );
  console.log(listaFavoritos);

  //      Manejo de Busqueda

  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  function handleInputsBusqueda(event) {
    setBusqueda(event.target.value);
  }

  function handleEmpresaBuscada() {
    navigate(`/empresa/${busqueda}`);
  }

  //    Manejo de Gráficas

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

  //    Manejo de Fondos

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function handleCartera(event) {
    setUsuario((usuario) => ({
      ...usuario,
      [event.target.name]: event.target.value,
    }));
    console.log(usuario.cartera);
  }

  async function submitCartera() {
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
    <Container fluid>
      <Row>
        <Col className="shadow-lg  acciones col-3 pt-3">
          <div className="pb-2 text-center">
            <h3>Mis Activos</h3>
          </div>
          <div style={{ maxHeight: "120vh", overflowY: "scroll" }}>
            {" "}
            {info &&
              info.acciones?.map((empresa) => {
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
                  <div key={empresa.nombre} className="py-2">
                    <Card className="border border-dark">
                      <Card.Body>
                        <Card.Title>
                          <div className="d-flex justify-content-between align-items-end">
                            <h2>{empresa.nombre}</h2>
                            <h3>{empresa.cantidad} activos</h3>
                          </div>
                        </Card.Title>
                        <Card.Text>
                          <Line options={options} data={data} />
                          {/* <h1 className="text-end">{empresa.cantidad} activos</h1> */}
                        </Card.Text>
                        <Link to={`/empresa/${empresa.nombre}`}>
                          <Button>Ver detalles</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
        </Col>

        {/* columna del medio */}

        <Col className="col-9 pt-4">
          {/* Buscador */}
          <Row>
            <Col className="col-4">
              <Card className="mb-5 shadow border border-white">
                <Card.Body>
                  <Card.Title>Fondos disponibles</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {info.nombre}
                  </Card.Subtitle>
                  <Card.Text>
                    <h1 className="text-end">{info.cartera}$</h1>
                    <Button className="bg-success" onClick={handleShow}>
                      Añadir Fondos
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Añadir fondos</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={submitCartera}>
                          <Form.Control
                            type="number"
                            name="cartera"
                            value={usuario.cartera}
                            onChange={handleCartera}
                          />
                          <Button variant="primary" type="submit">
                            Añadir
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="col-4">
              <Carousel className="rounded shadow">
                <Carousel.Item>
                  <img
                    style={{ maxHeight: "181px" }}
                    className="d-block w-100 h-100 rounded"
                    src={elonMuskImage}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h5>
                      Elon Musk rescinde acuerdo de 44.000 millones de dólares
                      con Twitter
                    </h5>
                    {/* <p>
                      Bajo el argumento de que la empresa de redes sociales no
                      había proporcionado información sobre cuentas falsas en la
                      plataforma.
                    </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: "181px" }}
                    className="d-block w-100 h-100 rounded"
                    src={cacaImage}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h5>¿Por qué congelar tu caca podría salvarte la vida?</h5>
                    {/* <p>
                      Que la gente congele una muestra de caca para almacenarla
                      en un banco de heces y poder recurrir a ella en un momento
                      de necesidad.
                    </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: "181px" }}
                    className="d-block w-100 h-100 rounded"
                    src={euroImage}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h5>
                      El euro toca la paridad con el dólar; su destino está
                      ahora en los mercados de energía
                    </h5>
                    {/* <p>
                      Que la gente congele una muestra de caca para almacenarla
                      en un banco de heces y poder recurrir a ella en un momento
                      de necesidad.
                    </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    style={{ maxHeight: "181px" }}
                    className="d-block w-100 h-100 rounded"
                    src={sojaImage}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h5 className=" fw-bold">
                      Ventas soja de Brasil 2022 se retrasan por estancamiento
                      del mercado interno, débil demanda china
                    </h5>
                    {/* <p>
                      Que la gente congele una muestra de caca para almacenarla
                      en un banco de heces y poder recurrir a ella en un momento
                      de necesidad.
                    </p> */}
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col className="col-4">
              <Card className="mb-5 shadow border border-white">
                <Card.Body>
                  <Card.Title className="text-end ">
                    <h2>MarketPlace</h2>
                  </Card.Title>
                  <Card.Subtitle className="text-end mb-3 mt-3">
                    Consulta todas nuestras empresas disponibles
                  </Card.Subtitle>
                  <Card.Text className="text-end">
                    <Link to={MARKET}>
                      <Button className="bg-primary">Ir a Marketplace</Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="row row-cols-3 justify-content-center">
            <ListaFavoritos lista={listaFavoritos} />
          </Row>
        </Col>

        {/* tercera columna */}

        {/* <Col className="col-3 pt-4">
          <Form onSubmit={handleEmpresaBuscada}>
            <Form.Group className="mb-3" controlId="formBasicText">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="name"
                onChange={handleInputsBusqueda}
              />
            </Form.Group>
            <Button
              variant="outline-light bg-info border border-info text-dark "
              type="submit"
              className="d-grid gap-2 col-6 mx-auto"
            >
              Buscar
            </Button>
          </Form>
          <Card style={{ width: "15rem" }} className="border-0  bg-light ">
            <Card.Header className="bg-primary">
              <h3>Favoritos</h3>
            </Card.Header>
            {info &&
              info.favoritos?.map((empresa) => (
                <ListGroup variant="flush" className="p-2">
                  <li>
                    <Link
                      to={`/empresa/${empresa}`}
                      className="text-decoration-none"
                    >
                      {empresa}
                    </Link>
                  </li>
                </ListGroup>
              ))}
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
}
