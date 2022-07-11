import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EDITUSUARIO } from "../../config/settings";
import elonMuskImage from "../../assets/images/elon.jpg";
import cacaImage from "../../assets/images/caca.jpg";
import {
  Card,
  Form,
  Button,
  FormControl,
  Container,
  Row,
  Col,
  ListGroup,
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
    <Container fluid className="p-2">
      <Row className="justify-content-center ">
        <Col md="auto">
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
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap shadow-lg  acciones" style={{maxHeight: "100vh", overflowY: "scroll"}}>
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
                <div key={empresa.nombre} className="p-4">
                  <Card style={{ width: "25rem" }}>
                    <Card.Body>
                      <Card.Title classname="fs-1">{empresa.nombre}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                      <Card.Text>
                        <Line options={options} data={data} />

                        <h1 className="text-end">{empresa.cantidad} activos</h1>
                      </Card.Text>
                      <Link to={`/empresa/${empresa.nombre}`}>
                        Ver detalles
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </Col>
        <Col className="p-4 justify-content-end">
          <Card style={{ width: "25rem" }} className="mb-5">
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
          <Col className="p-2 justify-content-center bg-light mt-4 mb-4">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 h-100"
                  src={elonMuskImage}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h4>
                    Elon Musk rescinde acuerdo de 44.000 millones de dólares con
                    Twitter
                  </h4>
                  <p>
                    Bajo el argumento de que la empresa de redes sociales no
                    había proporcionado información sobre cuentas falsas en la
                    plataforma.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 h-100"
                  src={cacaImage}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h4>¿Por qué congelar tu caca podría salvarte la vida?</h4>
                  <p>
                    Que la gente congele una muestra de caca para almacenarla en
                    un banco de heces y poder recurrir a ella en un momento de
                    necesidad.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Col>
        <Col className="p-3 justify-content-end">
          <Card style={{ width: "18rem" }} className="border-0 p-1 bg-light ">
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
        </Col>
      </Row>
    </Container>
  );
}
