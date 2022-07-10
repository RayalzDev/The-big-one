import { Container, Col, Row, ListGroup } from "react-bootstrap/";

export default function Footer() {
  return (
    <Container fluid className="mt-5 bg-light">
      <Row>
        <Col>
          <ListGroup variant="flush">
            <h3 className="justify-content-end">Contacto</h3>
            <ListGroup.Item action href="https://github.com/RayalzDev">
              github.com/RayalzDev
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="https://www.linkedin.com/in/ra%C3%BAl-r%C3%ADos-moreno-b49900233/"
            >
              Raúl Ríos Moreno
            </ListGroup.Item>
            <ListGroup.Item>rayriosdev@gmail.com</ListGroup.Item>
            <ListGroup.Item
              action
              href="https://trello.com/b/47nrlklL/the-big-one"
            >
              Trello del proyecto
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item variant="warning">
              Elementos utilizados
            </ListGroup.Item>
            <ListGroup.Item>React</ListGroup.Item>
            <ListGroup.Item>React Bootstrap</ListGroup.Item>
            <ListGroup.Item>Nodejs</ListGroup.Item>
            <ListGroup.Item>MongoDB</ListGroup.Item>
            <ListGroup.Item>express y MD5</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      
    </Container>
  );
}
